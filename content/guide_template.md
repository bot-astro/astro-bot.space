---
title: Templates
description: Discover templates and learn how to configure them, your users will love them
---

## What is a template
Templates encapsulate a set of voice channel settings that can be applied all at once on temporary voice channels.  

This is useful for example in gaming servers where users might be playing many different games.  
Having a template for each game would allow to make the voice channel more fitting to that game, for example with a specific name or user limit.  

## Using templates
Users of your server can use templates either via `/template` which provides autocompletion for which templates are available, and via the apposite interface button.

## Creating and managing templates
You can create, manage and delete templates on the [dashboard](/guilds).  

*Remember that without [Ultimate](/ultimate) you can have a maximum of 3 templates.*

## Template name
The name of a template is simply a name useful to users to identify a template.  
**It is not** the name that the temporary voice channel gets when the template is applied.  

When a user wants to apply a template to its channel, he will only see a list of templates where each has its own name.  

## Voice channel settings
On the dashboard you can configure the settings that get applied to the temporary voice channel when a template is used.  

You can choose:
- the name for the voice channel, which supports [variables](http://localhost:3000/guides/generator#variables)
- the user limit
- the bitrate
- the region

*None of these settings are required so you do not need to set them all.*

## Enabled generators
If you want to restrict a template to some specific generators you can do that on the dashboard.  
If you do so, the template will not be usable by any temporary voice channel that has been created by a generator not in that `Enabled generators` list.

