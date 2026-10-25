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
usage() { echo "Nutzung: $0 -nr ID [-ip IPv4/CIDR] [-dn HOSTNAME] [-p ROOTPW]"; echo "LXC_TEMPLATE, VSWITCH, STORAGE und bei statischer IP GATEWAY als Umgebungsvariablen setzen."; }
ID= IP= NAME= PASSWORD=
while (($#)); do
  case "$1" in
    -h|--help) usage; exit 0 ;;
    -nr|-ip|-dn|-p) (($# >= 2)) || exit 2; key=$1; value=$2; shift 2
      case "$key" in -nr) ID=$value ;; -ip) IP=$value ;; -dn) NAME=$value ;; -p) PASSWORD=$value ;; esac ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ "$ID" =~ ^[1-9][0-9]{2,8}$ && -n "${LXC_TEMPLATE:-}" && -n "${VSWITCH:-}" && -n "${STORAGE:-}" ]] || { usage >&2; exit 2; }
NAME=${NAME:-svws-$ID}
[[ "$NAME" =~ ^[a-zA-Z][a-zA-Z0-9.-]{0,62}$ ]] || exit 2
if pct config "$ID" >/dev/null 2>&1; then echo "CT-ID existiert bereits." >&2; exit 1; fi
NET="name=eth0,bridge=$VSWITCH,firewall=1,ip=dhcp"
if [[ -n "$IP" ]]; then
  [[ "$IP" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}/[0-9]{1,2}$ && -n "${GATEWAY:-}" ]] || { echo "IPv4/CIDR und GATEWAY fehlen." >&2; exit 2; }
  NET="name=eth0,bridge=$VSWITCH,firewall=1,ip=$IP,gw=$GATEWAY"
fi
if [[ -z "$PASSWORD" ]]; then PASSWORD=$(openssl rand -hex 24); fi
CREDS="lxc-$ID.credentials"
[[ ! -e "$CREDS" && ! -L "$CREDS" ]] || { echo "Zugangsdaten-Datei existiert bereits." >&2; exit 1; }
printf 'ROOTPW=%s\n' "$PASSWORD" > "$CREDS"
chmod 600 "$CREDS"
pct create "$ID" "$LXC_TEMPLATE" --hostname "$NAME" --memory 4096 --swap 0 --cores 2 \
 --net0 "$NET" --rootfs "$STORAGE:16" --unprivileged 1 --ostype debian \
 --password "$PASSWORD" --start 1
pct set "$ID" --description "FBM Schulungscontainer $NAME; Zugangsdaten werden separat verwaltet."
echo "CT $ID erstellt. Zugangsdaten stehen in $CREDS; Netzwerk und Kapazität noch prüfen."
