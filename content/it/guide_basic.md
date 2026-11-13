---
title: Le basi
description: Inizia a usare Astro imparando le basi
---

## Cosa può fare Astro?

Astro si concentra esclusivamente sull'aspetto vocale di Discord e lo migliora con alcune funzionalità uniche e avanzate.

La funzionalità principale sono i canali vocali temporanei.  
Un canale vocale temporaneo viene creato dai cosiddetti generatori (creati e gestiti da Astro). Quando un utente entra in un generatore, Astro crea un canale vocale temporaneo per l'utente e lo sposta al suo interno. Quando il canale vocale temporaneo si svuota, Astro lo elimina automaticamente.  
In questo modo non avrai un sacco di canali vocali vuoti sparsi nel tuo server!

Come complemento, Astro offre modi per permettere agli utenti di gestire i propri canali vocali temporanei, come rinominare il canale, cambiare il limite di utenti, bloccare / nascondere il canale e molto altro. Questo si può fare tramite comandi slash o tramite le interfacce di Astro. Un'interfaccia è semplicemente un messaggio con dei pulsanti creato da Astro che permette agli utenti di eseguire rapidamente azioni sul proprio canale vocale.

Inoltre, Astro permette di raggruppare un insieme di impostazioni e applicarle tutte insieme a un canale vocale temporaneo: i template. Ad esempio, se hai un server di gaming in cui gli utenti giocano a tanti giochi diversi, puoi creare un template per ogni gioco con il suo nome, il suo limite di utenti, ecc...

Un'altra funzionalità estremamente utile sono i ruoli vocali. Con i ruoli vocali puoi fare in modo che gli utenti ottengano un ruolo specifico quando si trovano in uno specifico canale vocale. È una funzionalità davvero potente che sblocca molti scenari diversi.

Puoi saperne di più su tutte queste funzionalità nella [guida](/guides) corrispondente.  
Qui vedremo le basi per iniziare a usare Astro nel tuo server!

## Invitare il bot

Per prima cosa, invita il bot nel tuo server. Per farlo ti basta cliccare [questo link](/invite) e selezionare un server!  
In alternativa puoi visitare la [dashboard](/guilds) e ti verrà chiesto automaticamente di invitare Astro nel server che vuoi gestire, se non è ancora stato aggiunto.

## Configurazione rapida

Non vuoi configurare tutto a mano? Usa il comando `/setup`, oppure il pulsante di setup che Astro invia quando entra nel tuo server.  
Astro creerà una categoria con un generatore e un'interfaccia al suo interno, così i canali vocali temporanei funzionano subito. Poi potrai cambiare nome, categoria, posizione e tutto il resto dalla [dashboard](/guilds).

## Requisiti del server

Per poter usare Astro nel tuo server devi rispettare questi requisiti:

- avere meno di 50 bot (limite imposto da Discord)
- avere almeno il permesso `Gestire i canali`

## Permessi del bot

Astro richiede di default il permesso `Amministratore` per funzionare e garantire una grande esperienza agli utenti Discord medi.

Se gestisci un server professionale e non puoi concedere quel permesso ad Astro per motivi di sicurezza, puoi disattivare questo requisito tramite l'apposito interruttore nella dashboard
![interruttore permesso amministratore](/guides/admin_permissions.png "Interruttore permesso amministratore")
_Puoi chiedere indicazioni nel Server di Supporto sui permessi di cui Astro ha bisogno per funzionare, ma non viene fornito supporto approfondito a riguardo._

## Permessi dei comandi

Ricorda che puoi sempre configurare chi ha accesso ai comandi slash di Astro tramite i permessi dei comandi slash di Discord.  
[Scopri di più qui](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Lingua del server

Puoi cambiare la lingua del tuo server dalle impostazioni nella dashboard, tutti i messaggi che il bot invia lì la seguiranno.

## Profilo del bot

Vuoi che Astro sembri un po' più parte del tuo server? Dalla dashboard puoi dargli un soprannome, un avatar, un banner e una bio personalizzati, solo per il tuo server.

## Errori e problemi

Astro segnalerà tutti i problemi e gli errori che incontra lavorando nel tuo server.  
Ogni volta che noti qualcosa che non funziona bene, ricordati di controllare la sezione errori nella dashboard!

## Ultimate

Ultimate è la versione premium di Astro e offre molte utili funzionalità avanzate eliminando tutte le limitazioni:

| Funzionalità                                      |                      Premium                      |                           Gratis                           |
| ------------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Generatori di canali vocali temporanei illimitati | <span class="text-discord-green text-lg">✓</span> |                          Massimo 2                         |
| Interfacce illimitate                             | <span class="text-discord-green text-lg">✓</span> |                          Massimo 1                         |
| Ruoli vocali illimitati                           | <span class="text-discord-green text-lg">✓</span> |                          Massimo 1                         |
| Template illimitati                               | <span class="text-discord-green text-lg">✓</span> |                          Massimo 3                         |
| Nomi numerati per i canali vocali                 | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Interfacce personalizzabili                       | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Filtro parolacce per i nomi dei canali vocali     | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Sale d'attesa                                     | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Chat testuali private                             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Ruolo vocale per i proprietari dei canali         | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Messaggi personalizzati alla creazione del canale | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Generatori di riserva                             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Potenziare il tuo server a Ultimate

Una volta acquistato un abbonamento nella [pagina Ultimate](/ultimate) o tramite l'[App Store di Discord](https://discord.com/application-directory/715621848489918495/premium), puoi potenziare il tuo server tramite l'apposito pulsante nella dashboard
![potenziamento Ultimate](/guides/ultimate.png "Potenziamento Ultimate")

### Gestire il tuo abbonamento

Puoi visualizzare, gestire e annullare i tuoi abbonamenti Ultimate tramite il [portale di fatturazione](/billing).  
Se hai acquistato Ultimate tramite il checkout dell'App Store di Discord, consulta [questa guida](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Supporto

Sentiti libero di entrare nel [Server di Supporto / Community](/support) se hai domande!
