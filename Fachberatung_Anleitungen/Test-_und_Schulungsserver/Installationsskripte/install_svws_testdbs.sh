#!/bin/bash

# Abbrechen, wenn ein Befehl mit Fehler beendet wird
set -e

# Speicherort des Skripts ermitteln (unabhängig davon, aus welchem Ordner es aufgerufen wird)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/.env"

# Parameter verarbeiten (-p <PASSWORT>)
CLI_PASSWORD=""
while getopts "p:" opt; do
  case ${opt} in
    p )
      CLI_PASSWORD="$OPTARG"
      ;;
    \? )
      echo "Verwendung: $0 [-p MYSQLROOTPW]"
      exit 1
      ;;
  esac
done

MYSQLROOTPW=""

# 1. Versuch: Aus .env Datei lesen
if [ -f "$ENV_FILE" ]; then
    # Liest die Variable MARIADB_ROOT_PASSWORD aus der .env Datei
    ENV_PASS=$(grep -E '^MARIADB_ROOT_PASSWORD=' "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    if [ -n "$ENV_PASS" ]; then
        MYSQLROOTPW="$ENV_PASS"
        echo "✓ Passwort aus .env geladen."
    fi
fi

# 2. Versuch: Falls kein Passwort in .env gefunden wurde, CLI-Parameter prüfen
if [ -z "$MYSQLROOTPW" ]; then
    if [ -n "$CLI_PASSWORD" ]; then
        MYSQLROOTPW="$CLI_PASSWORD"
        echo "✓ Passwort aus Übergabeparameter -p geladen."
    else
        echo "Fehler: Kein Passwort gefunden!"
        echo "Es wurde weder 'MARIADB_ROOT_PASSWORD' in '$ENV_FILE' gefunden, noch wurde der Parameter -p übergeben."
        echo "Aufrufbeispiel: $0 -p MeinRootPasswort"
        exit 1
    fi
fi

# --- EINSTELLUNGEN ---
REPO_URL="https://github.com/SVWS-NRW/SVWS-TestSqlites"
FOLDER_NAME="SVWS-TestSqlites"
USERNAME="svwsadmin"
PASSWORD="svwsadmin"
API_URL="https://localhost:8443/api/schema/root/import/sqlite/Test"

echo "Username: $USERNAME"
echo "Password: $PASSWORD"

echo -e "\n=== 1. Prüfe Git-Installation ==="
if ! command -v git &> /dev/null; then
    echo "Git ist nicht installiert. Versuche Git zu installieren..."
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y git
    elif command -v dnf &> /dev/null; then
        sudo dnf install -y git
    elif command -v yum &> /dev/null; then
        sudo yum install -y git
    elif command -v pacman &> /dev/null; then
        sudo pacman -S --noconfirm git
    else
        echo "Fehler: Paketmanager nicht erkannt. Bitte installiere Git manuell."
        exit 1
    fi
else
    echo "✓ Git ist bereits installiert."
fi


echo -e "\n=== 2. Prüfe Verzeichnis und Repository ==="
if [ ! -d "$FOLDER_NAME" ]; then
    echo "Ordner '$FOLDER_NAME' existiert nicht. Klonen wird gestartet..."
    git clone "$REPO_URL"
else
    echo "✓ Ordner '$FOLDER_NAME' existiert bereits."
fi


echo -e "\n=== 3. Wechsel in das Verzeichnis und git pull ==="
cd "$FOLDER_NAME"
echo "Aktualisiere Repository..."
git pull


echo -e "\n=== 4. Suche nach .sqlite Dateien ==="
shopt -s nullglob
sqlite_files=(*.sqlite)

if [ ${#sqlite_files[@]} -eq 0 ]; then
    echo "Keine .sqlite-Dateien im Ordner gefunden."
    exit 0
fi

echo "Gefundene Dateien: ${#sqlite_files[@]}"


echo -e "\n=== 5. Führe Import via Curl für jede Datei aus ==="
for file in "${sqlite_files[@]}"; do
    echo "----------------------------------------"
    echo "Verarbeite Datei: $file"
    
    curl -k -X POST "$API_URL" \
      -u "root:${MYSQLROOTPW}" \
      -H 'accept: application/json' \
      -H 'Content-Type: multipart/form-data' \
      -F "database=@${file}" \
      -F "schemaUsername=${USERNAME}" \
      -F "schemaUserPassword=${PASSWORD}"

    echo -e "\n"
done

echo "=== Fertig! ==="