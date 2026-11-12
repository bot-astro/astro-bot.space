---
title: Le basi
description: Inizia a usare Astro imparando le basi
---

## Cosa può fare Astro?

Astro si concentra esclusivamente sull'aspetto vocale di Discord e lo migliora con alcune caratteristiche uniche e avanzate.

La caratteristica principale che fornisce sono i canali vocali temporanei.  
Un canale vocale temporaneo viene creato dai cosiddetti generatori (che sono creati e gestiti da Astro). Quando un utente entra in un generatore, Astro crea un canale vocale temporaneo per l'utente e lo sposta in esso. Una volta che il canale vocale temporaneo si svuota, Astro lo cancella automaticamente.  
In questo modo non avrai un sacco di canali vocali vuoti seduti nel tuo server!

A complemento di questo, Astro fornisce modi per consentire agli utenti di gestire i loro canali vocali temporanei, come rinominare il canale, cambiare il limite utente, bloccare / nascondere il canale e molto altro. Questo può essere fatto sia tramite comandi slash o interfacce Astro. Un'interfaccia è semplicemente un messaggio con i pulsanti creati da Astro che consente agli utenti di eseguire rapidamente azioni sul loro canale vocale.

Inoltre, Astro fornisce un modo per raggruppare insieme un sacco di impostazioni e applicarle tutte contemporaneamente a un canale vocale temporaneo: modelli. Diciamo per esempio che hai un server di gioco dove gli utenti giocano un sacco di giochi diversi, è possibile creare un modello per ogni gioco con il proprio nome, limite utente, ecc...

Un'altra caratteristica estremamente utile sono i ruoli vocali. Con i ruoli vocali, è possibile garantire che gli utenti ottengano un ruolo specifico quando sono all'interno di un canale vocale specifico. È una caratteristica davvero potente che sblocca molti scenari diversi.

Puoi leggere di più su tutte queste funzionalità nella loro corrispondente [guide](/guides).  
Qui stiamo andando a coprire le basi su come iniziare a utilizzare Astro nel tuo server!

## Invito al bot

Prima cosa invita il bot al tuo server. Per farlo puoi semplicemente cliccare su [questo link](/invite) e selezionare un server!  
Altrimenti puoi anche visitare la [dashboard](/guilds) e ti verrà richiesto automaticamente di invitare Astro nel server che vuoi gestire se non è ancora stato aggiunto.

## Quick setup

Don't wanna configure everything by hand? Use the `/setup` command, or the setup button Astro sends when it joins your server.  
Astro will create a category with a generator and an interface inside it, so temporary voice channels work right away. Then you can change the name, category, position and everything else from the [dashboard](/guilds).  
It needs room for 4 new channels, and the usual limits of the free plan apply (see [Ultimate](#ultimate)).

## Requisiti del server

Per essere in grado di utilizzare Astro nel tuo server è necessario soddisfare questi requisiti:

- avere meno di 50 bot (limite imposto di Discord)
- ha almeno i permessi `Manage Channels`

## Autorizzazioni Bot

Astro richiede permessi `Administrator` per impostazione predefinita per funzionare e garantire una grande esperienza utente per gli utenti medi di Discord.

Se possiedi un server professionale e non puoi concedere tale permesso a Astro per motivi di sicurezza, puoi disabilitare questo requisito tramite l'interruttore apposite sulla dashboard
! admin permission toggle](/guides/admin_permissions. ng 'Admin permission toggle')
_You may ask for guidelines in the Support Server regarding the permissions that Astro need in order to work, ma a tal fine non è previsto un sostegno approfondito._

## Autorizzazioni di comando

Ricorda che puoi sempre configurare chi ha accesso ai comandi slash Astro tramite i permessi di comando slash Discord.  
[Per saperne di più qui](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Server language

Astro speaks English and Italian.  
You can change the language of your server from the settings in the dashboard, all the messages the bot sends there will follow it.

## Bot profile

Want Astro to look a bit more like part of your server? From the dashboard you can give it a custom nickname, avatar, banner and bio, only for your server.  
This is free for everyone.

## Voting

Some commands that temporary voice channel owners can use are locked behind a [vote](https://top.gg/bot/715621848489918495/vote) if the server doesn't have Ultimate: `/chat`, `/invite`, `/claim`, `/transfer`, `/waiting-room` and `/region`.  
Voting is free and takes a few seconds, servers with Ultimate skip it completely.

## Errori E Problemi

Astro segnalerà tutti i problemi e gli errori che incontra quando lavora nel tuo server.  
Ogni volta che si verifica qualcosa che non funziona bene ricordatevi di controllare la sezione errori nella dashboard!

## Ultima

Ultimate è la versione premium di Astro, e fornisce molte utili funzionalità avanzate rimuovendo tutte le limitazioni:

| Caratteristica                                           |                      Premium                      |                             Gratis                             |
| -------------------------------------------------------- | :-----------------------------------------------: | :------------------------------------------------------------: |
| Generatori temporanei vc illimitati                      | <span class="text-discord-green text-lg">✓</span> |                            Massimo 2                           |
| Interfacce illimitate                                    | <span class="text-discord-green text-lg">✓</span> |                            Massimo 1                           |
| Ruoli vocali illimitati                                  | <span class="text-discord-green text-lg">✓</span> |                            Massimo 1                           |
| Modelli illimitati                                       | <span class="text-discord-green text-lg">✓</span> |                            Massimo 3                           |
| Nomi dei canali vocali numerati                          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |
| Interfacce personalizzabili                              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |
| Filtro delle parole cattive per i nomi dei canali vocali | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |
| Stanze d'attesa                                          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |
| Chat di testo privato                                    | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |
| Ruolo vocale per i proprietari dei canali                | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |
| Messaggi personalizzati alla creazione del canale vocale | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |
| Generatori di Fallback                                   | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg"><unk></span> |

### Aggiornamento del server a Ultimate

Una volta acquistato un abbonamento sulla [Ultimate page](/ultimate) o tramite il [Discord App Store](https://discord.com/application-directory/715621848489918495/premium) è possibile aggiornare il server tramite il pulsante apposite sulla dashboard
! aggiornamento ultimo](/guide/ultimate. ng 'Ultimate upgrade')

### Gestire il tuo abbonamento

Puoi visualizzare, gestire e annullare i tuoi abbonamenti Ultimate utilizzando il [portale di fatturazione](/billing).  
Se hai acquistato Ultimate tramite il Checkout Discord App Store [questa guida](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Supporto

Sentitevi liberi di unirvi al [Support / Community Server](/support) se avete qualche domanda!
