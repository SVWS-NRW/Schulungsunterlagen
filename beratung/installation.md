# Installation, Hardware & Updates

Diese Seite bündelt den Einstieg bei Installations- und Updatefragen. Nutze die vorhandenen Anleitungen und halte zunächst fest, welche Komponente betroffen ist.

## 1. Die Ausgangslage klären

- Geht es um einen persönlichen Testplatz, einen Arbeitsplatz in der Schule oder einen zentralen Server?
- Wer betreibt die Umgebung: Schule, Schulträger oder IT-Dienstleister?
- Welche Versionen von SVWS-Server und SchILD-NRW 3 sind installiert beziehungsweise vorgesehen?
- An welchem Schritt scheitert es: Installation, Serverstart, Browserzugriff, Datenbankzugriff oder SchILD-Anmeldung?

Die Fachberatung begleitet die Schule. Technische Fragen von IT-Dienstleistern werden durch die Landesfachberatung betreut; die [Rollenübersicht](/neu-im-team/rollen) beschreibt den Weg.

## 2. Die Hardware zur Umgebung passend prüfen

Die Anforderungen hängen von Betriebssystem, Betriebsart und Nutzung ab. Für einen persönlichen Testplatz beginne mit den [Systemvoraussetzungen der Windows-Installation](https://doku.svws-nrw.de/deployment/Windows-Installer/). Für den Schulbetrieb helfen die [IT-Umgebungen und Beispiele zur Serverdimensionierung](https://doku.svws-nrw.de/deployment/IT-Umgebungen/).

Kläre bei einer Hardwarefrage Betriebssystem, Arbeitsspeicher, verfügbaren Speicher für Datenbanken und Sicherungen sowie die Zahl gleichzeitig arbeitender Personen. Übertrage die Ausstattung einer Schulungsumgebung nicht ungeprüft auf den Mehrbenutzerbetrieb einer Schule.

## 3. Installation Schritt für Schritt zuordnen

| Schritt | Vorhandene Anleitung |
| --- | --- |
| SVWS-Server installieren | [Lokale Installationsunterlagen](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_SVWS/), [aktuelle Windows-Installation](https://doku.svws-nrw.de/deployment/Windows-Installer/) |
| Zertifikat einrichten | [Zertifikatsinstallation](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_Zertifikat/) |
| Datenbankschema anlegen oder Sicherung importieren | [SVWS-AdminClient](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/AdminTool/) |
| SchILD-NRW 3 installieren und `.con`-Datei erstellen | [Installation und SchILD_DBConfig](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_SchILD3/) |
| Datenbank in DBeaver ansehen | [MariaDB-Verbindung mit DBeaver](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/DBeaver/) |
| Einen Fehler genauer eingrenzen | [Logdateien](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Log_Files/) und [Systemüberblick](./systemueberblick.md) |

## 4. Bei Updates auf zusammenpassende Versionen achten

SVWS-Server und SchILD-NRW 3 müssen zusammenpassen. Prüfe die Angaben der jeweiligen Veröffentlichung. Wenn der Browserzugriff funktioniert, SchILD-NRW 3 aber nicht, gehören die ausgewählte Verbindungsdatei und der direkte MariaDB-Zugriff zu den nächsten Prüfpunkten. Die [offizielle Installationsbeschreibung](https://doku.svws-nrw.de/deployment/Schild-NRW3/) erläutert diese beiden Zugriffswege.

Notiere den vorherigen und den neuen Stand sowie die genaue Fehlermeldung. Tritt das Problem nur in einem Schema auf, ergänze die [Datenbank- und Migrationsprüfung](./migration.md).

## 5. Einen offenen Fall weitergeben

Wenn die bisherigen Prüfungen nicht weiterführen, bereite die [Anfrage an die Landesfachberatung](./anfrage-vorbereiten.md) vor. Beschreibe dabei insbesondere den letzten funktionierenden Schritt und die betroffenen Komponenten.
