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
umask 077
usage() { echo "Nutzung: $0 -v X.Y.Z -p PASSWORT [--prepare-only]"; echo "Nur frische Debian-Server/VM; neuer Unterordner svws-install-X.Y.Z mit geschützter .env."; }
VERSION= PASSWORD= PREPARE=false
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    --prepare-only) PREPARE=true; shift ;;
    -v|-p) (($# >= 2)) || exit 2; key=$1; value=$2; shift 2
      case "$key" in -v) VERSION=$value ;; -p) PASSWORD=$value ;; esac ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ && "$PASSWORD" =~ ^[A-Za-z0-9_-]{12,}$ ]] || { usage >&2; exit 2; }
[[ "$PREPARE" == true || "$EUID" -eq 0 ]] || { echo "Root-Rechte erforderlich." >&2; exit 1; }
WORK="svws-install-$VERSION"
[[ ! -e "$WORK" && ! -L "$WORK" ]] || { echo "Arbeitsordner existiert bereits; keine .env überschrieben." >&2; exit 1; }
command -v curl >/dev/null
mkdir -- "$WORK"
(
  cd -- "$WORK"
  curl --fail --show-error --silent --location --retry 2 \
    "https://github.com/SVWS-NRW/SVWS-Server/releases/download/v$VERSION/install-$VERSION.sh" -o "install-$VERSION.sh"
  bash -n "install-$VERSION.sh"
  cat > .env <<EOF
CREATE_MARIADB=j
CREATE_KEYSTORE=j
MARIADB_ROOT_PASSWORD=$PASSWORD
APP_PATH=/opt/app/svws
CONF_PATH=/etc/app/svws/conf
APP_PORT=8443
SVWS_TLS_KEYSTORE_PATH=/etc/app/svws/conf/keystore
SVWS_TLS_KEYSTORE_PASSWORD=$PASSWORD
SVWS_TLS_KEY_ALIAS=svws
INPUT_COMMON_NAME=svws
INPUT_ORGANIZATIONAL_UNIT=Schulung
INPUT_ORGANIZATION=Schulung
INPUT_LOCALITY=NRW
INPUT_STATE=NRW
INPUT_COUNTRY=DE
validity_days=3650
EOF
  chmod 600 .env
  if [[ "$PREPARE" == false ]]; then bash "install-$VERSION.sh"; fi
)
echo "Arbeitsordner: $WORK. Version, .env und tatsächliche Dienstbereitschaft dokumentieren."
