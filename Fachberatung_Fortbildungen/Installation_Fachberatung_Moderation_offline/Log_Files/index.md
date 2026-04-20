# Ordnerstruktur und wichtige Installationsdateien


### C:\ProgramData\SVWS-Server
Sichten Sie die Log-Datei **svws_server_service.out.log**. Diese liegt im Ordner C:\ProgramData\SVWS-Server\logs.
Prüfen Sie
* Wurde die Migration erfolgreich beendet?
* Wurden Kursarten angepasst?
* Gab es fehlerhafte Datensätze? Beispielsweise Datensätze mit ungültigem Schulgliederungseintrag?
* Optional: Suchen Sie diesen Fehleintrag in SchILD2 und korrigieren Sie diesen oder
* Optional: Suchen Sie den Eintrag mit DBeaver und ergänzen Sie ggf. den Eintrag.

&nbsp;

Sichten Sie die Datei **svwsconfig.json** im Ordner C:\ProgramData\SVWS-Server\res. Beachten Sie, dass hier ihr Benutzername und ihr Passwort in Klartext gespeichert sind.
Die Bedeutung der einzelnen Parameter können [hier](https://doku.svws-nrw.de/Deployment/Windows-Installer/#konfigurationsdatei-editieren) nachgelesen werden.


### SVWS-Arbeitsverzeichnis
Sichten Sie den Ordner C:\SVWS-Arbeitsverzeichnis. Hier werden u.a. Sicherungen, Reports und Verbindungsdateien abgespeichert. Der Ordner wurde bei der Installation von SchILD-NRW3 erstellt. Für das Arbeiten im Browser wird dieser Ordner nicht benötigt.

* Sichten Sie einmal ihre **Verbindungsdatei**?
* Welche **Reports** werden bei der Installation bereits ausgerollt?


