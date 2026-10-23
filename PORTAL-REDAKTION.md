# Redaktion & Bestandszuordnung

## Prinzip dieser Strukturänderung

Alle bisherigen Artikel- und Dateipfade bleiben erhalten. Neue Bereichsseiten erschließen die Bestände nach Aufgaben. Fachliche Artikeltexte werden abgesehen von einzelnen Überschriften und gezielten Linkkorrekturen beibehalten; Übersichtsseiten erhalten zusätzliche Orientierung. Die Startseite wird als Portal neu aufgebaut. Vorhandene Markdown-Beispiele, README und die kurze GOSt-Arbeitsnotiz werden nicht als Teamwissen veröffentlicht.

## Vor der Veröffentlichung klären

- Hosting und Zieladresse festlegen. Die öffentliche Erreichbarkeit ist bestätigt; ein Zugangsschutz für das Portal ist nicht vorgesehen.
- Die geplante neue SchILD-NRW-3-Adresse nach Freischaltung verlinken.
- Neue Fortbildungstermine und Details zur SVWS-Convention bestätigen. Vorhandene Termine von Februar bis Juli 2026 sind als Archiv gekennzeichnet.
- Rollen sind durch die Landesfachberatung bestätigt und in der Rollenübersicht aktualisiert: Anne, David und Jens betreuen Fachberatung aus ganz NRW sowie IT-Dienstleister; Frank und weitere MSB-Mitarbeitende unterstützen.
- Persönliche Telefonnummern, Cloud-Freigabelink und Original-PDF bleiben außerhalb des öffentlichen Repositorys. Der Zugang wird über Koordination und Funktionsadresse erklärt.
- Versionsabhängige Tipps auf Gültigkeit prüfen; ein neues Bearbeitungsdatum ist kein fachliches Prüfdatum.
- Konkrete, versionsbezogene Schrittfolge für das Zurücksetzen des Admin-Benutzerkennworts in einer lokalen Datenbankkopie ergänzen; benötigte Tabellen/Felder sind noch nicht bestätigt.
- Freigegebene Access-Korrekturen nach Fehlerbild ergänzen. Die Übersicht enthält dafür bewusst keine erfundenen Feldnamen oder SQL-Befehle.
- Die Schulungsunterlagen bleiben vorerst außerhalb der fachlichen Überarbeitung; diese liegt bei den Moderatorinnen und Moderatoren.
- Datenbanken nach dem neuen Steckbrief dokumentieren und pro Modul auf den getesteten Stand verweisen. Verfügbare Dateien sind verlinkt; Kompatibilität wurde durch diese Strukturänderung nicht neu bestätigt.
- Die bestehende Lizenzangabe nennt eine Creative-Commons-Lizenz ohne konkrete Variante. Diese vor Weitergabe neuer Vorlagen eindeutig festlegen.

## Bestätigte Ausrichtung der Wissensdatenbank

- Das Portal bündelt vorhandene Materialien; Diskussionen finden im Forum, über Koordinationen und auf der jährlichen Convention in Düsseldorf statt.
- Erste Priorität haben Installation von SVWS-Server und SchILD-NRW 3, Hardwarefragen, Updates und Migrationsprobleme.
- Persönlicher Einstieg ist die lokale Umgebung aus SVWS-Server, MariaDB, SchILD-NRW 3 und DBeaver. SQLite-Backups werden für den beschriebenen Analyseweg in ein lokales Schema importiert.
- Rollen, Informationswege und diese Prioritäten beruhen auf den aktuellen Angaben der Landesfachberatung. Technische Verbindungswege und die Einordnung zur Statistik 2027 wurden zusätzlich mit der offiziellen SVWS-Dokumentation abgeglichen (23.10.2026).
- Die neuen Übersichten bündeln vorhandene Unterlagen; sie bestätigen keine vollständige fachliche Neuabnahme der älteren Artikel oder der dortigen SQL-Beispiele.

## Technische Nachweise

Der bisherige Bildverweis „Datum setzen“ in den Klausurplanungsaufgaben war als normaler Link geschrieben. Er wird als Bild eingebunden, damit VitePress die vorhandene Grafik auch in die veröffentlichte Seite übernimmt. Datenbank- und Archivdownloads verweisen auf die vorhandenen Dateien im dev-Branch des Forks; die Dateien selbst bleiben unverändert.

## Prüfung der Strukturänderung

- Ausgangsstand: 178 Markdown-Dateien; 173 bestehende Inhaltsseiten werden in der Navigation erschlossen. README, zwei technische Markdown-Beispiele und eine kurze Arbeitsnotiz bleiben als Quellen im Repository erhalten.
- Keine bisherigen Dateien entfernt; 455 weitere Bestandsdateien (darunter Bilder und Datenbanken) unverändert.
- Artikeltexte abgesehen von Überschriften erhalten; der Bildverweis in den Klausurplanungsaufgaben ist die dokumentierte Formatkorrektur. Der überholte Basismodul-Platzhalter wird durch den Link auf den vorhandenen Katalog ersetzt und die zusätzliche Hauptüberschrift im Fortbildungsarchiv wird zur Unterüberschrift.
- VitePress-Build und Prüfung der erzeugten internen Links, Anker und Navigationsziele erfolgreich.
- Browserprüfung der neun Einstiegsseiten bei 390 und 1440 Pixeln in heller und dunkler Darstellung; lokale Suche geprüft.
- Neuer PR-Prüflauf baut die Seite mit Node 24, ohne sie zu veröffentlichen.
- Bereits im Ausgangsstand: große JavaScript-Pakete durch die Diagramm-Unterstützung. Die Installation meldet außerdem 10 Abhängigkeitsbefunde (3 moderate, 7 hohe); Paket-Upgrades sind nicht Teil der Strukturänderung.

## Navigation pflegen

`.vitepress/sidebar.json` enthält unter `sections` die gemeinsamen Menüs und unter `routes` die Zuordnung sämtlicher Pfadbereiche. Die Hauptgruppen von Testdaten, Beratung, Fortbildung und Wissen bleiben aufgeklappt. `sidebar.ts` exportiert diese zentrale Quelle für `.vitepress/config.ts`. Vorhandene Artikel sind zusätzlich über die Bereichsseiten erreichbar. Neue Artikel im passenden Navigationszweig ergänzen und verlinken. Artikel mit sehr kurzem Inhalt bleiben ausdrücklich als Bestand oder Entwurf erkennbar.

## Zuordnung aller bisherigen Markdown-Dateien

| Bisherige Datei | Bereich |
| --- | --- |
| `Datenbanken/Berufskolleg/index.md` | Testdaten & Umgebungen |
| `Datenbanken/GOSt-DB/GOSt_DB_Eigenschaften.md` | Testdaten & Umgebungen |
| `Datenbanken/GOSt-DB/index.md` | Testdaten & Umgebungen |
| `Datenbanken/GOSt-DB_2026/GOSt_DB_Eigenschaften.md` | Testdaten & Umgebungen |
| `Datenbanken/GOSt-DB_2026/index.md` | Testdaten & Umgebungen |
| `Datenbanken/Gesamtschule/index.md` | Testdaten & Umgebungen |
| `Datenbanken/Grundschule/index.md` | Testdaten & Umgebungen |
| `Datenbanken/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/API-examples/index.md` | Beratung & Umstieg |
| `Fachberatung_Anleitungen/DBMigration/index.md` | Beratung & Umstieg |
| `Fachberatung_Anleitungen/DBReparatur/index.md` | Beratung & Umstieg |
| `Fachberatung_Anleitungen/Reporting/BeispielreportSchuelerliste/index.md` | Beratung & Umstieg |
| `Fachberatung_Anleitungen/Reporting/Uebersicht/index.md` | Beratung & Umstieg |
| `Fachberatung_Anleitungen/Reporting/index.md` | Beratung & Umstieg |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/Docker_Schulungsserver/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/Moderatoren_Schulungsserver/Wartung.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/Proxmox_Installation/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/SVWS-Tools/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/VirtuaBox_SchulungsClient/Virtualbox_Installation/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/VirtuaBox_SchulungsClient/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/Windows_Testserver/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/Test-_und_Schulungsserver/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Anleitungen/index.md` | Beratung & Umstieg |
| `Fachberatung_Fortbildungen/Aktuell/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Austausch_Schulungen/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/DBeaver/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/EFBlockung/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Externe_Module/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Fragerunde/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/GymnasialeOberstufeBasics/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Installation/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/AdminTool/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/DBeaver/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Handout/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_SVWS/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_SchILD3/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_Zertifikat/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Log_Files/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/SVWS_Client_Sichten/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/index.md` | Testdaten & Umgebungen |
| `Fachberatung_Fortbildungen/MigrationSicherung/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Oberstufe/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Proxmox/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/QBlockung/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/ReparaturMDB/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Reports/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Schulungskonzept/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Stundenplan_Klausurblockung/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/UmstiegSchild3/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Virtualbox/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Wenom/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/Wissenswert/index.md` | Fortbildung & Austausch |
| `Fachberatung_Fortbildungen/index.md` | Fortbildung & Austausch |
| `README.md` | Redaktion / technisches Ausgangsmaterial |
| `Tipp_der_Woche/SVWS-Hack_der_Woche/bugInOberstufenapp.md` | Wissen & Links |
| `Tipp_der_Woche/SVWS-Hack_der_Woche/bugfix122.md` | Wissen & Links |
| `Tipp_der_Woche/SVWS-Hack_der_Woche/dbeaver-dump.md` | Wissen & Links |
| `Tipp_der_Woche/SVWS-Hack_der_Woche/fehlerhafteKursarteDFGundDFK.md` | Wissen & Links |
| `Tipp_der_Woche/SVWS-Hack_der_Woche/kataloge.md` | Wissen & Links |
| `Tipp_der_Woche/SVWS-Hack_der_Woche/konferenzmodul.md` | Wissen & Links |
| `Tipp_der_Woche/SVWS-Hack_der_Woche/tools.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/StartwarnungSchuljahresabschnitt.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/datenbankmigration.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/ehemalige.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/lehrerspalten.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/leistungsuebersicht.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/statistikfehlerStapelueberlauf.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/strassenkatalog.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/telliExport.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/zeugnisRechtsbelehrung.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/zeugnisreports.md` | Wissen & Links |
| `Tipp_der_Woche/SchILD-Tipp_der_Woche/zp10Export.md` | Wissen & Links |
| `Tipp_der_Woche/index.md` | Wissen & Links |
| `api-examples.md` | Redaktion / technisches Ausgangsmaterial |
| `index.md` | Startseite |
| `markdown-examples.md` | Redaktion / technisches Ausgangsmaterial |
| `schulungsmodule/BK/index.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/1. Allgemeines_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/10. Versetzung_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/11. Aufgaben aus dem Schulalltag_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/2. Erste Orientierung in SchILD-NRW_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/3. Verwaltung_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/4. Lehrkräfte_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/5. Schüler_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/6. Auswahl_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/7. Gruppenprozesse_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/8. Kataloge_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/9. Reportverwaltung_GS.md` | Schulungen durchführen |
| `schulungsmodule/GS/Basisschulung-GS/index.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/1. Allgemeines.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/10. Zeugnisvorbereitungen, Noten, Fehlstunden.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/11. Zeugnisdruck.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/12. Zeugnis-Broschürendruck mit dem Foxit Reader.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/2. Übersicht.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/3. Schulbezogene Kataloge pflegen.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/4. Unterricht.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/5. Spezielle Vorbereitungen für Ankreuzzeugnisse.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/6. Spezielle Vorbereitungen für Textzeugnisse.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/7. Lernstandsberichte.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/8. Zeugnisdateien herunterladen.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/9. Konfiguration des Erscheinungsbildes der Zeugnisse.md` | Schulungen durchführen |
| `schulungsmodule/GS/Leistungsdaten-GS/index.md` | Schulungen durchführen |
| `schulungsmodule/GS/index.md` | Schulungen durchführen |
| `schulungsmodule/ImportSchILD2Laufbahndaten/index.md` | Schulungen durchführen |
| `schulungsmodule/Reporterstellung/index.md` | Schulungen durchführen |
| `schulungsmodule/VonSchild2_ZuSchild3/1Uebersicht/Arbeitsverzeichnis/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/1Uebersicht/SVWS_Client/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/1Uebersicht/SchILD3_Oberflaeche/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/2Schueler/schild3/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/2Schueler/svwsClient/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/3Leistungsdaten/schild3/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/3Leistungsdaten/svwsClient/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/4Stundenplan/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/5Oberstufenplanung/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/GrenzenClient/index.md` | Beratung & Umstieg |
| `schulungsmodule/VonSchild2_ZuSchild3/index.md` | Beratung & Umstieg |
| `schulungsmodule/basisschulungen/1. Allgemeines.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/2. Erste Orientierung in SchILD-NRW.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/3. Verwaltung.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/4. Lehrkräfte.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/5. Schüler.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/6. Auswahl.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/7. Gruppenprozesse.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/8. Kataloge.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/9. Reportverwaltung.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/Aufgaben aus dem Schulalltag.md` | Schulungen durchführen |
| `schulungsmodule/basisschulungen/index.md` | Schulungen durchführen |
| `schulungsmodule/gost/Beweglicher Block Leitung/index.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/1. allgemeine Vorlagen.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/2. Vorgaben pro Abschnitt.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/3. Schienen.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/4. Kalender.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/5. Räume und Startzeiten.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/6. Planübersichten und Ausgaben.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/7. Nachschreibtermine.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/8. Praxisaufgaben.md` | Schulungen durchführen |
| `schulungsmodule/gost/Klausurplanung/index.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/1_Orientierung_und_Wiederholung.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/2_App_Oberstufe.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/3_Wahlen_und_Beratung.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/4_Blocken.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/5_Blockung_Anwenden.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/6_Um-Abwahlen.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/7_Leistungsdaten_und_Zeugnisse.md` | Schulungen durchführen |
| `schulungsmodule/gost/Laufbahnplanung_kommende_EF/index.md` | Schulungen durchführen |
| `schulungsmodule/gost/QPhase_und_Abitur/1_Orientierung_und_Wiederholung.md` | Schulungen durchführen |
| `schulungsmodule/gost/QPhase_und_Abitur/2_NeueQphase_und_Laufbahnkorrekturen.md` | Schulungen durchführen |
| `schulungsmodule/gost/QPhase_und_Abitur/3_KorrigierteEF_und_Q1Blocken.md` | Schulungen durchführen |
| `schulungsmodule/gost/QPhase_und_Abitur/4_Umwahlen_und_Wahl_von_A3A4.md` | Schulungen durchführen |
| `schulungsmodule/gost/QPhase_und_Abitur/index.md` | Schulungen durchführen |
| `schulungsmodule/gost/index.md` | Schulungen durchführen |
| `schulungsmodule/gost/notes.md` | Redaktion / Arbeitsnotiz |
| `schulungsmodule/index.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/10_Halbjahreswechsel.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/11_Mahnungen.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/12_Zentrale_Pruefungen_10.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/13_Vorbereitungen_in_SchILD.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/14_Konferenzvorbereitung.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/15_Zeugnisdruck.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/16_Versetzung.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/1_Unterrichtsfaecher.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/2_Stundentafeln.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/3_Kursverwaltung.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/4_Unterricht_manuell_bearbeiten.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/5_Unterricht_importieren.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/6_Gruppenprozesse_Faecher.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/7_Noten_Zeugnisvorbereitungen.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/8_Drucken.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/9_Zeugnisformulare.md` | Schulungen durchführen |
| `schulungsmodule/sek_i/index.md` | Schulungen durchführen |
| `schulungsmodule/uebergangsschulung/1_Orientierung.md` | Schulungen durchführen |
| `schulungsmodule/uebergangsschulung/2_Filtern_Gruppenprozesse.md` | Schulungen durchführen |
| `schulungsmodule/uebergangsschulung/3_Kataloge.md` | Schulungen durchführen |
| `schulungsmodule/uebergangsschulung/4_Reports.md` | Schulungen durchführen |
| `schulungsmodule/uebergangsschulung/5_Noteneingabe.md` | Schulungen durchführen |
| `schulungsmodule/uebergangsschulung/index.md` | Schulungen durchführen |

## Rahmenaufbau und Tabellen

Die Rubriken Testdaten, Beratung, Fortbildung und Wissen erhalten Übersichtsseiten mit Themenkarten. Ein gemeinsames Menü pro Rubrik verhindert den bisherigen Strukturwechsel zwischen Unterbereichen. Neu im Team und Schulungen behalten ihre bisherigen Menüs. Die neuen Themenübersichten für SchILD- und SVWS-Tipps erschließen dieselben bestehenden Artikel.

Im Fortbildungsarchiv und in der Tippsammlung wurden ausschließlich Leerzeilen zwischen Tabellenzeilen entfernt. Zelltexte, Reihenfolge und Links bleiben erhalten. Die Darstellung wird im erzeugten HTML und im Browser geprüft. Fachliche Schulungsinhalte wurden nicht überarbeitet.

Prüfung dieser Verfeinerung: 24 direkte Aufrufe und Klickwege mit unverändertem Seitenmenü innerhalb der Rubrik; 24 Layoutansichten bei 390/1440 Pixeln in heller/dunkler Darstellung; die mobile Navigation erreicht alle drei Testdaten-Gruppen. Das Fortbildungsarchiv enthält wieder eine HTML-Tabelle mit Kopfzeile und 15 Angeboten; die Tippsammlung zwei Tabellen mit insgesamt 18 Beiträgen. Keine Tabellenzeilen werden mehr als Pipe-Text ausgegeben. Neu im Team und Schulungen wurden gegen den bisherigen Navigationsbestand verglichen und sind unverändert.
