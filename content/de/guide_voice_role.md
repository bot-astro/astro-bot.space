---
title: Sprachrollen
description: Lerne, wie du Sprachrollen konfigurierst, damit dein Server besonders stylisch wirkt
---

## Was ist eine Sprachrolle

Sprachrollen (früher Verbindungen genannt) ermöglichen es, Sprachkanäle mit Rollen zu verbinden.  
Damit erhalten Nutzer eine Rolle, solange sie sich in einem bestimmten Sprachkanal befinden, und Astro entfernt die Rolle wieder, wenn sie diesen Kanal verlassen.

In diesem Beispiel wird eine Sprachrolle für die Kategorie erstellt. Der Nutzer erhält eine Rolle, die es ihm erlaubt, eine Reihe von Kanälen zu sehen, die zu dieser Kategorie gehören:
![Beispiel einer Sprachrolle](/illustration/voice_role.gif 'Beispiel einer Sprachrolle')

## Sprachrollen erstellen und verwalten

Du kannst Sprachrollen im Dashboard erstellen, verwalten und löschen.

_Denke daran, dass du ohne [Ultimate](/ultimate) nur 1 Sprachrolle haben kannst._

## Kanaleinstellung

Wenn du eine Sprachrolle erstellst oder bearbeitest, musst du dafür einen Kanal auswählen.  
Der Kanal kann entweder sein:

- ein normaler Sprachkanal (einschließlich Stage-Kanälen)
- eine Kategorie: jeder Sprachkanal darin löst die Sprachrolle aus
- ein Generator: jeder von diesem Generator erstellte temporäre Sprachkanal löst die Sprachrolle aus

## Aktionseinstellung

Du kannst zwischen drei verschiedenen Aktionen wählen:

- `Zuweisen`: Astro weist dem Nutzer die Rolle zu, wenn er den Kanal betritt, und entfernt sie, wenn der Nutzer ihn verlässt
- `Entfernen`: entfernt die Rolle, wenn der Nutzer den Kanal betritt, und gibt sie zurück, wenn der Nutzer ihn verlässt
- `Umschalten`: wenn der Nutzer die Rolle vor dem Betreten des Kanals nicht hat, verhält es sich wie `Zuweisen`, andernfalls wie `Entfernen` (schaltet die Rolle also um, wie der Name vermuten lässt)
