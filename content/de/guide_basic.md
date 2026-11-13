---
title: Die Grundlagen
description: Lerne die Grundlagen und starte mit Astro durch
---

## Was kann Astro?

Astro konzentriert sich ausschließlich auf den Sprachaspekt von Discord und verbessert ihn mit einigen einzigartigen und fortgeschrittenen Funktionen.

Die Hauptfunktion sind temporäre Sprachkanäle.  
Ein temporärer Sprachkanal wird von sogenannten Generatoren erstellt (die von Astro angelegt und verwaltet werden). Wenn ein Nutzer einem Generator beitritt, erstellt Astro einen temporären Sprachkanal für ihn und verschiebt ihn dorthin. Sobald der temporäre Sprachkanal leer ist, löscht Astro ihn automatisch.  
So hast du keine Menge leerer Sprachkanäle, die auf deinem Server herumliegen!

Ergänzend dazu bietet Astro Möglichkeiten, wie Nutzer ihre temporären Sprachkanäle verwalten können, zum Beispiel den Kanal umbenennen, das Nutzerlimit ändern, den Kanal sperren / verstecken und vieles mehr. Das geht entweder über Slash-Befehle oder über Astro-Interfaces. Ein Interface ist einfach eine von Astro erstellte Nachricht mit Buttons, mit der Nutzer schnell Aktionen für ihren Sprachkanal ausführen können.

Außerdem bietet Astro die Möglichkeit, mehrere Einstellungen zusammenzufassen und sie alle auf einmal auf einen temporären Sprachkanal anzuwenden: Vorlagen. Nehmen wir an, du hast einen Gaming-Server, auf dem Nutzer viele verschiedene Spiele spielen, dann kannst du für jedes Spiel eine Vorlage mit eigenem Namen, Nutzerlimit usw. erstellen.

Eine weitere äußerst nützliche Funktion sind Sprachrollen. Mit Sprachrollen stellst du sicher, dass Nutzer eine bestimmte Rolle erhalten, solange sie sich in einem bestimmten Sprachkanal befinden. Das ist eine wirklich mächtige Funktion, die viele verschiedene Szenarien ermöglicht.

Mehr über all diese Funktionen findest du in der jeweiligen [Anleitung](/guides).  
Hier behandeln wir die Grundlagen, wie du Astro auf deinem Server einrichtest!

## Den Bot einladen

Zuerst musst du den Bot auf deinen Server einladen. Dafür klickst du einfach auf [diesen Link](/invite) und wählst einen Server aus!  
Alternativ kannst du auch das [Dashboard](/guilds) besuchen, dort wirst du automatisch aufgefordert, Astro auf den Server einzuladen, den du verwalten möchtest, falls er noch nicht hinzugefügt wurde.

## Schnelle Einrichtung

Du möchtest nicht alles von Hand konfigurieren? Verwende den Befehl `/setup` oder den Einrichten-Button, den Astro sendet, wenn er deinem Server beitritt.  
Astro erstellt eine Kategorie mit einem Generator und einem Interface darin, sodass temporäre Sprachkanäle sofort funktionieren. Danach kannst du Name, Kategorie, Position und alles andere im [Dashboard](/guilds) ändern.

## Server-Anforderungen

Um Astro auf deinem Server verwenden zu können, musst du diese Anforderungen erfüllen:

- weniger als 50 Bots haben (von Discord vorgegebenes Limit)
- mindestens die Berechtigung `Kanäle verwalten` haben

## Bot-Berechtigungen

Astro benötigt standardmäßig die Berechtigung `Administrator`, um zu funktionieren und den durchschnittlichen Discord-Nutzern ein großartiges Erlebnis zu bieten.

Wenn du einen professionellen Server betreibst und Astro diese Berechtigung aus Sicherheitsgründen nicht geben kannst, kannst du diese Anforderung über den entsprechenden Schalter im Dashboard deaktivieren
![Schalter für Administrator-Berechtigung](/guides/admin_permissions.png "Schalter für Administrator-Berechtigung")
_Du kannst im Support-Server nach Richtlinien zu den Berechtigungen fragen, die Astro zum Funktionieren benötigt, ausführlicher Support dafür wird aber nicht angeboten._

## Befehlsberechtigungen

Denke daran, dass du über die Slash-Befehl-Berechtigungen von Discord jederzeit festlegen kannst, wer Zugriff auf die Slash-Befehle von Astro hat.  
[Hier kannst du mehr darüber lesen](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Serversprache

Du kannst die Sprache deines Servers in den Einstellungen im Dashboard ändern, alle Nachrichten, die der Bot dort sendet, richten sich danach.

## Bot-Profil

Du möchtest, dass Astro mehr wie ein Teil deines Servers wirkt? Im Dashboard kannst du ihm einen eigenen Spitznamen, Avatar, Banner und eine Bio geben, nur für deinen Server.

## Fehler & Probleme

Astro meldet alle Probleme und Fehler, auf die er bei der Arbeit auf deinem Server stößt.  
Wenn etwas nicht ganz richtig funktioniert, denke daran, den Bereich Fehler im Dashboard zu prüfen!

## Ultimate

Ultimate ist die Premium-Version von Astro. Sie bietet viele nützliche erweiterte Funktionen und hebt alle Einschränkungen auf:

| Funktion                                           |                      Premium                      |                          Kostenlos                         |
| -------------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Unbegrenzte Generatoren für temporäre Sprachkanäle | <span class="text-discord-green text-lg">✓</span> |                          Maximal 2                         |
| Unbegrenzte Interfaces                             | <span class="text-discord-green text-lg">✓</span> |                          Maximal 1                         |
| Unbegrenzte Sprachrollen                           | <span class="text-discord-green text-lg">✓</span> |                          Maximal 1                         |
| Unbegrenzte Vorlagen                               | <span class="text-discord-green text-lg">✓</span> |                          Maximal 3                         |
| Nummerierte Namen für Sprachkanäle                 | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Anpassbare Interfaces                              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Schimpfwortfilter für Namen von Sprachkanälen      | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Warteräume                                         | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Private Textchats                                  | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Sprachrolle für Kanalbesitzer                      | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Eigene Nachrichten bei der Erstellung von Kanälen  | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Fallback-Generatoren                               | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Deinen Server auf Ultimate aufwerten

Sobald du ein Abonnement auf der [Ultimate-Seite](/ultimate) oder über den [Discord App Store](https://discord.com/application-directory/715621848489918495/premium) erworben hast, kannst du deinen Server über den entsprechenden Button im Dashboard aufwerten
![Ultimate-Upgrade](/guides/ultimate.png "Ultimate-Upgrade")

### Dein Abonnement verwalten

Du kannst deine Ultimate-Abonnements im [Abrechnungsportal](/billing) ansehen, verwalten und kündigen.  
Wenn du Ultimate über den Checkout des Discord App Stores gekauft hast, findest du [hier eine Anleitung](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Support

Tritt gerne dem [Support- / Community-Server](/support) bei, wenn du Fragen hast!
