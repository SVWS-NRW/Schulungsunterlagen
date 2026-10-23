# Lokale Test- & Analyseumgebung

Der empfohlene persönliche Einstieg für die Fachberatung ist eine lokale Umgebung: SVWS-Server mit MariaDB, SchILD-NRW 3 und DBeaver auf dem eigenen Rechner. Damit kannst Du verschiedene Schulformen erproben und hartnäckige Fehler anhand einer bereitgestellten Datenbankkopie untersuchen.

## Testdaten oder konkreter Beratungsfall?

Nutze zum Kennenlernen der Programme die [Testdatenbanken](/Datenbanken/). Sie können als getrennte Schemata eingebunden werden. Für einen konkreten Fall vereinbarst Du mit der Schule die Bereitstellung ihres SQLite-Backups, beispielsweise als verschlüsselte ZIP-Datei oder über einen anderen vereinbarten Austauschweg. Eine solche Problemdatenbank gehört nicht in den öffentlichen Materialbestand.

## Der Ablauf im Überblick

**SQLite-Backup erhalten → in ein lokales Schema importieren → mit DBeaver prüfen → passende `.con`-Datei erstellen → den Fehler in SchILD-NRW 3 nachstellen.**

Das SQLite-Backup ist dabei die übertragene Sicherung. DBeaver und SchILD-NRW 3 arbeiten im hier beschriebenen Ablauf anschließend mit der importierten MariaDB-Datenbank. Der [Systemüberblick](/beratung/systemueberblick) erklärt die einzelnen Bausteine.

## 1. Den persönlichen Arbeitsplatz einrichten

Installiere SVWS-Server mit MariaDB, SchILD-NRW 3 und DBeaver. Die [Installationsübersicht](/beratung/installation) verknüpft Voraussetzungen, vorhandene Schrittfolgen und Diagnosehilfen. Stimme die Programmversionen aufeinander ab.

## 2. Eine Sicherung in ein eigenes Schema importieren

Halte das erhaltene Backup unverändert vor und lege für die Untersuchung ein eigenes lokales Schema an. Importiere dort die SQLite-Sicherung. Die vorhandene [Anleitung zum SVWS-AdminClient](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/AdminTool/) beschreibt das Anlegen eines Schemas und das Einlesen einer Sicherung.

Prüfe nach dem Import, dass Schulnummer und Datenstand zum Beratungsfall gehören. Gib dem Schema eine Bezeichnung, die es von Deinen übrigen Testdatenbanken unterscheidet.

## 3. Mit DBeaver prüfen und den Analysezugang vorbereiten

Verbinde DBeaver mit der lokalen MariaDB und dem importierten Schema. Die [vorhandene DBeaver-Anleitung](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/DBeaver/) zeigt den Verbindungsaufbau und das Einsehen der Tabellen.

Wenn für die beauftragte Analyse ein Administratorzugang zur importierten Schuldatenbank benötigt wird, kann das Admin-Benutzerkennwort nach dem abgestimmten Verfahren in dieser lokalen Kopie zurückgesetzt werden. Gemeint ist das Benutzerkennwort der Schuldatenbank, nicht das Root-Kennwort der MariaDB-Instanz. Die konkrete versionsbezogene Schrittfolge und die zu ändernden Felder werden hier noch ergänzt; diese Übersicht enthält dafür keinen pauschalen SQL-Befehl.

Für Abschnittsprobleme beginne mit der [Einordnung der Migrationsfehler](/beratung/migration) und den dort verknüpften Beispielen.

## 4. Eine passende Verbindungsdatei erstellen

Erstelle mit **SchILD_DBConfig** eine `.con`-Datei für die lokale Umgebung und das importierte Schema. Die vorhandene [SchILD-NRW-3-Installationsanleitung](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_SchILD3/) beschreibt den Einstieg in dieses Werkzeug.

Öffne SchILD-NRW 3 mit dieser Verbindung und prüfe, ob der richtige Datenstand geladen wurde.

## 5. Fehler nachstellen und Ergebnis festhalten

Gehe die von der Schule beschriebenen Schritte durch. Notiere den betroffenen Abschnitt, die genaue Meldung und das erwartete Ergebnis. Halte Änderungen getrennt von den ursprünglichen Befunden fest. Lässt sich der Fall nicht lösen, hilft die [Checkliste für die Weitergabe](/beratung/anfrage-vorbereiten).

## Fernunterstützung ergänzend einsetzen

Viele Fachberaterinnen und Fachberater nutzen TeamViewer für die gemeinsame Sicht auf den Arbeitsplatz der Schule. Damit lassen sich Bedienungswege und Einstellungen direkt nachvollziehen. Benötigt ein Fall eine wiederholbare Datenbankuntersuchung, ergänzt die lokale Analyse diesen Weg.
