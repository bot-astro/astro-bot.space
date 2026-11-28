---
title: Interfaces
description: Lerne mit dieser Anleitung, wie dein Interface großartig und einzigartig aussieht
---

## Was ist ein Interface?

Ein Interface ist eine Nachricht, mit der Nutzer ihren temporären Sprachkanal schnell über einfache Buttons verwalten können.  
So sieht das Standard-Interface aus:
![Standard-Interface](/guides/default_interface.png 'Standard-Interface')

## Ein Interface erstellen

Du kannst im Dashboard im Bereich Interfaces ein neues Interface erstellen.  
Es fragt nach einem Kanal und du kannst den gewünschten auswählen.

## Kanal ändern oder ein Interface erneut senden

Wenn du eine Interface-Nachricht versehentlich gelöscht hast oder einfach den Kanal wechseln möchtest, kannst du das in den Interface-Einstellungen im Dashboard tun.

## Ein Interface anpassen

Du kannst jedes Interface im Dashboard anpassen: Öffne den Bereich Interfaces, wähle ein Interface und klicke auf Verwalten.  
Wenn du fertig bist, speichere deine Änderungen und Astro aktualisiert die Nachricht sofort.

_Denke daran, dass du ohne [Ultimate](/ultimate) nur die Buttons eines Interfaces deaktivieren oder aktivieren kannst, alles andere erfordert es._

### Nachrichteneinstellungen

Die Nachricht besteht aus drei Teilen, jeder mit eigenen Einstellungen:

- `Kopf`: der Autorenname, der Autor-Link und das Autorenbild
- `Text`: der Titel, der Titel-Link, das Vorschaubild, die Beschreibung und das Bild
- `Fußzeile`: der Text der Fußzeile, das Bild der Fußzeile, die Farbe der Linie links neben der Nachricht und ein Zeitstempel

Jede Einstellung ist optional, wenn du einen Text leer lässt, wird er einfach nicht angezeigt.  
Das Autorenbild und das Bild haben einen Standardwert, den du mit dem Button `Auf Standard zurücksetzen` wiederherstellen kannst.

### Bilder

Bilder werden aus dem Medienspeicher deines Servers ausgewählt. Klicke auf `Bild auswählen`, um ihn zu öffnen, von dort aus kannst du:

- ein neues Bild hochladen
- bereits hochgeladene Bilder in der Vorschau ansehen
- ein Bild für die Einstellung auswählen, die du gerade bearbeitest
- Bilder löschen, die du nicht mehr brauchst

_Beim Löschen eines Bildes wird es auch aus den Einstellungen des Interfaces entfernt, das du gerade bearbeitest, andere Interfaces, die es verwenden, zeigen ein defektes Bild an, bis du es änderst._

Bilder, die von keinem Interface verwendet werden, werden von Zeit zu Zeit automatisch aufgeräumt.

### Eigene Emojis

Emojis können in den Nachrichtentexten und auf den Buttons verwendet werden. Standard-Emojis können einfach eingefügt werden, eigene Discord-Emojis benötigen stattdessen ihren Code:

1. Gehe zu Discord und schreibe das Emoji mit einem vorangestellten Backslash, zum Beispiel `\:name:`
2. Sende die Nachricht, Discord sendet den Code des Emojis, wie `<:name:id>` (oder `<a:name:id>` für animierte Emojis)
3. Kopiere diesen Code und füge ihn im Dashboard ein

## Buttons

Ein Interface kann bis zu 5 Reihen mit je 5 Buttons haben, das Dashboard zeigt sie als Raster an.  
Klicke auf einen Button, um ihn zu bearbeiten, oder auf eine leere Position, um einen neuen hinzuzufügen.

Jeder Button hat diese Einstellungen:

- `Button`: welcher Button an dieser Position angezeigt wird. Ein Button kann pro Interface nur einmal verwendet werden, daher sind bereits an anderer Stelle platzierte nicht auswählbar. Wähle `Kein Button`, um ihn zu entfernen
- `Deaktiviert`: Nutzer können den Button sehen, aber nicht anklicken
- `Name`: der auf dem Button angezeigte Text
- `Emoji`: das auf dem Button angezeigte Emoji
- `Stil`: die Farbe des Buttons

Ein Button braucht mindestens einen Namen oder ein Emoji, um angezeigt zu werden.

## Ein Interface löschen

Du kannst ein Interface jederzeit im Dashboard löschen.

### Beispiel für ein angepasstes Interface

Das Bild unten ist ein Beispiel für ein angepasstes Interface:
![angepasstes Interface](/illustration/custom_interface.png 'Angepasstes Interface')
