---
title: Voice roles
description: Learn how to configure voice role to make your server look extra slick
---

## What is a voice role
Voice roles (previously called connections) allow to connect voice channels to roles.  
They allow users to get a role while they are inside a specific voice channel, and Astro will remove the role from them when they leave that channel.    

Here in this example, a voice role is created on the category.  The user receives a role that permits the user to see a bunch of channels related to that category:
![voice role example](/illustration/voice_role.gif "Voice role example")


## Creating and managing voice roles
You can create, manage and delete voice roles on the dashboard.  

*Remember that without [Ultimate](/ultimate) you can have only 1 voice role.*

## Channel setting
When you create or edit a voice role, you must select a channel for it.  
The channel can be either:
- a normal voice channel (includes stage channels)
- a category: every voice channel inside that category will trigger the voice role
- a generator: every temporary voice channel created by that generator will trigger the voice role

## Action setting
There are three different actions you can choose from:
- `Assign`: Astro assigns the role to the user when he joins the channel and removes the role when the user leaves
- `Remove`: remove the role when the user join the channel and give it back when the user leaves
- `Toggle`: if the user doesn't have the role before joining the channel, it will behave like `Assign`, otherwise like `Remove` (basically toggles the role as the name suggests)