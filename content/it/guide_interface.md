---
title: Interfacce
description: Impara a rendere la tua interfaccia sorprendente e unica con questa guida
---

## Che cos'è un'interfaccia?

Un'interfaccia è un messaggio che consente agli utenti di gestire rapidamente il loro canale vocale temporaneo tramite semplici pulsanti.  
Ecco come appare l'interfaccia predefinita:
![interfaccia predefinita](/guides/default_interface.png "Interfaccia predefinita")

## Creazione di un'interfaccia

È possibile creare una nuova interfaccia sul cruscotto, nella sezione interfacce.  
Si chiederà un canale e si può scegliere quello che si desidera.

## Modifica del canale o ri-invio di un'interfaccia

Se hai erroneamente cancellato un messaggio di interfaccia o vuoi semplicemente cambiare il canale, puoi farlo dalle impostazioni dell'interfaccia sul cruscotto.

## Personalizzare un'interfaccia

È possibile personalizzare ogni interfaccia sul cruscotto: aprire la sezione interfacce, scegliere un'interfaccia e fare clic su gestire.  
Una volta che hai finito, salva le modifiche e Astro aggiornerà subito il messaggio.

_Ricorda che senza [Ultimate](/ultimate) puoi solo disabilitare o abilitare i pulsanti di un'interfaccia, tutto il resto lo richiede._

### Impostazioni messaggio

Il messaggio è diviso in tre parti, ognuna con le proprie impostazioni:

- `Intestazione`: il nome dell'autore, il link dell'autore e l'immagine dell'autore
- `Corpo`: il titolo, il link del titolo, la miniatura, la descrizione e l'immagine
- `Footer`: il testo a piè di pagina, l'immagine a piè di pagina, il colore della riga sulla sinistra del messaggio e un timestamp

Ogni impostazione è opzionale, se si lascia un testo vuoto semplicemente non sarà mostrato.  
L'immagine dell'autore e l'immagine hanno un valore predefinito, puoi riportarla con il pulsante `Reimposta a default`.

### Immagini

Le immagini sono raccolte dall'archivio multimediale del server. Clicca su `Scegli immagine` per aprirlo, da lì puoi:

- carica una nuova immagine
- anteprima delle immagini che hai già caricato
- seleziona un'immagine per l'impostazione che stai modificando
- elimina le immagini di cui non hai più bisogno

_Eliminando un'immagine la cancella anche dalle impostazioni dell'interfaccia che si sta modificando, altre interfacce che lo utilizzano manterranno un'immagine interrotta fino a quando non la cambiere._

Le immagini che non vengono utilizzate da nessuna interfaccia vengono pulite automaticamente di tanto in tanto.

### Emoji personalizzate

Emojis può essere utilizzato nei testi dei messaggi e sui pulsanti. Le emoji standard possono essere semplicemente incollate, le emoji Discord personalizzate hanno bisogno del loro codice:

1. Vai su Discord e scrivi il prefisso emoji con una barra rovesciata, per esempio `\:name:`
2. Invia il messaggio, Discord invierà il codice delle emoji, come `<:name:id>` (o `<a:name:id>` per le emoji animate)
3. Copia quel codice e incollalo nella dashboard

## Pulsanti

Un'interfaccia può avere fino a 5 righe con 5 pulsanti ciascuna, il cruscotto li mostra come una griglia.  
Fare clic su un pulsante per modificarlo, o su una posizione vuota per aggiungerne una nuova.

Ogni pulsante ha queste impostazioni:

- `Button`: quale pulsante è mostrato in questa posizione. Un pulsante può essere utilizzato solo una volta per interfaccia, quindi quelli già posizionati da qualche altra parte non sono selezionabili. Scegli `No button` per rimuoverlo
- `Disabilitato`: gli utenti possono vedere il pulsante ma non possono cliccarlo
- `Nome`: il testo mostrato sul pulsante
- `Emoji`: le emoji mostrate sul pulsante
- `Stile`: il colore del pulsante

Un pulsante richiede almeno un nome o un'emoji per essere mostrato.

## Eliminazione di un'interfaccia

È possibile eliminare un'interfaccia in qualsiasi momento dalla dashboard.

### Esempio di interfaccia personalizzata

L'immagine sottostante è un esempio di interfaccia personalizzata:
![interfaccia personalizzata](/illustration/custom_interface.png "Interfaccia personalizzata")
