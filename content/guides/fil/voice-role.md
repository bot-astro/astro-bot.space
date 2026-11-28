---
title: Mga voice role
description: Alamin kung paano i-configure ang voice role para maging mas astig ang itsura ng server mo
---

## Ano ang voice role

Ang mga voice role (dating tinatawag na mga koneksyon) ay nagbibigay-daan na ikonekta ang mga voice channel sa mga role.  
Nagpapahintulot ito sa mga user na makakuha ng role habang nasa loob ng partikular na voice channel, at aalisin ito ng Astro sa kanila kapag umalis sila sa channel na iyon.

Sa halimbawang ito, may voice role na ginawa sa category. Nakakatanggap ang user ng role na nagpapahintulot sa kanyang makakita ng ilang channel na kaugnay ng category na iyon:
![halimbawa ng voice role](/illustration/voice_role.gif 'Halimbawa ng voice role')

## Paggawa at pamamahala ng mga voice role

Maaari kang gumawa, mamahala at magtanggal ng mga voice role sa dashboard.

_Tandaan na 1 voice role lang ang puwede mo kung walang [Ultimate](/ultimate)._

## Setting ng channel

Kapag gumagawa o nag-e-edit ka ng voice role, kailangan mong pumili ng channel para rito.  
Ang channel ay maaaring:

- isang karaniwang voice channel (kasama ang mga stage channel)
- isang category: lahat ng voice channel sa loob nito ay magti-trigger ng voice role
- isang generator: lahat ng pansamantalang voice channel na ginawa ng generator na iyon ay magti-trigger ng voice role

## Setting ng aksyon

May tatlong magkakaibang aksyon na mapagpipilian mo:

- `Ibigay`: ibinibigay ng Astro ang role sa user kapag sumali siya sa channel at inaalis ito kapag umalis ang user
- `Alisin`: inaalis ang role kapag sumali ang user sa channel at ibinabalik ito kapag umalis ang user
- `I-toggle`: kung walang role ang user bago sumali sa channel, kikilos ito tulad ng `Ibigay`, kung mayroon naman ay tulad ng `Alisin` (ibig sabihin ay ito-toggle ang role, gaya ng ipinahihiwatig ng pangalan)
