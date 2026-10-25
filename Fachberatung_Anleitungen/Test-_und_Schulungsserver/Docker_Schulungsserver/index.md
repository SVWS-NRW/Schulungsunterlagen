# Schulungsserver mit Docker

## Ziel und Einsatzort

Du richtest **auf einem vorhandenen Docker-Host genau ein neues Projekt mit SVWS-Server und MariaDB** ein. Der Host kann eine zentrale Debian-VM im Schulungsraum oder eine lokale Debian-VM auf einem Laptop sein. Der Browser und gegebenenfalls SchILD-NRW 3 laufen auf den Arbeitsplätzen, nicht in diesem Projekt.

Eine Docker-Neustartaktion setzt keine Datenbanken zurück. Daten und Konfiguration bleiben in den Projektordnern erhalten. Mehrere Projekte sind erst nötig, wenn wirklich unterschiedliche Serverversionen oder getrennte Dienstinstanzen benötigt werden.

## Voraussetzungen

- Eigene, administrierte Test-VM; keine produktive Schulverwaltung.
- Docker Engine mit Compose-Plug-in. Unter Debian hilft [install_docker.sh](./install_docker.sh); es installiert nur Docker und prüft Konfliktpakete. Voraussetzungen stehen auch in der [Docker-Anleitung für Debian](https://docs.docker.com/engine/install/debian/).
- Ausgewählte SVWS- und MariaDB-Version, freie Ports, erreichbare Serveradresse und ein Sicherungsziel.
- Für zentrale Nutzung: Freigabe der benötigten Verbindungen durch die Raumadministration. Bei SchILD-NRW 3 auch MariaDB berücksichtigen.

## 1. Konfiguration vorbereiten

Speichere [docker_create_svws.sh](./docker_create_svws.sh) auf dem Docker-Host. Das Skript erstellt keine Datenbank, importiert keine Datei und installiert Docker nicht nebenbei.

Beispiel für einen **zunächst nur lokal erreichbaren Prüfaufbau**:

```bash
bash docker_create_svws.sh -o ./schulung -v 1.4.1 --db-version 11.8 --prepare-only
```

Die Versionsangaben sind der Prüfaufbau dieser Überarbeitung, kein Auftrag zum ungeprüften Update vorhandener Räume. Tags sind keine unveränderlichen Image-Digests. Dokumentiere die tatsächlich bezogenen Images vor der Freigabe.

Prüfe `schulung/docker-compose.yml` und die geschützte Datei `schulung/.env`. Das Skript überschreibt keinen vorhandenen Projektordner. Ohne `-p` erzeugt es ein zufälliges Passwort; es schreibt den Wert nicht in die Konsolenausgabe. Für selbst gesetzte Passwörter gelten die in `--help` genannten Zeichen und die Mindestlänge.

### Für einen zentralen Raumserver

Ersetze die Beispieladresse durch die **tatsächliche IPv4-Adresse des Docker-Hosts im freigegebenen Schulungsnetz**. Ein optional veröffentlichter Datenbankport wird nur benötigt, wenn SchILD-NRW 3 aus diesem Netz zugreifen soll:

```bash
bash docker_create_svws.sh -o ./raumserver -v 1.4.1 --db-version 11.8   --bind 192.168.50.10 -pt 8443 -mp 3306 --prepare-only
```

Die Adresse und Portfreigaben sind mit der Raumadministration abzustimmen; der Host muss diese Adresse selbst besitzen. MariaDB-Zugangsdaten für Teilnehmende sind keine Root-Zugangsdaten. Ein offener Port ersetzt keine passenden Benutzerrechte.

## 2. Starten und Dienstbereitschaft prüfen

```bash
cd schulung
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose logs --tail 100
```

Rufe den Server über seine tatsächliche HTTPS-Adresse auf, zum Beispiel `https://127.0.0.1:8443` am Host oder `https://192.168.50.10:8443` von einem freigegebenen Arbeitsplatz. Prüfe Zertifikat, AdminClient und Anmeldung. Ein Status „running“ allein ist noch keine fachliche Abnahme.

Der frühere Dateiname [install_svws_testserver_docker.sh](./install_svws_testserver_docker.sh) ist jetzt ein Kompatibilitätsaufruf desselben Projektgenerators und benötigt `docker_create_svws.sh` daneben. Er führt keine zusätzliche Installation oder automatischen Import mehr aus.

## 3. Daten und Arbeitsplätze zuordnen

Importiere die gewählte SQLite-Sicherung im AdminClient. Lege getrennte Schemata und Zugänge an. Prüfe eine echte Schulungsaufgabe von jedem vorgesehenen Arbeitsplatz. Für SchILD-NRW 3 richte die `.con`-Datei nach der [offiziellen Anleitung](https://doku.svws-nrw.de/deployment/Schild-NRW3/) ein.

Ein Import per Skript ist nur mit ausdrücklich gewählter Datei und Schemaname vorgesehen; siehe [Skriptwerkzeuge](../Installationsskripte/index.md). Die alten SQL-Klonhelfer sind kein Standardweg zur Vergabe voneinander getrennter Zugangsdaten.

## Wartung und Rücksetzen

- Zum **Neustart**: `docker compose restart`.
- Zum **Stoppen**: `docker compose stop`.
- Zum **Rücksetzen einer Übung**: das betreffende Schema aus dem freigegebenen Ausgangsbackup wiederherstellen; vorher Benutzende abmelden.
- Zum **Versionswechsel**: Sicherung anlegen, Kopie des Projekts prüfen, Image-Version bewusst ändern, Datenmigration und Rückweg testen.
- Zum **Entfernen der Projektcontainer**: `docker compose down`. Dies ist kein Datenbankreset. Die eingebundenen Ordner bleiben erhalten.

Die historischen Skripte [delete_all_docker_container.sh](./delete_all_docker_container.sh) und [docker_rm_all_container.sh](./docker_rm_all_container.sh) verlangen jetzt einen gekennzeichneten Projektordner. Ohne `--execute` prüfen sie nur; globale Containerlisten werden nicht mehr gestoppt oder gelöscht.

Siehe [Docker: Lebenszyklus der Daten](https://docs.docker.com/engine/storage/volumes/) und [Compose down](https://docs.docker.com/reference/cli/docker/compose/down/). Sichere MariaDB-Daten nicht durch unkoordiniertes Kopieren laufender Datenbankdateien.
