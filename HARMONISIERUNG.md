# Abgleich der 16 Harmonisierungsvorschläge

Geprüfte Referenzen am 24.10.2026:

- FBM dev: `022646efd04bf6a2e6c13a819b8974740588cf59` (PRs der bisherigen Schritte bereits enthalten).
- SchILD3_Doku dev: `e92e123c257d87d2f74a84fb021a642e3bcbf0a8`, ausschließlich gelesen.
- Ausgangsliste: Chat „Dokus vergleichen“, einschließlich der dort genannten 16 Vorschläge.

| Nr. | Vorschlag | Befund und Abschluss in FBM |
| --- | --- | --- |
| 1 | Aktiver Themenzweig | Eigene Artikelkonfigurationen öffnen ausschließlich das zugehörige Thema; Themenwechsel setzt andere Zweige zurück. Browserprüfung umfasst Direktaufruf, Wechsel und Verlauf. |
| 2 | Bereich → Thema → Artikel | Sechs Bereiche; höchstens zwei Sidebar-Ebenen. Oberstufen- und Grundschulmodule erhalten eigene Themen. Lange Titel, Nummerierungsreste, Unterstriche und Markdown-Links in Menünamen bereinigt, höchstens 48 Zeichen. Artikelpfade erhalten. |
| 3 | Navigation beim Seitenwechsel | Exakte Zuordnung aller 192 Artikelseiten; längste Route bestimmt den verantwortlichen Bereich. Der Umstiegsvergleich unter dem alten Schulungspfad gehört zur Beratung, Offline-Installation zu Testdaten. |
| 4 | Vorheriges/Nächstes Thema | Deutsche Beschriftung wie SchILD; explizite Reihenfolge pro Thema aus derselben Datenquelle. Übersicht zuerst, anschließend Artikel. Keine Fortsetzung in fachfremde Themen, keine doppelten Sprungmarken oder Bereichsverweise. |
| 5 | Hinweisboxen | Acht Varianten einschließlich echtem `::: example`; deutsche Standardtitel, zentrale SVGs, semantische Farben in hell/dunkel und drehender Details-Pfeil. Markdown-Rendering automatisiert geprüft. |
| 6 | Layout und CSS | Bestehende gemeinsame Artikelabstände, Inhaltsbreiten, Tabellen und Medienregeln geprüft; Beispiel- und Achtung-Farben sowie Startkarten ergänzt. Keine unnötige Übernahme der SchILD-Wiki-Speziallayouts. |
| 7 | Artikelaufbau | Gemeinsamer Artikelstandard für Überschriften, Anleitungen, Tabellen, Bilder, Links und Code; Navigation und Beispiele vervollständigt. Bestehende Aufgabenstruktur bleibt bestehen. |
| 8 | Sprache | Du bleibt verbindlich. Verbliebene Sie-Anreden im veröffentlichten Bestand angepasst. Unveränderte UI-/Code-/Briefbeispiele und sachliche Pronomen wie „Sie benötigt …“ sind keine Leseransprache. |
| 9 | Suche | Deutsche Dialogtexte und Tastaturbezeichnungen direkt in den lokalen Suchoptionen wie SchILD; Suche nach Klausurplanung wird im Browser geprüft. |
| 10 | Startseite | Alle Portalangebote, Teamhinweise und Verlinkungen erhalten; sechs Karten in drei Spalten ab Tabletbreite, mobile einspaltige Darstellung. |
| 11 | Markdown | Gleicher Containermechanismus, Beispielbox und Rendering-Korrektur gegen verschachtelte HTML-Links. Literale Zeichen bleiben erhalten. FBM-Checklisten und Mermaid bleiben zusätzlich verfügbar. |
| 12 | Menükonfiguration | Redaktionelle JSON-Daten plus gemeinsames JS-Modul für Sidebar und Seitenfuß. FBM-Bereiche und historische Pfade beibehalten. Veraltete automatische Erzeugung ist nicht Teil des Builds. |
| 13 | Dateien und Bilder | Bestehende Bild-/Downloadziele bleiben unverändert. Responsive Bilder, Bildunterschriften, Videos und scrollbar begrenzte Tabellen; erzeugte lokale Medienziele werden geprüft. |
| 14 | Entwicklerwerkzeuge | Gleiche Kernbefehle docs:dev/build/preview; ergänzte Struktur-, Navigations-, Markdown-, Bestands-, HTML- und Browserprüfungen. ESLint-Konfiguration und Inits-Pakete unverändert. |
| 15 | Paketverwaltung | Beide Lockfiles lösen VitePress auf 1.6.4 auf. markdown-it-container ^4.0.0 und dessen Lockfile-Eintrag wie SchILD ergänzt. FBM-Spezialpakete erhalten, npm ci prüft Reproduzierbarkeit. |
| 16 | Build und GitHub Actions | Node 24 in FBM beibehalten und dokumentiert. PR-CI führt sämtliche Qualitätsprüfungen aus, einschließlich zweitem Build für BASE=/. Bestehendes Pages-Deployment und Zielbranch bleiben bestehen. |

## Umfang und bewusst verbleibende Unterschiede

FBM bleibt ein Teamportal mit Du-Ansprache, Schulungsaufgaben, Testdatenbanken, Checklisten und Mermaid. SchILDs separate Programmreferenz, Wiki-Migrationswerkzeuge und Spezialtabellen werden nicht in FBM eingeführt. Der SchILD-dev-Stand enthält keine eigene Node-Vorgabe im package.json; deshalb wird keine angebliche vollständige Node-Angleichung behauptet.

ESLint/Inits, PDF-Komponente und Druck-CSS bleiben unangetastet. Die Bestandsprüfung kontrolliert diese ausgeschlossenen Dateien zusätzlich bytegenau. Deployment wird durch diesen PR nicht ausgelöst.

## Nachweis und Grenzen

Alle 199 vorhandenen Markdown-Dateien wurden gelesen. Sechs Autoren-/Beispiel-/Notizdateien sind unverändert von der Veröffentlichung ausgeschlossen; Startseite plus 192 Artikel bleiben erreichbar. Automatischer Bestandsvergleich gegen den oben genannten FBM-Stand kontrolliert Artikelpfade, Codeblöcke, Inline-Code, Link-/Medienziele, Zahlen/Versionsangaben, Aufgabenmarker und Überschriftenebenen. Die fachliche Aktualität älterer Schulungsaufgaben ist kein Ergebnis dieser gestalterischen Harmonisierung; vorhandene fachliche TODOs bleiben sichtbar.

Die lokale Befehlsausführung der Desktop-Sitzung lieferte keine Ausgabe. Reine Datenprüfungen (192 Artikelzuordnungen, wechselseitige Themenfolgen und Bestandsmerkmale) wurden vor dem Commit ausgeführt. Build, Rendering und Browserprüfungen laufen deshalb in GitHub Actions. Maßgeblich ist der grüne Prüflauf am letzten PR-Commit; Screenshots werden als Artefakt aufbewahrt.
