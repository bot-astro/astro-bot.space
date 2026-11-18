---
title: How to make join-to-create voice channels in Discord
description: Set up join-to-create voice channels on your Discord server. Members join one channel and get their own temporary voice channel, deleted when everyone leaves.
---

## What is a join-to-create voice channel?

Discord has no built-in way to make voice channels on demand, so servers usually end up with a long list of "Lobby 1", "Lobby 2", "Gaming 3" channels that sit empty most of the day.

A join-to-create voice channel (also called a temporary voice channel, auto voice channel or voice generator) fixes that. You keep one special channel in your server. When a member joins it, a bot creates a new voice channel just for them, moves them in and makes them the owner. When the channel is empty, the bot deletes it.

The result is a clean server where channels only exist while someone is using them, and members can rename, limit or lock their own channel without asking a moderator.

## How to set it up with Astro

Astro is a Discord bot focused on voice, and its generators are join-to-create channels. This is the fastest way to get one running.

### 1. Add Astro to your server

Use the button at the bottom of this page, or [this link](/invite?src=web-guide), and pick your server. You need the `Manage Server` permission on Discord to add a bot.

### 2. Run the quick setup

Type `/setup` in your server, or press the setup button Astro sends when it joins. Astro creates a category with a generator channel and an interface (a message with buttons the channel owner can use) inside it.

### 3. Test it

Join the generator channel. Astro creates a temporary voice channel, moves you into it and makes you its owner. Leave it and it gets deleted when it's empty.

### 4. Make it fit your server

Open the [dashboard](/guilds) and pick your server to change how channels are created:

- the name of the channels, which can use variables such as `{nickname}` or `{username}` of the owner
- the category where channels are created and where they are placed
- the user limit and bitrate
- the permissions: whether channels are locked or hidden by default and which role they apply to
- who can moderate the channels

You can have more than one generator, for example one for gaming and one for chatting, each with its own settings. Read the [generator guide](/guides/generator) for every option.

### 5. Let members manage their channel

The channel owner can rename it, set a user limit, lock or hide it and more, either with the buttons of the [interface](/guides/interface) or with slash commands.

## Add a waiting room

A waiting room is a voice channel created next to a temporary voice channel. Members who want to get in join the waiting room, and the owner of the channel drags them into theirs. It works well for private calls, interviews, streamers and game lobbies where the owner decides who joins.

Astro can create a waiting room automatically for every temporary channel, with its own name, user limit and bitrate, and owners can also create one on demand. Waiting rooms need [Ultimate](/ultimate). More in the [generator guide](/guides/generator#waiting-rooms).

## Tips for voice roles

Voice roles give members a role while they are in a voice channel and take it away when they leave. Combined with join-to-create channels they are handy for:

- showing a private text channel only to the people currently in a voice channel
- giving a "in voice" role that is visible in the member list
- unlocking a set of channels for everyone inside a whole category

In the dashboard you can connect a role to a normal voice channel, a category, or a generator. If you pick a generator, every temporary channel created by it triggers the role. The action can assign the role, remove it, or toggle it. See the [voice role guide](/guides/voice-role).

## Free and Ultimate

Astro is free to use. The free plan has a limited number of generators, interfaces, templates and voice roles, and features like waiting rooms and private text chats are part of [Ultimate](/ultimate). The [basics guide](/guides/basic) has the full comparison.

## Common questions

**Which permissions does the bot need?**  
By default Astro asks for `Administrator`, to work out of the box. If you can't give it that, you can turn the requirement off in the dashboard, see the [basics guide](/guides/basic#bot-permissions). At minimum Astro needs `Manage Channels`.

**Why is a channel name not updating right away?**  
Discord only allows a voice channel to be renamed twice every 10 minutes, so names can lag behind when members change them often.

**Is there a channel limit?**  
Discord allows up to 50 channels per category. When the generator category is full, an Ultimate server can use a fallback generator.
