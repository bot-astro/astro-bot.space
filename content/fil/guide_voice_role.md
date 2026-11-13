---
title: Mga voice role
description: Alamin kung paano i-configure ang voice role para maging mas astig ang itsura ng server mo
---

## Ano ang voice role

Voice roles (previously called connections) allow to connect voice channels to roles.  
They allow users to get a role while they are inside a specific voice channel, and Astro will remove the role from them when they leave that channel.

Here in this example, a voice role is created on the category. The user receives a role that permits the user to see a bunch of channels related to that category:
![voice role example](/illustration/voice_role.gif "Voice role example")

## Paggawa at pamamahala ng mga voice role

Maaari kang gumawa, mamahala at magtanggal ng mga voice role sa dashboard.

_Tandaan na 1 voice role lang ang puwede mo kung walang [Ultimate](/ultimate)._

## Setting ng channel

When you create or edit a voice role, you must select a channel for it.  
The channel can be either:

- isang karaniwang voice channel (kasama ang mga stage channel)
- isang category: lahat ng voice channel sa loob nito ay magti-trigger ng voice role
- isang generator: lahat ng pansamantalang voice channel na ginawa ng generator na iyon ay magti-trigger ng voice role

## Setting ng aksyon

May tatlong magkakaibang aksyon na mapagpipilian mo:

- `Ibigay`: ibinibigay ng Astro ang role sa user kapag sumali siya sa channel at inaalis ito kapag umalis ang user
- `Alisin`: inaalis ang role kapag sumali ang user sa channel at ibinabalik ito kapag umalis ang user
- `I-toggle`: kung walang role ang user bago sumali sa channel, kikilos ito tulad ng `Ibigay`, kung mayroon naman ay tulad ng `Alisin` (ibig sabihin ay ito-toggle ang role, gaya ng ipinahihiwatig ng pangalan)
