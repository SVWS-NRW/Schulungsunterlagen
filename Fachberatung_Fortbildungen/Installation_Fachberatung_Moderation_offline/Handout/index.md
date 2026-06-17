# Installation
In diesem Modul werden wir...
* den SVWS-Server installieren
* eine SchILD2-DB migrieren,
* das Zertifikat installieren
* SchILD-NRW3 installieren,
* eine weitere Datenbank migrieren,
* Dantenbanken sichern und wieder einlesen,
* wichtige Installations-Ordner und log-Dateien kennenlernen und
* die Datenbankstruktur mit DBeaver sichten.



## Installation vom SVWS-Server
Starten Sie mit der Installation vom [Installation vom SVWS-Server](https://github.com/SVWS-NRW/Schulungsunterlagen/blob/master/Installation_Fachberatung_Moderation/Installation_SVWS/index.md). Wählen Sie hierbei die Option, direkt eine SchILD2 DB zu migrieren.


## Installation des Zertifikats
In Abhängigkeit der Browsereinstellung erscheint beim Öffnen der Datenbank über den Browser der Hinweis, dass die Seite nicht sicher ist. Um die Seite als sicher zu definieren, muss das Zertifikat installiert werden, welches bei der Installation vom SVWS-Server erstellt wurde. Entsprechende Aufgaben dazu finden Sie [hier](https://github.com/SVWS-NRW/Schulungsunterlagen/blob/master/Installation_Fachberatung_Moderation/Installation_Zertifikat/index.md).

&nbsp;

Nun können Sie die Datenbank einmal im [Brower sichten](https://github.com/SVWS-NRW/Schulungsunterlagen/blob/master/Installation_Fachberatung_Moderation/SVWS_Client_Sichten/index.md).

&nbsp;

Optional: Nach der Installation können Sie bereits die Datenbank mit [DBeaver](https://github.com/SVWS-NRW/Schulungsunterlagen/blob/master/Installation_Fachberatung_Moderation/DBeaver/index.md) sichten. Das ist für die weitere Installation nicht notwendig.


## Installation von SchILD3
Ich empfehle, bei der Erstinstallation zuerst den SVWS-Server zu installieren und anschließend erst SchILD3. Nach der Installation von SchILD3 öffnet sich automatisch ein weiteres Programm, um die Verbindungsdatei zur Datenbank zu erstellen (früher: URL-Datei). Dies ist nur dann sinnvoll, wenn bereits eine Datenbank migriert wurde.
Hier gehts zum Start der [SchILD3-Installation](https://github.com/SVWS-NRW/Schulungsunterlagen/blob/master/Installation_Fachberatung_Moderation/Installation_SchILD3/index.md).

&nbsp;

Die beiden nachfolgenden Aufgabenblöcke zu Log-Files und DBeaver richtet sich an Interessierte, die die Migration und Datenbankstruktur etwas genauer unter die Lupe nehmen wollen. Den Log-Files kann man unter anderem entnehmen, ob bei der Migration fehlerhafte Einträge erkannt wurden und was mit diesen Fehleinträgen passiert ist. Beispielsweise wird bei Gymnasien der Eintrag zur Kursart WPI bei der Migration automatisch ersetzt durch WPIGY. Solche Anpassungen werden unter anderem in der log-Datei festgehalten. 

## Log-Files
Ich empfehle zumindest einen kurzen Blick darauf, wo man die entsprechenden log-Dateien findet:  
https://github.com/SVWS-NRW/Schulungsunterlagen/tree/master/Installation_Fachberatung_Moderation/Log_Files

## DBeaver
Mit Hilfe von DBeaver kann die Datenbank geöffnet und die Datenbankstruktur sowie die einzelnen Tabellen gesichtet werden. Hier gibts es eine [Anleitung](https://github.com/SVWS-NRW/Schulungsunterlagen/tree/master/Installation_Fachberatung_Moderation/DBeaver) dazu.


## Admin-Tool
Mit Hilfe des Tools kann man Datenbanken sichern und einlesen. Man kann weitere Datenbanken migrieren und bestehenden MariaDBs dublizieren:
https://github.com/SVWS-NRW/Schulungsunterlagen/blob/master/Installation_Fachberatung_Moderation/AdminTool/index.md


