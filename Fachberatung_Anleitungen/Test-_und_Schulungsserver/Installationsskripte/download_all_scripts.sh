#!/usr/bin/env bash
set -euo pipefail
if [[ "${1:-}" == --help || "${1:-}" == -h ]]; then
  echo "Nutzung: $0 [ZIELORDNER]; Download aus Raffenberg/SVWS_FBM dev; keine Paketinstallation."; exit 0
fi
(($# <= 1)) || exit 2
command -v curl >/dev/null; command -v jq >/dev/null
TARGET=${1:-Installationsskripte}
[[ ! -e "$TARGET" && ! -L "$TARGET" ]] || { echo "Ziel existiert bereits." >&2; exit 1; }
REF=${FBM_REF:-dev}
URL="https://api.github.com/repos/Raffenberg/SVWS_FBM/contents/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte?ref=$REF"
LIST=$(curl --fail --silent --show-error --location "$URL")
jq -e 'type == "array"' <<< "$LIST" >/dev/null
mkdir -- "$TARGET"
while IFS=$'\t' read -r name url; do
  [[ "$name" =~ ^[A-Za-z0-9_.-]+$ && "$url" == https://raw.githubusercontent.com/* ]] || exit 1
  curl --fail --silent --show-error --location "$url" -o "$TARGET/$name"
done < <(jq -r '.[] | select(.type=="file") | select(.name|test("\\.sh$|\\.example$")) | [.name,.download_url] | @tsv' <<< "$LIST")
echo "Skripte in $TARGET gespeichert. Prüfstatus im Artikel beachten."
