---
title: Interfaces
description: Learn how to make your interface look amazing and unique with this guide
---

## What is an interface?

An interface is a message that allows users to manage their temporary voice channel quickly via simple buttons.  
Here is what the default interface looks like:
![default interface](/guides/default_interface.png 'Default interface')

## Creating an interface

You can create a new interface on the dashboard, in the interfaces section.  
It will ask for a channel and you can choose the one you want.

## Changing channel or re-sending an interface

If you mistakenly deleted an interface message or simply wanna change the channel, you can do it from the interface settings on the dashboard.

## Customising an interface

You can customise every interface on the dashboard: open the interfaces section, choose an interface and click on manage.  
Once you are done, save your changes and Astro will update the message right away.

_Remember that without [Ultimate](/ultimate) you can only disable or enable the buttons of an interface, everything else requires it._

### Message settings

The message is split in three parts, each one with its own settings:

- `Header`: the author name, the author link and the author image
- `Body`: the title, the title link, the thumbnail, the description and the image
- `Footer`: the footer text, the footer image, the color of the line on the left of the message and a timestamp

Every setting is optional, if you leave a text empty it simply won't be shown.  
The author image and the image have a default value, you can bring it back with the `Reset to default` button.

### Images

Images are picked from your server media storage. Click on `Choose image` to open it, from there you can:

- upload a new image
- preview the images you already uploaded
- select an image for the setting you are editing
- delete the images you don't need anymore

_Deleting an image also clears it from the settings of the interface you are editing, other interfaces using it will keep a broken image until you change it._

Images that are not used by any interface are cleaned up automatically from time to time.

### Custom emojis

Emojis can be used in the message texts and on the buttons. Standard emojis can simply be pasted, custom Discord emojis need their code instead:

1. Go on Discord and write the emoji prefixed with a backslash, for example `\:name:`
2. Send the message, Discord will send the code of the emoji, like `<:name:id>` (or `<a:name:id>` for animated emojis)
3. Copy that code and paste it in the dashboard

## Buttons

An interface can have up to 5 rows with 5 buttons each, the dashboard shows them as a grid.  
Click on a button to edit it, or on an empty position to add a new one.

Each button has these settings:

- `Button`: which button is shown in this position. A button can be used only once per interface, so the ones already placed somewhere else are not selectable. Choose `No button` to remove it
- `Disabled`: users can see the button but can't click it
- `Name`: the text shown on the button
- `Emoji`: the emoji shown on the button
- `Style`: the color of the button

A button needs at least a name or an emoji to be shown.

## Deleting an interface

You can delete an interface at any time from the dashboard.

### Example of custom interface

The image below is an example of a custom interface:
![custom interface](/illustration/custom_interface.png 'Custom interface')
