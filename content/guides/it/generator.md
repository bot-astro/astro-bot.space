---
title: Generatori
description: Scopri come configurare e usare i generatori di canali vocali temporanei
---

## Cos'è un generatore?

I generatori sono canali creati e gestiti da Astro.  
Quando un utente entra in un generatore, Astro crea un canale vocale temporaneo e vi sposta l'utente.

L'utente che crea il canale vocale temporaneo si chiama proprietario.
Il proprietario può gestire il canale con i comandi slash di Astro o con le [interfacce](/guides/interface), entrambi permettono di cambiare il nome del canale, il limite di utenti, i permessi e tutto il resto.

Quando il proprietario esce, se nel canale ci sono altri utenti _non bot_, la proprietà verrà trasferita casualmente a un altro utente.  
Quando invece il proprietario esce e nel canale non ci sono più utenti, il canale verrà eliminato.

I generatori sono estremamente personalizzabili, in questa guida imparerai a configurarli in modo che si adattino perfettamente alle esigenze del tuo server!

## Creare e gestire i generatori

Astro può gestire più generatori e ognuno ha le proprie impostazioni.  
Nella sezione generatori della dashboard potrai vedere tutti i generatori del tuo server, crearne di nuovi, gestirli ed eliminarli.

_Ricorda che senza [Ultimate](/ultimate) puoi avere al massimo 2 generatori._

## Impostazioni del nome

Un canale vocale temporaneo può trovarsi in tre stati diversi: predefinito, bloccato o nascosto.  
Questi stati vengono attivati dagli utenti tramite comandi slash o tramite l'interfaccia.

Puoi indicare un nome per ogni stato:
![impostazioni del nome del generatore](/guides/generator_name.png 'Impostazioni del nome del generatore')

### Variabili

Puoi usare le `Variabili` per rendere dinamico il nome del canale. Astro sostituirà le variabili con il valore appropriato quando applica il nuovo nome:

#### Variabili del proprietario del canale vocale

| Variabile    | Descrizione                                                |
| ------------ | ---------------------------------------------------------- |
| `{nickname}` | Il soprannome (o il nome utente se manca) del proprietario |
| `{username}` | Il nome utente del proprietario                            |
| `{mention}`  | La menzione (@nome) del proprietario                       |
| `{id}`       | L'ID del proprietario                                      |

#### Variabili sull'attività del proprietario del canale vocale · [richiede Ultimate](/ultimate)

| Variabile               | Descrizione                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `{activity_name}`       | Il nome dell'attività del proprietario (ad esempio il nome del gioco) |
| `{activity_emoji}`      | Un'emoji che rappresenta l'attività                                   |
| `{activity_start_time}` | L'ora in cui il proprietario ha iniziato l'attività                   |
| `{activity_end_time}`   | L'ora in cui l'attività finirà o è finita                             |
| `{activity_type}`       | Il tipo di attività (giocare, guardare, ascoltare, ecc...)            |
| `{activity_link}`       | Il link dello stream Twitch se l'attività è uno stream Twitch         |

#### Variabili del canale vocale

| Variabile        | Descrizione                                     |
| ---------------- | ----------------------------------------------- |
| `{vc_name}`      | Il nome del canale vocale                       |
| `{vc_bitrate}`   | Il bitrate del canale vocale                    |
| `{vc_userlimit}` | Il limite di utenti del canale vocale           |
| `{vc_users}`     | Il numero di utenti nel canale vocale           |
| `{vc_id}`        | L'ID del canale vocale                          |
| `{vc_mention}`   | Il canale vocale come menzione (#canale-vocale) |

#### Variabili dei valori incrementali · [richiede Ultimate](/ultimate)

| Variabile | Descrizione                                           |
| --------- | ----------------------------------------------------- |
| `{n}`     | Un semplice numero incrementale (1, 2, 3...)          |
| `{nato}`  | Alfabeto NATO incrementale (Alpha, Bravo, Charlie...) |
| `{roman}` | Numeri romani incrementali (I, II, III, IV...)        |

**Come funzionano i numeri incrementali?**  
Considerando la nuova limitazione di Discord che permette di cambiare il nome di un canale vocale solo 2 volte ogni 10 minuti, questa funzionalità funziona in modo un po' diverso da quello che potresti aspettarti:  
I canali vocali verranno generati in modo incrementale: il bot troverà il primo canale vocale mancante e metterà il nuovo canale vocale al suo posto.

Esempio: abbiamo 5 canali vocali generati da Astro in modo incrementale [VC #1, VC#2, VC #3, VC #4 e VC#5], ora supponiamo che VC #3 venga eliminato, Astro non rinominerà ogni singolo canale con il nome corretto (quindi VC#4 in VC #3 e così via), invece la prossima volta che verrà creato un canale non sarà VC #6 ma VC #3, così il buco viene riempito.

Se vedi che i numeri partono dal numero sbagliato puoi premere il pulsante `Svuota la cache` nella dashboard per reimpostare il conteggio
![svuota cache](/guides/clear_cache.png 'Svuota la cache')

### Condizioni di aggiornamento del nome

Puoi anche configurare quando il nome di un canale deve essere aggiornato:
![condizioni del nome del generatore](/guides/generator_name_conditions.png 'Condizioni di aggiornamento del nome del generatore')

### Limitazioni dell'aggiornamento del nome

Il nome di un canale vocale Discord può essere cambiato solo 2 volte ogni 10 minuti, Discord ha introdotto questa limitazione tempo fa, purtroppo.
Per questo motivo i nomi dei canali vocali potrebbero non essere sempre precisi se avvengono cambiamenti frequenti.

## Impostazioni di base

Nella dashboard troverai anche le opzioni per cambiare:

- la categoria in cui vengono generati i canali vocali temporanei
- il limite di utenti
- il bitrate
- la posizione: se il canale vocale temporaneo deve essere creato subito prima del generatore, subito dopo o in fondo alla categoria
- per cambiare la regione puoi cambiare direttamente su Discord la regione del canale del generatore
- lo stato predefinito del canale vocale: il piccolo testo mostrato sotto il nome di un canale vocale, i proprietari possono cambiarlo in qualsiasi momento con il comando `/status`

## Impostazioni dei permessi

### Ereditarietà dei permessi

Di default i canali vocali temporanei ereditano i permessi dal generatore.  
Puoi cambiare questo comportamento dalla dashboard: puoi far copiare ai canali i permessi dalla categoria oppure non copiare alcun permesso.

### Ruolo di destinazione

Il ruolo di destinazione è una delle impostazioni più importanti. Quando i permessi del canale devono essere modificati, ad esempio quando viene bloccato o nascosto, Astro modificherà i permessi del ruolo di destinazione per ottenere lo stato desiderato.  
Ad esempio, se nel tuo server gli utenti devono completare una verifica e ottenere un ruolo `Verificato`, probabilmente vorrai impostarlo come ruolo di destinazione.

### Ruolo moderatore

Se indichi un ruolo moderatore, avrà sempre i permessi necessari per gestire il canale, anche quando è bloccato o nascosto.

### Stato predefinito

Puoi decidere se i canali vocali temporanei debbano essere generati bloccati o nascosti di default.

## Impostazioni dei comandi

Puoi imporre alcune limitazioni sui comandi degli utenti, ad esempio se possono usare parolacce nel nome del loro canale vocale (funziona solo in inglese), e indicare valori minimi e massimi che gli utenti possono usare per il limite di utenti e il bitrate.

## Utilità

### Ruolo del proprietario

Se indicato, Astro assegnerà questo ruolo ai proprietari dei canali vocali temporanei e lo rimuoverà quando lasciano il canale o quando la proprietà viene trasferita.

### Modalità coda

Con la modalità coda attiva, Astro cercherà di riempire i canali esistenti prima di crearne di nuovi.  
Funzionalità utile quando i canali hanno un limite di utenti e vuoi assicurarti che siano tutti riempiti con il numero massimo di utenti.

### Generatore di riserva

Quando la categoria del generatore si riempie (arriva a 50 canali), gli utenti che entrano nel generatore verranno spostati nel generatore di riserva, se impostato.

## Sale d'attesa

Una sala d'attesa è semplicemente un canale vocale che viene creato vicino a un canale vocale temporaneo.  
Gli utenti possono entrare nella sala d'attesa per indicare che stanno aspettando di entrare nel canale vocale temporaneo, e il proprietario di quest'ultimo può trascinare gli utenti dalla sala d'attesa al proprio canale.

Nella dashboard puoi scegliere se Astro debba creare automaticamente una sala d'attesa per ogni canale vocale temporaneo e configurarne ogni aspetto: nome (anche qui si possono usare le variabili), limite di utenti, bitrate, ecc...

Gli utenti possono anche creare una sala d'attesa con l'apposito comando slash o pulsante dell'interfaccia.

## Chat testuali private

Una chat testuale privata invece è un canale di testo visibile solo agli utenti all'interno di un canale vocale temporaneo.  
Nella dashboard puoi configurare se Astro debba creare una chat testuale privata per ogni canale vocale temporaneo, insieme alle sue impostazioni, come per le sale d'attesa.

Gli utenti possono anche creare una chat testuale privata con l'apposito comando slash o pulsante dell'interfaccia.

### Messaggio di creazione

Puoi anche indicare un messaggio che Astro invia nei canali vocali temporanei quando vengono creati.  
Il messaggio verrà inviato nella chat testuale privata se esiste, altrimenti nella chat del canale vocale (sì, è confusionario, ma ora anche i canali vocali hanno una chat testuale integrata).

Puoi scegliere se il messaggio debba essere un embed o un semplice messaggio di testo.

In alternativa, puoi far inviare ad Astro un'[Interfaccia](/guides/interface) nella chat testuale!
