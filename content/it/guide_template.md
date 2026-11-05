---
title: Modelli
description: Scopri i modelli e impara a configurarli, i tuoi utenti li ameranno
---

## Cos'è un modello

I modelli incapsulano una serie di impostazioni del canale vocale che possono essere applicate tutte contemporaneamente su canali vocali temporanei.

Questo è utile per esempio nei server di gioco dove gli utenti potrebbero giocare molti giochi diversi.  
Avere un modello per ogni gioco permetterebbe di rendere il canale vocale più adatto a quel gioco, ad esempio con un nome specifico o un limite utente.

## Utilizzo di modelli

Gli utenti del tuo server possono utilizzare i modelli sia tramite `/template` che fornisce il completamento automatico per cui sono disponibili i modelli, sia tramite il pulsante dell'interfaccia apposite .

## Creazione e gestione di modelli

È possibile creare, gestire ed eliminare i modelli [dashboard](/guilds).

_Ricorda che senza [Ultimate](/ultimate) puoi avere un massimo di 3 modelli._

## Nome del modello

Il nome di un modello è semplicemente un nome utile agli utenti per identificare un modello.  
**Non è** il nome che il canale vocale temporaneo riceve quando viene applicato il modello.

Quando un utente vuole applicare un modello al suo canale, vedrà solo un elenco di modelli in cui ognuno ha il proprio nome.

## Impostazioni canale vocale

Nella dashboard è possibile configurare le impostazioni che vengono applicate al canale vocale temporaneo quando viene utilizzato un modello.

Puoi scegliere:

- il nome del canale vocale, che supporta [variables](http://localhost:3000/guides/generator#variables)
- il limite utente
- il bitrate
- la regione

_Nessuna di queste impostazioni è richiesta per cui non è necessario impostarle tutti._

## Generatori abilitati

Se si desidera limitare un modello ad alcuni generatori specifici è possibile farlo sulla dashboard.  
Se lo fai, il template non sarà utilizzabile da nessun canale vocale temporaneo creato da un generatore non in quell'elenco di generatori attivati.
