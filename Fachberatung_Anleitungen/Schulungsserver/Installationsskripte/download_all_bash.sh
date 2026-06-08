#!/bin/bash

set -e

OWNER="SVWS-NRW"
REPO="Schulungsunterlagen"
PATH_IN_REPO="Fachberatung_Anleitungen/Schulungsserver/Installationsskripte"

apt update && apt upgrade -y && apt autoremove -y
apt install curl jq -y

mkdir -p Installationsskripte
cd Installationsskripte

API_URL="https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH_IN_REPO}"

echo "Lade Dateiliste..."
curl -s "$API_URL" | jq -r '.[] | select(.type=="file") | .download_url' | while read -r url
do
    file=$(basename "$url")
    echo "Lade $file ..."
    curl -L -o "$file" "$url"
done

echo "Fertig."