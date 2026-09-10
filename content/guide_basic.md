---
title: The basics
description: Get started using Astro learning the basics
---

## What can Astro do?
Astro focuses exclusively on the voice aspect of Discord and improves it with some unique and advanced features.  

The main feature it provides are Temporary voice channels.  
A temporary voice channel gets created by so-called generators (which are created and managed by Astro). When a user joins a generator, Astro creates a temporary voice channel for the user and moves him/her into it. Once the temporary voice channel gets empty, Astro automatically deletes it.  
This way you won't have a bunch of empty voice channels sitting around in your server!  

Complementary to that, Astro provides ways to let users manage their temporary voice channels, such as renaming the channel, changing the user limit, locking / hiding the channel and much more.  That can be done either via slash commands, or Astro interfaces. An interface is simply a message with buttons created by Astro that allows users to quickly perform actions on their voice channel.  

Additionally, Astro provides a way to group a bunch of settings together and apply them all at once to a temporary voice channel: templates. Lets say for example you have a gaming server where users play a bunch of different games, you can create a template for each game with its own name, user limit, etc...

Another extremely useful feature are Voice roles. With voice roles, you can ensure users get a specific role when they are inside a specific voice channel. It's a really powerful feature which unlocks many different scenarios.  

You can read more about all those features in their corresponding [guide](/guides).  
Here we are gonna cover up the basics on how to get started using Astro in your server!



## Inviting the bot
First thing first invite the bot to your server. To do so you can simply click [this link](/invite) and select a server!  
Otherwise you can also visit the [dashboard](/guilds) and you will be automatically prompted to invite Astro in the server you want to manage if it's not added to it yet.

## Server requirements
In order to be able to use Astro in your server you must meet these requirements:
- have less than 50 bots (Discord imposed limit)
- have at least `Manage Channels` permissions

## Bot permissions
Astro requires `Administrator` permissions by default to work and ensure a great user experience for the average Discord users.  

If you own a professional server and cannot give that permission to Astro for security reasons, you can disable this requirement via the apposite toggle on the dashboard
![admin permission toggle](/guides/admin_permissions.png "Admin permission toggle")
*You may ask for guidelines in the Support Server regarding the permissions that Astro needs in order to work, but in depth support is not provided for that.*  

## Command permissions
Remember that you can always configure who has access to Astro slash commands via Discord slash command permissions.  
[Read more about it here](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Errors & Issues
Astro will report all the issues and errors it encounters when working in your server.  
Anytime you experience something working not quite right remember to check the errors section in the dashboard!

## Ultimate
Ultimate is the premium version of Astro, and it provides many useful advanced features while removing all limitations:  
| Feature                                      | Premium | Free         |
|----------------------------------------------|:-------:|:------------:|
| Unlimited temporary vc generators            | <span class="text-discord-green text-lg">✓</span>       | Maximum 2    |
| Unlimited interfaces                         | <span class="text-discord-green text-lg">✓</span>       | Maximum 1    |
| Unlimited voice roles                        | <span class="text-discord-green text-lg">✓</span>       | Maximum 1    |
| Unlimited templates                          | <span class="text-discord-green text-lg">✓</span>       | Maximum 3    |
| Numbered voice channel names                 | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |
| Customisable interfaces                      | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |
| Badwords filter for voice channel names      | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |
| Waiting rooms                                | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |
| Private text chats                           | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |
| Voice role for channel owners                | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |
| Custom messages at voice channel creation    | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |
| Fallback generators                          | <span class="text-discord-green text-lg">✓</span>       | <span class="text-foreground-destructive text-lg">✗</span>            |

### Upgrading your server to Ultimate
Once you purchase a subscription on the [Ultimate page](/ultimate) or via the [Discord App Store](https://discord.com/application-directory/715621848489918495/premium) you can upgrade your server via the apposite button on the dashboard
![ultimate upgrade](/guides/ultimate.png "Ultimate upgrade")

### Managing your subscription 
You can view, manage and cancel your Ultimate subscriptions using the [Billing portal](/billing).  
If you purchased Ultimate via the Discord App Store checkout [this guide](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Support
Feel free to join the [Support / Community Server](/support) if you got any question!