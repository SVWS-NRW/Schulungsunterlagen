#!/usr/bin/env bash
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
set -euo pipefail
usage() { echo "Nutzung: $0 --schema NAME [-s SERVER] [-P PORT] [--execute --confirm-server SERVER] [--insecure]"; echo "SVWS_ROOT_PASSWORD setzen. Ohne --execute nur Vorschau; KEIN pauschales Löschen mehr."; }
SCHEMA= SERVER=localhost PORT=8443 EXECUTE=false CONFIRM=
TLS=()
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --execute) EXECUTE=true; shift ;;
    --insecure) TLS=(--insecure); shift ;;
    --schema|-s|-P|--confirm-server)
      (($# >= 2)) || exit 2; key=$1; value=$2; shift 2
      case "$key" in --schema) SCHEMA=$value ;; -s) SERVER=$value ;; -P) PORT=$value ;; --confirm-server) CONFIRM=$value ;; esac ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ "$SCHEMA" =~ ^[A-Za-z][A-Za-z0-9_]{0,63}$ && "$SERVER" =~ ^[A-Za-z0-9.-]+$ && "$PORT" =~ ^[1-9][0-9]{0,4}$ ]] && ((10#$PORT > 0 && 10#$PORT <= 65535)) || { usage >&2; exit 2; }
echo "Ziel: $SERVER:$PORT, einzelnes Schema: $SCHEMA"
if [[ "$EXECUTE" == false ]]; then echo "Vorschau: nichts verändert."; exit 0; fi
[[ "$CONFIRM" == "$SERVER" && -n "${SVWS_ROOT_PASSWORD:-}" ]] || { echo "Zielbestätigung oder Passwort fehlt." >&2; exit 2; }
curl --fail-with-body --silent --show-error --connect-timeout 5 --max-time 180 \
  "${TLS[@]}" --user "root:$SVWS_ROOT_PASSWORD" \
  -X POST "https://$SERVER:$PORT/api/schema/root/destroy/$SCHEMA" -H 'accept: application/json'
echo
echo "Löschanfrage erfolgreich. Schema-Liste im AdminClient kontrollieren."
