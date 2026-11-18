---
title: Astro vs VoiceMaster
description: Looking at Astro and VoiceMaster for join-to-create voice channels on Discord? Here is what Astro offers and what to compare before you choose.
---

Astro and VoiceMaster are both Discord bots that create temporary voice channels when members join a "join to create" channel. This page describes what Astro does so you can compare it with what you need. We are the makers of Astro, so we only describe Astro here and don't repeat claims about VoiceMaster that we can't verify. Check VoiceMaster's own website or listing for what it offers today, including pricing.

## What Astro does

### Temporary voice channels

- Members join a generator channel and get their own voice channel, deleted when it's empty.
- You can create several generators per server. The free plan allows 2, [Ultimate](/ultimate) removes the limit.
- Channel names can use variables like the owner's nickname, and Ultimate adds numbered names (1, 2, 3, NATO, roman numerals).
- Ownership moves to another member when the owner leaves a channel that still has people in it.

### Managing a channel

- Owners rename, limit, lock, hide, permit or ban members, change the bitrate, region and status, and transfer or claim ownership.
- It can be done with slash commands or with an [interface](/guides/interface), a message with buttons that Astro posts in your server. Ultimate lets you customise how interfaces look.
- [Templates](/guides/template) save a group of channel settings that members can re-apply.

### Voice roles

[Voice roles](/guides/voice-role) assign, remove or toggle a role while a member is in a voice channel, a category or any channel created by a generator.

### Dashboard

Everything is configured on a [web dashboard](/guilds), and `/setup` creates a working generator and interface in one command.

### Waiting rooms and private text chats

Astro can create a waiting room and a private text chat next to each temporary channel. These are [Ultimate](/ultimate) features.

### Languages

The bot and the dashboard are available in 11 languages.

## What to compare

Bots in this category cover the basics, so the choice depends on what you need. Questions worth checking for each bot:

| Question                                            | Astro                                                |
| --------------------------------------------------- | ---------------------------------------------------- |
| How many generators can I have for free?            | 2                                                    |
| Is there a web dashboard to configure everything?   | Yes                                                  |
| Can members manage channels with buttons?           | Yes, interfaces                                      |
| Can I give roles based on voice channels?           | Yes, voice roles (1 free)                            |
| Are waiting rooms and private text chats available? | Yes, with Ultimate                                   |
| Does the bot need Administrator?                    | Asked by default, can be turned off in the dashboard |
| Is it available in my language?                     | 11 languages                                         |

Fill the same table for any other bot you are considering, and try the free plan of each on a test server before you commit.

## Try Astro

Setting up takes a minute: add the bot, run `/setup` and join the generator. Follow the [step by step guide](/guides/join-to-create-voice-channels) if you want to see how.
