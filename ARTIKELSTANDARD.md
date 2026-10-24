# Redaktioneller Artikelstandard – SVWS-Fachberatung und Moderation

Dieser Standard orientiert sich an der SchILD-NRW-3-Dokumentation. **Die Leseransprache in der FBM-Dokumentation bleibt durchgehend beim Du.** Bestehende fachliche Aussagen, Links, Artikelpfade, Bilddateien, Downloads, Aufgaben und Konfigurationen dürfen durch eine reine Stilangleichung nicht verändert werden.

## Inhalt und Gliederung

- Jeder Artikel beantwortet möglichst eine klar abgegrenzte Frage oder erläutert eine zusammengehörige Aufgabe.
- Ein aussagekräftiger Titel erster Ebene (`#`) je Seite; weitere Überschriften ohne Hierarchiesprünge. Keine Rubriken ohne belegten Inhalt.
- Eine Arbeitsanleitung beginnt mit dem Ziel, nennt nötige Voraussetzungen und beschreibt die Schritte nummeriert. Ergänze bei Bedarf Kontrolle des Ergebnisses und typische Probleme.
- Nachschlageartikel erklären einen Begriff, ein Bedienelement, eine Schnittstelle oder einen technischen Zusammenhang präzise. Referenztabellen stehen möglichst nahe an der Erklärung.
- Schulungsmodule dürfen Lernziele, Arbeitsaufträge, Lösungen und Materialien in der für die Moderation geeigneten Reihenfolge enthalten. Sie müssen **nicht** in das Schema einer Endanwenderanleitung gepresst werden.
- Übersichtsseiten erschließen verwandte Beiträge durch kurze, aufgabenorientierte Links. Den Inhalt der verlinkten Artikel nicht mehrfach kopieren.
- Bestehende Fachinformationen einschließlich Ausnahmen, Versionseinschränkungen, Code, SQL, Screenshots, Tabellen und Downloadverweise erhalten. Technische Aktualität getrennt vom Bearbeitungsdatum beurteilen.

## Sprache

- Konsequent **Du, Dir, Dein** und entsprechende gebeugte Formen; im Fließtext klare, aktive Sätze. Eine unverändert zitierte Bedienoberfläche ist davon ausgenommen.
- Programm-, Feld- und Schaltflächennamen wie angezeigt schreiben und **fett** hervorheben, beispielsweise **Datenbank auswählen**.
- Menüpfade einheitlich: **Verwaltung → Einstellungen → Benutzer**.
- Dateinamen, Pfade, Befehle, Parameter und Programmcode in `Inline-Code`, längere Beispiele in sprachmarkierten Codeblöcken.
- Begriffe möglichst konsistent: „SchILD-NRW 3“, „SVWS-Server“, „SVWS-Client“, „MariaDB“, „Fachberatung“ und „Moderation“.
- Kurze Menüpunkte und aussagekräftige Artikeltitel statt historischer Orientierungszusätze in Klammern.
- Links nicht „hier“ nennen, sondern nach ihrem Ziel, etwa „[Migration prüfen](…)“.

## Hinweisboxen

Verwende native VitePress-Container, die in der FBM-Doku wie in SchILD gestaltet werden. Titel und Texte bleiben auf Deutsch.

```md
::: info Hinweis
Zusätzliche Einordnung.
:::

::: tip Tipp
Erleichterung für den Arbeitsablauf.
:::

::: warning Wichtig
Wichtige Voraussetzung oder erkennbare Fehlerfolge.
:::

::: danger Achtung
Warnung vor einer gravierenden Fehlbedienung.
:::

::: tip Richtig
So ist das gewünschte Ergebnis erkennbar.
:::

::: danger Falsch
Dieses Vorgehen vermeiden.
:::

::: example Beispiel
Ein konkretes Anwendungsbeispiel.
:::

::: details Details
Zusätzliche Informationen zum Aufklappen.
:::
```

Für Beispiele `::: example` verwenden; der Standardtitel ist „Beispiel“. Eigene Titel sind möglich. Boxen sparsam und an der relevanten Handlung einsetzen. Keine individuellen Bild-Icons oder Inline-Farben pro Artikel hinzufügen. Wesentliche Informationen gehören auch in den normalen Text.

## Bilder, Tabellen, Medien

- Bestehende Bilder und Bildunterschriften erhalten; neue Bilder mit beschreibenden Alternativtexten versehen.
- Bildunterschriften erklären, was auf dem Bild zu erkennen ist, und nicht nur den Dateinamen. Bilder nicht über ihre natürliche Breite hinaus vergrößern.
- Tabellen mit kurzen Spaltenüberschriften erstellen; längere Inhalte müssen innerhalb des Seitenlayouts bleiben, breite Tabellen dürfen horizontal scrollbar sein.
- Keine Informationen durch Bildzuschnitt, Bildschirmfotos ohne notwendigen Kontext oder gekürzte Tabellenwerte verlieren.
- Interne Links relativ bzw. mit VitePress-Pfaden setzen; gültige externe Quellen und Downloads erhalten.

## Prüfung und Freigabe

- Bei rein gestalterischen Änderungen prüfen, dass fachliche Inhalte und bisherige Pfade unverändert geblieben sind.
- Nach Änderungen an den Markdown-Containern und am Layout mindestens `npm ci` und `npm run docs:build` ausführen sowie Hinweisboxen, lange Tabellen und mobile Darstellung im Browser prüfen.
- Änderungen an Anleitungen mit Code, Datenbanken oder Versionshinweisen brauchen zusätzlich eine fachliche Sichtung.
- Freigaben erfolgen über einen Pull Request gegen `dev`. Die SchILD-NRW-3-Dokumentation wird nicht mitgeändert.

## Später gesondert bearbeiten

- ESLint und die Codequalitätsvorgaben der **Inits**: separat abstimmen, nicht im Zuge der Artikelformatierung verändern.
- PDF-Ausgabe und druckgerechte Gestaltung: später als gemeinsames Thema beider Dokumentationen betrachten; vorhandene FBM-Funktionen vorerst unverändert lassen.

## Navigation: Bereich → Thema → Artikel

- Die sechs Bereiche stehen in der Hauptnavigation. Die Sidebar fasst die gleichberechtigten Themen unter einer Bereichsüberschrift zusammen; direkt unter den Themen stehen die Artikel. Darunter folgen keine weiteren Artikel-Ebenen.
- Unterthemen mit eigener Aufgabenreihe werden zu eigenständigen Themen, beispielsweise „Oberstufe: Klausurplanung“. Keine zusätzlichen aufklappbaren Ebenen unter einem Artikel.
- Menütitel sind Klartext, höchstens 48 Zeichen lang. Keine Markdown-Links, Dateinamen mit Unterstrichen oder ausgeschriebenen URLs. Die Langtitel im Artikel bleiben möglich.
- Bestehende Artikelpfade bleiben erhalten. Die längste passende Route in `.vitepress/sidebar.json` legt den verantwortlichen Bereich fest, auch bei historischen Verzeichnisnamen.
- Nur das aktuelle Thema wird automatisch geöffnet. Andere Themen bleiben manuell aufklappbar; ein Themenwechsel setzt die Auswahl zurück.
- Vorheriges/Nächstes Thema folgt der redaktionellen Reihenfolge innerhalb des aktuellen Themas, einschließlich seiner Übersicht. An der Themengrenze endet die Folge. Sprungmarken und Verweise in andere Bereiche sind keine zusätzlichen Leseschritte.
- Ergänze Artikel und Reihenfolge in `.vitepress/sidebar.json`; Sidebar und Seitenfuß nutzen gemeinsam `.vitepress/navigation.mjs`.

### Bereichsübersicht und Wechsel zwischen Bereichen

- Außer „Neu im Team“ beginnt das Hauptmenü jedes Bereichs mit „Übersicht“, die auf dessen Landing-Page führt.
- Der Hauptblock trägt den Bereichsnamen. Unter Schulungen gibt es drei native VitePress-Hauptsektionen, die unabhängig voneinander auf- und zugeklappt werden. Nur das aktive Thema darin wird beim Seitenaufruf automatisch aufgeklappt.
- „Weitere Bereiche“ zeigt die übrigen Bereiche in der Reihenfolge der Hauptnavigation. Unter Schulungen stehen „Schulungen“, „Schulungsumgebungen“ und „Weitere Bereiche“ als getrennte Hauptsektionen. Das Öffnen oder Schließen einer Sektion verändert die anderen nicht.
- Hauptnavigation und Bereichswechsel werden gemeinsam aus `.vitepress/sidebar.json` unter `nav` erzeugt. „Neu im Team“ zeigt seine drei Einträge dauerhaft ohne Ausklapp-Marker; darunter steht „Weitere Bereiche“ als eingeklappter Block.
- Historische Verzeichnisse ändern bei einer redaktionellen Verschiebung ihren Pfad nicht. Die Route der Schulungsumgebung gehört zu „Schulungen“; das vollständige Modul „Umstieg zu SchILD-NRW 3“ gehört ebenfalls zu „Schulungen“.

### Landingpages und Emoji-Kürzel

- Themenkacheln auf Bereichsübersichten verlinken ausschließlich Themen des eigenen Bereichs. Bereichsübergreifende Hinweise bleiben als ausdrücklich benannte Textlinks möglich; die globale Startseite erschließt alle Bereiche.
- Nach einer Verschiebung Menüzuordnung und Übersichts-Kacheln gemeinsam pflegen. Die Zuordnung wird in Quellen und Browser geprüft.
- Die Kürzel `:a:`, `:date:` und `:information_source:` werden im normalen Artikeltext als Emoji dargestellt. Innerhalb von Code bleiben sie unverändert.
- Die Übersicht der Schulungsumgebungen liegt unter dem erhaltenen Pfad `/Fachberatung_Anleitungen/Test-_und_Schulungsserver/`.

### Tabellenübersichten unter Schulungen

- Die Übersichten „Schulungen“ und „Schulungsumgebungen“ verwenden statt Kacheln `NavigationOverview`. Namen, Links und Reihenfolge stammen automatisch aus dem jeweiligen Sidebar-Hauptmenü; „Übersicht“ wird ausgelassen.
- Bei neuen oder geänderten Themen die kurze `description` direkt am Menüeintrag in `.vitepress/sidebar.json` pflegen. Fehlende Kurzbeschreibungen lassen die Qualitätsprüfung scheitern. Keine zweite Modulliste im Markdown anlegen.
