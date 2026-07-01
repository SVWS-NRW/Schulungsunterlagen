# Proxmox

Diese Anleitung beschreibt die Installation von Proxmox, das Klonen und Erstellen von Snapshots virtueller Maschinen und Linux Container sowie die Installation eines Wenom- bzw. eines SVWS-Servers. Ziel ist es, einen Einstieg in die Einrichtung von Testumgebungen für den SVWS-Server, Schild3 und die SVWS-Tools zu ermöglichen.

## Installation

Grundlage ist zunächst ein Debian 13, idealerweise mit graphischer Oberfläche. Dies ist zwar nicht in der Originalen Proxmox PVE version so voegesehen, hat jedoch den Vorteil, dass direkt mit einem Firefox die Erreichbarkeit der Webservices geprüft werden kann.

Die Installation eines Debiansystems ist in der Anleitung zu [Virtualbox](../Virtualbox/index.md) in grundlegend beschrieben. Bitte darauf hier eine grafisch Oberfläche mitinstallieren.

### Installation Proxmox auf einer Debian 13

#### Vorbereitung

##### Netzwerkkonfiguration

Der ProxmoxServer sollte eine fixe IP außerhalb der DHCP-Range des eigenen Netzwerkes erhalten, sodass sich diese nicht verändert.

![alt text](image-4.png)

Aktuelle IP Adresse und den namen des Netzwerkadapters anzeigen lassen: `ip a`

![alt text](image-5.png)

Problem: "Networkmanager ist aktiv" das ist inkompatibel mit dem Proxmoxsystem, daher durch ifupdown2 ersetzen:

```bash
systemctl stop NetworkManager
systemctl disable NetworkManager
systemctl mask NetworkManager
apt install ifupdown2
```

Hier die Statische IP, zum Beispiel 192.168.11.222 wie folgt vergeben: `nano /etc/network/interfaces` und hier folgendes eintragen:

```bash  
source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

auto ens18
# iface ens18 inet dhcp
iface ens18 inet static
        address 192.168.11.222/24
        gateway 192.168.11.1

```

Zum schluss noch in der /etc/hosts den folgenden Eintrag vornemhen:

```bash
...
#127.0.1.1      ProxmoxServer
192.168.11.222  ProxmoxServer
...
```

#### Updates

```bash
su -
apt update && apt upgrade -y && apt autoremove -y
apt install ssh -y
reboot
```

#### Proxmoxinstallation

siehe: <https://pve.proxmox.com/wiki/Install_Proxmox_VE_on_Debian_13_Trixie>

```bash
cat > /etc/apt/sources.list.d/pve-install-repo.sources << EOL
Types: deb
URIs: http://download.proxmox.com/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOL
```

```bash
wget https://enterprise.proxmox.com/debian/proxmox-archive-keyring-trixie.gpg -O /usr/share/keyrings/proxmox-archive-keyring.gpg
```

```bash
apt update && apt full-upgrade
```

```bash
apt install proxmox-default-kernel
```

```bash
reboot
```

```bash
apt install proxmox-ve postfix open-iscsi chrony
```

```bash
apt remove linux-image-amd64 'linux-image-6.12*'
```

```bash
update-grub
```

Damit ist der Proxmox PVE installiert und kann unter <https://192.168.11.222:8006> erreicht werden.

## Einrichtung der internen, virtuellen Netzwerkbrücke

![alt text](image-12.png)

![alt text](image-10.png)

![alt text](image-11.png)

## LX Container

Zuerst ein Template con Proxmox herunterladen:
![alt text](image-6.png)

Dann "Create CT"

![alt text](image-7.png)

![alt text](image-8.png)

... Beliebige Werte für CPU und Ram angeben und das Netzwerk per DHCP auf der internen virtuellen Netzwerkbrücke

![alt text](image-13.png)

Container starten und einloggen:

![alt text](image-14.png)

## Für Fortgeschrittene: Sofware Driven Network (SDN) in Proxmox

Mit einem SDN können interne virtuelle Netze aufgespannt werden, die auch per DHCP interne IPs vergeben.

### Voraussetzungen

Auf dem Node existiert eine Netzwerkkarte (ens3), die aktiv ist. Und es ist ein vmbrX mit der vom Provider zugewiesenen IP und dem Gateway eingetragen.

Nachinstallationen und Einstellungen:

```bash
apt update
apt install dnsmasq frr-pythontools
# disable default instance
systemctl disable --now dnsmasq
reboot now
```

### Einrichtung

Unter: Datacenter -> SDN -> Zones

+ eine neu simple Zone hinzufügen. Die ID ist frei wählbar und könnte z.B. "Intranet" genannt werden.
+ Knoten auswählen und unter erweitert den DHCP aktivieren
+ Unter VNets ein neues VNet erstellen, es z.B. auch Intranet als Name vergeben und Zone eintragen

Auf der rechten Seite dann für dieses Vnet ein subnetz einrichten. z.B.

+ subnetz 10.0.0.1/24
+ Gateway 10.0.0.1

SNAT anschalten damit dieses VNet auch einen Internetzugang hat.

Anschließend die DHCP Range hinzufügen und die Grenzen einrichten.

Zum Abschluß der Konfiguration unter "SDN" auf Apply/Anwenden drücken und ein bißchen warten.

Das Netzwerk "Intranet" ist dann für alle VMs auswählbar

## Für Fortgeschrittene: Portforwarding

Mit post-up und post down können dynamisch die iptables Einstellungen über die Datei ```/etc/network/interfaces``` für das entsprechende Interface geladen werden.

Hier ein Beispiel für eine vollständige Datei im Proxmox, bei dem die 10.0.0.10 die vorgeschaltete Firewall ist und quasi alle Ports bedient außer den Port 22 für SSH und den Port 8006 für die Weboberfläche des Proxmox.

```bash
auto lo
iface lo inet loopback

iface ens3 inet manual


auto vmbr1
iface vmbr1 inet static
        address 123.45.678.9/22
        gateway 123.45.678.1
        bridge-ports ens3
        bridge-stp off
        bridge-fd 0

        post-up echo 1 > /proc/sys/net/ipv4/ip_forward  
        post-up iptables -t nat -A PREROUTING -i vmbr1 -p udp -j DNAT --to 10.0.0.10
        post-up iptables -t nat -A PREROUTING -i vmbr1 -p tcp -m multiport ! --dport 22,8006 -j DNAT --to 10.0.0.10

        post-up   iptables -t nat -A POSTROUTING -s '10.0.0.0/24' -o vmbr1 -j MASQUERADE
        post-down iptables -t nat -D POSTROUTING -s '10.0.0.0/24' -o vmbr1 -j MASQUERADE

source /etc/network/interfaces.d/*
```

## Für Fortgeschrittene: Proxmox in Proxmox

Proxmox in einer VM (z.B. für die Schulungsumgenbung)
Das funktioniert gut und ist der übliche Weg, um Proxmox zu testen oder Schulungs-/Laborsysteme aufzubauen.

### Grundlegense Voraussetzungen

+ CPU mit Intel VT-x/EPT oder AMD-V/RVI
+ Auf dem Host muss Nested Virtualization aktiviert sein.
+ Die VM sollte CPU-Typ „host“ verwenden.

Nested Virtualization aktivieren

bei Intel Chipsatz:

```bash
echo "options kvm-intel nested=Y" > /etc/modprobe.d/kvm-intel.confmodprobe -r kvm_intel && modprobe kvm_intelcat /sys/module/kvm_intel/parameters/nested
```

bei AMD Chipsatz

```bash
echo "options kvm-amd nested=1" > /etc/modprobe.d/kvm-amd.confmodprobe -r kvm_amd && modprobe kvm_amdcat /sys/module/kvm_amd/parameters/nested

```

Hier ein Beispiel, wie man erkenn, welcher Prozessor in Betrieb ist und ob das Modul geladen ist.

![alt text](image-3.png)

mit `cat /sys/module/kvm_intel/parameters/nested` Y: Nested virtualisierung aktiv

### sinnvolle Einstellungen

+ RAM: mindestens 4–8 GB
+ Festplatte: 32–64 GB+
+ Netzwerk: VirtIO

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)
