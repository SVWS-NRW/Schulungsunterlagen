#!/bin/bash

set -euo pipefail

usage() {
    echo "Verwendung: $0 -dn <FQDN> -url <URL>"
    exit 1
}

# Parameter einlesen
while [[ $# -gt 0 ]]; do
    case "$1" in
        -dn)
            FQDN="$2"
            shift 2
            ;;
        -url)
            URL="$2"
            shift 2
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo "Unbekannter Parameter: $1"
            usage
            ;;
    esac
done

# Pflichtparameter prüfen
if [[ -z "${FQDN:-}" || -z "${URL:-}" ]]; then
    echo "Fehler: -dn und -url sind Pflichtparameter."
    usage
fi

if [ -f "/etc/nginx/sites-available/${FQDN}.conf" ]; then
    echo "${FQDN}.conf existiert schon!"
    exit 1
else
    echo "${FQDN}.conf wird eingerichtet!"

    tee "/etc/nginx/sites-available/${FQDN}.conf" > /dev/null <<EOF
server {
    server_name ${FQDN};

    location / {
        proxy_pass https://${URL};
    }
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests;" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_http_version 1.1;
    proxy_read_timeout 300;
    proxy_connect_timeout 300;
    proxy_send_timeout 300;
}
EOF

    ln -s \
        "/etc/nginx/sites-available/${FQDN}.conf" \
        "/etc/nginx/sites-enabled/${FQDN}.conf"

    nginx -t
    nginx -s reload

    certbot -d "${FQDN}"
fi