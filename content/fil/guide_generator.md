---
title: Mga Generator
description: Alamin kung paano i-configure at gamitin ang mga generator ng pansamantalang voice channel
---

## Ano ang generator?

Ang mga generator ay mga channel na ginawa at pinamamahalaan ng Astro.  
Kapag sumali ang isang user sa generator, gagawa ang Astro ng pansamantalang voice channel at ililipat ang user doon.

Ang user na gumawa ng pansamantalang voice channel ay tinatawag na may-ari.
Mapapamahalaan ng may-ari ang channel gamit ang mga slash command ng Astro o ang mga [interface](/guides/interface), na parehong nagbibigay-daan sa user na baguhin ang pangalan ng channel, limitasyon ng user, mga pahintulot at lahat ng iba pa.

Kapag umalis ang may-ari, kung may iba pang user na _hindi bot_ sa channel, ililipat nang random ang pagmamay-ari sa isa pang user.  
Kapag umalis naman ang may-ari at wala nang user sa channel, tatanggalin ito.

Napakadaling i-customize ng mga generator, sa gabay na ito ay matututunan mong i-configure ang mga ito para eksaktong umangkop sa pangangailangan ng server mo!

## Paggawa at pamamahala ng mga generator

Kayang pamahalaan ng Astro ang maraming generator at may sarili silang mga setting.  
Sa seksyon ng mga generator sa dashboard, makikita mo ang lahat ng generator ng server mo, makakagawa ka ng bago, at mapapamahalaan at matatanggal mo ang mga ito.

_Tandaan na hanggang 2 generator lang ang puwede mo kung walang [Ultimate](/ultimate)._

## Mga setting ng pangalan

Maaaring nasa tatlong magkakaibang estado ang pansamantalang voice channel: default, naka-lock o nakatago.  
Ang mga estadong ito ay inililipat ng mga user gamit ang slash command o interface.

Maaari kang magbigay ng pangalan para sa bawat estado:
![mga setting ng pangalan ng generator](/guides/generator_name.png 'Mga setting ng pangalan ng generator')

### Mga variable

Maaari mong gamitin ang mga `Variable` para gawing dynamic ang pangalan ng channel. Papalitan ng Astro ang mga variable ng angkop na halaga kapag inilalapat ang bagong pangalan:

#### Mga variable ng may-ari ng voice channel

| Variable     | Paglalarawan                                  |
| ------------ | --------------------------------------------- |
| `{nickname}` | Ang palayaw (o username kung wala) ng may-ari |
| `{username}` | Ang username ng may-ari                       |
| `{mention}`  | Ang mention (@pangalan) ng may-ari            |
| `{id}`       | Ang ID ng may-ari                             |

#### Mga variable ng aktibidad ng may-ari ng voice channel · [nangangailangan ng Ultimate](/ultimate)

| Variable                | Paglalarawan                                                          |
| ----------------------- | --------------------------------------------------------------------- |
| `{activity_name}`       | Ang pangalan ng aktibidad ng may-ari (halimbawa ang pangalan ng laro) |
| `{activity_emoji}`      | Isang emoji na kumakatawan sa aktibidad                               |
| `{activity_start_time}` | Ang oras kung kailan sinimulan ng may-ari ang aktibidad               |
| `{activity_end_time}`   | Ang oras kung kailan matatapos o natapos ang aktibidad                |
| `{activity_type}`       | Ang uri ng aktibidad (naglalaro, nanonood, nakikinig, atbp.)          |
| `{activity_link}`       | Ang link ng Twitch stream kung ang aktibidad ay isang Twitch stream   |

#### Mga variable ng voice channel

| Variable         | Paglalarawan                           |
| ---------------- | -------------------------------------- |
| `{vc_name}`      | Ang pangalan ng VC                     |
| `{vc_bitrate}`   | Ang bitrate ng VC                      |
| `{vc_userlimit}` | Ang limitasyon ng user ng VC           |
| `{vc_users}`     | Ang dami ng user sa VC                 |
| `{vc_id}`        | Ang ID ng VC                           |
| `{vc_mention}`   | Ang VC bilang mention (#voice-channel) |

#### Mga variable ng pataas na halaga · [nangangailangan ng Ultimate](/ultimate)

| Variable  | Paglalarawan                                         |
| --------- | ---------------------------------------------------- |
| `{n}`     | Isang simpleng pataas na numero (1, 2, 3...)         |
| `{nato}`  | Pataas na alpabetong NATO (Alpha, Bravo, Charlie...) |
| `{roman}` | Pataas na mga Roman numeral (I, II, III, IV...)      |

**Paano gumagana ang mga pataas na numero?**  
Dahil sa bagong limitasyon ng Discord na pumapayag lang na palitan ang pangalan ng voice channel nang 2 beses kada 10 minuto, medyo iba ang takbo ng feature na ito sa inaasahan mo:  
Pataas ang pagkakagawa ng mga voice channel: hahanapin ng bot ang unang nawawalang voice channel at ilalagay ang bagong voice channel sa lugar nito.

Halimbawa: May 5 VC na pataas na ginawa ng Astro [VC #1, VC#2, VC #3, VC #4 at VC#5], ngayon sabihin nating natanggal ang VC #3. Ang hindi gagawin ng Astro ay palitan ang pangalan ng bawat VC para maging tama (ang VC#4 ay gawing VC #3 at iba pa), sa halip, sa susunod na paggawa ng VC ay hindi ito magiging VC #6 kundi VC #3 para mapunan ang puwang.

Kung makita mong mali ang numerong pinagsisimulan, maaari mong pindutin ang button na `I-clear ang cache` sa dashboard para i-reset ang bilang
![i-clear ang cache](/guides/clear_cache.png 'I-clear ang cache')

### Mga kondisyon sa pag-update ng pangalan

Maaari mo ring i-configure kung kailan dapat i-update ang pangalan ng channel:
![mga kondisyon sa pag-update ng pangalan ng generator](/guides/generator_name_conditions.png 'Mga kondisyon sa pag-update ng pangalan ng generator')

### Mga limitasyon sa pag-update ng pangalan

Ang pangalan ng voice channel ng Discord ay mapapalitan lang nang 2 beses kada 10 minuto, ipinakilala ito ng Discord noon pa, sa kasamaang-palad.
Dahil dito, maaaring hindi laging eksakto ang mga pangalan ng voice channel kung madalas ang pagbabago.

## Mga pangunahing setting

Sa dashboard, makikita mo rin ang mga opsyon para baguhin ang:

- ang category kung saan ginagawa ang mga pansamantalang voice channel
- ang limitasyon ng user
- ang bitrate
- ang posisyon: kung ang pansamantalang voice channel ay gagawin bago ang generator, pagkatapos nito, o sa ibaba ng category
- para baguhin ang rehiyon, maaari mong baguhin mismo sa Discord ang rehiyon ng channel ng generator
- ang default na status ng voice channel: ang maliit na tekstong ipinapakita sa ilalim ng pangalan ng voice channel, mababago ito ng mga may-ari anumang oras gamit ang `/status` command

## Mga setting ng pahintulot

### Pagmamana ng pahintulot

Bilang default, nagmamana ang mga pansamantalang voice channel ng mga pahintulot mula sa generator.  
Mababago mo ang pag-uugaling ito sa dashboard, maaari mong gawing kopyahin ng mga channel ang mga pahintulot mula sa category o huwag kopyahin ang anumang pahintulot.

### Target na role

Isa ang target na role sa pinakamahalagang setting. Kapag kailangang baguhin ang mga pahintulot ng channel, halimbawa kapag nilo-lock o itinatago ito, babaguhin ng Astro ang mga pahintulot ng target na role para makuha ang nais na estado.  
Halimbawa, kung sa server mo ay kailangang dumaan ang mga user sa proseso ng beripikasyon at makakuha ng role na `Verified`, malamang gusto mo itong itakda bilang target na role.

### Moderator role

Kung magbibigay ka ng moderator role, palagi itong magkakaroon ng kinakailangang pahintulot para pamahalaan ang channel, kahit naka-lock o nakatago ito.

### Default na estado

Maaari mong piliin kung ang mga pansamantalang voice channel ay dapat gawing naka-lock o nakatago bilang default.

## Mga setting ng command

Maaari kang magtakda ng ilang limitasyon sa mga command ng user, tulad ng kung puwede silang gumamit ng masasamang salita sa pangalan ng kanilang voice channel (gumagana lang sa English), at magbigay ng pinakamababa at pinakamataas na halagang puwedeng gamitin ng mga user para sa limitasyon ng user at bitrate.

## Mga kapaki-pakinabang na utility

### Role ng may-ari

Kung ibinigay, ibibigay ng Astro ang role na ito sa mga may-ari ng pansamantalang voice channel, at aalisin sa kanila kapag umalis sila sa channel o kapag nailipat ang pagmamay-ari.

### Queue mode

Kapag naka-enable ang queue mode, susubukan ng Astro na punuin muna ang mga kasalukuyang channel bago gumawa ng bago.  
Kapaki-pakinabang na feature kapag may limitasyon ng user ang mga channel at gusto mong tiyaking napupuno ang lahat ng channel sa pinakamataas na bilang ng user.

### Fallback generator

Kapag napuno ang category ng generator (umabot sa 50 channel), ililipat ang mga user na sumali sa generator sa fallback generator kung nakatakda.

## Mga waiting room

Ang waiting room ay isang voice channel na ginagawa malapit sa isang pansamantalang voice channel.  
Maaaring sumali ang mga user sa waiting room para ipakitang naghihintay silang makapasok sa pansamantalang voice channel, at maaaring i-drag ng may-ari nito ang mga user mula sa waiting room papunta sa kanyang channel.

Sa dashboard, maaari mong piliin kung awtomatikong gagawa ang Astro ng waiting room para sa bawat pansamantalang voice channel at i-configure ang lahat ng aspeto nito: pangalan (puwede ring gumamit ng mga variable dito), limitasyon ng user, bitrate, atbp.

Makakagawa rin ang mga user ng waiting room gamit ang angkop na slash command o interface button.

## Mga pribadong text chat

Ang pribadong text chat naman ay isang text channel na nakikita lang ng mga user sa loob ng pansamantalang voice channel.  
Maaari mong i-configure sa dashboard kung gagawa ba ang Astro ng pribadong text chat para sa bawat pansamantalang voice channel, kasama ang mga setting nito, tulad ng sa mga waiting room.

Makakagawa rin ang mga user ng pribadong text chat gamit ang angkop na slash command o interface button.

### Mensahe sa paggawa

Maaari ka ring magbigay ng mensaheng ipinapadala ng Astro sa mga pansamantalang voice channel kapag ginawa ang mga ito.  
Ipapadala ang mensahe sa pribadong text chat kung mayroon, kung wala naman ay sa chat ng voice channel (oo, nakakalito ito, pero may built-in na text chat na rin ang mga voice channel ngayon).

Maaari mong piliin kung embed o simpleng text message ang mensahe.

Bilang alternatibo, maaari mong ipadala sa Astro ang isang [Interface](/guides/interface) sa text chat!
