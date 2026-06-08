# Installationsskripte Schulungsserver

Hier eine reduzierte Sammlung grundlegender Skrtipte zu Installation verschiedener Test- bzw. Schulungsserver: 

+ SVWS-Server mit dem Linuxinstaller
+ SVWS-Server unter docker
+ Wenom-Server
+ Weblupo
+ Svws-Tool: SVWS-Medis, SVWS-Gradehub, SVWS-Conference, SVWS-Import, ... 

Es folgen nun Erläuterungen und Beispiele der einzelnen Skripte

## download_all_scripts.sh

Mit dem Skript [download_all_scripts.sh](./download_all_scripts.sh) kann man alle in diesem Githubordner befindlichen Skripte herunterladen: 

```bash 
wget https://github.com/SVWS-NRW/Schulungsunterlagen/raw/refs/heads/master/Fachberatung_Anleitungen/Schulungsserver/Installationsskripte/download_all_scripts.sh
bash download_all_scripts.sh
```

## install_svws_testserver_docker.sh

Diese Skript installiert unter dem Basefolder `/docker`in einem anzugebenden Verzeichnis einen SVWS server inkl. mariadb als docker mit dem angegebnen Passwort (für mariadb und svws server)

```bash 
bash install_svws_testserver_docker.sh -p svwsadmin -v 1.3.2 -o svwsserver
```