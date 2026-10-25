#!/usr/bin/env bash
set -euo pipefail
usage() { echo "Nutzung: $0 -f DATEI.sqlite -n SCHEMA [-s SERVER] [-P PORT] -u SCHEMAUSER [--insecure]"; echo "SVWS_ROOT_PASSWORD und SVWS_SCHEMA_PASSWORD vorher als Umgebungsvariablen setzen."; }
FILE= SCHEMA= USERNAME= SERVER=localhost PORT=8443
TLS=()
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --insecure) TLS=(--insecure); shift ;;
    -f|-n|-s|-P|-u)
      (($# >= 2)) || exit 2; key=$1; value=$2; shift 2
      case "$key" in -f) FILE=$value ;; -n) SCHEMA=$value ;; -s) SERVER=$value ;; -P) PORT=$value ;; -u) USERNAME=$value ;; esac ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ -f "$FILE" && "$SCHEMA" =~ ^[A-Za-z][A-Za-z0-9_]{0,63}$ && "$USERNAME" =~ ^[A-Za-z][A-Za-z0-9_]{0,31}$ ]] || { usage >&2; exit 2; }
[[ "$SERVER" =~ ^[A-Za-z0-9.-]+$ && "$PORT" =~ ^[1-9][0-9]{0,4}$ ]] && ((10#$PORT > 0 && 10#$PORT <= 65535)) || exit 2
[[ -n "${SVWS_ROOT_PASSWORD:-}" && -n "${SVWS_SCHEMA_PASSWORD:-}" ]] || { echo "Beide Passwortvariablen fehlen." >&2; exit 2; }
[[ "$(head -c 15 -- "$FILE")" == "SQLite format 3" ]] || { echo "Keine SQLite-Datei." >&2; exit 2; }
curl --fail-with-body --silent --show-error --connect-timeout 5 --max-time 180 \
  "${TLS[@]}" --user "root:$SVWS_ROOT_PASSWORD" \
  -X POST "https://$SERVER:$PORT/api/schema/root/import/sqlite/$SCHEMA" \
  -H 'accept: application/json' -F "database=@$FILE" \
  --form-string "schemaUsername=$USERNAME" --form-string "schemaUserPassword=$SVWS_SCHEMA_PASSWORD"
echo
echo "Import-Anfrage erfolgreich. Schema im AdminClient und Anmeldung mit Übungsbenutzer prüfen."
