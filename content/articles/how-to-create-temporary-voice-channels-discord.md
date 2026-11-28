---
title: How to create temporary voice channels in Discord
description: A step by step guide to set up join to create temporary voice channels in your Discord server with the free Astro Discord bot, in under a minute.
date: 2026-11-28
---

**Temporary voice channels** (also called _join to create_ channels) are voice channels that get created when a member joins a special "generator" channel and are deleted automatically once everyone leaves. Discord does not offer them natively, so you need a bot. This guide shows how to set them up with **Astro**, a free Discord bot for temporary voice channels and voice roles used by more than 150,000 servers.

## Why use temporary voice channels?

- **No clutter**: instead of ten empty "Gaming 1, Gaming 2..." channels, there is one generator and channels only exist while people use them.
- **Every group gets its own room**: members create a channel for their squad, study group or call with one click.
- **Members manage their own channel**: the creator owns the channel and can rename it, set a user limit, lock or hide it, without needing moderator permissions.

## Step 1: invite the Astro Discord bot

[Add Astro to your server](/invite?src=article-temp-vc) and pick the server you want to set it up in. You need the `Manage Channels` permission on that server.

Astro asks for the `Administrator` permission by default, so every feature works out of the box. If your server cannot grant it, you can turn this requirement off from the dashboard.

## Step 2: run the setup

Run the `/setup` command, or press the setup button Astro sends when it joins your server.

Astro creates a category with:

- a **generator**: the voice channel members join to get their own temporary voice channel
- an **interface**: a message with buttons members use to manage their channel, great on mobile

That's it, temporary voice channels already work. Join the generator to try it: Astro creates a voice channel for you, moves you in it and deletes it when it gets empty.

## Step 3: customise it from the dashboard

Open the [dashboard](/guilds) to make the system fit your server:

- **Channel names**: use variables like `{nickname}` to name each channel after its owner, or numbered names like `Squad 1, Squad 2` and NATO names like `Alpha, Bravo` ([Ultimate](/ultimate)).
- **User limit, bitrate and position** of the new channels, and the category they are created in.
- **Permissions**: copy them from the generator or the category, choose the role that gets locked out when a channel is locked or hidden, and a moderator role that can always join.
- **Templates**: presets members can apply to their channel, for example one per game with its own name and user limit.
- **Waiting rooms** and **private text chats** created next to each temporary voice channel ([Ultimate](/ultimate)).

You can create more generators, for example one for gaming and one for study rooms, each with its own settings. The free plan includes 2 generators, [Ultimate](/ultimate) removes the limit.

## How members manage their channel

The member who creates a temporary voice channel owns it. With the interface buttons or slash commands the owner can:

- rename the channel and change its status
- set a user limit or the bitrate
- lock or hide the channel, and permit or ban specific members
- hand the channel over to someone else

When the owner leaves, the ownership moves to another member in the channel. When the last member leaves, the channel is deleted.

## Frequently asked questions

### Does Discord have temporary voice channels built in?

No, Discord has no native join to create voice channels. You need a bot like Astro that creates and deletes the channels for you.

### Is Astro free?

Yes. Temporary voice channels, interfaces, voice roles and templates are free, with up to 2 generators, 1 interface, 1 voice role and 3 templates per server. [Astro Ultimate](/ultimate) removes the limits and adds waiting rooms, private text chats, numbered names, customisable interfaces and more.

### Why does the channel name not update right away?

Discord only lets bots rename a voice channel 2 times every 10 minutes. If names change very often, Astro has to wait for that limit.

### Where can I learn more?

The [guides](/guides) cover every setting in detail, and the [support server](/support) is there if you get stuck.
