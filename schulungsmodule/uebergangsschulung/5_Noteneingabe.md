# 5. Noteneingabe

> [!TIP] Moderationshinweis
> * Wie werden Noten im SVWS-Server verwaltet?
> * Wie gebe ich Noten mit SchILD3 ein?
> * Wie gebe ich Noten mit dem SVWS-Client ein?

Zunächst ist es für die spätere Fehlersuche hilfreich nachzuvollziehen, wie die Leistungsdaten im SVWS-Server verwaltet werden. 
Die Noteneingabe unterscheidet sich mit dem SVWS-Client grundsätzlich von der Eingabe mit dem SchILD3-Client. Diese wird nachstehend beschrieben.

Die externe Noteneingabe mit dem [WeNoM - WebNotenManager](https://doku.svws-nrw.de/wenom/benutzerhandbuch/anleitung_lehrkraefte.html), einer Online Plattform zur Erfassung und Verwaltung der Noten und Zeugniseintragungen, kann anhand der verfügbaren Dokumentation nachvollzogen werden.

# Leistungsdatenverwaltung im SVWS-Server

+ Im SVWS-Server werden alle Leistungsdaten in Lernabschnitten organisiert. Gegenüber SchILD2 werden Quartale als Abschnittsebene nicht mehr unterstützt. Es werden nunmehr Halbjahre als Abschnitte dargestellt. Quartale können in diesen Abschnitten in einer Spalte ebenfalls dargestellt werden. Ob diese sichtbar sein sollen, kann über die Einstellungen gesteuert werden.
+ Lernabschnitte können frei benannt werden (z.B. "Halbjahr", "Abschnitt").
+ Alle Leistungen und Ergebnisse der Versetzungs- und Abschlussberechnungen werden getrennt je Lernabschnitt gespeichert. Hierdurch ist es möglich vergangene Lernabschnitte ggf. neu zu berechnen.
+ Nachstehende Abb. verdeutlicht die Zuordnungen:
  ![Lernabschnitte](Bilder/Noten/schild_schueler_akthalbj_allgemein_1.png)

:a: **Aufgabe 5.1 "Leistungsabschnitte an unserer Schule"**

+ Öffne SchILD3 und wähle eine Datenbank aus.
+ Klicke auf den Reiter "Schüler".
+ Wähle links im Bereich "Aktuelle Schülerauswahl" eine Klasse mit aktiven Schülern aus.
Wähle in der Ergebnisliste einen Schüler aus.
+ Auf der Reiterkarte "Individualdaten I" siehst Du unter "Aktuelle Laufbahndaten" den aktuellen Lernabschnitt.
  ![SchILD3: Aktuelle Laufbahndaten](Bilder/Noten/schild_aktuelle_laufbahndaten.png)
+ Klicke für diesen Schüler nun auf die Reiterkarte "Akt. Halbjahr".
+ Du siehst nun die bisherigen Lernabschnitte des Schülers.
  ![SchILD3: Halbjahr auswählen](Bilder/Noten/schild_halbjahr_auswaehlen.png)
+ Das aktuell ausgewählte Halbjahr wird in obiger Abb. durch den vorangestellten schwarzen Pfeil und einer Hintergrundschraffur gekennzeichnet.


# Noteneingabe mit SchILD3

:a: **Aufgabe 5.2 Eingabe einzelner Teilleistungen und Noten**

+ Wähle eine Schülermenge mithilfe der unter [Filtern & Gruppenprozesse](./2_Filtern_Gruppenprozesse.md) dargestellten Verfahren aus.
+ Wähle dann einen Schüler wie in Aufgabe 5.1 vorbereitet aus.
+ Klicken sie im rechten Unterfenster des Reiters "Akt. Halbjahr" auf die Reiterkarte "Leistungsdaten".
+ Wähle dann das Fach aus, für das Du für diesen Schüler Teilleistungen (TL) oder Noten eintragen möchtest.
  ![SchILD3: Teilleistungen eintragen](Bilder/Noten/schild_eingabe_tl_in_einem_fach.png)

::: details

+ Klicke auf das Plus-Zeichen vor der Fachbezeichnung, um die zugeordneten Teilleistungen aufzufächern.
+ Klicke nun in die Spalte "Note" der Teilleistungsart (z.B. 1. KA), für die Du Noten eintragen möchtest.
+ Du kannst nun die Note direkt eintragen, oder aus dem Drop-down Menü auswählen. 
+ Dies ist aber nur möglich, wenn Du bei SchILD3 als angemeldeter Lehrer dem Fach zugeordnet, 
  das Fach für den Schüler angelegt und Teilleistungen zugewiesen wurden.

:::

:a: **Aufgabe 5.3 Eingabe der Teilleistungen eines Faches pro Klasse**

+ Wähle eine Schülermenge mithilfe der unter [Filtern & Gruppenprozesse](./2_Filtern_Gruppenprozesse.md) dargestellten Verfahren aus.
+ Klicke die Reiterkarte "Gruppenprozesse", danach im oberen Teil "Teilleistungen". 
  ![SchILD3: Teilleistungen eintragen](Bilder/Noten/schild_gp_noten_zeugnisvorbereitung.png)
+ Klicke nun in der Liste der "verfügbaren Gruppenprozesse - Teilleistungen" auf "Noteneingabe (nur vorbereitete TL)".
   ![SchILD3: Teilleistungen eintragen](Bilder/Noten/schild_gp_noteneingabe_tl.png)


::: details

+ Wähle in dem neuen Fenster "Teilleistungsnoten eingeben" das gewünschte Fach und die gewünschte Teilleistungsart aus.
+ Klicke danach auf aktualisieren. Es erscheinen dann alle Schüler, der gewählten Schülermenge, die dem Fach zugeordnet sind.
+ Wähle oben rechts das Datum der einzutragenden Teilleistungsart und klicke auf Datum übernehmen.
+ Klicke danach für den ersten Schüler in die Spalte "Note" und trage nun die Noten für diese Teilleistungsart für die gesamte Klasse ein.
+ Trage die Note ein und betätige die Pfeiltaste nach unten, um die Eingabe zu übernehmen und in die Notenzeile für den nächsten Schüler zu gelangen.
+ Zum Abschluss der Eintragung musst Du noch unten rechts auf den Button "In Datenbank übernehmen" klicken, damit alle Eintrageungen nun auch übertragen werden.

:::

:a: **Aufgabe 5.4 Eingabe der Zeugnisnoten eines Faches pro Klasse**

+ Wähle eine Schülermenge mithilfe der unter [Filtern & Gruppenprozesse](./2_Filtern_Gruppenprozesse.md) dargestellten Verfahren aus.
+ Klicke die Reiterkarte "Gruppenprozesse", danach im oberen Teil "Noten/Zeugnisvorbereitungen".
+ Klicke nun in der Liste der "verfügbaren Gruppenprozesse - Noten/Zeugnisvorbereitung" auf "Noten, Mahnungen und Fehlstunden eingeben".
  ![SchILD3: Teilleistungen eintragen](Bilder/Noten/schild_gp_noten_zeugnisvorbereitung_noten_eingeben.png)  

::: details

+ Wähle nun den gewünschten Abschnitt aus. Es wird zunächst das aktuelle Schulhalbjahr angezeigt.
+ Klicke nun in der Liste der "verfügbaren Gruppenprozesse - Noten/Zeugnisvorbereitung" auf "Noten, Mahnungen und Fehlstunden eingeben".
+ Es öffnet sich nachstehendes Fenster:
   ![SchILD3: Teilleistungen eintragen](Bilder/Noten/schild_gp_noten_zeugnisvorbereitung_fach_auswaehlen.png)  
+ Wähle hier das gewünschte Fach aus. Darunter erscheinen dann alle Schüler der Klasse, die dem Fach zugeordnet wurden.
+ Klicke danach für den ersten Schüler in die Spalte "Note" und trage nun die Noten für diese Teilleistungsart für die gesamte Klasse ein.
+ Trage die Note ein und betätige die Pfeiltaste nach unten, um die Eingabe zu übernehmen und in die Notenzeile für den nächsten Schüler zu gelangen.
+ Zum Abschluss der Eintragung musst Du noch unten rechts auf den Button "In Datenbank übernehmen" klicken, damit alle Eintrageungen nun auch übertragen werden.

:::


# Noteneingabe mit dem SVWS-Client

:a: **Aufgabe 5.5 Eingabe einzelner Teilleistungen und Noten**

+ Rufe im Webbrowser die Webseite des SVWS-Client auf. Dies ist in der Regel die IP-Adresse des SVWS-Servers.
+ Melde Dich am SVWS-Server und der gewünschten Datenbank an.
  ![SVWS-Client: Anmeldung](Bilder/Noten/svws_client_anmeldung.png)  
+ Wähle links im Menü des SVWS-Client die App "Noten" aus.
  ![SVWS-Client: App "Noten" auswählen](Bilder/Noten/svws_client_app_noten_waehlen.png)   
+ Wähle in der zweiten Fensterspalte unter "Noten" den gewünschten Lernabschnitt.
  ![SVWS-Client: App "Noten" - "Halbjahr" auswählen](Bilder/Noten/svws_client_app_noten_halbjahr.png)   
+ Danach klicke bei der "Noteneingabe" auf "Teilleistungen" oder auf "Leistungsdaten", um die jeweils gewünschten Noten einzutragen.
    ![SVWS-Client: App "Noten" - "TL" auswählen](Bilder/Noten/svws_client_app_noten_teilleistungen.png)

::: details

+ Trage nun in der nächsten Spalte in das Suchfeld die gewünschte Klasse ein.
   ![SVWS-Client: App "Noten" - "Lerngruppe" auswählen](Bilder/Noten/svws_client_app_noten_lerngruppe_waehlen.png)
+ Markiere das Fach in der Klasse, für das Du Noten eintragen möchtest.
+ Für dieses Fach wird nun die Klassenliste mit den Teilleistungsarten angezeigt.
  ![SVWS-Client: App "Noten" - "Lerngruppe" auswählen](Bilder/Noten/svws_client_app_noten_tl_eintragen.png)

+ Trage nun für die Teilleistungsarten die Noten ein.
+ Hierzu musst Du nur in die jeweiligen Felder klicken und die Eintragungen vornehmen.
+ Um zwischen den Feldern in einer Zeile zu springen, kannst Du die Tabulator-Taste nutzen.
+ Nach Wechsel des Feldes ist die Note bereits gespeichert.

:::