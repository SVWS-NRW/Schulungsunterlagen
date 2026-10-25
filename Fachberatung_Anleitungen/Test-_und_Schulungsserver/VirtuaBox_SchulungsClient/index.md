# Arbeitsplätze und lokale Server-VMs planen

## Was ist hier ein Schulungsclient?

Der **Arbeitsplatz** ist der Rechner, an dem die teilnehmende Person arbeitet. Eine **lokale Server-VM** ist dagegen ein zusätzlicher virtueller Rechner für SVWS-Server und MariaDB. Ein Debian-Gast ist kein Windows-Schulungsclient und enthält nicht automatisch SchILD-NRW 3.

## Vorhandene Windows-PCs im Raum

Nutze nach Möglichkeit die bereits betreuten PCs und einen zentralen Schulungsserver. Für SVWS-Client-Übungen genügt ein geeigneter Browser. Für SchILD-NRW 3 muss die Windows-Anwendung mit der richtigen `.con`-Datei bereitstehen; der Arbeitsplatz benötigt derzeit HTTPS- und MariaDB-Zugriff.

Die Moderation erhält eine eindeutige Zuordnung: **Arbeitsplatz → Server → Schema → Übungszugang**. Zwei Personen sollen nicht unbeabsichtigt im selben Schema arbeiten.

## Mitgebrachte Laptops

| Situation | Vorgehen |
| --- | --- |
| Zentrales Netz und Server zuverlässig erreichbar | Laptop als Arbeitsplatz nutzen; lokale Serverinstallation vermeiden |
| Windows-Laptop ohne gemeinsames Netz | Vorbereitete lokale Debian-Server-VM; SchILD-NRW 3 auf Windows |
| Mac oder Linux, reine Browseraufgaben | Browser am zentralen Server |
| Mac oder Linux, Schulungsziel erfordert SchILD-NRW 3 | Vorab geeigneten Windows-Arbeitsplatz oder betreuten Fernzugang bereitstellen |
| Zu wenig Speicher, keine Virtualisierung oder keine Adminrechte | Raum-PC oder zentral bereitgestellten Arbeitsplatz verwenden |

Prüfe insbesondere CPU-Architektur und Virtualisierungsunterstützung. Ein für x86-64 vorbereiteter Gast lässt sich nicht pauschal auf beliebigen ARM-Geräten einsetzen. Windows- und Fernzugangslizenzen sind mit dem Stützpunkt zu klären; Virtualisierung macht sie nicht überflüssig.

## Eine lokale Server-VM vorbereiten

1. Host prüfen: unterstütztes Betriebssystem, Adminrechte für den Hypervisor, genügend RAM und freier SSD-Speicher.
2. [VirtualBox und Debian installieren](./Virtualbox_Installation/index.md).
3. Eindeutig den **Netzmodus** wählen: NAT für Downloads, Host-only für Verbindung vom eigenen Laptop zur VM, Netzwerkbrücke nur nach Freigabe im Raum.
4. In Debian entweder den [Docker-Aufbau](../Docker_Schulungsserver/index.md) oder den offiziellen [Linux-Installer](https://doku.svws-nrw.de/deployment/Linux-Installer/) verwenden. Nicht beides ungeplant im selben Gast installieren.
5. Datenbank importieren und bei Bedarf SchILD-NRW 3 auf dem Windows-Host anbinden.
6. Gesamtablauf testen, die VM geordnet herunterfahren und einen Ausgangsstand sichern.

Ein sinnvoller erster Prüfwert für eine kleine Server-VM sind 2 virtuelle CPUs, 8 GB RAM und 40 GB virtuelle Platte. Das ist eine Planungsgröße, keine garantierte Mindestanforderung. Auf dem Host müssen zusätzlich sein eigenes Betriebssystem und die Arbeitsplatzprogramme flüssig laufen; die Raumgröße ist durch eine Probe zu ermitteln.

## Netzwerk und Datenbanken prüfen

„localhost“ bezeichnet immer **den Rechner, auf dem der jeweilige Aufruf läuft**. Vom Windows-Host aus ist `https://localhost:8443` nicht automatisch der Debian-Gast. Verwende die Host-only-Adresse der VM oder eine ausdrücklich eingerichtete NAT-Portweiterleitung. Bei reinem NAT ist der Gast nicht automatisch von anderen Raum-PCs erreichbar.

Die frühere ungeprüfte Inline-Anweisung zum Löschen und Neuimportieren einer Datenbank ist durch den [beschriebenen Rücksetzablauf](../Moderatoren_Schulungsserver/Wartung.md) ersetzt. Prüfe Zielserver und Schema, bevor Du einen vorhandenen Stand überschreibst.

## Abnahme vor der Schulung

- VM startet und stoppt geordnet; Host behält genügend freie Ressourcen.
- Gewählte Verbindung funktioniert ohne Umstellung während der Schulung.
- Browser und gegebenenfalls SchILD-NRW 3 öffnen das **richtige** Schema.
- Aufgaben funktionieren und der Ausgangsstand lässt sich wiederherstellen.
- Stand, Versionen und Zuständigkeit sind dokumentiert.

Grundlagen: [Oracle – Netzwerkmodi](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/networkingdetails.html) und [SVWS – Verbindung von SchILD-NRW 3](https://doku.svws-nrw.de/deployment/Schild-NRW3/).
