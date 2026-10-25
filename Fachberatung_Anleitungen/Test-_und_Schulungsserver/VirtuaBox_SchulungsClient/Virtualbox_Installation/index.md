# VirtualBox und eine lokale Debian-Server-VM

## Ziel

Du installierst VirtualBox **auf dem Windows-Laptop oder Windows-Raum-PC** und darin eine Debian-VM für die Serverdienste. SchILD-NRW 3 bleibt bei dieser Variante auf dem Windows-Host. Die VM enthält es nicht.

## Vorbereiten

Prüfe Host-Unterstützung, CPU-Architektur, aktivierte Hardwarevirtualisierung und ausreichende Ressourcen. Für die Server-VM kannst Du zunächst 2 vCPUs, 8 GB RAM und 40 GB virtuelle Platte einplanen und den Bedarf dann praktisch prüfen. Ohne ausreichende Reserven ist der zentrale Server die bessere Wahl.

Beziehe VirtualBox über die [offizielle Downloadseite](https://www.virtualbox.org/wiki/Downloads). Wähle den passenden Host-Installer und beachte dessen aktuelle Voraussetzungen. Eine zusätzlich benötigte Microsoft-Runtime beziehst Du aus der [Microsoft-Quelle](https://aka.ms/vc14/vc_redist.x64.exe).

Die unten erhaltenen Bilder zeigen eine konkrete ältere Beispielinstallation. Versionsnummern und Dialoge können abweichen; feste Patchversionen in einer Anleitung sind keine dauerhaften Downloadadressen.

## 1. VirtualBox auf Windows installieren

1. Speichere offene Arbeiten und schließe Programme, deren Netzverbindung nicht unterbrochen werden darf.
2. Starte den geprüften Installer mit den benötigten Administrationsrechten.
3. Lies Netzwerk- und Treiberhinweise. Die Einrichtung virtueller Adapter kann Verbindungen kurz unterbrechen; Warnungen nicht pauschal ignorieren.
4. Starte VirtualBox und prüfe, ob Du eine neue VM anlegen kannst.

## 2. Debian-Gast anlegen

1. Lade ein passendes Installationsabbild von [Debian](https://www.debian.org/distrib/). Die Architektur muss zum geplanten Gast und Host passen.
2. Erstelle eine neue VM; wähle Debian und die passende Architektur. Ordne die ISO als Installationsmedium zu.
3. Weise die geplanten Ressourcen zu und installiere Debian auf **der virtuellen Platte**, nicht auf einer Host-Platte.
4. Für einen reinen Server reichen Basissystem und bei Bedarf SSH; eine grafische Oberfläche ist kein Erfordernis für den SVWS-Server.
5. Erstelle verwaltete Zugangsdaten, starte neu und entferne das ISO aus dem virtuellen Laufwerk.

## 3. Netzwerk passend zum Einsatz wählen

| Netzmodus | Geeignet für | Wichtige Grenze |
| --- | --- | --- |
| NAT | Downloads und ausgehende Verbindungen des Gasts | Vom Host oder Raum aus ist ein Server im Gast ohne Portweiterleitung nicht automatisch erreichbar |
| Host-only plus zweiter NAT-Adapter | Lokale Verbindung zwischen Laptop und Gast sowie Downloads | Host-only allein bietet keinen Internetzugang; keine zusätzlichen Standardgateways auf beiden Adaptern konfigurieren |
| Netzwerkbrücke | Gast als eigener Rechner im freigegebenen Schulungsnetz | Netzverwaltung, WLAN-/MAC-Vorgaben und Adressvergabe müssen das unterstützen |

Notiere die **Gastadresse**. Eine Windows-PowerShell-Verbindung per `ssh BENUTZER@GASTADRESSE` setzt einen laufenden SSH-Dienst im Gast voraus. „localhost“ auf Windows bezeichnet nicht automatisch die VM.

Grundlage ist [Oracle: Netzwerkmodi](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/networkingdetails.html).

## 4. Serverdienste installieren

Wähle in der Debian-VM genau einen Grundaufbau: [Docker-Projekt](../../Docker_Schulungsserver/index.md) oder [Linux-Installer](../../Installationsskripte/index.md#linux-installer). Installiere WeNoM oder weitere Tools erst, wenn eine Schulungsaufgabe sie benötigt.

Beim Linux-Wrapper sind **Version und Passwort erforderlich**. Ein Aufruf nur mit `-v` genügt nicht. Nutze die dokumentierten Parameter; lade keine Skripte aus den früheren, inzwischen abweichenden Repositorypfaden.

## 5. Ausgangsstand, Snapshots und Klone

Teste Anmeldung, Datenimport und bei Bedarf die SchILD-Verbindung. Fahre die VM anschließend geordnet herunter und sichere den geprüften Stand. Ein Snapshot dient dem schnellen Rücksprung; eine separate Sicherung schützt auch vor Verlust der Laptop-Platte.

Bei einem Klon sind Name, Netzwerkidentität, IP-Adresse und Zugangsdaten zu prüfen. Verteile keine parallel verwendeten statischen Adressen. Ein Snapshot oder Klon ersetzt außerdem keine Prüfung der Zugänge und der Dateisystemkonsistenz.

::: details Bildfolge der bisherigen Beispielinstallation
Die Bilder bleiben als Orientierung erhalten. Nutze die aktuelle Textanleitung für Ziel, Netzmodus und Abnahme; übernimm sichtbare Namen, Adressen und Versionsstände nicht unverändert.

![Beispielinstallation: 1 – image](image.png)

![Beispielinstallation: 2 – image-1](image-1.png)

![Beispielinstallation: 3 – image-2](image-2.png)

![Beispielinstallation: 4 – image-3](image-3.png)

![Beispielinstallation: 5 – image-4](image-4.png)

![Beispielinstallation: 6 – image-5](image-5.png)

![Beispielinstallation: 7 – image-6](image-6.png)

![Beispielinstallation: 8 – image-7](image-7.png)

![Beispielinstallation: 9 – image-8](image-8.png)

![Beispielinstallation: 10 – image-11](image-11.png)

![Beispielinstallation: 11 – image-10](image-10.png)

![Beispielinstallation: 12 – image-14](image-14.png)

![Beispielinstallation: 13 – image-16](image-16.png)

![Beispielinstallation: 14 – image-17](image-17.png)

![Beispielinstallation: 15 – image-18](image-18.png)

![Beispielinstallation: 16 – image-19](image-19.png)

![Beispielinstallation: 17 – image-20](image-20.png)

![Beispielinstallation: 18 – image-22](image-22.png)

![Beispielinstallation: 19 – image-23](image-23.png)

![Beispielinstallation: 20 – image-24](image-24.png)

![Beispielinstallation: 21 – image-25](image-25.png)

![Beispielinstallation: 22 – image-26](image-26.png)

![Beispielinstallation: 23 – image-27](image-27.png)

![Beispielinstallation: 24 – image-29](image-29.png)

![Beispielinstallation: 25 – image-28](image-28.png)

![Beispielinstallation: 26 – image-31](image-31.png)

![Beispielinstallation: 27 – image-30](image-30.png)

![Beispielinstallation: 28 – image-12](image-12.png)

![Beispielinstallation: 29 – image-13](image-13.png)
:::

## Erfolgskontrolle

Die Debian-VM startet reproduzierbar, die benötigten Endpunkte sind vom Windows-Host erreichbar, das richtige Übungsschema wird geöffnet und ein Rücksetzversuch funktioniert. Dokumentiere dafür VM-Datei, Programmstände, Netzmodus und Ansprechpartner.
