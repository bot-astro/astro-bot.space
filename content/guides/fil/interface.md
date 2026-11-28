---
title: Mga Interface
description: Alamin kung paano gawing kamangha-mangha at kakaiba ang itsura ng interface mo gamit ang gabay na ito
---

## Ano ang interface?

Ang interface ay isang mensaheng nagbibigay-daan sa mga user na mabilis na pamahalaan ang kanilang pansamantalang voice channel gamit ang mga simpleng button.  
Ganito ang itsura ng default na interface:
![default na interface](/guides/default_interface.png 'Default na interface')

## Paggawa ng interface

Maaari kang gumawa ng bagong interface sa dashboard, sa seksyon ng mga interface.  
Hihingi ito ng channel at maaari mong piliin ang gusto mo.

## Pagpapalit ng channel o muling pagpapadala ng interface

Kung nabura mo nang hindi sinasadya ang mensahe ng interface o gusto mo lang magpalit ng channel, magagawa mo ito mula sa mga setting ng interface sa dashboard.

## Pag-customize ng interface

Maaari mong i-customize ang bawat interface sa dashboard: buksan ang seksyon ng mga interface, pumili ng interface at i-click ang pamahalaan.  
Kapag tapos ka na, i-save ang mga pagbabago at agad na ia-update ng Astro ang mensahe.

_Tandaan na kung walang [Ultimate](/ultimate), maaari mo lang i-disable o i-enable ang mga button ng interface, lahat ng iba pa ay nangangailangan nito._

### Mga setting ng mensahe

Nahahati sa tatlong bahagi ang mensahe, bawat isa ay may sariling mga setting:

- `Header`: ang pangalan ng may-akda, ang link ng may-akda at ang larawan ng may-akda
- `Katawan`: ang pamagat, ang link ng pamagat, ang thumbnail, ang paglalarawan at ang larawan
- `Footer`: ang teksto ng footer, ang larawan ng footer, ang kulay ng linya sa kaliwa ng mensahe at isang timestamp

Opsyonal ang bawat setting, kung iiwan mong blangko ang isang teksto ay hindi lang ito ipapakita.  
May default na halaga ang larawan ng may-akda at ang larawan, maaari mo itong ibalik gamit ang button na `I-reset sa default`.

### Mga larawan

Pinipili ang mga larawan mula sa imbakan ng media ng server mo. I-click ang `Pumili ng larawan` para buksan ito, mula roon maaari mong:

- mag-upload ng bagong larawan
- i-preview ang mga larawang na-upload mo na
- pumili ng larawan para sa setting na ine-edit mo
- magtanggal ng mga larawang hindi mo na kailangan

_Kapag nagtanggal ng larawan, nalilinis din ito sa mga setting ng interface na ine-edit mo, ang ibang interface na gumagamit nito ay magpapakita ng sirang larawan hanggang sa baguhin mo ito._

Ang mga larawang hindi ginagamit ng anumang interface ay awtomatikong nililinis paminsan-minsan.

### Mga custom na emoji

Magagamit ang mga emoji sa mga teksto ng mensahe at sa mga button. Ang mga karaniwang emoji ay puwedeng i-paste lang, ang mga custom na emoji ng Discord ay nangangailangan ng kanilang code:

1. Pumunta sa Discord at isulat ang emoji na may backslash sa unahan, halimbawa `\:pangalan:`
2. Ipadala ang mensahe, ipapadala ng Discord ang code ng emoji, tulad ng `<:pangalan:id>` (o `<a:pangalan:id>` para sa mga animated na emoji)
3. Kopyahin ang code na iyon at i-paste sa dashboard

## Mga button

Maaaring magkaroon ang interface ng hanggang 5 hilera na may tig-5 button, ipinapakita ito ng dashboard bilang grid.  
I-click ang isang button para i-edit ito, o isang walang lamang posisyon para magdagdag ng bago.

May mga setting na ito ang bawat button:

- `Button`: kung aling button ang ipinapakita sa posisyong ito. Isang beses lang magagamit ang isang button sa bawat interface, kaya hindi mapipili ang mga naka-lagay na sa ibang posisyon. Piliin ang `Walang button` para alisin ito
- `Naka-disable`: nakikita ng mga user ang button pero hindi nila ito ma-click
- `Pangalan`: ang tekstong ipinapakita sa button
- `Emoji`: ang emoji na ipinapakita sa button
- `Estilo`: ang kulay ng button

Kailangan ng button ng kahit pangalan o emoji man lang para maipakita.

## Pagtanggal ng interface

Maaari mong tanggalin ang isang interface anumang oras mula sa dashboard.

### Halimbawa ng custom na interface

Ang larawan sa ibaba ay halimbawa ng custom na interface:
![custom na interface](/illustration/custom_interface.png 'Custom na interface')
