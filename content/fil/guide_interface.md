---
title: Mga Interface
description: Alamin kung paano gawing kamangha-mangha at kakaiba ang itsura ng interface mo gamit ang gabay na ito
---

## Ano ang interface?

An interface is a message that allows users to manage their temporary voice channel quickly via simple buttons.  
Here is what the default interface looks like:
![default interface](/guides/default_interface.png "Default interface")

## Paggawa ng interface

You can create a new interface on the dashboard, in the interfaces section.  
It will ask for a channel and you can choose the one you want.

## Pagpapalit ng channel o muling pagpapadala ng interface

Kung nabura mo nang hindi sinasadya ang mensahe ng interface o gusto mo lang magpalit ng channel, magagawa mo ito mula sa mga setting ng interface sa dashboard.

## Pag-customize ng interface

You can customise every interface on the dashboard: open the interfaces section, choose an interface and click on manage.  
Once you are done, save your changes and Astro will update the message right away.

_Tandaan na kung walang [Ultimate](/ultimate), maaari mo lang i-disable o i-enable ang mga button ng interface, lahat ng iba pa ay nangangailangan nito._

### Mga setting ng mensahe

Nahahati sa tatlong bahagi ang mensahe, bawat isa ay may sariling mga setting:

- `Header`: ang pangalan ng may-akda, ang link ng may-akda at ang larawan ng may-akda
- `Katawan`: ang pamagat, ang link ng pamagat, ang thumbnail, ang paglalarawan at ang larawan
- `Footer`: ang teksto ng footer, ang larawan ng footer, ang kulay ng linya sa kaliwa ng mensahe at isang timestamp

Every setting is optional, if you leave a text empty it simply won't be shown.  
The author image and the image have a default value, you can bring it back with the `Reset to default` button.

### Mga larawan

Images are picked from your server media storage. Click on `Choose image` to open it, from there you can:

- mag-upload ng bagong larawan
- i-preview ang mga larawang na-upload mo na
- pumili ng larawan para sa setting na ine-edit mo
- magtanggal ng mga larawang hindi mo na kailangan

_Kapag nagtanggal ng larawan, nalilinis din ito sa mga setting ng interface na ine-edit mo, ang ibang interface na gumagamit nito ay magpapakita ng sirang larawan hanggang sa baguhin mo ito._

Ang mga larawang hindi ginagamit ng anumang interface ay awtomatikong nililinis paminsan-minsan.

### Mga custom na emoji

Emojis can be used in the message texts and on the buttons. Standard emojis can simply be pasted, custom Discord emojis need their code instead:

1. Pumunta sa Discord at isulat ang emoji na may backslash sa unahan, halimbawa `\:pangalan:`
2. Ipadala ang mensahe, ipapadala ng Discord ang code ng emoji, tulad ng `<:pangalan:id>` (o `<a:pangalan:id>` para sa mga animated na emoji)
3. Kopyahin ang code na iyon at i-paste sa dashboard

## Mga button

An interface can have up to 5 rows with 5 buttons each, the dashboard shows them as a grid.  
Click on a button to edit it, or on an empty position to add a new one.

May mga setting na ito ang bawat button:

- `Button`: which button is shown in this position. A button can be used only once per interface, so the ones already placed somewhere else are not selectable. Choose `No button` to remove it
- `Naka-disable`: nakikita ng mga user ang button pero hindi nila ito ma-click
- `Pangalan`: ang tekstong ipinapakita sa button
- `Emoji`: ang emoji na ipinapakita sa button
- `Estilo`: ang kulay ng button

Kailangan ng button ng kahit pangalan o emoji man lang para maipakita.

## Pagtanggal ng interface

Maaari mong tanggalin ang isang interface anumang oras mula sa dashboard.

### Halimbawa ng custom na interface

Ang larawan sa ibaba ay halimbawa ng custom na interface:
![custom na interface](/illustration/custom_interface.png "Custom na interface")
