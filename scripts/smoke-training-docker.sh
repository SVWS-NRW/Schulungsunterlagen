#!/usr/bin/env bash
set -euo pipefail
PROJECT=$(mktemp -d)/fbm-ci
SCRIPT=Fachberatung_Anleitungen/Test-_und_Schulungsserver/Docker_Schulungsserver/docker_create_svws.sh
cleanup() {
  docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" logs --no-color > test-results/training-docker.log 2>&1 || true
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
docker compose --project-directory "$PROJECT" -f "$PROJECT/docker-compose.yml" images > test-results/training-images.txt
echo "Echte Containerprobe: SVWS 1.4.1 / MariaDB 11.8, HTTPS und authentifizierte Schema-Liste erfolgreich."
