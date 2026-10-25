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
if [[ "${1:-}" == -h || "${1:-}" == --help ]]; then
  echo "Historischer Name: importiert EINE lokale SQLite-Datei über den veröffentlichten HTTPS-Port."
  echo "Nutzung: $0 -nr CONTAINER -f DATEI -n SCHEMA -u SCHEMAUSER [--insecure]; beide SVWS_*_PASSWORD-Variablen setzen."; exit 0
fi
CONTAINER= FILE= SCHEMA= USERNAME= TLS=()
while (($#)); do
  case "$1" in
    --insecure) TLS=(--insecure); shift ;;
    -nr|-f|-n|-u) (($# >= 2)) || exit 2; key=$1; value=$2; shift 2
      case "$key" in -nr) CONTAINER=$value ;; -f) FILE=$value ;; -n) SCHEMA=$value ;; -u) USERNAME=$value ;; esac ;;
    *) exit 2 ;;
  esac
done
[[ "$CONTAINER" =~ ^[a-zA-Z0-9][a-zA-Z0-9_.-]*$ && -f "$FILE" && -n "$SCHEMA" && -n "$USERNAME" ]] || exit 2
[[ "$(docker inspect -f '{{.State.Running}}' "$CONTAINER")" == true ]] || exit 1
MAPPING=$(docker port "$CONTAINER" 8443/tcp | awk '/^[0-9.]+:/ {print; exit}')
HOST=${MAPPING%:*}
PORT=${MAPPING##*:}
[[ "$HOST" != 0.0.0.0 ]] || HOST=127.0.0.1
[[ "$PORT" =~ ^[1-9][0-9]{0,4}$ ]] || { echo "Kein veröffentlichter IPv4-HTTPS-Port." >&2; exit 1; }
BASE=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
exec bash "$BASE/Installationsskripte/create_svws_testdbs.sh" -f "$FILE" -n "$SCHEMA" -u "$USERNAME" -s "$HOST" -P "$PORT" "${TLS[@]}"
