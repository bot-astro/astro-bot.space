---
title: Dasar-dasar
description: Mulai menggunakan Astro dengan mempelajari dasar-dasarnya
---

## Apa yang bisa dilakukan Astro?

Astro berfokus sepenuhnya pada sisi suara di Discord dan meningkatkannya dengan beberapa fitur unik dan canggih.

The main feature it provides are Temporary voice channels.  
A temporary voice channel gets created by so-called generators (which are created and managed by Astro). When a user joins a generator, Astro creates a temporary voice channel for the user and moves him/her into it. Once the temporary voice channel gets empty, Astro automatically deletes it.  
This way you won't have a bunch of empty voice channels sitting around in your server!

Complementary to that, Astro provides ways to let users manage their temporary voice channels, such as renaming the channel, changing the user limit, locking / hiding the channel and much more. That can be done either via slash commands, or Astro interfaces. An interface is simply a message with buttons created by Astro that allows users to quickly perform actions on their voice channel.

Additionally, Astro provides a way to group a bunch of settings together and apply them all at once to a temporary voice channel: templates. Lets say for example you have a gaming server where users play a bunch of different games, you can create a template for each game with its own name, user limit, etc...

Another extremely useful feature are Voice roles. With voice roles, you can ensure users get a specific role when they are inside a specific voice channel. It's a really powerful feature which unlocks many different scenarios.

You can read more about all those features in their corresponding [guide](/guides).  
Here we are gonna cover up the basics on how to get started using Astro in your server!

## Mengundang bot

First thing first invite the bot to your server. To do so you can simply click [this link](/invite) and select a server!  
Otherwise you can also visit the [dashboard](/guilds) and you will be automatically prompted to invite Astro in the server you want to manage if it's not added to it yet.

## Pengaturan cepat

Don't wanna configure everything by hand? Use the `/setup` command, or the setup button Astro sends when it joins your server.  
Astro will create a category with a generator and an interface inside it, so temporary voice channels work right away. Then you can change the name, category, position and everything else from the [dashboard](/guilds).

## Persyaratan server

Agar dapat menggunakan Astro di servermu, kamu harus memenuhi persyaratan berikut:

- memiliki kurang dari 50 bot (batas yang ditetapkan Discord)
- memiliki setidaknya izin `Kelola saluran`

## Izin bot

Astro memerlukan izin `Administrator` secara default agar berfungsi dan memastikan pengalaman yang hebat bagi pengguna Discord pada umumnya.

Jika kamu memiliki server profesional dan tidak dapat memberikan izin itu ke Astro karena alasan keamanan, kamu dapat menonaktifkan persyaratan ini lewat tombol yang tersedia di dashboard
![tombol izin administrator](/guides/admin_permissions.png "Tombol izin administrator")
_Kamu boleh meminta panduan di Server Dukungan terkait izin yang dibutuhkan Astro agar berfungsi, tetapi dukungan mendalam untuk hal itu tidak disediakan._

## Izin perintah

Remember that you can always configure who has access to Astro slash commands via Discord slash command permissions.  
[Read more about it here](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Bahasa server

Kamu bisa mengubah bahasa servermu dari pengaturan di dashboard, semua pesan yang dikirim bot di sana akan mengikutinya.

## Profil bot

Want Astro to look a bit more like part of your server? From the dashboard you can give it a custom nickname, avatar, banner and bio, only for your server.

## Error & masalah

Astro will report all the issues and errors it encounters when working in your server.  
Anytime you experience something working not quite right remember to check the errors section in the dashboard!

## Ultimate

Ultimate adalah versi premium Astro, menyediakan banyak fitur lanjutan yang berguna sekaligus menghapus semua batasan:

| Fitur                                         |                      Premium                      |                           Gratis                           |
| --------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Generator saluran suara sementara tanpa batas | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 2                         |
| Interface tanpa batas                         | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 1                         |
| Peran suara tanpa batas                       | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 1                         |
| Template tanpa batas                          | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 3                         |
| Nama saluran suara bernomor                   | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Interface yang dapat disesuaikan              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Filter kata kasar untuk nama saluran suara    | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Ruang tunggu                                  | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Obrolan teks pribadi                          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Peran suara untuk pemilik saluran             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Pesan kustom saat saluran suara dibuat        | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Generator cadangan                            | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Meningkatkan servermu ke Ultimate

Setelah membeli langganan di [halaman Ultimate](/ultimate) atau lewat [Discord App Store](https://discord.com/application-directory/715621848489918495/premium), kamu bisa meningkatkan servermu lewat tombol yang tersedia di dashboard
![peningkatan Ultimate](/guides/ultimate.png "Peningkatan Ultimate")

### Mengelola langgananmu

You can view, manage and cancel your Ultimate subscriptions using the [Billing portal](/billing).  
If you purchased Ultimate via the Discord App Store checkout [this guide](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Dukungan

Silakan bergabung ke [Server Dukungan / Komunitas](/support) jika kamu punya pertanyaan!
