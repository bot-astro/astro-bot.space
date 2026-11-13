---
title: Interfacce
description: Scopri come rendere la tua interfaccia fantastica e unica con questa guida
---

## Cos'è un'interfaccia?

Un'interfaccia è un messaggio che permette agli utenti di gestire rapidamente il proprio canale vocale temporaneo tramite semplici pulsanti.  
Ecco come appare l'interfaccia predefinita:
![interfaccia predefinita](/guides/default_interface.png 'Interfaccia predefinita')

## Creare un'interfaccia

Puoi creare una nuova interfaccia nella dashboard, nella sezione interfacce.  
Ti chiederà un canale e potrai scegliere quello che preferisci.

## Cambiare canale o reinviare un'interfaccia

Se hai eliminato per errore il messaggio di un'interfaccia o vuoi semplicemente cambiare canale, puoi farlo dalle impostazioni dell'interfaccia nella dashboard.

## Personalizzare un'interfaccia

Puoi personalizzare ogni interfaccia nella dashboard: apri la sezione interfacce, scegli un'interfaccia e clicca su gestisci.  
Una volta finito, salva le modifiche e Astro aggiornerà subito il messaggio.

_Ricorda che senza [Ultimate](/ultimate) puoi solo disattivare o attivare i pulsanti di un'interfaccia, tutto il resto lo richiede._

### Impostazioni del messaggio

Il messaggio è diviso in tre parti, ognuna con le proprie impostazioni:

- `Intestazione`: il nome dell'autore, il link dell'autore e l'immagine dell'autore
- `Corpo`: il titolo, il link del titolo, la miniatura, la descrizione e l'immagine
- `Piè di pagina`: il testo del piè di pagina, l'immagine del piè di pagina, il colore della linea a sinistra del messaggio e una data e ora

Ogni impostazione è facoltativa, se lasci un testo vuoto semplicemente non verrà mostrato.  
L'immagine dell'autore e l'immagine hanno un valore predefinito, puoi ripristinarlo con il pulsante `Ripristina predefinito`.

### Immagini

Le immagini vengono scelte dall'archivio multimediale del tuo server. Clicca su `Scegli immagine` per aprirlo, da lì puoi:

- caricare una nuova immagine
- vedere l'anteprima delle immagini già caricate
- selezionare un'immagine per l'impostazione che stai modificando
- eliminare le immagini che non ti servono più

_Eliminare un'immagine la rimuove anche dalle impostazioni dell'interfaccia che stai modificando, le altre interfacce che la usano mostreranno un'immagine non funzionante finché non la cambi._

Le immagini che non sono usate da nessuna interfaccia vengono ripulite automaticamente di tanto in tanto.

### Emoji personalizzate

Le emoji possono essere usate nei testi del messaggio e sui pulsanti. Le emoji standard si possono semplicemente incollare, le emoji personalizzate di Discord hanno invece bisogno del loro codice:

1. Vai su Discord e scrivi l'emoji preceduta da una barra rovesciata, ad esempio `\:nome:`
2. Invia il messaggio, Discord invierà il codice dell'emoji, come `<:nome:id>` (oppure `<a:nome:id>` per le emoji animate)
3. Copia quel codice e incollalo nella dashboard

## Pulsanti

Un'interfaccia può avere fino a 5 righe con 5 pulsanti ciascuna, la dashboard li mostra come una griglia.  
Clicca su un pulsante per modificarlo, o su una posizione vuota per aggiungerne uno nuovo.

Ogni pulsante ha queste impostazioni:

- `Pulsante`: quale pulsante viene mostrato in questa posizione. Un pulsante può essere usato una sola volta per interfaccia, quindi quelli già posizionati altrove non sono selezionabili. Scegli `Nessun pulsante` per rimuoverlo
- `Disabilitato`: gli utenti vedono il pulsante ma non possono cliccarlo
- `Nome`: il testo mostrato sul pulsante
- `Emoji`: l'emoji mostrata sul pulsante
- `Stile`: il colore del pulsante

Un pulsante ha bisogno di almeno un nome o un'emoji per essere mostrato.

## Eliminare un'interfaccia

Puoi eliminare un'interfaccia in qualsiasi momento dalla dashboard.

### Esempio di interfaccia personalizzata

L'immagine qui sotto è un esempio di interfaccia personalizzata:
![interfaccia personalizzata](/illustration/custom_interface.png 'Interfaccia personalizzata')
