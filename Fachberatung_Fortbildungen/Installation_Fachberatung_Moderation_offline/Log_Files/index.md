# Ordnerstruktur und wichtige Installationsdateien


### C:\ProgramData\SVWS-Server
Sichte die Log-Datei **svws_server_service.out.log**. Diese liegt im Ordner C:\ProgramData\SVWS-Server\logs.
Prüfe
* Wurde die Migration erfolgreich beendet?
* Wurden Kursarten angepasst?
* Gab es fehlerhafte Datensätze? Beispielsweise Datensätze mit ungültigem Schulgliederungseintrag?
* Optional: Suche diesen Fehleintrag in SchILD2 und korrigiere diesen oder
* Optional: Suche den Eintrag mit DBeaver und ergänze ggf. den Eintrag.

&nbsp;

Sichte die Datei **svwsconfig.json** im Ordner C:\ProgramData\SVWS-Server\res. Beachte, dass hier ihr Benutzername und ihr Passwort in Klartext gespeichert sind.
Die Bedeutung der einzelnen Parameter können [hier](https://doku.svws-nrw.de/Deployment/Windows-Installer/#konfigurationsdatei-editieren) nachgelesen werden.


### SVWS-Arbeitsverzeichnis
Sichte den Ordner C:\SVWS-Arbeitsverzeichnis. Hier werden u.a. Sicherungen, Reports und Verbindungsdateien abgespeichert. Der Ordner wurde bei der Installation von SchILD-NRW3 erstellt. Für das Arbeiten im Browser wird dieser Ordner nicht benötigt.

* Sichte einmal Deine **Verbindungsdatei**?
* Welche **Reports** werden bei der Installation bereits ausgerollt?


