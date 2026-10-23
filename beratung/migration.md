# Migrationsprobleme eingrenzen

Bei einer gescheiterten Migration oder auffälligen Daten nach dem Umstieg ist die Unterscheidung wichtig: Liegt das Problem bereits im SchILD-NRW-2-Ausgangsbestand oder zeigt es sich im migrierten Datenbankschema?

## 1. Fehler und Ausgangsdaten festhalten

Notiere Programmversionen, betroffene Schulform, Migrationsschritt und Fehlermeldung. Sieh die [Migrationsprotokolle](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Log_Files/) an und halte den ursprünglichen Datenstand für Vergleiche unverändert vor. Korrekturen werden zunächst an einer Kopie untersucht.

## 2. Eine neue SchILD-NRW-2-Access-Datenbank als Zwischenstufe

Ein in der Landesfachberatung häufig hilfreicher Weg ist, die vorhandene SchILD-NRW-2-Datenbank mit dem Migrationstool in eine neue SchILD-NRW-2-Access-Datenbank zu überführen. Erst danach folgt ein erneuter Migrationsversuch in den SVWS-Server. Das ist ein eigener Vorbereitungsschritt und nicht bereits die Migration in das neue SVWS-Schema.

Die vorhandenen [Fortbildungsunterlagen zur Reparatur von SchILD-NRW-2-Datenbanken](/Fachberatung_Fortbildungen/ReparaturMDB/) beschreiben den Einsatz des Migrationstools bei beschädigten oder veralteten Access-Datenbanken und verweisen auf den Download.

Vergleiche anschließend das Ergebnis mit dem vorherigen Versuch. Dieser Weg behebt nicht jedes fehlerhafte Datenfeld automatisch.

## 3. Fehleinträge im Ausgangsbestand untersuchen

Bleiben Fehler bestehen, können gezielte Korrekturen in der SchILD-NRW-2-Access-Datenbank nötig sein. Die Fehlermeldung und das Protokoll müssen bestimmen, welche Einträge geprüft werden. Nach der Korrektur erfolgt ein neuer Migrationsversuch mit dokumentiertem Ausgangsstand.

Eine allgemeine Sammlung freigegebener Access-Korrekturen für die verschiedenen Fehlerbilder ist hier noch nicht hinterlegt. Wenn sich die Ursache nicht eindeutig eingrenzen lässt, gib den Fall mit den bisherigen Befunden an die [Landesfachberatung](./anfrage-vorbereiten.md) weiter.

## 4. Abschnittstabellen nach der Migration prüfen

Nach der Migration können Lücken, Mehrfacheinträge oder falsche Bezüge zwischen Schuljahresabschnitten und abhängigen Tabellen auffallen. Annes vorhandene Beiträge bieten dafür konkrete Ausgangspunkte:

| Fehlerbild oder Aufgabe | Vorhandenes Material |
| --- | --- |
| Warnung zu Schuljahresabschnitten beim Start | [Tipp: Startwarnung und Abschnittseinträge](/Tipp_der_Woche/SchILD-Tipp_der_Woche/StartwarnungSchuljahresabschnitt) |
| Mehrfacheinträge und fehlerhafte Bezüge untersuchen | [Datenbanken prüfen und reparieren](/Fachberatung_Anleitungen/DBReparatur/) |
| Migration und Sicherungen einordnen | [Fortbildung: Migration & Datenbanksicherung](/Fachberatung_Fortbildungen/MigrationSicherung/) |
| Migration über den AdminClient starten | [Tipp: Datenbankmigration](/Tipp_der_Woche/SchILD-Tipp_der_Woche/datenbankmigration) |

Die SQL-Beispiele im Reparaturartikel enthalten konkrete IDs aus dem dort beschriebenen Fall. Prüfe Tabellen und Bezüge der jeweiligen Datenbank; übernimm diese IDs nicht als allgemeine Korrekturregel. Insbesondere bei fehlenden Abschnitten reicht das Löschen einzelner Einträge nicht automatisch aus.

## 5. Ergebnis prüfen oder Fall weitergeben

Prüfe nach einem Korrekturversuch, ob der ursprüngliche Fehler verschwunden ist, der erwartete Schuljahresabschnitt angezeigt wird und die betroffenen Arbeitsabläufe funktionieren. Dokumentiere die geprüften Änderungen. Die [lokale Analyseumgebung](/umgebungen/lokale-analyse) hilft Dir, den Fall nachvollziehbar vorzubereiten.

Ist eine Änderung an den Bezügen nicht eindeutig, beziehe die Landesfachberatung ein. Die [Checkliste für die Weitergabe](./anfrage-vorbereiten.md) verhindert, dass bereits geklärte Fragen erneut gestellt werden müssen.
