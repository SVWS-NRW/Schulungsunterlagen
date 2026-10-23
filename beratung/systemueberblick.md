# Wie arbeiten SVWS-Server und SchILD-NRW 3 zusammen?

Für die Beratung hilft es, die beteiligten Komponenten auseinanderzuhalten. Eine lokal installierte SchILD-NRW-3-Anwendung allein ist noch keine vollständige Testumgebung.

## Die Bausteine

| Baustein | Aufgabe |
| --- | --- |
| MariaDB | Speichert die Schuldaten in Datenbankschemata. |
| SVWS-Server | Stellt die Webschnittstelle für die Anwendungen bereit und greift auf die Datenbank zu. |
| SVWS-Client | Ist die browserbasierte Oberfläche für die Arbeit mit dem Server. |
| SVWS-AdminClient | Verwaltet unter anderem Datenbankschemata, Migrationen und Sicherungen. |
| SchILD-NRW 3 | Ist die Windowsanwendung. Sie benötigt einen laufenden SVWS-Server und greift derzeit zusätzlich direkt auf MariaDB zu. |
| `.con`-Datei | Enthält die für SchILD-NRW 3 benötigten Verbindungsangaben zu Server und Datenbank. Sie wird mit SchILD_DBConfig erstellt. |
| SQLite-Backup | Ist ein Sicherungs- und Austauschformat. Für den hier beschriebenen Analyseweg wird es in ein lokales Schema importiert. |
| DBeaver | Dient zum Einsehen und gezielten Bearbeiten der Datenbank; es ersetzt weder SchILD-NRW 3 noch den SVWS-Server. |

Die Verbindungswege und das Zusammenspiel von SchILD-NRW 3 und Server erläutert die [offizielle SchILD-NRW-3-Installationsseite](https://doku.svws-nrw.de/deployment/Schild-NRW3/). Die grundlegende Serverarchitektur ist unter [Installation SVWS-Server](https://doku.svws-nrw.de/deployment/) beschrieben.

## Wo setzt Du bei einem Problem an?

| Beobachtung | Zuerst prüfen |
| --- | --- |
| Die Browseroberfläche ist nicht erreichbar | Serverdienst, Adresse, Port und Zertifikat anhand der [Installationshilfen](./installation.md) |
| Der Client im Browser funktioniert, SchILD-NRW 3 aber nicht | Passende Programmversionen, ausgewählte `.con`-Datei und den zusätzlichen direkten Datenbankzugriff |
| Nur ein Datenstand zeigt einen Fehler | Betroffenes Schema, Schuljahresabschnitt und Datenbezüge anhand der [Migrations- und Datenbankhinweise](./migration.md) |
| Eine Sicherung soll untersucht werden | Import in eine [lokale Analyseumgebung](/umgebungen/lokale-analyse), passende Verbindung und nachvollziehbare Arbeitsschritte |

Die Tabelle nennt Prüfansätze, keine eindeutige Fehlerdiagnose. Halte fest, welche Komponenten funktionieren und wo der Ablauf erstmals scheitert.

## Auf dem eigenen Rechner nachvollziehen

Für den persönlichen Test- und Analyseplatz werden SVWS-Server mit MariaDB, SchILD-NRW 3 und DBeaver lokal eingerichtet. Mehrere Testdatenbanken können als getrennte Schemata eingebunden werden. [So ist der Analyseablauf aufgebaut](/umgebungen/lokale-analyse).
