# Schulungsumgebungen

Hier entscheidest Du, **wo Server und Daten laufen, an welchem Gerät die Teilnehmenden arbeiten und wer den Ausgangsstand wiederherstellt**. Installiere erst, wenn diese drei Punkte geklärt sind.

## Welche Umgebung passt zum Raum?

| Vorhandene Ausstattung | Sinnvoller Aufbau | Was wird wo installiert? |
| --- | --- | --- |
| Schulungsraum mit betreutem Server und Windows-PCs | Zentraler Schulungsserver; vorhandene PCs weiterverwenden | Serverdienste auf einer eigenen Server-VM; SchILD-NRW 3 und Verbindungsdateien auf den Windows-Arbeitsplätzen |
| Mitgebrachte Laptops, stabiles gemeinsames Netz | Zentraler Server im Raum; Laptops als Arbeitsplätze | Browser genügt für reine SVWS-Client-Übungen. Für SchILD-NRW 3 zusätzlich ein geeigneter Windows-Arbeitsplatz mit passender Verbindung |
| Mitgebrachte Windows-Laptops, kein verlässliches gemeinsames Netz | Vorbereitete lokale Server-VM je Laptop | VirtualBox auf jedem geeigneten Host, Debian und Serverdienste in der VM; SchILD-NRW 3 auf dem Windows-Host |
| Bereits betreuter Proxmox-Host | Server-VM auf der vorhandenen Plattform | Proxmox bleibt auf dem Host; Debian und Serverdienste laufen im Gast. LXC ist eine eigene Alternative für erfahrene Administration |
| Einzelner Windows-Testrechner ohne Virtualisierung | Lokale Windows-Installation | SVWS-Server und MariaDB über den Windows-Installer; SchILD-NRW 3 separat auf demselben Rechner |
| Mac- oder Linux-Laptops | Browser am zentralen Server; bei SchILD-Bedarf bereitgestellter Windows-Arbeitsplatz | Eine Debian-VM ersetzt kein Windows. CPU-Architektur, Fernzugang und Nutzungsrechte vorab klären |

Eine vorhandene Client-Server-Struktur ist noch keine fertige Schulungsumgebung. Kläre mit dem Stützpunkt: verfügbare Windows-Arbeitsplätze, Administrationsrechte, Serverkapazität, Netzfreigaben, Zertifikate und den erlaubten Rücksetzweg.

## Empfehlung: ein zentral betreutes Grundsystem

**Meine Empfehlung für einen regelmäßig genutzten Schulungsraum ist eine zentrale Debian-Server-VM mit einem dokumentierten Docker-Compose-Projekt aus SVWS-Server und MariaDB.** Verwende ausdrücklich ausgewählte Versionen und getrennte Übungsschemata mit getrennten Zugängen je Arbeitsplatz. Zusätzliche Tools kommen nur hinzu, wenn das Schulungsmodul sie benötigt.

Der Wartungsvorteil entsteht durch **eine verantwortliche Stelle, einen gemeinsamen Versionsstand und einen geprüften Rücksetzweg**. Du musst nicht vor jeder Schulung viele Laptop-Installationen oder einen Container pro Teilnehmendem aktualisieren. Eine bereits zuverlässig betreute Installation mit dem offiziellen Linux-Installer solltest Du dafür nicht ohne Anlass umbauen; sie kann denselben organisatorischen Vorteil bieten.

Das ist eine begründete Betriebsempfehlung, kein Leistungsnachweis für eine beliebige Teilnehmerzahl. Die Stützpunktleitung muss den Aufbau mit der vorgesehenen Anzahl gleichzeitiger Benutzer und den echten Schulungsaufgaben erproben. Die Docker-Prüfung dieses Bestands ersetzt keinen Lasttest des Schulungsraums.

Bei instabilem Netz ist die **vorbereitete lokale VM** die sinnvollere Ausweichlösung. Verteile ein geprüftes Ausgangsabbild vor dem Termin und teste auf den tatsächlich verwendeten Geräten; eine VM ist nicht unabhängig von RAM, freiem Speicher, CPU-Architektur und Virtualisierungsunterstützung.

## Die Bausteine auseinanderhalten

| Baustein | Aufgabe |
| --- | --- |
| VirtualBox oder Proxmox | Betreibt virtuelle Rechner; enthält allein noch keinen SVWS-Server |
| Debian-VM oder geeigneter LXC | Betriebssystem für die Serverinstallation |
| SVWS-Server und MariaDB | Stellen Anwendung und Datenhaltung bereit |
| SVWS-Client | Webanwendung im Browser des Arbeitsplatzes |
| SchILD-NRW 3 | Windows-Anwendung; benötigt eine passende `.con`-Datei |
| SVWS-Tools / WeNoM / WebLuPO | Zusätzliche Anwendungen mit eigenen Anforderungen |

**Für Browserübungen** muss der Arbeitsplatz den HTTPS-Endpunkt des Servers erreichen. **Für SchILD-NRW 3** ist nach aktueller Dokumentation zusätzlich direkter MariaDB-Zugriff nötig; nur Port 8443 freizugeben reicht deshalb nicht. Plane dafür einen passenden Datenbankbenutzer und ausschließlich die erforderlichen Verbindungen im Schulungsnetz. Die [offizielle SchILD-Installationsanleitung](https://doku.svws-nrw.de/deployment/Schild-NRW3/) beschreibt die Verbindungsanforderungen.

## Anleitungen in Arbeitsreihenfolge

<NavigationOverview path="/Fachberatung_Anleitungen/Test-_und_Schulungsserver/" label="Anleitung" />

## Zuständigkeiten und Abnahme

1. **Stützpunktleitung:** Entscheidet Aufbau und Netz, richtet Server bzw. VM ein, verwaltet Zugänge und Sicherungen.
2. **Moderation:** Wählt [Übungsdatenbanken](/Datenbanken/) und Aufgaben, ordnet jedem Arbeitsplatz sein Schema zu und prüft die benötigten Zusatzanwendungen.
3. **Gemeinsame Probe:** Anmeldung am SVWS-Client, bei Bedarf Start von SchILD-NRW 3, eine Änderung im eigenen Schema und ein vollständiger Rücksetzversuch.
4. **Übergabe:** Serveradresse und Ports, Programmversionen, Schema-/Platzzuordnung, Zuständigkeit und Rücksetzweg schriftlich festhalten. Zugangsdaten getrennt übergeben.

Für jede neue Schulungsreihe einen gepflegten Ausgangsstand sichern. Ein Snapshot ist ein Rücksprungpunkt und ersetzt keine unabhängige Sicherung. Updates zuerst an einer Kopie prüfen und den Ausgangsstand anschließend neu abnehmen.

Technischer Prüfstand und Grenzen sind im [Prüfbericht zu den Skripten](./Installationsskripte/#pruefbericht) dokumentiert.
