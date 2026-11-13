---
title: Ang mga pangunahing kaalaman
description: Magsimulang gumamit ng Astro sa pamamagitan ng pag-aaral ng mga pangunahing kaalaman
---

## Ano ang kayang gawin ng Astro?

Nakatuon ang Astro sa voice na aspeto ng Discord at pinapaganda ito gamit ang ilang kakaiba at advanced na feature.

Ang pangunahing feature nito ay ang mga pansamantalang voice channel.  
Ang pansamantalang voice channel ay ginagawa ng tinatawag na mga generator (na ginagawa at pinamamahalaan ng Astro). Kapag sumali ang isang user sa generator, gagawa ang Astro ng pansamantalang voice channel para sa user at ililipat siya roon. Kapag nawalan ng laman ang pansamantalang voice channel, awtomatikong tatanggalin ito ng Astro.  
Sa ganitong paraan, wala kang makikitang maraming walang lamang voice channel sa server mo!

Bilang pandagdag, nagbibigay ang Astro ng mga paraan para mapamahalaan ng mga user ang kanilang pansamantalang voice channel, tulad ng pagpapalit ng pangalan, pagbabago ng limitasyon ng user, pag-lock / pagtatago ng channel at marami pang iba. Magagawa ito sa pamamagitan ng mga slash command o ng mga interface ng Astro. Ang interface ay isang mensaheng may mga button na ginawa ng Astro na nagbibigay-daan sa mga user na mabilis na magsagawa ng mga aksyon sa kanilang voice channel.

Bukod dito, may paraan ang Astro para pagsama-samahin ang ilang setting at ilapat ang lahat nang sabay sa isang pansamantalang voice channel: ang mga template. Halimbawa, kung may gaming server ka kung saan naglalaro ang mga user ng iba't ibang laro, makakagawa ka ng template para sa bawat laro na may sarili nitong pangalan, limitasyon ng user, atbp.

Isa pang napakahalagang feature ang mga Voice role. Gamit ang voice role, matitiyak mong makakakuha ang mga user ng partikular na role kapag nasa partikular silang voice channel. Napakalakas na feature ito na nagbubukas ng maraming iba't ibang posibilidad.

Maaari kang magbasa pa tungkol sa lahat ng feature na iyon sa kani-kanilang [gabay](/guides).  
Dito, tatalakayin natin ang mga pangunahing kaalaman sa pagsisimulang gumamit ng Astro sa server mo!

## Pag-invite sa bot

Una sa lahat, i-invite ang bot sa server mo. Para gawin ito, i-click lang ang [link na ito](/invite) at pumili ng server!  
Maaari mo ring bisitahin ang [dashboard](/guilds) at awtomatiko kang mapo-prompt na i-invite ang Astro sa server na gusto mong pamahalaan kung hindi pa ito naidaragdag doon.

## Mabilis na setup

Ayaw mong i-configure ang lahat nang mano-mano? Gamitin ang `/setup` command, o ang setup button na ipinapadala ng Astro kapag sumali ito sa server mo.  
Gagawa ang Astro ng category na may generator at interface sa loob, kaya agad na gagana ang mga pansamantalang voice channel. Pagkatapos, mababago mo ang pangalan, category, posisyon at lahat ng iba pa mula sa [dashboard](/guilds).

## Mga kinakailangan ng server

Para magamit ang Astro sa server mo, kailangan mong matugunan ang mga kinakailangang ito:

- may mas kaunti sa 50 bot (limitasyong ipinataw ng Discord)
- may hindi bababa sa pahintulot na `Manage Channels`

## Mga pahintulot ng bot

Kailangan ng Astro ang pahintulot na `Administrator` bilang default para gumana at matiyak ang magandang karanasan para sa karaniwang mga user ng Discord.

Kung may propesyonal kang server at hindi mo maibibigay ang pahintulot na iyon sa Astro dahil sa seguridad, maaari mong i-disable ang kinakailangang ito gamit ang toggle sa dashboard
![toggle ng pahintulot na admin](/guides/admin_permissions.png 'Toggle ng pahintulot na admin')
_Maaari kang humingi ng gabay sa Support Server tungkol sa mga pahintulot na kailangan ng Astro para gumana, pero hindi nagbibigay ng malalim na suporta para rito._

## Mga pahintulot ng command

Tandaan na maaari mong i-configure anumang oras kung sino ang may access sa mga slash command ng Astro gamit ang mga pahintulot ng slash command ng Discord.  
[Magbasa pa tungkol dito](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Wika ng server

Mababago mo ang wika ng server mo mula sa mga setting sa dashboard, susundin nito ang lahat ng mensaheng ipinapadala ng bot doon.

## Profile ng bot

Gusto mo bang magmukhang mas bahagi ng server mo ang Astro? Mula sa dashboard, mabibigyan mo ito ng custom na palayaw, avatar, banner at bio, para lang sa server mo.

## Mga error at isyu

Iuulat ng Astro ang lahat ng isyu at error na nararanasan nito habang gumagana sa server mo.  
Tuwing may napapansin kang hindi gumagana nang tama, tandaang tingnan ang seksyon ng mga error sa dashboard!

## Ultimate

Ang Ultimate ang premium na bersyon ng Astro, at nagbibigay ito ng maraming kapaki-pakinabang na advanced na feature habang inaalis ang lahat ng limitasyon:

| Feature                                            |                      Premium                      |                           Libre                            |
| -------------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Walang limitasyong generator ng pansamantalang VC  | <span class="text-discord-green text-lg">✓</span> |                         Hanggang 2                         |
| Walang limitasyong interface                       | <span class="text-discord-green text-lg">✓</span> |                         Hanggang 1                         |
| Walang limitasyong voice role                      | <span class="text-discord-green text-lg">✓</span> |                         Hanggang 1                         |
| Walang limitasyong template                        | <span class="text-discord-green text-lg">✓</span> |                         Hanggang 3                         |
| May numerong pangalan ng voice channel             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Mga interface na maaaring i-customize              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Filter ng masasamang salita para sa pangalan ng VC | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Mga waiting room                                   | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Mga pribadong text chat                            | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Voice role para sa mga may-ari ng channel          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Mga custom na mensahe sa paggawa ng voice channel  | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Mga fallback generator                             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Pag-upgrade ng server mo sa Ultimate

Kapag nakabili ka na ng subscription sa [pahina ng Ultimate](/ultimate) o sa pamamagitan ng [Discord App Store](https://discord.com/application-directory/715621848489918495/premium), maaari mong i-upgrade ang server mo gamit ang button sa dashboard
![ultimate upgrade](/guides/ultimate.png 'Ultimate upgrade')

### Pamamahala ng subscription mo

Maaari mong tingnan, pamahalaan at kanselahin ang mga subscription mo sa Ultimate gamit ang [Billing portal](/billing).  
Kung binili mo ang Ultimate sa checkout ng Discord App Store, tingnan ang [gabay na ito](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Suporta

Huwag mag-atubiling sumali sa [Support / Community Server](/support) kung may tanong ka!
