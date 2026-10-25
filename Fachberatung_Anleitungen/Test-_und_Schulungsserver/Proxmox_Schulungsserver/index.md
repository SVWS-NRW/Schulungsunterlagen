# Zentralen Schulungsserver mit Proxmox bereitstellen

## Ziel und Rolle des Hosts

Proxmox betreibt die virtuellen Rechner. **Der SVWS-Server wird anschließend in einem Gast installiert, nicht auf dem Proxmox-Host.** Dieser Weg passt zu einem Schulungsraum mit bereits betreuter Virtualisierungsinfrastruktur oder zu einem dafür vorgesehenen Server.

Für einen einzelnen mobilen Laptop ist Proxmox kein notwendiger Zwischenschritt. Nutze dort die [lokale Server-VM](../VirtuaBox_SchulungsClient/index.md). Ein vorhandener, stabil betriebener Server muss nicht allein für diese Dokumentation auf Proxmox umgestellt werden.

## Aufbau für einen Präsenzraum

| Ebene | Was läuft dort? | Zuständig |
| --- | --- | --- |
| Physischer Server / Hypervisor | Proxmox, Storage und virtuelle Netze | Stützpunktadministration |
| Eigene Debian-Server-VM | SVWS-Server und MariaDB, optional als Docker-Projekt | Serveradministration |
| Bestehende Windows-PCs oder geeignete Laptops | Browser und bei Bedarf SchILD-NRW 3 mit passender `.con`-Datei | Arbeitsplatzadministration und Moderation |
| Übungsschemata | Getrennte Datenstände und Zugänge für die Arbeitsplätze | Moderation in Abstimmung mit Administration |

Eine zentrale Instanz genügt, wenn das Schulungsziel keine getrennten Serverversionen erfordert und die Kapazitätsprobe erfolgreich ist. Ein eigener Server pro Person ist kein allgemeines Erfordernis.

## Einrichten

1. Prüfe, ob der vorhandene Proxmox-Host genügend freie Kapazität und eine passende Sicherungsmöglichkeit hat.
2. Falls ein neuer Host nötig ist: folge [Proxmox installieren](./Proxmox_Installation/index.md). Plane dies mit der Administration vor dem Veranstaltungstag.
3. Lege eine eigene Debian-VM an. Binde sie an das abgestimmte Schulungsnetz an und dokumentiere feste Adresse bzw. DHCP-Reservierung.
4. Wähle für den Gast entweder den [Docker-Aufbau](../Docker_Schulungsserver/index.md) oder den offiziellen Linux-Installer.
5. Richte die Übungsschemata ein und prüfe Browserzugriff sowie bei SchILD-NRW 3 zusätzlich die MariaDB-Verbindung.
6. Sichere den abgenommenen Ausgangsstand und teste die Wiederherstellung auf einer Kopie.

Eine Bridge allein garantiert keine Erreichbarkeit. WLAN-Isolation, VLANs, MAC-Vorgaben und Firewalls können Verbindungen verhindern. Führe die Probe an einem echten Teilnehmerarbeitsplatz durch.

## LXC als Alternative

Ein unprivilegierter Debian-LXC mit direktem Linux-Installer kann Ressourcen sparen, setzt aber Kenntnisse über Container, Hostkernel, Netz und Sicherungsverfahren voraus. Verwechsle ihn nicht mit einer vollständigen VM oder einem Docker-Container.

[pve_create_lxc.sh](https://raw.githubusercontent.com/Raffenberg/SVWS_FBM/6b540c8da74187caed87b4b561a553add2f61fc7/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/pve_create_lxc.sh) erstellt **nur einen Container**. Template, Storage und Bridge sind explizit vorzugeben; eine statische IP braucht ein CIDR-Präfix, etwa `192.168.50.20/24`. Ohne statische IP wird DHCP verwendet. Root-Zugangsdaten werden separat in einer geschützten Datei gespeichert, nicht in der sichtbaren Containerbeschreibung.

[pve_exec_svws_linuxinstaller.sh](https://raw.githubusercontent.com/Raffenberg/SVWS_FBM/6b540c8da74187caed87b4b561a553add2f61fc7/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/pve_exec_svws_linuxinstaller.sh) ist ein gesonderter Schritt für **einen ausdrücklich benannten frischen Container** und setzt den lokalen Linux-Wrapper voraus. Es ist keine Ausführung auf allen Containern.

Die Skripte sind statisch und mit simulierten Befehlen prüfbar; eine vollständige Proxmox-/LXC-Installation ist in dieser Prüfung nicht nachgestellt worden. Für die Freigabe des eigenen Raums ist eine reale Probe erforderlich.

## Klonen und geordnetes Beenden

[clone_lxc.sh](https://raw.githubusercontent.com/Raffenberg/SVWS_FBM/6b540c8da74187caed87b4b561a553add2f61fc7/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/clone_lxc.sh) erstellt vollständige Klone und lässt sie zur Kontrolle ausgeschaltet. Prüfe IP-Adressen, Identitäten und Zugänge vor dem Start. Das Quellsystem wird dafür geordnet heruntergefahren; plane diese Unterbrechung ein.

[pve_shutdown_all_LXC.sh](https://raw.githubusercontent.com/Raffenberg/SVWS_FBM/6b540c8da74187caed87b4b561a553add2f61fc7/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/pve_shutdown_all_LXC.sh) benötigt trotz seines historischen Namens eine explizite Liste von CT-IDs. Es stoppt nicht mehr unterschiedslos sämtliche Container des Hosts.

## Fernschulungen gesondert planen

Für reine SVWS-Client-Aufgaben genügt ein erreichbarer Browser-Arbeitsplatz. Für SchILD-NRW 3 ist ein geeigneter Windows-Arbeitsplatz erforderlich, etwa ein betreuter Fernarbeitsplatz.

Ein öffentlich erreichbarer Host mit nur einer IP ist **kein fertiger Fernschulungsraum**. Plane geschützten Zugang, Netztrennung, Zertifikate, Windows-Zugänge und Kapazität separat. Ein Reverse-Proxy mit TLS ersetzt nicht die notwendige Zugangsbeschränkung. Betreibe Server und Datenhaltung nicht als ungeprüft öffentlich freigegebene Dienste.

Grundlagen: [SVWS-Installation und Netzabgrenzung](https://doku.svws-nrw.de/deployment/), [Proxmox-Dokumentation](https://pve.proxmox.com/pve-docs/) und der [Prüfbericht](../Installationsskripte/#pruefbericht).
