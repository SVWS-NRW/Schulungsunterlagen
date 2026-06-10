#!/bin/bash

###############################################
# WeNoM Multi-Instanz Generator
# Erstellt DB + Apache VHosts + aktiviert sie
###############################################

# =========================
# KONFIGURATION
# =========================
DB_FOLDER="/var/www/html/db"
WEBROOT="/var/www/html/public"
APACHE_CONF_DIR="/etc/apache2/sites-available"

SSL_CERT="/etc/ssl/certs/wenomtest-selfsigned.crt"
SSL_KEY="/etc/ssl/private/wenomtest-selfsigned.key"

# =========================
# PARAMETER
# =========================
COUNT=""
URL=""

usage() {
    echo "Verwendung: $0 -n <Anzahl> -url <Domain>"
    echo "Beispiel: $0 -n 15 -url schule.de"
    exit 1
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        -n)
            COUNT="$2"
            shift 2
            ;;
        -url)
            URL="$2"
            shift 2
            ;;
        *)
            usage
            ;;
    esac
done

# =========================
# VALIDIERUNG
# =========================
[[ -z "$COUNT" ]] && usage
[[ -z "$URL" ]] && usage

if ! [[ "$COUNT" =~ ^[0-9]+$ ]]; then
    echo "Fehler: -n muss eine Zahl sein"
    exit 1
fi

# =========================
# ERSTELLUNG
# =========================
echo "Erzeuge $COUNT WeNoM Instanzen für Domain: $URL"

for ((i=1; i<=COUNT; i++)); do

    DBDIR="${DB_FOLDER}/wenom${i}"
    CONF_FILE="wenom${i}.${URL}.conf"
    CONF_PATH="${APACHE_CONF_DIR}/${CONF_FILE}"
    SERVERNAME="wenom${i}.${URL}"

    mkdir -p "$DBDIR"

    cat > "$CONF_PATH" <<EOF
<VirtualHost *:443>
    ServerName ${SERVERNAME}

    DocumentRoot ${WEBROOT}

    SSLEngine on
    SSLCertificateFile ${SSL_CERT}
    SSLCertificateKeyFile ${SSL_KEY}

    <Directory ${WEBROOT}>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/${SERVERNAME}.error.log
    CustomLog \${APACHE_LOG_DIR}/${SERVERNAME}.access.log combined
</VirtualHost>
EOF

    echo "OK erstellt: $CONF_FILE"

    # VHost aktivieren
    a2ensite "$CONF_FILE" >/dev/null 2>&1

done

echo "Reload Apache..."
systemctl reload apache2

echo "Fertig."