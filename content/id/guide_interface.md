---
title: Interface
description: Pelajari cara membuat antarmukamu terlihat luar biasa dan unik dengan panduan ini
---

## Apa itu interface?

An interface is a message that allows users to manage their temporary voice channel quickly via simple buttons.  
Here is what the default interface looks like:
![default interface](/guides/default_interface.png "Default interface")

## Membuat interface

You can create a new interface on the dashboard, in the interfaces section.  
It will ask for a channel and you can choose the one you want.

## Mengganti saluran atau mengirim ulang interface

Jika kamu tidak sengaja menghapus pesan interface atau hanya ingin mengganti saluran, kamu bisa melakukannya dari pengaturan interface di dashboard.

## Menyesuaikan interface

You can customise every interface on the dashboard: open the interfaces section, choose an interface and click on manage.  
Once you are done, save your changes and Astro will update the message right away.

_Ingat bahwa tanpa [Ultimate](/ultimate) kamu hanya bisa menonaktifkan atau mengaktifkan tombol pada interface, hal lainnya memerlukan Ultimate._

### Pengaturan pesan

Pesan dibagi menjadi tiga bagian, masing-masing dengan pengaturannya sendiri:

- `Header`: nama penulis, tautan penulis, dan gambar penulis
- `Isi`: judul, tautan judul, gambar mini, deskripsi, dan gambar
- `Footer`: teks footer, gambar footer, warna garis di sebelah kiri pesan, dan stempel waktu

Every setting is optional, if you leave a text empty it simply won't be shown.  
The author image and the image have a default value, you can bring it back with the `Reset to default` button.

### Gambar

Images are picked from your server media storage. Click on `Choose image` to open it, from there you can:

- mengunggah gambar baru
- melihat pratinjau gambar yang sudah kamu unggah
- memilih gambar untuk pengaturan yang sedang kamu edit
- menghapus gambar yang tidak lagi kamu butuhkan

_Menghapus gambar juga menghapusnya dari pengaturan interface yang sedang kamu edit, interface lain yang menggunakannya akan menampilkan gambar rusak sampai kamu mengubahnya._

Gambar yang tidak digunakan oleh interface mana pun akan dibersihkan secara otomatis dari waktu ke waktu.

### Emoji kustom

Emojis can be used in the message texts and on the buttons. Standard emojis can simply be pasted, custom Discord emojis need their code instead:

1. Buka Discord dan tulis emoji diawali garis miring terbalik, misalnya `\:nama:`
2. Kirim pesan, Discord akan mengirim kode emoji, seperti `<:nama:id>` (atau `<a:nama:id>` untuk emoji beranimasi)
3. Salin kode itu dan tempel di dashboard

## Tombol

An interface can have up to 5 rows with 5 buttons each, the dashboard shows them as a grid.  
Click on a button to edit it, or on an empty position to add a new one.

Setiap tombol memiliki pengaturan berikut:

- `Button`: which button is shown in this position. A button can be used only once per interface, so the ones already placed somewhere else are not selectable. Choose `No button` to remove it
- `Dinonaktifkan`: pengguna dapat melihat tombol tetapi tidak dapat mengkliknya
- `Nama`: teks yang ditampilkan pada tombol
- `Emoji`: emoji yang ditampilkan pada tombol
- `Gaya`: warna tombol

Tombol membutuhkan setidaknya nama atau emoji agar dapat ditampilkan.

## Menghapus interface

Kamu bisa menghapus interface kapan saja dari dashboard.

### Contoh interface kustom

Gambar di bawah ini adalah contoh interface kustom:
![interface kustom](/illustration/custom_interface.png "Interface kustom")
