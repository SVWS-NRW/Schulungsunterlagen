# Installation von SchILD-NRW3
### Download der Installationsdateien
Laden Sie sich im SchILD-NRW-Repository die notwendigen Installationspakete herunter.  

Die aktuellen Installationsdateien von SchILD-NRW3 befinden sich im GitHub: 
https://github.com/SVWS-NRW/Schild3-BetaTest/releases

![Release](./graphics/InstallationSchild_GitHubRelease.png)

> [!WARNING] 
> Die Version von SchILD-NRW3 und dem SVWS-Server müssen miteinander kompartibel sein. Ansonsten kann es zu Problemen kommen. Bei einem Update des SVWS-Servers wird die Datenbank automatisch auf den aktuellsten Stand gesetzt. Greift SchILD3 beispielsweise auf ein Feld zu, das es in einer aktuelleren Version des SVWS-Server nicht mehr gibt, kommt es zu einer Fehlermeldung. Um dies zu vermeinden wird die Server-Version mit angegeben, mit der das aktuelle Schildupdate getestet wurde. 

&nbsp;

Auch ohne diesen Link, findet man die Downloadseite auf der Homepage von GitHub. Unter www.github.com/SVWS-NRW:
![Repository SVWS-NRW/Schild3-BetaTest](./graphics/InstallationSchild_GitHubSuchen.png)


Nach Auswahl des Repositorys SVWS-NRW/SVWS-Server kommt man über Releases auf die Downloadseite:

&nbsp;


### Installation Starten
Führen Sie die Installation als Administrator aus!


> [!TIP] 
> Eine ausführliche Anleitung finden Sie auch im [Wiki](https://schulverwaltungsinfos.nrw.de/svws/wiki/index.php?title=Installation_SVWS-Server_und_SchILD-NRW_3#Installation_von_SchILD-NRW_3 ).


Nach der Installation öffnet sich automatisch das Programm **SchILD_DBConfig.exe** aus dem Ordner C:\Program Files (x86)\SchILD-NRW3. Mit diesem Programm kann die Verbindungsdatei xyz.con erstellt und gespeichert werden. Bei weiteren Migrationen muss dieses Programm manuell gestartet werden, um entsprechende Verbindungsdateien zu den weiteren Datenbanken zu erstellen.

> [!TIP] 
> Eine gute Anleitung finden Sie auch im [Wiki](https://schulverwaltungsinfos.nrw.de/svws/wiki/index.php?title=Installation_SVWS-Server_und_SchILD-NRW_3#Die_Konfigurationsdatei_.28auch_mit_SchILD_DBConfig.exe.29). 
> 






