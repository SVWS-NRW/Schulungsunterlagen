# Virtualbox

Diese Anleitung beschreibt die Installation von VirtualBox, das Klonen und Erstellen von Snapshots virtueller Maschinen sowie die Installation eines Wenom- bzw. eines SVWS-Servers. Ziel ist es, einen niederschwelligen Einstieg in die Einrichtung von Testumgebungen für den SVWS-Server, Schild3 und die SVWS-Tools zu ermöglichen.

## Installation von Virtualbox unter Windows 11

Voraussetzung ist eine Windows 11 Installation mit Admin-Rechten, um die benötigten Programme installieren zu dürfen.

Download von Virtualbox bei Oracle - siehe auch:  <https://www.virtualbox.org/wiki/Downloads>

-> Download [virtualbox-7.2.10](https://download.virtualbox.org/virtualbox/7.2.10/VirtualBox-7.2.10-174163-Win.exe)

Zur Installation ist Visual C++ ggf zusätzlich benötigt.

-> Donwload [VC_redist.x64.exe](https://aka.ms/vc14/vc_redist.x64.exe)

### Installieren  von Visual C++

![alt text](image.png)

![alt text](image-1.png)

### Installieren von Virtualbox

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

folgende Warungen einfach ignorieren:

![alt text](image-5.png)

![alt text](image-6.png)

## Installation von Debian 13 auf einer virtuellen Maschine (VM)

Download eines Debain .iso Images von der offiziellen Seite: <https://www.debian.org/distrib/>

Download -> [Debian 13.5.0](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-13.5.0-amd64-netinst.iso)

![alt text](image-7.png)

Virtual Box öffnen und eine neue Maschine erstellen.

![alt text](image-8.png)

Dann die gewünschten Werte angeben:

![alt text](image-11.png)

![alt text](image-10.png)

VM Starten und den Anweisungen folgen

![alt text](image-14.png)

Alternativ den graphischen Installer nehmen:

![alt text](image-16.png)

... mehrer Fenster müssen ausgefüllt werden oder geben Informationen

![alt text](image-17.png)

... unter anderem die Angabe, wo wir den Download haben

![alt text](image-18.png)

![alt text](image-19.png)

![alt text](image-20.png)

![alt text](image-22.png)

... Angaben zu Statistik und Softwarequellen übernehmen und entsprechend die Softwarepakete  angeben (siehe Screenshot):

![alt text](image-23.png)

![alt text](image-24.png)

![alt text](image-25.png)

Installation abgeschlossen und reboot ...

![alt text](image-26.png)

### Einloggen und ausprobieren

![alt text](image-27.png)

... ggf die Netzwerkeinstellungen auf Netzwerkbrücke ändern, zum Beispiel für den Betrieb hinter einer Fritzbox.

![alt text](image-29.png)

![alt text](image-28.png)

Alternativer login über die Powershell vom Windowssytem:

![alt text](image-31.png)

## Erstellen von Snapshots und Klonen

![alt text](image-30.png)

![alt text](image-12.png)

Sicherungspunkte erstellen und Klone erstellen.

## Installation eines SVWS-Servers in diese VM

Zum Beispiel einen Klon erstellen und hochfahren.

![alt text](image-13.png)

dann hier dieses Skript herunterladen und ausführen.

<https://github.com/SVWS-NRW/Schulungsunterlagen/raw/refs/heads/master/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/install_svws_testserver_linuxinstaller.sh>

ausführen mit

```bash
bash install_svws_testserver_linuxinstaller.sh -v 1.3.2
```

## Installation eines Wenom-Servers in dieser VM

Quasi analoges Vorgehen

dann hier dieses Skript herunterladen und ausführen.

<https://github.com/SVWS-NRW/Schulungsunterlagen/raw/refs/heads/master/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/install_wenom_testserver.sh>

ausführen mit

```bash
bash install_wenom_testserver.sh -v 1.3.2
```
