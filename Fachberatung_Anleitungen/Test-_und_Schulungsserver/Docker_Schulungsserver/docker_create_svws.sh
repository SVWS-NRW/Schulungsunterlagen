#!/usr/bin/env bash
# Copyright (c) $(date +%Y)
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
set -euo pipefail
umask 077
usage() {
  echo "Nutzung: $0 -o ORDNER -v SVWS_VERSION --db-version MARIADB_TAG [--bind IPv4] [-pt HTTPS_PORT] [-mp DB_PORT] [-dn NAME] [-p PASSWORT] [--prepare-only]"
  echo "Ein neues Compose-Projekt; standardmäßig nur localhost, kein Datenbankimport."
}
FOLDER= SVWSVERSION= DB_VERSION= PASSWORD= FQDN=
BIND=127.0.0.1 PORTNUMBER=8443 DB_PORT= PREPARE=false
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --prepare-only) PREPARE=true; shift ;;
    -o|-v|--db-version|--bind|-pt|-mp|-dn|-p)
      (($# >= 2)) || { usage >&2; exit 2; }
      key=$1; value=$2; shift 2
      case "$key" in
        -o) FOLDER=$value ;; -v) SVWSVERSION=$value ;; --db-version) DB_VERSION=$value ;;
        --bind) BIND=$value ;; -pt) PORTNUMBER=$value ;; -mp) DB_PORT=$value ;;
        -dn) FQDN=$value ;; -p) PASSWORD=$value ;;
      esac ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ -n "$FOLDER" && "$SVWSVERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ && "$DB_VERSION" =~ ^[0-9]+\.[0-9]+(\.[0-9]+)?$ ]] || { usage >&2; exit 2; }
[[ "$BIND" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || { echo "IPv4-Adresse ungültig." >&2; exit 2; }
IFS=. read -r a b c d <<< "$BIND"
for octet in "$a" "$b" "$c" "$d"; do
  ((10#$octet <= 255)) || { echo "Ungültige IPv4-Adresse." >&2; exit 2; }
done
for port in "$PORTNUMBER" ${DB_PORT:+"$DB_PORT"}; do
  [[ "$port" =~ ^[1-9][0-9]{0,4}$ ]] && ((10#$port >= 1024 && 10#$port <= 65535)) || { echo "Port muss 1024..65535 sein." >&2; exit 2; }
done
[[ -z "$DB_PORT" || "$DB_PORT" != "$PORTNUMBER" ]] || { echo "DB- und HTTPS-Port müssen verschieden sein." >&2; exit 2; }
[[ ! -e "$FOLDER" && ! -L "$FOLDER" ]] || { echo "Ziel existiert bereits; keine Dateien überschrieben." >&2; exit 1; }
FQDN=${FQDN:-$(basename -- "$FOLDER")}
[[ "$FQDN" =~ ^[a-z][a-z0-9_-]{0,39}$ ]] || { echo "Name: Kleinbuchstabe, danach a-z, 0-9, _ oder -; max. 40 Zeichen." >&2; exit 2; }
if [[ -z "$PASSWORD" ]]; then PASSWORD=$(openssl rand -hex 24); fi
[[ "$PASSWORD" =~ ^[A-Za-z0-9_-]{12,}$ ]] || { echo "Passwort: mindestens 12 Zeichen aus A-Z, a-z, 0-9, _ und -." >&2; exit 2; }
mkdir -p -- "$FOLDER"
cat > "$FOLDER/.env" <<EOF
IMPORT_TEST_DATA=false
MARIADB_ROOT_PASSWORD=$PASSWORD
MYSQL_ROOT_PASSWORD=$PASSWORD
MARIADB_HOST=mariadb
SVWS_TLS_KEYSTORE_PASSWORD=$PASSWORD
SVWS_TLS_KEY_ALIAS=svws
SVWS_TLS_KEYSTORE_PATH=.
SVWS_TLS_CERT_CN=$FQDN
SVWS_TLS_CERT_OU=Schulung
SVWS_TLS_CERT_O=Schulung
SVWS_TLS_CERT_L=NRW
SVWS_TLS_CERT_S=NRW
SVWS_TLS_CERT_C=DE
EOF
cat > "$FOLDER/docker-compose.yml" <<EOF
# FBM-Schulungsprojekt
services:
  mariadb:
    image: mariadb:$DB_VERSION
    container_name: ${FQDN}_mariadb
    restart: unless-stopped
    env_file: [.env]
    environment:
      MARIADB_HOST: 127.0.0.1
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      interval: 5s
      timeout: 5s
      retries: 30
      start_period: 20s
    volumes:
      - ./volume/mariadb:/var/lib/mysql
EOF
if [[ -n "$DB_PORT" ]]; then
  printf '    ports:\n      - "%s:%s:3306"\n' "$BIND" "$DB_PORT" >> "$FOLDER/docker-compose.yml"
fi
cat >> "$FOLDER/docker-compose.yml" <<EOF
  svws-server:
    image: svwsnrw/svws-server:$SVWSVERSION
    container_name: ${FQDN}_svwsserver
    restart: unless-stopped
    depends_on:
      mariadb:
        condition: service_healthy
    env_file: [.env]
    ports:
      - "$BIND:$PORTNUMBER:8443"
    volumes:
      - ./volume/svws:/opt/app/svws/conf
EOF
chmod 600 "$FOLDER/.env"
printf 'Projekt: %s\nZugangsdaten: %s/.env (nur lokal lesen)\n' "$FOLDER" "$FOLDER"
if [[ "$PREPARE" == false ]]; then
  docker compose --project-directory "$FOLDER" -f "$FOLDER/docker-compose.yml" config --quiet
  docker compose --project-directory "$FOLDER" -f "$FOLDER/docker-compose.yml" up -d
  echo "Container gestartet. Dienstbereitschaft und Import im AdminClient gesondert prüfen."
fi
