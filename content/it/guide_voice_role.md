---
title: Ruoli vocali
description: Scopri come configurare il ruolo vocale per rendere il tuo server più slick
---

## Che cos'è un ruolo vocale

I ruoli vocali (precedentemente chiamati connessioni) consentono di collegare i canali vocali ai ruoli.  
Consentono agli utenti di avere un ruolo mentre sono all'interno di un canale vocale specifico, e Astro rimuoverà il ruolo da loro quando lasciano quel canale.

Qui in questo esempio, viene creato un ruolo vocale sulla categoria. L'utente riceve un ruolo che permette all'utente di vedere un gruppo di canali relativi a quella categoria:
![esempio ruolo vocale](/illustration/voice_role . se 'Esempio ruolo vocale')

## Creare e gestire ruoli vocali

È possibile creare, gestire ed eliminare i ruoli vocali nella dashboard.

_Ricorda che senza [Ultimate](/ultimate) puoi avere solo 1 ruolo vocale._

## Impostazioni canale

Quando si crea o modifica un ruolo vocale, è necessario selezionare un canale per esso.  
Il canale può essere:

- un canale vocale normale (inclusi i canali di stadio)
- una categoria: ogni canale vocale all'interno di quella categoria attiverà il ruolo vocale
- un generatore: ogni canale vocale temporaneo creato da quel generatore attiverà il ruolo vocale

## Impostazione delle azioni

Ci sono tre azioni diverse tra cui puoi scegliere:

- `Assegno`: Astro assegna il ruolo all'utente quando entra nel canale e rimuove il ruolo quando l'utente lascia
- `Remove`: rimuovi il ruolo quando l'utente entra nel canale e restituiscilo quando l'utente lascia
- `Toggle`: se l'utente non ha il ruolo prima di entrare nel canale, si comporterà come `Assegno`, altrimenti come `Remove` (fondamentalmente commuta il ruolo come suggerisce il nome)
