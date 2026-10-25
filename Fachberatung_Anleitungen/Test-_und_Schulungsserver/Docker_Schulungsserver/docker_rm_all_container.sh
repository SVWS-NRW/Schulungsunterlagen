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
usage() { echo "Nutzung: $0 --project-dir ORDNER [--execute]"; echo "Ohne --execute nur Prüfung. Entfernt nur Projektcontainer, NICHT die Datenordner."; }
PROJECT= EXECUTE=false
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --project-dir) (($# >= 2)) || exit 2; PROJECT=$2; shift 2 ;;
    --execute) EXECUTE=true; shift ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ -n "$PROJECT" && -f "$PROJECT/docker-compose.yml" ]] || { usage >&2; exit 2; }
grep -qx '# FBM-Schulungsprojekt' "$PROJECT/docker-compose.yml" || { echo "Kein gekennzeichnetes Schulungsprojekt; Abbruch." >&2; exit 1; }
docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" config --quiet
if [[ "$EXECUTE" == true ]]; then
  docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" down
else
  echo "Geprüft; keine Container verändert. Für das Entfernen --execute ergänzen."
fi
