---
title: Generatori
description: Scopri come configurare e utilizzare generatori di canali vocali temporanei
---

## Cos'è un generatore?

I generatori sono canali creati e gestiti da Astro.  
Quando un utente entra in un generatore, Astro crea un canale vocale temporaneo e sposta l'utente in esso.

L'utente che crea il canale vocale temporaneo è chiamato proprietario.
Il proprietario può gestire il canale con i comandi slash Astro o con la [interfaces](/guides/interface), sia consentire all'utente di cambiare il nome del canale, il limite utente, i permessi e tutto il resto.

Una volta che il proprietario lascia, se ci sono altri utenti _non-bots_ nel canale, la proprietà verrà trasferita in modo casuale a un altro utente.  
Quando invece il proprietario parte e non ci sono più utenti nel canale, verrà eliminato.

I generatori sono estremamente personalizzabili, in questa guida imparerai come configurarli in modo che soddisfino perfettamente i requisiti del server!

## Creare e gestire generatori

Astro può gestire più generatori e ognuno ha le proprie impostazioni.  
Nella sezione dei generatori della dashboard potrai vedere tutti i generatori del tuo server, crearne di nuovi, gestirli ed eliminarli.

_Ricorda che puoi avere un massimo di 2 generatori senza [Ultimate](/ultimate)._

## Impostazioni nome

Un canale vocale temporaneo può essere in tre diversi stati: predefinito, bloccato o nascosto.  
Questi stati sono attivati dagli utenti tramite i comandi slash o l'interfaccia.

È possibile fornire un nome per ogni stato:
![generator name settings](/guides/generator_name.png "Generator name settings")

### Variabili

Puoi usare `Variables` per rendere dinamico il nome del canale. Astro sostituirà le variabili con il valore appropriato quando si applica il nuovo nome:

#### Variabili proprietario canale vocale

| Variabile    | Descrizione                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| `{nickname}` | Il soprannome (o il nome utente se mancante) del proprietario |
| `{username}` | Il nome utente del proprietario                                                  |
| `{mention}`  | La menzione (@name) del proprietario             |
| `{id}`       | L'ID del proprietario                                                            |

#### Variabili attività proprietario canale vocale · [richiede Ultimate](/ultimate)

| Variabile               | Descrizione                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `{activity_name}`       | Il nome dell'attività del proprietario (il nome del gioco, per esempio)                                    |
| `{activity_emoji}`      | Un'emoji che rappresenta l'attività                                                                                           |
| `{activity_start_time}` | Il momento in cui il proprietario ha iniziato l'attività                                                                      |
| `{activity_end_time}`   | Il momento in cui l'attività terminerà o è terminata                                                                          |
| `{activity_type}`       | Il tipo di attività (giocare, guardare, ascoltare, ecc...) |
| `{activity_link}`       | Il collegamento del flusso di twitch se l'attività è un flusso di twitch                                                      |

#### Variabili del canale vocale

| Variabile        | Descrizione                                             |
| ---------------- | ------------------------------------------------------- |
| `{vc_name}`      | Il nome del vc                                          |
| `{vc_bitrate}`   | Il bitrate del vc                                       |
| `{vc_userlimit}` | Il limite utente del vc                                 |
| `{vc_users}`     | La quantità di utenti nel vc                            |
| `{vc_id}`        | L'id del vc                                             |
| `{vc_mention}`   | Il vc come menzione (#voice-channel) |

#### Variabili dei valori incrementali · [requires Ultimate](/ultimate)

| Variabile | Descrizione                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `{n}`     | Un semplice numero incrementale (1, 2, 3...)               |
| `{nato}`  | Alfabeto incrementale della NATO (Alfa, Bravo, Charlie...) |
| `{roman}` | Numeri incrementali romani (I, II, III, IV...)             |

\*\*Come funzionano i numeri incrementali? \*  
Considerando la nuova Limitazione Discord che permette di cambiare un nome canale vocale solo 2 volte ogni 10 minuti, questa funzione funziona un po 'in modo diverso da quello che ci si può aspettare:  
I canali vocali verranno generati in modo incrementale: il bot troverà il primo canale vocale mancante e metterà il nuovo canale vocale al suo posto.

Esempio: Abbiamo 5 VC generati da Astro in modo incrementale [VC #1, VC#2, VC #3, VC #4 e VC#5], ora diciamo che VC #3 viene eliminato, quello che Astro non farà è rinominare ogni singolo VC al nome corretto, così da VC#4 a VC #3 e così via, invece la prossima volta che verrà creato un VC non sarà VC #6 ma VC #3 in modo che il gap venga colmato.

Se vedi che i numeri stanno iniziando dal numero sbagliato, puoi premere il pulsante `Cancella cache` sulla dashboard per resettare il conteggio
! cancella cache](/guides/clear_cache. ng 'Cancella cache')

### Condizioni di aggiornamento nome

Puoi anche configurare quando un nome del canale deve essere aggiornato:
![condizioni nome generatore](/guides/generator_name_conditions.png "Condizioni di aggiornamento nome generatore")

### Limiti di aggiornamento nome

Il nome di un canale vocale Discord può essere cambiato solo 2 volte ogni 10 minuti, Discord ha introdotto questa limitazione un po 'fa, purtroppo.
A causa di quel nome di canale vocale potrebbe non essere sempre preciso se si verificano cambiamenti frequenti.

## Impostazioni di base

Nella dashboard troverete anche le opzioni per cambiare:

- la categoria in cui sono generati canali vocali temporanei
- il limite utente
- il bitrate
- la posizione: se il canale vocale temporaneo deve essere creato appena prima del generatore, subito dopo o in fondo alla categoria
- per cambiare la regione che puoi cambiare la regione del canale del generatore all'interno di Discord direttamente
- the default voice channel status: the small text shown under the name of a voice channel, owners can change it anytime with the `/status` command

## Impostazioni dei permessi

### Permesso ereditario

Canali vocali temporanei per impostazione predefinita ereditano i permessi dal generatore.  
È possibile modificare questo comportamento sul cruscotto, è possibile fare i canali copiare i permessi dalla categoria invece o non copiare alcun permesso a tutti.

### Ruolo obiettivo

Il ruolo di destinazione è una delle impostazioni più importanti. Quando i permessi del canale devono essere modificati, ad esempio quando viene bloccato o nascosto, Astro modificherà i permessi del ruolo di destinazione per raggiungere lo stato desiderato.  
Ad esempio, se nel tuo server gli utenti devono completare un processo di verifica e ottenere un ruolo `Verificato`, allora probabilmente si vuole impostare che come ruolo di destinazione.

### Ruolo del moderatore

Se si fornisce un ruolo di moderatore, avrà sempre i permessi necessari per gestire il canale, anche quando bloccato o nascosto.

### Stato predefinito

Puoi decidere se i canali vocali temporanei debbano essere generati bloccati o nascosti per impostazione predefinita.

## Impostazioni comandi

È possibile mettere alcune limitazioni sui comandi utente, ad esempio se possono usare parole cattive nel loro nome del canale vocale (funziona solo in inglese), e fornire alcuni valori minimi e massimi che gli utenti possono utilizzare per il limite utente e bitrate.

## Utilità utili

### Ruolo del proprietario

Se fornito, Astro assegnerà questo ruolo ai proprietari temporanei del canale vocale, e rimuoverlo da loro quando lasciano il canale o quando la proprietà viene trasferita.

### Modalità coda

Con la modalità coda abilitata, Astro cercherà di riempire i canali esistenti prima di crearne di nuovi.  
Funzione utile quando i canali hanno un limite utente impostato e si deve assicurarsi che i canali sono tutti riempiti con la quantità massima di utenti.

### Fallback generator

Quando la categoria generatore si riempie (arriva a 50 canali) gli utenti che uniscono il generatore verranno spostati al generatore di ripiego, se impostato.

## Stanze d'attesa

Una sala d'attesa è semplicemente un canale vocale che viene creato vicino a un canale vocale temporaneo.  
Gli utenti possono entrare nella sala d'attesa per indicare che stanno aspettando di entrare nel canale vocale temporaneo, e il proprietario di esso può trascinare gli utenti dalla sala d'attesa al suo canale.

Sul cruscotto è possibile scegliere se Astro debba creare automaticamente una sala d'attesa per ogni canale vocale temporaneo, e configurare tutti gli aspetti di esso: nome (può fare uso di variabili anche lì), limite utente, bitrate, ecc...

Gli utenti sono anche in grado di creare una sala d'attesa con l'apposito comando slash o pulsante di interfaccia.

## Chat di testo privato

Una chat di testo privata è invece un canale di testo che è visibile solo agli utenti all'interno di un canale vocale temporaneo.  
È possibile configurare se Astro dovrebbe creare una chat di testo privata per ogni canale vocale temporaneo sulla dashboard, insieme alle sue impostazioni, come per le sale d'attesa.

Gli utenti sono anche in grado di creare una chat di testo privata con il comando di barra appropriato o pulsante di interfaccia.

### Messaggio di creazione

È inoltre possibile fornire un messaggio che Astro invia nei canali vocali temporanei una volta creato.  
Il messaggio verrà inviato nella chat di testo privata se esiste, altrimenti nel canale vocale chat (sì, è confusione, ma i canali vocali ora hanno anche una chat di testo integrata).

È possibile scegliere se il messaggio deve essere un embed o un semplice messaggio di testo.

In alternativa, puoi fare in modo che Astro invii una [Interface](/guides/interface) nella chat di testo!
