# Installationsskripte Test- bzw. Schulungsserver

Hier eine reduzierte Sammlung grundlegender Skrtipte zu Installation verschiedener Test- bzw. Schulungsserver: 

+ SVWS-Server mit dem Linuxinstaller
+ SVWS-Server unter docker
+ Wenom-Server
+ Weblupo
+ Svws-Tool: SVWS-Medis, SVWS-Gradehub, SVWS-Conference, SVWS-Import, ... 

Es folgen nun Erläuterungen und Beispiele der einzelnen Skripte

## download_all_scripts.sh

Mit dem Skript download_all_scripts.sh kann man alle in diesem Githubordner befindlichen Skripte herunterladen: 

```bash 
wget https://github.com/SVWS-NRW/Schulungsunterlagen/raw/refs/heads/master/Fachberatung_Anleitungen/Schulungsserver/Installationsskripte/download_all_scripts.sh
bash download_all_scripts.sh
```

## install_svws_testserver_docker.sh

Diese Skript installiert unter dem Basefolder `/docker`in einem noch anzugebenden Verzeichnis einen SVWS-Server inkl. MariaDB in einem Docker mit dem angegebnen Passwort. Das Passwort ist dann für Mariadb und svws server gleich. 

```bash 
bash install_svws_testserver_docker.sh -p svwsadmin -v 1.3.2 -o svwsserver
```

## install_svws_schild3_svws-tools_testserver.sh



Installiert einen **all-in-one Server** mit 

+ einer Übersichtsseite inkl. Infos und links
+ SVWS-Server
+ Schild 3 in einer Windowsfreigabe
+ Wenom
+ Weblupo
+ SVWS-Conference
+ SVWS-Import
+ SVWS-Main-Server
+ SVWS-Media
+ SVWS-GradeHub

![alt text](./graphics/uebersichtsseite_all_in_one.png)

Beispiel für den Aufruf einer Installation unter den Namen und unter dem Ordner `svws`, SVWS Version : 1.3.2, Schild Version: 3.4.0, mit dem Passwort `svwsadmin`: 

```bash 
bashbash install_svws_schild3_svws-tools_testserver.sh -o svws -v 1.3.2 -sv 3.4 -p svwsadmin_testserver.sh -o svws -v 1.3.2 -sv 3.4.0 -p svwsadmin
```

