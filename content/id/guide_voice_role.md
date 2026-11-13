---
title: Peran suara
description: Pelajari cara mengonfigurasi peran suara agar servermu terlihat ekstra keren
---

## Apa itu peran suara

Voice roles (previously called connections) allow to connect voice channels to roles.  
They allow users to get a role while they are inside a specific voice channel, and Astro will remove the role from them when they leave that channel.

Here in this example, a voice role is created on the category. The user receives a role that permits the user to see a bunch of channels related to that category:
![voice role example](/illustration/voice_role.gif "Voice role example")

## Membuat dan mengelola peran suara

Kamu dapat membuat, mengelola, dan menghapus peran suara di dashboard.

_Ingat bahwa tanpa [Ultimate](/ultimate) kamu hanya dapat memiliki 1 peran suara._

## Pengaturan saluran

When you create or edit a voice role, you must select a channel for it.  
The channel can be either:

- saluran suara biasa (termasuk saluran panggung)
- kategori: setiap saluran suara di dalamnya akan memicu peran suara
- generator: setiap saluran suara sementara yang dibuat oleh generator itu akan memicu peran suara

## Pengaturan aksi

Ada tiga aksi berbeda yang bisa kamu pilih:

- `Berikan`: Astro memberikan peran kepada pengguna saat bergabung ke saluran dan mencabutnya saat pengguna keluar
- `Cabut`: mencabut peran saat pengguna bergabung ke saluran dan mengembalikannya saat pengguna keluar
- `Alihkan`: jika pengguna belum memiliki peran sebelum bergabung ke saluran, akan berperilaku seperti `Berikan`, jika sudah maka seperti `Cabut` (pada dasarnya mengalihkan peran, seperti namanya)
