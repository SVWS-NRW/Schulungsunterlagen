# 2.3 Korrigierte EF für die Q1 blocken

In diesem Kapitel soll "geblockt" werden. Dies bedeutet, dass entschieden wird, welche Kurse - wie viele pro Fach - mit welchen Schülern darin angeboten werden. Die Kurse liegen auch in "Schienen", die hinterher im Stundenplan dazu dienen, Parallelitäten und Nicht-Parallelitäten festzulegen. Es lassen sich auch viele Regeln festlegen, etwa welche Kurse zusammen in einer Schiene bleiben sollen oder ob ausgewählte Schüler schon fest einem Kurs zugeordnet werden.

>[!TIP] Eine Blockung aus Leistungsdaten erstellen
> Für ein existierendes Halbjahr mit Leistungsdaten können wir eine Blockung aus den Leistungsdaten **wiederherstellen**. Somit wird die Blockung aus einem Ist-Zustand generiert.
> Im Folgenden wollen wir eine **neue Blockung für die Q1 erstellen**.

**Aufgaben 2.3.1 "Orientieren im Blockungsbereich der Kursplanung"**: Gehe für Deinen **Gewählten Abiturjahrgang** in den *Tab Kursplanung*.
+ Jetzt gilt es sehr genau zu sein: Wir müssen uns für die *neue Blockung der Q1* zuerst im richtigen *Abiturjahrgang* befinden und dort das richtige *Halbjahr* auswählen. Stelle sicher, links in der Auswahlliste das korrekte Halbjahr für den korrekten Abiturjahrgang gewählt zu haben.
+ Klicke dann auf **+ Neue Blockung erstellen**.
+ Nimm zur Kenntnis, dass links unten nun *Blockungen* stehen und dort eine *Blockung 1* angelegt wurde, darunter steht eine *ID*. Die rechte Seite des Bildschirms ist nun auch befüllt.
+ Erkläre, was Du siehst. Was ist die linke Spalte, was die Zeile im Kopf? Nimm zur Kenntnis, dass sich Kurse (links) noch aufklappen lassen. Schätze, ob 11 Schienen für die Q1 und Q2 ausreichen werden.
+ Mache fünf Minuten Pause, hole ruhig einen Kaffee, Wasser oder Tee.

**Aufgabe 2.3.2 "Stumpf drauflos blocken"**: Wir legen einfach los!
+ Stelle nichts ein, sondern klicke einfach neben "Blockung 1" auf `Blocken`.
+ Stelle die *"Anzahl der parallelen Berechnungen"* auf *Maximum*.

>[!TIP] **Maximum und wo laufen die Berechnungen**   
>Die *Zahl der parallelen Berechnungen* gibt die Zahl der "CPU-Kerne - 1" in Deinem lokalen Rechner an, die mit der Blockungsberechnung belastet werden können.   
> Die Berechnungen laufen lokal auf Deinem Client im Browser, es werden keine Daten irgendwohin geladen.    
> Deine Kollegen können somit wie gewohnt weiter mit SchILD arbeiten, während Du lokal auf Deinem Rechner die Blockungen berechnen.

+ Klicke auf `Berechnung starten` und lass die Berechnung etwas laufen.
+ Klicke dann auf `Berechnung pausieren`.

>[!TIP] Was sehen wir hier?   
> "Berechnung pausieren" hält die Berechnung an und lässt uns Ergebnisse weiterverwenden, "Abbrechen" verwirft alle bisherigen Berechnungen.
> Hier werden parallel mehrere Blockungen erzeugt.
> "Regelverletzungen" sind gerade 0, aber Regeln wurden gerade nicht definiert. Dafür gibt es viele "Wahlkonflikte". Fährt der Mauszeiger über Wahlkonflikte, erfahren wir Details. Die "Maximale Kursdifferenz" bezieht sich auf SuS in fachgleichen Kursen. "Fächer parallel" gibt an, wie viele Fächer in der gleichen Schiene abgelegt wurden.

+ Wir haben keine Regeln definiert, keine Kursschienen fixiert, für die Q1 haben wir ohnehin zu wenige Schienen. Wir können also ruhig `Abbrechen` und müssen die Blockung durch Vorgaben berechenbar machen. Hier können wir theoretisch Ergebnisse wählen, um damit weiterzuarbeiten, aber unsere Ergebnisse sind gerade wertlos. Klicke auf `Alle berechneten Ergebnisse verwerfen und schließen`. 

**Aufgabe 2.3.3 "Mit Nachdenken und Planung blocken"**:    
+ An dieser Schule bekommen wir die Q1 nicht in 11 Schienen geblockt. Füge eine 12. Schiene hinzu.
+ Nimm zur Kenntnis, dass die Schienen umbenannt werden können und das Fehler in der Kommunikation mit den Stundenplanern hier große Probleme erzeugen können.
+ Sofern noch nicht geschehen: gehe in die Kurswahlen zurück, den Chemie-LK werden wir auflösen müssen, hier muss umgewählt werden.
+ Gehe nun links durch die Kurse durch und überlege, was an Deiner Schule Sinn macht.
  + Können wir einen der Mathe-LKs löschen (51 SuS durch 2 oder durch 3?)
  + Müssen wir im *Bio-LK* oder im *Geschichts-LK* Platz für Externe Schüler reservieren? (Klappe den Kurs auf und reserviere Plätze)
  + Nehmen wir einen *Englisch-GK* weg? Beachte, dass man Kurse später auch "Aufteilen" kann und damit einen neuen Kurs erzeugt. Hat man zwei Kurse in einer Schiene zusammen - dies lässt sich etwa über eine Regel herbeiführen - und damit liegst Du im Stundenplan auch parallel, können diese Kurse später auch wieder zusammengefügt werden.
  + Hast Du Kurse entfernt, kannst Du neue Kurse des gleiches Fachs mit *Hinzufügen* erzeugen.
  + Der *Sowi-LK* wurde jetzt in der Blockung nicht vorgesehen, aber da wir wissen, dass 12 Kooperationsschüler von Nachbarschulen kommen, können wir den *+ Kurs anlegen*.
  + Der *Physik-LK* findet immer statt - nur dieses Mal haben nur 7 Leute gewählt. Macht nichts, nächstens Jahr wird es wieder besser und natürlich wird der auch über *+ Kurs anlegen* angeboten.
  + Den *Sport-LK* bekommst Du doch bestimmt mit externen SuS zusammen? Ansonsten lass die SuS umwählen...
  + Hast Du Kurse mit Externen Schülern verplant oder hast Du mehrere Kurse, von denen Du schon wissen, dass die mit unterschiedlichen Kursdifferenzen enden werden, erzeuge unter *Details* die Regel zu *Kursdifferenz ignorieren*.


**Aufgabe 2.3.4 "Weiterplanen und Schüler zuordnen"**:    
Wir können auch Kurse schon fest setzen
+ Zum Beispiel sind die Sportkurse nicht gleich: Von den vier Kursen sind zwei "normale" Sportkurse, einer ist "Tanzen" und der andere "Schwimmen"
    + Benenne die Kurse passend um
    + Du hast auch nur zwei Sporthallen (plus das Schwimmbad), verteile also die Sportkurse auf zwei Schienen und fixiere diese (ziehe die Kurse auf Schiene 1 woanders hin, dann klicke auf die Pinnnadel)
    + Jetzt müssen die Schüler nach Sportkurswahl zugeordnet werden. Klicke auf den Schwimmkurs, dann auf *Schülerzuordnung* und wähle dann ca. 20 Schüler aus, die Schwimmen wollen, indem Du diese in den passenden Kurs setzt (rechte Liste)
    + Wähle "Schüler im Ziel-Kurs fixieren", damit diese SuS nicht noch wonanders hinverteilt werden. Klicke auf "Schließen".
    + Damit aber nicht noch andere Schüler schwimmen müssen, gehe oben rechts auf "Details" und definiere eine Regel, nach der dieser Kurs eine *maximale Schülerzahl* hat. Wähle den Kurs und dann die Zahl der Personen, die Du gerade hinzugefügt hast. Erstelle die Regel.
    + Wiederhole dieses Vorgehen mit Deinem Tanzkurs.

**Aufgabe 2.3.5 "Schienen sperren, Parallelitäten"**:    
Wir sperren die LK-Schienen. Es gibt Absprachen mit Nachbarschulen oder die LKs sollen auf bestimmte Weisen parallel liegen.
+ Lege die ersten beiden Schienen als LK-Schienen fest, verteile Deine LKs auf beide Schienen, dann ziehe per Drag & Drop einen Kasten über die anderen Schienen und blockiere diese.
+ Sperre nun auch die beiden LK-Schienen für alle anderen Kurse (unter den LKs die Schienen über alle GKs sperren)
+ Da es nur eine Kunstlehrkraft gibt, brauchen wir eine Regel, dass die Kunstkurse nicht zusammenliegen dürfen.
+ Lösche auch den KU-GK3.

>[!TIP] Regeln sind freier als "Schienen fixieren"
> Beachte, dass es grundsätzlich freier ist, eine Regel zu definieren als mit fixierten Schienen zu arbeiten. Unter vielen Umständen macht eine feste Schiene aber auch viel Sinn.

>[!TIP] Nachdem einmal eine Berechnung gelaufen ist, lässt sich keine Schiene mehr neu anlegen. Das geht nachher aber dann doch, wenn eine Blockung "abgeleitet" wurde (dazu später mehr).

+ Sorge dafür, dass ein Kunstkurs, Musik und Literatur parallel liegen. Fixiere diese in Schienen oder definiere Regeln. Denke daran: Kurs verschieben, dann mit der Pinnnadel fixieren.
+ Ebenso kopple Reli/Philo (eventuell kann hier später in der Q2 auch auch ein Zusatzkurs hin), damit SuS nach Deinem Gewissen frei umwählen können. Da alle Reli oder Philo haben, können wir eine 100%-Schiene definieren, die Kurse darin fixieren und, per Drag & Drop, für alles andere sperren.

>[!TIP] Schienen vs. Stundenplanlagen. 
> Beachte, dass die Blockungsschienen nicht unbedingt der Lage im Stundenplan entsprechen müssen. Manche Kurse können in unterschiedliche Schienen gelegt werden, dann im Stundenplan aber doch parallel liegen - oder umgekehrt, etwa, wenn man nachher in der Q2 zwei Kurse doch zusammenlegen möchte.

+ Soll eine "Fremdsprachenschiene" festgelegt werden? Hast Du es zugelassen, dass jemand mit F7 oder L7 doch noch S0 wählt? Falls nicht, können die ruhig parallel gelegt werden. Ignoriere S0 und definiere eine Regel, dass F7 und L7 immer parallel liegen.

**Aufgabe 2.3.6 "Schüler fest Kursen zuteilen"**:     
Lege Kursgruppen fest und teile Schüler zu
(Also gleiche Gruppen in D_GK1, E_GK1, M_GK1, dann für 2 und 3; SuS fest zuteilen)

**Aufgabe 2.3.7 "Neue Blockung rechnen"**:     
Soweit, so gut: Berechne noch einmal eine neue Blockung und schaue, was passiert. Achte darauf, dass alle Kurse, die Du auch haben möchtest, angelegt sind. Klicke auf `Blocken`.
+ Kontrolliere Wahlkonflikte, hast Du zu Beginn viele und wird dies nicht schnell besser, musst Du schauen, woran diese liegen.
+ Wähle ein gut erscheinendes Ergebnis über den Haken an, dann klicke auf "1 Ergebnis importieren und beenden".
+ In der Blockung ist links nun eine neue "ID" erzeugt worden. Das ist unserer Blickung. Schalte das Ergebnis mit dem "Blauen Haken im Kreis" auf *Aktiv*.

>[!TIP] Achte ab jetzt immer darauf, mit der richtigen, aktiven Blockung zu arbeiten und nicht mit einem alten Ergebnis.
> "Aktiv" bedeutet auch, dass wenn Du mit dem Haken zu einem SoS springen, beim zurückspringen in die Blockung auch wieder in der aktiven landen.

+ Jetzt hat sich etwas verändert: Minimiere die "Kursübersicht mit den Schienen" oder scrolle nach rechts, lassen sich nun Kurse per Drag & Drop in den Schienen verschieben.

+ Filtere mit einem Klick auf "K", "NV" oder "K/NV" auf "Kollisionen" oder "Nicht Verteilte". Versuche, Deine Probleme zu lösen. 

## ======== Mittagspause ? =====

**Aufgabe 2.3.8 "Blockung verbessern und Ableiten"**: Verbessere gegebenenfalls die Blockung
+ Verbessere die Blockung.
+ Nimm die Möglichkeit zum **"Ableiten"** zur Kenntnis. 

>[!TIP]Ableiten ist sinnvoll, um eine **Blockung**, in der Berechnungen durchgeführt wurden, zu duplizieren. (Es liegen **Ergebnisse** vor, mit denen wir arbeiten und von denen wir eins auf **Aktiv** gestellt haben).
> In diesen ***Ergebnissen*** sind nun manche Einstellungen fest und können nicht mehr verändert werden. Es können zum Beispiel keine neuen Schienen oder Kurse mehr angelegt werden. Leiten wir aber eine Blockung ab, wird daraus eine komplett **neue Blockung ohne Ergebnisse**, in der wieder alles verändert werden kann. Neue Ergebnisse, mit denen dann gearbeitet werden kann, werden über ein erneutes **berechnen** erzeugt. 
> "Ableiten" ist auch sinnvoll, um eine Art "Backup" von einer Blockung zu erstellen, die man sich sicher abspeichern möchte, weil spätere Veränderungen vielleicht doch nicht besser sind.
> Nimm an dieser Stelle noch einmal die Möglichkeit zur Kenntnis, Blockungen umzubennen!

+ Leite eine Blockung ab und benenne diese um (eventuell nach dem Datum?), lege ggf. neue Kurse an oder entferne wieder welche.
+ Vergiss nicht, das Ergebnis, mit dem Du arbeiten möchtest, auf **Aktiv** zu stellen.

**Aufgabe 2.3.9 "Schülergruppen fest zugeordnet lassen"**: TODO (GK 1, GK2, GK 3 Schienen für je Mathe, Deutsch, Englisch)   
Diese Aufgabe haben wir doch oben ("Schüler fest Kursen zuteilen":) Oder ist hier was anderes gemeint?

**TODO**
Frage: Was ist mit den externen SuS? Wird von denen die gesamte LP-Datein eingelesen?

----

## Die Blockung anwenden

**Aufgabe 2.3.9 "Blockung übertragen"**    
Wir befinden uns nun kurz vor dem Schuljahreswechsel, zwei oder drei Wochen bevor die Schule wieder losgeht. 
+ Kontrolliere, dass das Blockungs-Endergebnis als aktive Blockung markiert ist.
+ Übertrage die Blockung mit Hilfe des entsprechenden Button **Übertragen** in den Abschnitt Q1.1. 
+ Nimm zur Kenntnis, dass nun der Button **Synchronisieren** anstatt Übertragen als Option vorhanden ist (Mehr zum Synchronisieren später). 
+ Lösche ggf. überflüssige Blockungsversuche.
+ Sichte die Laufbahn eines Schülers, indem Du in die Laufbahnplanung eines Schülers springen. Nimm zur Kenntnis, dass die Spalte Q1.1 nun grau hinterlegt ist und die Wahlen für die Q1.1 hier nicht mehr änderbar ist.
+ Wechsle in den Tab "Lernabschnitte" und sichte den nun angelegten neuen Abschnitt 20xx (Q1). 
+ Wähle den zukünftigen Abschnitt bei einem Schüler aus und prüfe, ob die Kurse dort hinterlegt sind.

**Aufgabe 2.3.10 "Lehrer einpflegen"**  


>[!TIP]Eine fertige Blockung können wir **"hochschreiben"**, daher diese Blockung in den kommenden Lernabschnitt übernehmen. Das neue System kann nun einen zukünftigen Lernabschnitt verwalten, so dass Planungen für die Zukunft möglich werden.
> Alternativ kann eine Blockung **"übertragen"** werden. Dies bedeutet, dass die fertige Blockung im aktuellen Lernabschnitt in die Kurse übernommen wird und die SuS in die Kurse eingetragen werden.
> Es ist NICHT notwendig, die Kurse über den Katalog anzulegen, das macht der Bereich "Kursplanung" von alleine.

>[!TIP] Die fertige Blockung "hochschreiben" oder "erst Versetzen"
> Die gerade erstellte Blockung kann nun direkt in den zukünftigen (!) Lernabschnitt hochgeschrieben werden und wartet dann dort auf die neu versetzten Schüler.
> Alternativ kann erst die Versetzung vorgenommen werden und dann wird die Blockung angewendet.
> Hier in der Schulung nicht versetzen, da unsere Q2er für die folgenden Kapitel sonst weg wären.

>[!TIP] Kein Hochschreiben vor den Sommerferien
> Vor oder direkt zum Beginn der Sommerferien sollte die Blockung noch nicht angewendet werden. Warte bis zum Ende der Sommerferien. "Bis dahin passiert noch viel."

>[!TIP] Synchronisieren
> Wurde eine Blockung einmal mit **übertragen** verwendet, kann eine Änderung in der Blockung bei den SuS übernommen werden, indem man **synchronisieren** anklickt.
> **Achtung**: Synchronisieren ist nicht mehr möglich, sobald eine Note in die Leistungsdaten eingetragen wurde! Nun sind Änderungen nur noch über die Leistungsdaten bei den SuS und die Kurs-Kataloge vorzunehmen!

**Aufgabe 2.3.11 "Kurse/Schüler manuell verschieben"**: Verschiebe Kurse manuell zwischen den Schienen
+ Minimiere die Kursplanungsansicht. Du siehst nun die geblockten Kurse in ihren Schienen. Fasse einen Kurs mit der Maus an, dann siehst Du alle Schienen, in die er verschoben werden kann. Verschiebe einen Kurs.
+ Ein Kurs kann nach links in den rot aufleuchtenden Kasten gezogen werden, um die Kurszurordnung zu dieser Schienen aufzuheben.
+ Wähle einen Schüler in der Auswahhliste an, **verteile** diesen automatisch mit einem Klick auf das ebenso benannte Feld auf (neue?) Kurse.

**Aufgabe 2.3 "Blockung übertragen"**:

**TODO**

**Aufgabe 2.3 "Synronisieren"**: Was ändern, dann synchronisieren

**TODO**