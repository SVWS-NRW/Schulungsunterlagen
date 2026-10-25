# Lokaler Windows-Testserver

## Ziel und Abgrenzung

Du installierst SVWS-Server und MariaDB **direkt auf einem Windows-Testrechner**. Ein Hypervisor oder Debian-Gast wird bei diesem Weg nicht eingerichtet. SchILD-NRW 3 ist eine zusätzliche Windows-Anwendung.

Dieser Weg eignet sich für einen einzelnen vorbereiteten Testarbeitsplatz. Für einen ganzen Raum ist er nur sinnvoll, wenn die Stützpunktleitung den zentralen Windows-Server bereits dauerhaft betreut. Viele voneinander unabhängige Laptop-Installationen erhöhen den Pflegeaufwand.

## Voraussetzungen

- Geeignetes Windows-System und Administrationsrechte nach Vorgabe des Installers.
- Freie Ressourcen, ausgewählter Versionsstand und Installationsdateien.
- Geprüfte Übungsdatenbank und ein Sicherungs-/Rücksetzweg.
- Bei Nutzung durch weitere PCs: abgestimmte Serveradresse, Zertifikate und Freigaben für HTTPS sowie bei SchILD-NRW 3 für MariaDB.

## Einrichtung

1. Folge dem aktuellen [Windows-Installer](https://doku.svws-nrw.de/deployment/Windows-Installer/) für **SVWS-Server und Datenhaltung**.
2. Öffne den AdminClient und importiere die vorgesehene [Übungsdatenbank](/Datenbanken/).
3. Prüfe die Anmeldung am SVWS-Client im Browser.
4. Wenn das Modul SchILD-NRW 3 benötigt: installiere es nach der [offiziellen Anleitung](https://doku.svws-nrw.de/deployment/Schild-NRW3/#installation-schild-nrw-3) und erstelle die passende `.con`-Datei.
5. Ergänze nur die benötigten [SVWS-Tools](../SVWS-Tools/index.md).

## Prüfung und Betrieb

Teste Datenzugriff, eine typische Aufgabe und das Rücksetzen am tatsächlichen Arbeitsplatz. Ein erfolgreicher Installerlauf allein genügt nicht. Halte SVWS-Version, MariaDB-Version, Pfade, Dienste und Zuständigkeit fest.

Vor Updates den freigegebenen Ausgangsstand sichern. Das Starten eines Windows-Dienstes stellt keine Übungsdaten wieder her; nutze den [Rücksetzablauf](../Moderatoren_Schulungsserver/Wartung.md).
