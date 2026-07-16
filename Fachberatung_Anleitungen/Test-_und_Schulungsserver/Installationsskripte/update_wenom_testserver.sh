#!/bin/bash
###############################################
### Das Skript löscht alle Docker Container ###
###############################################
#  
# Copyright (c) (Mai 2026) Theo Richter & David Klein
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
###############################################

INSTALLPATH=/var/www/html
DOWNLOADPATH="https://github.com/SVWS-NRW/SVWS-Server/releases/download/v1.3.3/WeNoM-1.3.3.zip"

# Parameter auswerten
AUTO_YES=false

while getopts "y" opt; do
    case "$opt" in
        y)
            AUTO_YES=true
            ;;
        *)
            echo "Verwendung: $0 [-y]"
            exit 1
            ;;
    esac
done

# Sicherheitsabfrage nur ohne -y
if [ "$AUTO_YES" = false ]; then
    echo "Achtung!"
    echo "Das Update überschreibt die bestehende Installation"
    echo "und löscht alle Datenbankeinträge."
    echo "Bitte vorher ein Backup erstellen!"
    echo

    read -rp "Wollen Sie wirklich alle Daten löschen? [y/N] " antwort

    case "$antwort" in
        [yY]|[yY][eE][sS])
            echo "Update wird gestartet..."
            ;;
        *)
            echo "Update abgebrochen."
            exit 0
            ;;
    esac
fi

# System-Update
apt update && apt upgrade -y && apt autoremove -y

# Verzeichnisse vorbereiten

cp "$INSTALLPATH/db/app.sqlite" /root/app.sqlite.backup
rm -rf "$INSTALLPATH"/*
cd "$INSTALLPATH" || exit 1
wget -O wenom.zip "$DOWNLOADPATH"
unzip -q wenom.zip

# Berechtigungen sicher setzen
chown -R www-data:www-data "$INSTALLPATH"
find "$INSTALLPATH" -type d -exec chmod 755 {} +
find "$INSTALLPATH" -type f -exec chmod 644 {} +

# API-Setup triggern
curl -k --request GET --url https://localhost/api/setup \
     --header "Content-Type: application/x-www-form-urlencoded"

echo -e "\nDas Secret zum Verbinden mit dem SVWS Server ist:\n"
cat "$INSTALLPATH/db/client.sec"

echo -e "\n\n!!! Achtung: Das Secret wird unter https://URL/secret.html veröffentlicht !!!"
echo "!!! Nur für Testzwecke geeignet !!!"
echo

cat "$INSTALLPATH/db/client.sec" > /var/www/html/secret/secret.html

# optional: eingerichtete DB-User wieder zurück kopieren
cp /root/app.sqlite.backup "$INSTALLPATH/db/app.sqlite"

chown -R www-data:www-data $INSTALLPATH

echo "Deployment erfolgreich abgeschlossen!"