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
usage() { echo "Nutzung: $0 -nr CT_ID --schema NAME [--execute --confirm-container CT_ID]"; echo "SVWS_ROOT_PASSWORD setzen. Kein pauschales Löschen; Vorschau ohne --execute."; }
ID= SCHEMA= CONFIRM= EXECUTE=false
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --execute) EXECUTE=true; shift ;;
    -nr|--schema|--confirm-container)
      (($# >= 2)) || exit 2; key=$1; value=$2; shift 2
      case "$key" in -nr) ID=$value ;; --schema) SCHEMA=$value ;; --confirm-container) CONFIRM=$value ;; esac ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ "$ID" =~ ^[1-9][0-9]{2,8}$ && "$SCHEMA" =~ ^[A-Za-z][A-Za-z0-9_]{0,63}$ ]] || { usage >&2; exit 2; }
echo "Zielcontainer $ID, einzelnes Schema $SCHEMA"
if [[ "$EXECUTE" == false ]]; then echo "Vorschau; keine Änderung."; exit 0; fi
[[ "$CONFIRM" == "$ID" && -n "${SVWS_ROOT_PASSWORD:-}" ]] || exit 2
SOURCE=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../Installationsskripte" && pwd)/delete_all_svws_dbs.sh
pct config "$ID" >/dev/null
pct push "$ID" "$SOURCE" /root/fbm-delete-schema.sh
pct exec "$ID" -- env "SVWS_ROOT_PASSWORD=$SVWS_ROOT_PASSWORD" bash /root/fbm-delete-schema.sh \
 --schema "$SCHEMA" --execute --confirm-server localhost --insecure
