#!/bin/bash

# Prüfen, ob iconv installiert ist
if ! command -v iconv &> /dev/null; then
    echo "Fehler: 'iconv' wird benötigt, ist aber nicht installiert."
    exit 1
fi

echo "Starte Konvertierung in UTF-8..."

# Rekursiv alle .md Dateien finden
find . -type f -name "*.md" | while read -r file; do
    # Bestimme die aktuelle Kodierung
    encoding=$(file -b --mime-encoding "$file")

    # Konvertiere alles, was NICHT bereits utf-8 ist (also auch us-ascii)
    if [[ "$encoding" != "utf-8" ]]; then
        echo "Verarbeite: $file (Kodierung gefunden: $encoding)"
        
        # In temporäre Datei konvertieren
        # Wir versuchen erst die Erkennung der Quelldatei für iconv zu nutzen
        if iconv -f "$encoding" -t UTF-8 "$file" > "$file.tmp" 2>/dev/null; then
            mv "$file.tmp" "$file"
            echo "  --> Erfolgreich nach UTF-8 konvertiert."
        else
            # Fallback auf ISO-8859-1, falls die automatische Erkennung fehlschlägt
            iconv -f ISO-8859-1 -t UTF-8 "$file" > "$file.tmp" 2>/dev/null && mv "$file.tmp" "$file"
            echo "  --> Konvertiert via Fallback (ISO-8859-1)."
        fi
    else
        echo "Überspringe: $file (bereits UTF-8)"
    fi
done

echo "Alle Dateien wurden verarbeitet."