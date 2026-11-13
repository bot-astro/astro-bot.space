---
title: Ruoli vocali
description: Scopri come configurare i ruoli vocali per rendere il tuo server ancora più curato
---

## Cos'è un ruolo vocale

I ruoli vocali (in precedenza chiamati connessioni) permettono di collegare i canali vocali ai ruoli.  
Permettono agli utenti di ottenere un ruolo mentre si trovano in uno specifico canale vocale, e Astro lo rimuoverà quando lasciano quel canale.

In questo esempio, un ruolo vocale viene creato su una categoria. L'utente riceve un ruolo che gli permette di vedere una serie di canali legati a quella categoria:
![esempio di ruolo vocale](/illustration/voice_role.gif "Esempio di ruolo vocale")

## Creare e gestire i ruoli vocali

Puoi creare, gestire ed eliminare i ruoli vocali nella dashboard.

_Ricorda che senza [Ultimate](/ultimate) puoi avere un solo ruolo vocale._

## Impostazione del canale

Quando crei o modifichi un ruolo vocale, devi selezionare un canale per esso.  
Il canale può essere:

- un normale canale vocale (include i canali stage)
- una categoria: ogni canale vocale al suo interno attiverà il ruolo vocale
- un generatore: ogni canale vocale temporaneo creato da quel generatore attiverà il ruolo vocale

## Impostazione dell'azione

Puoi scegliere tra tre azioni diverse:

- `Assegna`: Astro assegna il ruolo all'utente quando entra nel canale e lo rimuove quando l'utente esce
- `Rimuovi`: rimuove il ruolo quando l'utente entra nel canale e lo restituisce quando l'utente esce
- `Alterna`: se l'utente non ha il ruolo prima di entrare nel canale, si comporterà come `Assegna`, altrimenti come `Rimuovi` (in pratica alterna il ruolo, come suggerisce il nome)
