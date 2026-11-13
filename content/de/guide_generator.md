---
title: Generatoren
description: Lerne, wie du Generatoren für temporäre Sprachkanäle konfigurierst und verwendest
---

## Was ist ein Generator?

Generatoren sind Kanäle, die von Astro erstellt und verwaltet werden.  
Wenn ein Nutzer einem Generator beitritt, erstellt Astro einen temporären Sprachkanal und verschiebt den Nutzer dorthin.

Der Nutzer, der den temporären Sprachkanal erstellt, wird Besitzer genannt.
Der Besitzer kann den Kanal mit den Slash-Befehlen von Astro oder mit den [Interfaces](/guides/interface) verwalten, beides erlaubt es, den Kanalnamen, das Nutzerlimit, die Berechtigungen und alles andere zu ändern.

Sobald der Besitzer den Kanal verlässt und sich noch andere _Nicht-Bot_-Nutzer im Kanal befinden, wird der Besitz zufällig an einen anderen Nutzer übertragen.  
Wenn der Besitzer den Kanal verlässt und keine Nutzer mehr im Kanal sind, wird er gelöscht.

Generatoren sind extrem anpassbar, in dieser Anleitung lernst du, wie du sie so konfigurierst, dass sie perfekt zu den Anforderungen deines Servers passen!

## Generatoren erstellen und verwalten

Astro kann mehrere Generatoren verwalten und jeder hat seine eigenen Einstellungen.  
Im Bereich Generatoren des Dashboards siehst du alle Generatoren deines Servers, kannst neue erstellen sowie bestehende verwalten und löschen.

_Denke daran, dass du ohne [Ultimate](/ultimate) maximal 2 Generatoren haben kannst._

## Namenseinstellungen

Ein temporärer Sprachkanal kann sich in drei verschiedenen Zuständen befinden: Standard, gesperrt oder versteckt.  
Diese Zustände werden von Nutzern entweder über Slash-Befehle oder das Interface umgeschaltet.

Du kannst für jeden Zustand einen Namen festlegen:
![Namenseinstellungen des Generators](/guides/generator_name.png "Namenseinstellungen des Generators")

### Variablen

Du kannst `Variablen` verwenden, um den Kanalnamen dynamisch zu machen. Astro ersetzt die Variablen beim Anwenden des neuen Namens durch den passenden Wert:

#### Variablen zum Besitzer des Sprachkanals

| Variable     | Beschreibung                                                                |
| ------------ | --------------------------------------------------------------------------- |
| `{nickname}` | Der Spitzname (oder der Benutzername, falls keiner vorhanden) des Besitzers |
| `{username}` | Der Benutzername des Besitzers                                              |
| `{mention}`  | Die Erwähnung (@name) des Besitzers                                         |
| `{id}`       | Die ID des Besitzers                                                        |

#### Variablen zur Aktivität des Besitzers des Sprachkanals · [erfordert Ultimate](/ultimate)

| Variable                | Beschreibung                                                          |
| ----------------------- | --------------------------------------------------------------------- |
| `{activity_name}`       | Der Name der Aktivität des Besitzers (zum Beispiel der Spielname)     |
| `{activity_emoji}`      | Ein Emoji, das die Aktivität darstellt                                |
| `{activity_start_time}` | Der Zeitpunkt, zu dem der Besitzer die Aktivität begonnen hat         |
| `{activity_end_time}`   | Der Zeitpunkt, zu dem die Aktivität endet oder geendet hat            |
| `{activity_type}`       | Die Art der Aktivität (spielen, schauen, hören usw.)                  |
| `{activity_link}`       | Der Link zum Twitch-Stream, falls die Aktivität ein Twitch-Stream ist |

#### Variablen zum Sprachkanal

| Variable         | Beschreibung                         |
| ---------------- | ------------------------------------ |
| `{vc_name}`      | Der Name des Sprachkanals            |
| `{vc_bitrate}`   | Die Bitrate des Sprachkanals         |
| `{vc_userlimit}` | Das Nutzerlimit des Sprachkanals     |
| `{vc_users}`     | Die Anzahl der Nutzer im Sprachkanal |
| `{vc_id}`        | Die ID des Sprachkanals              |
| `{vc_mention}`   | The vc as a mention (#voice-channel) |

#### Variablen für inkrementelle Werte · [erfordert Ultimate](/ultimate)

| Variable  | Beschreibung                                           |
| --------- | ------------------------------------------------------ |
| `{n}`     | Eine einfache fortlaufende Zahl (1, 2, 3...)           |
| `{nato}`  | Fortlaufendes NATO-Alphabet (Alpha, Bravo, Charlie...) |
| `{roman}` | Fortlaufende römische Zahlen (I, II, III, IV...)       |

**Wie funktionieren fortlaufende Nummern?**  
Wegen der neuen Discord-Beschränkung, die es erlaubt, den Namen eines Sprachkanals nur 2 Mal alle 10 Minuten zu ändern, funktioniert diese Funktion etwas anders, als du vielleicht erwartest:  
Die Sprachkanäle werden fortlaufend erzeugt: Der Bot sucht den ersten fehlenden Sprachkanal und setzt den neuen Sprachkanal an dessen Stelle.

Beispiel: Wir haben 5 von Astro fortlaufend erzeugte Sprachkanäle [VC #1, VC#2, VC #3, VC #4 und VC#5], nun wird VC #3 gelöscht. Astro wird nicht jeden einzelnen Sprachkanal auf den passenden Namen umbenennen (also VC#4 zu VC #3 und so weiter), stattdessen heißt der nächste erstellte Sprachkanal nicht VC #6, sondern VC #3, sodass die Lücke gefüllt wird.

Wenn du siehst, dass die Nummern mit der falschen Zahl beginnen, kannst du im Dashboard auf den Button `Cache leeren` klicken, um den Zähler zurückzusetzen
![Cache leeren](/guides/clear_cache.png "Cache leeren")

### Bedingungen für die Namensaktualisierung

Du kannst auch festlegen, wann ein Kanalname aktualisiert werden soll:
![Bedingungen für die Namensaktualisierung des Generators](/guides/generator_name_conditions.png "Bedingungen für die Namensaktualisierung des Generators")

### Einschränkungen bei der Namensaktualisierung

Der Name eines Discord-Sprachkanals kann nur 2 Mal alle 10 Minuten geändert werden, Discord hat diese Einschränkung vor einiger Zeit leider eingeführt.
Deshalb sind die Namen von Sprachkanälen bei häufigen Änderungen möglicherweise nicht immer genau.

## Grundeinstellungen

Im Dashboard findest du außerdem Optionen, um Folgendes zu ändern:

- die Kategorie, in der temporäre Sprachkanäle erzeugt werden
- das Nutzerlimit
- die Bitrate
- die Position: ob der temporäre Sprachkanal direkt vor dem Generator, direkt danach oder am Ende der Kategorie erstellt werden soll
- um die Region zu ändern, kannst du direkt in Discord die Region des Generatorkanals ändern
- den Standardstatus des Sprachkanals: der kleine Text unter dem Namen eines Sprachkanals, Besitzer können ihn jederzeit mit dem Befehl `/status` ändern

## Berechtigungseinstellungen

### Vererbung von Berechtigungen

Temporäre Sprachkanäle erben standardmäßig die Berechtigungen vom Generator.  
Du kannst dieses Verhalten im Dashboard ändern: Kanäle können stattdessen die Berechtigungen der Kategorie kopieren oder gar keine Berechtigungen kopieren.

### Zielrolle

Die Zielrolle ist eine der wichtigsten Einstellungen. Wenn die Kanalberechtigungen geändert werden müssen, zum Beispiel wenn der Kanal gesperrt oder versteckt wird, ändert Astro die Berechtigungen der Zielrolle, um den gewünschten Zustand zu erreichen.  
Wenn Nutzer auf deinem Server zum Beispiel einen Verifizierungsprozess durchlaufen und eine Rolle `Verifiziert` erhalten müssen, willst du diese wahrscheinlich als Zielrolle festlegen.

### Moderatorrolle

Wenn du eine Moderatorrolle angibst, hat sie immer die nötigen Berechtigungen, um den Kanal zu verwalten, auch wenn er gesperrt oder versteckt ist.

### Standardzustand

Du kannst festlegen, ob temporäre Sprachkanäle standardmäßig gesperrt oder versteckt erzeugt werden sollen.

## Einstellungen für Befehle

Du kannst die Befehle der Nutzer einschränken, zum Beispiel ob sie Schimpfwörter in ihrem Sprachkanalnamen verwenden dürfen (funktioniert nur auf Englisch), und Mindest- und Höchstwerte festlegen, die Nutzer für das Nutzerlimit und die Bitrate verwenden können.

## Nützliche Hilfsfunktionen

### Besitzerrolle

Wenn angegeben, weist Astro diese Rolle den Besitzern temporärer Sprachkanäle zu und entfernt sie, wenn sie den Kanal verlassen oder der Besitz übertragen wird.

### Warteschlangenmodus

Bei aktiviertem Warteschlangenmodus versucht Astro, bestehende Kanäle zu füllen, bevor neue erstellt werden.  
Eine nützliche Funktion, wenn Kanäle ein Nutzerlimit haben und du sicherstellen möchtest, dass alle Kanäle mit der maximalen Anzahl an Nutzern gefüllt sind.

### Fallback-Generator

Wenn die Kategorie des Generators voll ist (50 Kanäle erreicht), werden Nutzer, die dem Generator beitreten, zum Fallback-Generator verschoben, sofern einer festgelegt ist.

## Warteräume

Ein Warteraum ist einfach ein Sprachkanal, der neben einem temporären Sprachkanal erstellt wird.  
Nutzer können dem Warteraum beitreten, um anzuzeigen, dass sie darauf warten, in den temporären Sprachkanal zu kommen, und dessen Besitzer kann Nutzer aus dem Warteraum in seinen Kanal ziehen.

Im Dashboard kannst du wählen, ob Astro für jeden temporären Sprachkanal automatisch einen Warteraum erstellen soll, und alle Aspekte davon konfigurieren: Name (auch hier können Variablen verwendet werden), Nutzerlimit, Bitrate usw.

Nutzer können außerdem mit dem entsprechenden Slash-Befehl oder Interface-Button einen Warteraum erstellen.

## Private Textchats

Ein privater Textchat ist dagegen ein Textkanal, der nur für Nutzer innerhalb eines temporären Sprachkanals sichtbar ist.  
Im Dashboard kannst du festlegen, ob Astro für jeden temporären Sprachkanal einen privaten Textchat erstellen soll, samt dessen Einstellungen, wie bei Warteräumen.

Nutzer können außerdem mit dem entsprechenden Slash-Befehl oder Interface-Button einen privaten Textchat erstellen.

### Erstellungsnachricht

Du kannst außerdem eine Nachricht angeben, die Astro in temporäre Sprachkanäle sendet, wenn sie erstellt werden.  
Die Nachricht wird im privaten Textchat gesendet, falls vorhanden, andernfalls im Chat des Sprachkanals (ja, das ist verwirrend, aber Sprachkanäle haben jetzt auch einen integrierten Textchat).

Du kannst wählen, ob die Nachricht ein Embed oder eine einfache Textnachricht sein soll.

Alternativ kannst du Astro ein [Interface](/guides/interface) in den Textchat senden lassen!
