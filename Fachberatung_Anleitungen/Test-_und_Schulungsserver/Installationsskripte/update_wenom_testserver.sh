#!/usr/bin/env bash
if [[ "${1:-}" == --help || "${1:-}" == -h ]]; then
  echo "Bestandsskript: update_wenom_testserver.sh. Zweck, Parameter und Einschränkungen: Installationsskripte/index.md#pruefbericht"
  exit 0
fi
set -e
umask 077
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

INSTALLPATH=/var/www/html/wenom
SVWSVERSION=""
RESET_DATA=false

# Parameter auswerten
AUTO_YES=false

while getopts "yv:r" opt; do
    case "$opt" in
        v) SVWSVERSION="$OPTARG" ;;
        r) RESET_DATA=true ;;
        y)
            AUTO_YES=true
            ;;
        *)
            echo "Verwendung: $0 -v VERSION -r [-y]; -r erlaubt ausdrücklich den vollständigen Daten-Neuaufbau"
            exit 1
            ;;
    esac
done

[[ "$SVWSVERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ && "$RESET_DATA" == true ]] || {
  echo "Version (-v) und expliziter Daten-Neuaufbau (-r) erforderlich." >&2; exit 2;
}
DOWNLOADPATH="https://github.com/SVWS-NRW/SVWS-Server/releases/download/v${SVWSVERSION}/WeNoM-${SVWSVERSION}.zip"
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

# Vor dem Eingriff das neue Paket in einem temporären Ordner vollständig prüfen.
WORK=$(mktemp -d)
trap 'rm -rf -- "$WORK"' EXIT
curl --fail --show-error --silent --location "$DOWNLOADPATH" -o "$WORK/wenom.zip"
unzip -t "$WORK/wenom.zip" >/dev/null
[[ -d "$INSTALLPATH/db" && -d "$INSTALLPATH/public" ]] || { echo "Erwartete WeNoM-Struktur fehlt." >&2; exit 1; }

# Verzeichnisse vorbereiten

########## optional: Datenbank sichern in root ordner ###########
# cp "$INSTALLPATH/db/app.sqlite" "/root/app.sqlite.backup.$(date +%Y%m%d_%H%M%S)"
BACKUP="/root/wenom-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
tar -C "$INSTALLPATH" -czf "$BACKUP" .
echo "Sicherung: $BACKUP"
rm -rf "$INSTALLPATH"/*
cd "$INSTALLPATH" || exit 1
cp "$WORK/wenom.zip" wenom.zip
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
echo ""

########### optional: eingerichtete DB-User wieder zurück kopieren ###########
#cp /root/app.sqlite.backup "$INSTALLPATH/db/app.sqlite"

chown -R www-data:www-data $INSTALLPATH

echo "Deployment erfolgreich abgeschlossen!"