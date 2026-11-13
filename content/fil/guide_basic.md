---
title: Ang mga pangunahing kaalaman
description: Magsimulang gumamit ng Astro sa pamamagitan ng pag-aaral ng mga pangunahing kaalaman
---

## Ano ang kayang gawin ng Astro?

Nakatuon ang Astro sa voice na aspeto ng Discord at pinapaganda ito gamit ang ilang kakaiba at advanced na feature.

The main feature it provides are Temporary voice channels.  
A temporary voice channel gets created by so-called generators (which are created and managed by Astro). When a user joins a generator, Astro creates a temporary voice channel for the user and moves him/her into it. Once the temporary voice channel gets empty, Astro automatically deletes it.  
This way you won't have a bunch of empty voice channels sitting around in your server!

Complementary to that, Astro provides ways to let users manage their temporary voice channels, such as renaming the channel, changing the user limit, locking / hiding the channel and much more. That can be done either via slash commands, or Astro interfaces. An interface is simply a message with buttons created by Astro that allows users to quickly perform actions on their voice channel.

Additionally, Astro provides a way to group a bunch of settings together and apply them all at once to a temporary voice channel: templates. Lets say for example you have a gaming server where users play a bunch of different games, you can create a template for each game with its own name, user limit, etc...

Another extremely useful feature are Voice roles. With voice roles, you can ensure users get a specific role when they are inside a specific voice channel. It's a really powerful feature which unlocks many different scenarios.

You can read more about all those features in their corresponding [guide](/guides).  
Here we are gonna cover up the basics on how to get started using Astro in your server!

## Pag-invite sa bot

First thing first invite the bot to your server. To do so you can simply click [this link](/invite) and select a server!  
Otherwise you can also visit the [dashboard](/guilds) and you will be automatically prompted to invite Astro in the server you want to manage if it's not added to it yet.

## Mabilis na setup

Don't wanna configure everything by hand? Use the `/setup` command, or the setup button Astro sends when it joins your server.  
Astro will create a category with a generator and an interface inside it, so temporary voice channels work right away. Then you can change the name, category, position and everything else from the [dashboard](/guilds).

## Mga kinakailangan ng server

Para magamit ang Astro sa server mo, kailangan mong matugunan ang mga kinakailangang ito:

- may mas kaunti sa 50 bot (limitasyong ipinataw ng Discord)
- may hindi bababa sa pahintulot na `Manage Channels`

## Mga pahintulot ng bot

Kailangan ng Astro ang pahintulot na `Administrator` bilang default para gumana at matiyak ang magandang karanasan para sa karaniwang mga user ng Discord.

Kung may propesyonal kang server at hindi mo maibibigay ang pahintulot na iyon sa Astro dahil sa seguridad, maaari mong i-disable ang kinakailangang ito gamit ang toggle sa dashboard
![toggle ng pahintulot na admin](/guides/admin_permissions.png "Toggle ng pahintulot na admin")
_Maaari kang humingi ng gabay sa Support Server tungkol sa mga pahintulot na kailangan ng Astro para gumana, pero hindi nagbibigay ng malalim na suporta para rito._

## Mga pahintulot ng command

Remember that you can always configure who has access to Astro slash commands via Discord slash command permissions.  
[Read more about it here](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Wika ng server

Mababago mo ang wika ng server mo mula sa mga setting sa dashboard, susundin nito ang lahat ng mensaheng ipinapadala ng bot doon.

## Profile ng bot

Want Astro to look a bit more like part of your server? From the dashboard you can give it a custom nickname, avatar, banner and bio, only for your server.

## Mga error at isyu

Astro will report all the issues and errors it encounters when working in your server.  
Anytime you experience something working not quite right remember to check the errors section in the dashboard!

## Ultimate

Ang Ultimate ang premium na bersyon ng Astro, at nagbibigay ito ng maraming kapaki-pakinabang na advanced na feature habang inaalis ang lahat ng limitasyon:

| Feature                                            |                      Premium                      |                            Libre                           |
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
![Ultimate upgrade](/guides/ultimate.png "Ultimate upgrade")

### Pamamahala ng subscription mo

You can view, manage and cancel your Ultimate subscriptions using the [Billing portal](/billing).  
If you purchased Ultimate via the Discord App Store checkout [this guide](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Suporta

Huwag mag-atubiling sumali sa [Support / Community Server](/support) kung may tanong ka!
