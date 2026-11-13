---
title: Mga Template
description: Tuklasin ang mga template at alamin kung paano i-configure ang mga ito, magugustuhan sila ng mga user mo
---

## Ano ang template

Binubuo ang mga template ng isang hanay ng mga setting ng voice channel na maaaring ilapat nang sabay-sabay sa mga pansamantalang voice channel.

This is useful for example in gaming servers where users might be playing many different games.  
Having a template for each game would allow to make the voice channel more fitting to that game, for example with a specific name or user limit.

## Paggamit ng mga template

Magagamit ng mga user ng server mo ang mga template gamit ang `/template` na may autocompletion ng mga available na template, o gamit ang angkop na interface button.

## Paggawa at pamamahala ng mga template

Maaari kang gumawa, mamahala at magtanggal ng mga template sa [dashboard](/guilds).

_Tandaan na hanggang 3 template lang ang puwede mo kung walang [Ultimate](/ultimate)._

## Pangalan ng template

The name of a template is simply a name useful to users to identify a template.  
**It is not** the name that the temporary voice channel gets when the template is applied.

Kapag gusto ng user na maglapat ng template sa kanyang channel, listahan lang ng mga template ang makikita niya na may kani-kaniyang pangalan.

## Mga setting ng voice channel

Sa dashboard, maaari mong i-configure ang mga setting na inilalapat sa pansamantalang voice channel kapag ginamit ang isang template.

Maaari kang pumili ng:

- ang pangalan ng voice channel, na sumusuporta sa mga [variable](/guides/generator#variables)
- ang limitasyon ng user
- ang bitrate
- ang rehiyon

_Walang kailangan sa mga setting na ito, kaya hindi mo kailangang itakda ang lahat._

## Mga naka-enable na generator

If you want to restrict a template to some specific generators you can do that on the dashboard.  
If you do so, the template will not be usable by any temporary voice channel that has been created by a generator not in that `Enabled generators` list.
