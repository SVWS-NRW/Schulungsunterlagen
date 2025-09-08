# Übersicht Thymeleaf-Attribut

### th:with
+ mit th:with kann man lokale Variablen deklarieren
+ Bereich = aktuelles Element + alle Kindelemente
+ Gut für: bessere Lesbarkeit, Wiederverwendung, Performance
+ Hier: th:with berechnet die Variable mediaPrint einmal am Anfang; man kann sie im ganzen Body nutzen

Syntax<br>
```html
<head th:with="varName1 = ${expression1}, varName2 = ${expression2}">
    ... Hier kannst du ${varName1} und ${varName2} benutzen ...
</head>
```

### th:utext (Text ausgeben; dabei html interpretieren)
utext für Texte, die html-Code enthalten. Html wird interpretiert und ausgegeben. Ist der html Text null, wird ein Default-Wert genommen:<br>
```html
th:utext="${Methode, die Text mit html-Elementen zurückgibt}">Defaultwert, falls leer
```

### th:text (nur Text ausgeben)
Gibt text so aus, wie er ist. Html wird als Text angezeigt, nicht interpretiert.

### th:if
Zeigt Element nur an, wenn Bedingung true ist

### th:each (Schleife)
**Beispiel**
´´´html
th:each="schueler, iterationVarSchueler : ${Schueler}"
´´´
Iteriere über alle Schüler in der Liste ${Schueler}. <br>
Für jedes Element setze schueler = aktueller Schüler, und iterationVarSchueler = Metadaten zur Schleife (siehe th:classappend).


### th:classappend
```html
th:classappend="${iterationVarSchueler.even} ? 'bg-lightgrey'">
```
Jede zweite Zeile bekommt automatisch die CSS-Klasse bg-lightgrey.

Allgemein:<br>
```html
th:classappend = „CSS-Klasse(n) anhängen, wenn Bedingung erfüllt ist.“
```



