# 2.3 Korrigierte EF für die Q1 blocken

In diesem Kapitel soll "geblockt" werden. Dies bedeutet, dass entschieden wird, welche Kurse - wie viele pro Fach - mit welchen Schülern darin angeboten werden. Die Kurse liegen auch in "Schienen", die hinterher im Stundenplan dazu dienen, Parallelitäten und Nicht-Parallelitäten festzulegen. Es lassen sich auch viele Regeln festlegen, etwa welche Kurse zusammen in einer Schiene bleiben sollen oder ob ausgewählte Schüler schon fest einem Kurs zugeordnet werden.

>[!TIP] Eine Blockung aus Leistungsdaten erstellen
> Für ein existierendes Halbjahr mit Leistungsdaten können wir eine Blockung aus den Leistungsdaten **wiederherstellen**. Somit wird die Blockung aus einem Ist-Zustand generiert.
> Im Folgenden wollen wir eine **neue Blockung für die Q1 erstellen**.

**Aufgaben 2.3.1 "Orientieren im Blockungsbereich der Kursplanung"**: Gehen Sie für Ihren **Gewählten Abiturjahrgang** in den *Tab Kursplanung*.
+ Jetzt gilt es sehr genau zu sein: Wir müssen uns für die *neue Blockung der Q1* zuerst im richtigen *Abiturjahrgang* befinden und dort das richtige *Halbjahr* auswählen. Stellen Sie sicher, links in der Auswahlliste das korrekte Halbajhr für den korrekten Abiturjahrgang gewählt zu haben.
+ Klicken Sie dann auf **+ Neue Blockung erstellen**.
+ Nehmen Sie zur Kenntnis, dass links unten nun *Blockungen* stehen und dort eine *Blockung 1* angelegt wurde, darunter steht eine *ID*. Die rechte Seite des Bildschirms ist nun auch befüllt.
+ Erklären Sie, was sie sehen. Was ist die linke Spalte, was die Zeile im Kopf? Nehmen Sie zur Kenntnis, dass sich Kurse (links) noch aufklappen lassen. Schätzen Sie, ob 11 Schienen für die Q1 und Q2 ausreichen werden.
+ Machen Sie fünf Minuten Pause, holen Sie ruhig einen Kaffee, Wasser oder Tee.

**Aufgabe 2.3.2 "Stumpf drauflos blocken"**: Wir legen einfach los!
+ Stellen Sie nichts ein, sondern klicken Sie einfach neben "Blockung 1" auf `Blocken`.
+ Stellen Sie die *"Anzahl der parallelen Berechungen"* auf *Maximum*.

>[!TIP] **Maximum und wo laufen die Berechnungen**   
>Die *Zahl der parallelen Berechnungen* gibt die Zahl der "CPU-Kerne - 1" in Ihrem lokalen Rechner an, die mit der Blockungsberechnung belastet werden können.   
> Die Berechnungen laufen lokal auf Ihrem Client im Browser, es werden keine Daten irgendwohin geladen.    
> Ihre Kollegen können somit wie gewohnt weiter mit SchILD arbeiten, während Sie lokal auf Ihrem Rechner die Blockungen berechnen.

+ Klicken Sie auf `Berechnung starten` und lassen Sie die Berechung etwas laufen.
+ Klicken Sie dann auf `Berechnung pausieren`.

>[!TIP] Was sehen wir hier?   
> "Berechung pausieren" hält die Berechnung an und lässt uns Ergebnisse weiterverwenden, "Abbrechen" verwirft alle bisherigen Berechnungen.
> Hier werden paralllel mehrere Blockungen erzeugt.
> "Regelverletzungen" sind gerade 0, aber Regeln wurden gerade nicht definiert. Dafür gibt es viele "Wahlkonflikte". Fährt der Mauszeiger über Wahlkonflikte, erfahren wir Details. Die "Maximale Kursdifferenz" bezieht sich auf SuS in fachgleichen Kursen. "Fächer parallel" gibt an, wie viele Fächer in der gleichen Schiene abgelegt wurden.

+ Wir haben keine Regeln definiert, keine Kursschienen fixiert, für die Q1 haben wir ohnehin zu wenige Schienen. Wir können also ruhig `Abbrechen` und müssen die Blockung durch Vorgaben berechnenbar machen. Hier können wir theoretisch Ergebisse wählen, um damit weiterzuarbeiten, aber unsere Ergebnisse sind gerade wertlos. Klicken Sie auf `Alle berechneten Ergebnisse verwerfen und schließen`. 

**Aufgabe 2.3.3 "Mit Nachdenken und Planung blocken"**:    
+ An dieser Schule bekommen wir die Q1 nicht in 11 Schienen geblockt. Fügen Sie eine 12. Schiene hinzu.
+ Nehmen Sie zur Kenntnis, dass die Schienen umbenannt werden können und das Fehler in der Kommunikation mit den Stundenplanern hier große Probleme erzeugen können.
+ Sofern noch nicht geschehen: gehen Sie in die Kurswahlen zurück, den Chemie-LK werden wir auflösen müssen, hier muss umgewählt werden.
+ Gehen Sie nun links durch die Kurse durch und überlegen Sie, was an Ihrer Schule Sinn macht.
  + Können wir einen der Mathe-LKs löschen (51 SuS durch 2 oder durch 3?)
  + Müssen wir im *Bio-LK* oder im *Geschichts-LK* Platz für Externe Schüler reservieren? (Klappen Sie den Kurs auf und reservieren Sie Plätze)
  + Nehmen wir einen *Englisch-GK* weg? Beachten Sie, dass man Kurse später auch "Aufteilen" kann und damit einen neuen Kurs erzeugt. Hat man zwei Kurse in einer Schiene zusammen - dies lässt sich etwa über eine Regel herbeiführen - und damit liegen Sie im Stundenplan auch parallel, können diese Kurse später auch wieder zusammengefügt werden.
  + Haben Sie Kurse entfernt, können Sie neue Kurse des gleiches Fachs mit *Hinzufügen* erzeugen.
  + Der *Sowi-LK* wurde jetzt in der Blockung nicht vorgesehen, aber da wir wissen, dass 12 Kooperationsschüler von Nachbarschulen kommen, können wir den *+ Kurs anlegen*.
  + Der *Physik-LK* findet immer statt - nur dieses Mal haben nur 7 Leute gewählt. Macht nichts, nächstens Jahr wird es wieder besser und natürlich wird der auch über *+ Kurs anlegen* angeboten.
  + Den *Sport-LK* bekommen Sie doch bestimmt mit externen SuS zusammen? Ansonsten lassen Sie die SuS umwählen...
  + Haben Sie Kurse mit Externen Schülern verplant oder haben Sie mehrere Kurse, von denen Sie schon wissen, dass die mit unterschiedlichen Kursdifferenzen enden werden, erzeugen Sie unter *Details* die Regel zu *Kursdifferenz ignorieren*.


**Aufgabe 2.3.4 "Weiterplanen und Schüler zuordnen"**:    
Wir können auch Kurse schon fest setzen
+ Zum Beispiel sind die Sportkurse nicht gleich: Von den vier Kursen sind zwei "normale" Sportkurse, einer ist "Tanzen" und der andere "Schwimmen"
    + Benennen Sie die Kurse passend um
    + Sie haben auch nur zwei Sporthallen (plus das Schwimmbad), verteilen Sie also die Sportkurse auf zwei Schienen und fixieren Sie diese (ziehen Sie die Kurse auf Schiene 1 woanders hin, dann klicken Sie auf die Pinnadel)
    + Jetzt müssen die Schüler nach Sportkurswahl zugeordnet werden. Klicken Sie auf den Schwimmkurs, dann auf *Schülerzuordnung* und wählen Sie dann ca. 20 Schüler aus, die Schwimmen wollen, indem Sie diese in den passen Kurs setzen (rechte Liste)
    + Wählen Sie "Schüer im Ziel-Kurs fixieren", damit diese SuS nicht noch wonanders hinverteilt werden. Klicken Sie auf "Schließen".
    + Damit aber nicht noch andere Schüler schwimmen müssen, gehen Sie oben rechts auf "Details" und definieren Sie eine Regel, nach der dieser Kurs eine *maximale Schülerzahl* hat. Wählen Sie den Kurs und dann die Zahl der Personen, die Sie gerade hinzugefügt haben. Erstellen Sie die Regel.
    + Wiederholen Sie dieses Vorgehen mit Ihrem Tanzkurs.

**Aufgabe 2.3.5 "Schienen sperren, Parallelitäten"**:    
Wir sperren die LK-Schienen. Es gibt Absprachen mit Nachbarschulen oder die LKs sollen auf bestimmte Weisen parallel liegen.
+ Legen Sie die ersten beiden Schienen als LK-Schienen fest, verteilen Sie Ihre LKs auf beide Schienen, dann ziehen Sie per Drag & Drop einen Kasten über die anderen Schienen und blockieren Sie diese.
+ Sperren Sie nun auch die beiden LK-Schienen für alle anderen Kurse (unter den LKs die Schienen über alle GKs sperren)
+ Da es nur eine Kunstlehrkraft gibt, brauchen wir eine Regel, dass die Kunstkurse nicht zusammenliegen dürfen.
+ Löschen Sie auch den KU-GK3.

>[!TIP] Regeln sind freier als "Schienen fixieren"
> Beachten Sie, dass es grundsätzlich freier ist, eine Regel zu definieren als mit fixierten Schienen zu arbeiten. Unter vielen Umständen macht eine feste Schiene aber auch viel Sinn.

>[!TIP] Nachdem einmal eine Berechnung gelaufen ist, lässt sich keine Schiene mehr neu anlegen. Das geht nachher aber dann doch, wenn eine Blockung "abgeleitet" wurde (dazu später mehr).

+ Sorgen Sie dafür, dass ein Kunstkurs, Musik und Literatur parallel liegen. Fixieren Sie diese in Schienen oder definieren Sie Regeln. Denken Sie daran: Kurs verschieben, dann mit der Pinnadel fixieren.
+ Ebenso koppeln Sie Reli/Philo (eventuell kann hier später in der Q2 auch auch ein Zusatzkurs hin), damit SuS nach Ihrem Gewissen frei umwählen können. Da alle Reli oder Philo haben, können wir eine 100%-Schiene definieren, die Kurse darin fixieren und, per Drag & Drop, für alles andere sperren.

>[!TIP] Schienen vs. Stundenplanlagen. 
> Beachten Sie, dass die Blockungsschienen nicht unbedingt der Lage im Stundenplan entsprechen müssen. Manche Kurse können in unterschiedliche Schienen gelegt werden, dann im Stundenplan aber doch parallel liegen - oder umgekehrt, etwa, wenn man nachher in der Q2 zwei Kurse doch zusammenlegen möchte.

+ Soll eine "Fremdsprachenschiene" festgelegt werden? Haben Sie es zugelassen, dass jemand mit F7 oder L7 doch noch S0 wählt? Falls nicht, können die ruhig parallel gelegt werden. Ignorieren Sie S0 und definieren Sie eine Regel, dass F7 und L7 immer parallel liegen.

**Aufagen 2.3.6 "Schüler fest Kursen zuteilen"**:     
Legen Sie Kursgruppen fest und teilen Sie Schüler zu
(Also gleiche Gruppen in D_GK1, E_GK1, M_GK1, dann für 2 und 3; SuS fest zuteilen)

**Aufgabe 2.3.7 "Neue Blockung rechnen"**:     
Soweit, so gut: Berechnen Sie noch einmal eine neue Blockung und schauen Sie, was passiert. Achten Sie darauf, dass alle Kurse, die Sie auch haben möchte, angelegt sind. Klicken Sie auf `Blocken`.
+ Kontrollieren Sie Wahkonflikte, haben Sie zu Beginn viele und wird dies nicht schnell besser, müssen Sie schauen, woran diese liegen.
+ Wählen Sie ein gut erscheinendes Ergebnis über den Haken an, dann klicken Sie auf "1 Ergebnis importieren und beenden".
+ In der Blockung ist links nun eine neue "ID" erzeugt worden. Das ist unserer Blickung. Schalten Sie das Ergebnis mit dem "Blauen Haken im Kreis" auf *Aktiv*.

>[!TIP] Achten Sie ab jetzt immer darauf, mit der richtigen, aktiven Blockung zu arbeiten und nicht mit einem alten Ergebnis.
> "Aktiv" bedeutet auch, dass wenn Sie mit dem Haken zu einem SoS springen, beim zurückspringen in die Blockung auch wieder in der aktiven landen.

+ Jetzt hat sich etwas verändert: Minimieren Sie die "Kursübersicht mit den Schienen" oder scrollen Sie nach rechts, lassen sich nun Kurse per Drag & Drop in den Schienen verschieben.

+ Filtern Sie mit einem Klick auf "K", "NV" oder "K/NV" auf "Kollisionen" oder "Nicht Verteilte". Versuchen Sie, Ihre Probleme zu lösen. 

## ======== Mittagspause ? =====

**Aufgabe 2.3.8 "Blockung verbessern und Ableiten"**: Verbessern Sie gegebenenfalls die Blockung
+ Verbessern Sie die Blockung.
+ Nehmen Sie die Möglichkeit zum **"Ableiten"** zur Kenntnis. 

>[!TIP]Ableiten ist sinnvoll, um eine **Blockung**, in der Berechnungen durchgeführt wurden, zu duplizieren. (Es liegen **Ergebnisse** vor, mit denen wir arbeiten und von denen wir eins auf **Aktiv** gestellt haben).
> In diesen ***Ergebnissen*** sind nun manche Einstellungen fest und können nicht mehr verändert werden. Es können zum Beispiel keine neuen Schienen oder Kurse mehr angelegt werden. Leiten wir aber eine Blockung ab, wird daraus eine komplett **neue Blockung ohne Ergebnisse**, in der wieder alles verändert werden kann. Neue Ergebnisse, mit denen dann gearbeitet werden kann, werden über ein erneutes **berechnen** erzeugt. 
> "Ableiten" ist auch sinnvoll, um eine Art "Backup" von einer Blockung zu erstellen, die man sich sicher abspeichern möchte, weil spätere Veränderungen vielleicht doch nicht besser sind.
> Nehmen Sie an dieser Stelle noch einmal die Möglichkeit zur Kenntnis, Blockungen umzubennnen!

+ Leiten Sie eine Blockung ab und benennen Sie diese um (eventuell nach dem Datum?), legen Sie ggf. neue Kurse an oder entfernen Sie wieder welche.
+ Vergessen Sie nicht, das Ergebnis, mit dem Sie arbeiten möchten, auf **Aktiv** zu stellen.

**Aufgabe 2.3.9 "Schülergruppen fest zugeordnet lassen"**: TODO (GK 1, GK2, GK 3 Schienen für je Mathe, Deutsch, Englisch)   
Diese Aufgabe haben wir doch oben ("Schüler fest Kursen zuteilen":) Oder ist hier was anderes gemeint?

**TODO**
Frage: Was ist mit den externen SuS? Wird von denen die gesamte LP-Datein eingelesen?

----

## Die Blockung anwenden

**Aufgabe 2.3.9 "Blockung übertragen"**    
Wir befinden uns nun kurz vor dem Schuljahreswechsel, zwei oder drei Wochen bevor die Schule wieder losgeht. 
+ Kontrollieren Sie, dass das Blockungs-Endergebnis als aktive Blockung markiert ist.
+ Übertragen Sie die Blockung mit Hilfe des entsprechenden Button **Übertragen** in den Abschnitt Q1.1. 
+ Nehmen Sie zur Kenntnis, dass nun der Button **Synchronisieren** anstatt Übertragen als Option vorhanden ist (Mehr zum Synchronisieren später). 
+ Löschen Sie ggf. überflüssige Blockungsversuche.
+ Sichten Sie die Laufbahn eines Schülers, indem Sie in die Laufbahnplanung eines Schülers springen. Nehmen Sie zur Kenntnis, dass die Spalte Q1.1 nun grau hinterlegt ist und die Wahlen für die Q1.1 hier nicht mehr änderbar ist.
+ Wechseln Sie in den Tab "Lernabschnitte" und sichten Sie den nun angelegten neuen Abschnitt 20xx (Q1). 
+ Wählen Sie den zukünftigen Abschitt bei einem Schüler aus und prüfen Sie, ob die Kurse dort hinterlegt sind.

**Aufgabe 2.3.10 "Lehrer einpflegen"**  


>[!TIP]Eine fertige Blockung können wir **"hochschreiben"**, daher diese Blockung in den kommenden Lernabschnitt übernehmen. Das neue System kann nun einen zukünftigen Lernabschnitt verwalten, so dass Planungen für die Zukunft möglich werden.
> Alternativ kann eine Blockung **"übertragen"** werden. Dies bedeutet, dass die fertige Blockung im aktuellen Lernabschnitt in die Kurse übernommen wird und die SuS in die Kurse eingetragen werden.
> Es ist NICHT notwendig, die Kurse über den Katalog anzulegen, das macht der Bereich "Kursplanung" von alleine.

>[!TIP] Die fertige Blockung "hochschreiben" oder "erst Versetzen"
> Die gerade erstellte Blockung kann nun direkt in den zukünftigen (!) Lernabschnitt hochgeschrieben werden und wartet dann dort auf die neu versetzten Schüler.
> Alternativ kann erst die Versetzung vorgenommen werden und dann wird die Blockung angewendet.
> Hier in der Schulung nicht versetzen, da unsere Q2er für die folgenden Kapitel sonst weg wären.

>[!TIP] Kein Hochschreiben vor den Sommerferien
> Vor oder direkt zum Beginn der Sommerferien sollte die Blockung noch nicht angewendet werden. Warten Sie bis zum Ende der Sommerferien. "Bis dahin passiert noch viel."

>[!TIP] Synchronisieren
> Wurde eine Blockung einmal mit **übertragen** verwendet, kann eine Änderung in der Blockung bei den SuS übernommen weredn, indem man **synchorniseren** anklickt.
> **Achtung**: Synchronieren ist nicht mehr möglich, sobald eine Note in die Leistungsdaten eingetragen wurde! Nun sind Änderungen nur noch über die Leistungsdaten bei den SuS und die Kurs-Kataloge vorzunehmen!

**Aufagabe 2.3.11 "Kurse/Schüler manuell verschieben"**: Verschieben Sie Kurse manuell zwischen den Schienen
+ Minimieren Sie die Kursplanungsansicht. Sie sehen nun die geblockten Kurse in ihren Schienen. Fassen Sie einen Kurs mit der Maus an, dann sehen Sie alle Schienen, in die er verschoben werden kann. Verschieben Sie einen Kurs.
+ Ein Kurs kann nach links in den rot aufleuchtenden Kasten gezogen werden, um die Kurszurordnung zu dieser Schienen aufzuheben.
+ Wählen Sie einen Schüler in der Auswahhliste an, **verteilen** Sie diesen automatisch mit einem Klick auf das ebenso benannte Feld auf (neue?) Kurse.

**Aufgabe 2.3 "Blockung übertragen"**:

**TODO**

**Aufgabe 2.3 "Synronisieren"**: Was ändern, dann synchronisieren

**TODO**