# SVWS-Tools für eine Schulung ergänzen

## Ziel und Einsatzort

Du ergänzt **einen bereits laufenden SVWS-Server** um die tatsächlich benötigten Anwendungen. Du installierst hier weder einen Hypervisor noch Windows oder MariaDB.

Unterscheide zwei Fälle: Statische Webanwendungen können über `AppsPath` eingebunden werden. Andere Anwendungen benötigen eigene Serverdienste, eine Datenbank, eine gesonderte Konfiguration oder eine Kopplung an den SVWS-Server. Ein ZIP-Archiv installiert solche Dienste nicht automatisch.

## Voraussetzungen

- Funktionierender Server mit gesicherter `svwsconfig.json`.
- Für die konkrete Serverversion passendes Anwendungspaket.
- Kenntnis des Server-Dateisystems. Bei Docker zählt der Pfad **im Container**; ein Host-Pfad ohne passenden Mount ist dort nicht verfügbar.
- Eine konkrete Schulungsaufgabe, mit der Du die Anwendung nach dem Einrichten prüfst.

## Eine statische Anwendung einbinden

1. Beziehe die Anwendung aus der offiziellen Bereitstellung. Die [SVWS-Tools-Anleitung](https://doku.svws-nrw.de/deployment/svws-tools/) nennt die Anwendungen und weitere Hinweise.
2. Entpacke die Anwendung in ein eigenes Unterverzeichnis unterhalb des App-Verzeichnisses, beispielsweise `/opt/app/svws/apps/konferenz/`. Darin muss die startfähige `index.html` liegen.
3. Setze in der Serverkonfiguration den Schlüssel **`AppsPath`** auf das übergeordnete Verzeichnis. Es heißt nicht `Apps/Path` oder `Apps-Path`; maßgeblich ist die [Konfigurationsreferenz](https://doku.svws-nrw.de/deployment/Einrichtung/).
4. Starte den passenden SVWS-Dienst neu und teste die Anwendung.

Beispielwerte in der bestehenden JSON-Konfiguration:

```json
"AppsPath": "/opt/app/svws/apps/"
```

Unter Windows wäre ein entsprechender Wert beispielsweise `"AppsPath": "C:/SVWS-Arbeitsverzeichnis/tools/"`. Das Verzeichnis muss tatsächlich existieren und für das Dienstkonto lesbar sein. Achte auf gültige JSON-Syntax, insbesondere das Komma zwischen Einträgen.

Bei einem Server auf HTTPS-Port 8443 und dem App-Unterordner `konferenz` lautet der Aufruf zum Beispiel `https://SERVERADRESSE:8443/app/konferenz`. Das Unterverzeichnis bestimmt den App-Namen. Eine universelle Startseite `/app/start` gibt es nur, wenn Du genau eine solche App bereitgestellt hast.

## Vorhandenes Sammelarchiv

[tools.zip aus diesem Repository](https://github.com/Raffenberg/SVWS_FBM/raw/refs/heads/dev/Fachberatung_Anleitungen/Test-_und_Schulungsserver/SVWS-Tools/tools.zip) bleibt als Beispielbestand verfügbar. Die Datei belegt keine allgemeine Kompatibilität mit beliebigen zukünftigen Serverversionen. Prüfe enthaltene Unterordner, Versionsstand und benötigte Dienste vor dem Einsatz; nimm das Archiv nicht ungeprüft als automatischen Aktualisierungskanal.

Der experimentelle All-in-one-Installer baut teilweise Anwendungen aus beweglichen Entwicklungsständen. Er gehört deshalb nicht zum empfohlenen Grundaufbau; siehe [Prüfstatus der Skripte](../Installationsskripte/#pruefbericht).

## Abnahme

- App-Seite wird vom Arbeitsplatz geladen; keine fehlenden Dateien oder Browserfehler.
- Anmeldung, Serveradresse und Übungsschema stimmen.
- Die konkrete Funktion der Schulungsaufgabe lässt sich ausführen.
- Ein erforderlicher zusätzlicher Dienst ist dokumentiert und im Rücksetzplan enthalten.

Ein sichtbares App-Symbol oder eine erreichbare Startseite allein beweist noch keine funktionierende Verbindung zur Datenbank.
