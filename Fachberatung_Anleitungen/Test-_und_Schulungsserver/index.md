---
sectionCards:
  - title: "Docker-Schulungsserver"
    details: "Eine containerbasierte Schulungsumgebung aufsetzen."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Docker_Schulungsserver/"
  - title: "Installationsskripte"
    details: "Skripte zur Einrichtung von Server und Werkzeugen nutzen."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/"
  - title: "Schulungsserver betreuen: Wartung & Zurücksetzen"
    details: "Die Schulungsumgebung betreuen und auf den Ausgangsstand zurücksetzen."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Moderatoren_Schulungsserver/Wartung"
  - title: "Proxmox-Schulungsserver"
    details: "Virtuelle Maschinen für Schulungen bereitstellen."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/"
  - title: "Proxmox-Schulungsserver: Proxmox installieren"
    details: "Die Virtualisierungsplattform installieren."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/Proxmox_Installation/"
  - title: "SVWS-Tools"
    details: "Ergänzende Werkzeuge für den Schulungsserver kennenlernen."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/SVWS-Tools/"
  - title: "VirtualBox-Schulungsclient"
    details: "Einen virtuellen Arbeitsplatz für Teilnehmende einrichten."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/VirtuaBox_SchulungsClient/"
  - title: "VirtualBox installieren"
    details: "VirtualBox als Grundlage des Schulungsclients installieren."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/VirtuaBox_SchulungsClient/Virtualbox_Installation/"
  - title: "Windows-Testserver"
    details: "Eine Testumgebung unter Windows aufbauen."
    link: "/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Windows_Testserver/"
---

# Schulungsumgebungen

Hier findest Du die Anleitungen zum Einrichten, Betreuen und Zurücksetzen von Schulungsservern und virtuellen Schulungsclients.

<SectionCards />

## Sammlung Installationsskripte

[Hier](./Installationsskripte/index.md) befinden sich Skripte zur Installation von SVWS-Server unter docker oder mit dem Linuxinstaller. Ebenso findet man hier Installationsskripte von Wenom, Weblupo und diversen SVWS-Tools. 



## Wie benutze ich den Schulungsserver als Moderator

## Wie setze ich den Schulungsserver zurück?

siehe Artikel: [Wartung](./Moderatoren_Schulungsserver/Wartung.md)

## Quellen

Etwas vereinfachte und reduzierte bash Skripte zum Aufsetzen einer Testumgebung findest Du in der SVWS-Dokumentation unter deployment

+ [Testserver](https://github.com/SVWS-NRW/SVWS-Dokumentation/tree/main/deployment/Testserver)

Um vollständige Umgebungen zu Erzeugen, Zurückzusetzen und zu Warten können als Orientierung die Skripte unter
deployment -> Svchulungsserver verwendet werden:  

+ [Proxmox Schulungsserver](https://github.com/SVWS-NRW/SVWS-Dokumentation/tree/main/deployment/Schulungsserver/Proxmox_Schulungsserver)
+ [Docker Schulungsserver](https://github.com/SVWS-NRW/SVWS-Dokumentation/tree/main/deployment/Schulungsserver/Docker_Schulungsserver)
