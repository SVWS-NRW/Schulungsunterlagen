#!/usr/bin/env bash
set -euo pipefail
PROJECT=$(mktemp -d)/fbm-ci
SCRIPT=Fachberatung_Anleitungen/Test-_und_Schulungsserver/Docker_Schulungsserver/docker_create_svws.sh
cleanup() {
  docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" logs --no-color > test-results/training-docker.log 2>&1 || true
  tail -n 100 test-results/training-docker.log || true
  docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" down --volumes || true
}
mkdir -p test-results
bash "$SCRIPT" -o "$PROJECT" -v 1.4.1 --db-version 11.8 -dn fbm-ci -p Testpasswort_123 -pt 18443 --prepare-only
trap cleanup EXIT
docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" config --quiet
docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" up -d
ready=false
for attempt in {1..90}; do
  if curl --fail --silent --insecure --connect-timeout 2 --max-time 5 https://127.0.0.1:18443/ > /dev/null; then ready=true; break; fi
  sleep 3
done
[[ "$ready" == true ]] || { echo "SVWS-Dienst nicht bereit." >&2; exit 1; }
curl --fail-with-body --silent --show-error --insecure --user root:Testpasswort_123 \
  https://127.0.0.1:18443/api/schema/liste/svws > test-results/training-schemata.json
jq -e 'type == "array"' test-results/training-schemata.json > /dev/null
DATA="$PROJECT/probe.sqlite"
curl --fail --silent --show-error --location --retry 2 \
 "https://media.githubusercontent.com/media/Raffenberg/SVWS_FBM/d77833732b64678227dc8d586cc0d9b42c5210b2/Datenbanken/Grundschule/gs_2026_1.sqlite" -o "$DATA"
export SVWS_ROOT_PASSWORD=Testpasswort_123 SVWS_SCHEMA_PASSWORD=NurFuerCI_123
bash Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/create_svws_testdbs.sh \
 -f "$DATA" -n fbm_probe -u fbm_probe -s 127.0.0.1 -P 18443 --insecure > test-results/training-import.log
curl --fail-with-body --silent --show-error --insecure --user root:Testpasswort_123 \
 https://127.0.0.1:18443/api/schema/liste/svws | jq -e 'any(.[]; .name == "fbm_probe")' > /dev/null
bash Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/delete_all_svws_dbs.sh \
 --schema fbm_probe -s 127.0.0.1 -P 18443 --execute --confirm-server 127.0.0.1 --insecure > test-results/training-delete.log
curl --fail-with-body --silent --show-error --insecure --user root:Testpasswort_123 \
 https://127.0.0.1:18443/api/schema/liste/svws | jq -e 'all(.[]; .name != "fbm_probe")' > /dev/null
# Derselbe Name und Benutzer müssen nach dem Entfernen wiederherstellbar sein.
bash Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/create_svws_testdbs.sh \
 -f "$DATA" -n fbm_probe -u fbm_probe -s 127.0.0.1 -P 18443 --insecure > test-results/training-reimport.log
curl --fail-with-body --silent --show-error --insecure --user root:Testpasswort_123 \
 https://127.0.0.1:18443/api/schema/liste/svws | jq -e 'any(.[]; .name == "fbm_probe")' > /dev/null
docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" images > test-results/training-images.txt
echo "Echte Containerprobe: SVWS 1.4.1 / MariaDB 11.8, HTTPS, Schema-Liste, echter SQLite-Import und gezieltes Entfernen erfolgreich."
