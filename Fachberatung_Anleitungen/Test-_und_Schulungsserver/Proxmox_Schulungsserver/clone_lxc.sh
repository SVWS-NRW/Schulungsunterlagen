#!/usr/bin/env bash
if [[ "${1:-}" == --help || "${1:-}" == -h ]]; then
  echo "Bestandsskript: clone_lxc.sh. Zweck, Parameter und Einschränkungen: Installationsskripte/index.md#pruefbericht"
  exit 0
fi
set -e
umask 077

set -e

usage() {
    echo "Verwendung: $0 -i <LXCNR_IN> -n <ANZAHL>"
    exit 1
}

while getopts "i:n:" opt; do
    case ${opt} in
        i ) SRC_CT="$OPTARG" ;;
        n ) NUM_CLONES="$OPTARG" ;;
        * ) usage ;;
    esac
done

[[ "$SRC_CT" =~ ^[1-9][0-9]{2,8}$ && "$NUM_CLONES" =~ ^[1-9][0-9]{0,2}$ ]] || usage
((NUM_CLONES <= 128)) || usage

# Existiert der Quellcontainer?
if ! pct config "$SRC_CT" >/dev/null 2>&1; then
    echo "Fehler: Container $SRC_CT existiert nicht."
    exit 1
fi

# Originalhostname auslesen
ORIG_HOSTNAME=$(pct config "$SRC_CT" | awk '/^hostname:/ {print $2}')

if [[ -z "$ORIG_HOSTNAME" ]]; then
    echo "Fehler: Hostname konnte nicht ermittelt werden."
    exit 1
fi

echo "Quellcontainer: $SRC_CT"
echo "Hostname: $ORIG_HOSTNAME"

# Container herunterfahren falls er läuft
STATUS=$(pct status "$SRC_CT" | awk '{print $2}')

if [[ "$STATUS" == "running" ]]; then
    echo "Fahre Container $SRC_CT herunter..."
    pct shutdown "$SRC_CT" --timeout 120

    while [[ "$(pct status "$SRC_CT" | awk '{print $2}')" != "stopped" ]]; do
        sleep 2
    done

    echo "Container gestoppt."
fi

# Klone erzeugen
for ((i=1; i<=NUM_CLONES; i++)); do

    NEW_CT=$((SRC_CT + i))
    NEW_HOSTNAME="${ORIG_HOSTNAME}-${i}"

    echo
    echo "=== Clone $i ==="
    echo "CT-ID: $NEW_CT"
    echo "Hostname: $NEW_HOSTNAME"

    if pct config "$NEW_CT" >/dev/null 2>&1; then
        echo "Container-ID $NEW_CT existiert bereits -> übersprungen."
        continue
    fi

    pct clone "$SRC_CT" "$NEW_CT" --full 1

    pct set "$NEW_CT" --hostname "$NEW_HOSTNAME"

    # Erst nach Prüfung von IP-Adresse, Identität und Zugangsdaten starten.

    echo "Klon $NEW_CT vorbereitet, bleibt zur Netzprüfung ausgeschaltet."

done

echo
echo "Fertig."