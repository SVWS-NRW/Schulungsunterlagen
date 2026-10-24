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

::: details Details
Zusätzliche Informationen zum Aufklappen.
:::
```

Für Beispiele bis zur technischen Vereinheitlichung der erweiterten Container-Syntax `::: tip Beispiel` verwenden. Boxen sparsam und an der relevanten Handlung einsetzen. Keine individuellen Bild-Icons oder Inline-Farben pro Artikel hinzufügen. Wesentliche Informationen gehören auch in den normalen Text.

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
