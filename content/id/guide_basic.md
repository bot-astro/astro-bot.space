---
title: Dasar-dasar
description: Mulai menggunakan Astro dengan mempelajari dasar-dasarnya
---

## Apa yang bisa dilakukan Astro?

Astro berfokus sepenuhnya pada sisi suara di Discord dan meningkatkannya dengan beberapa fitur unik dan canggih.

Fitur utamanya adalah saluran suara sementara.  
Saluran suara sementara dibuat oleh yang disebut generator (yang dibuat dan dikelola oleh Astro). Saat pengguna bergabung ke generator, Astro membuat saluran suara sementara untuk pengguna tersebut dan memindahkannya ke sana. Setelah saluran suara sementara kosong, Astro menghapusnya secara otomatis.  
Dengan begitu servermu tidak akan penuh dengan saluran suara kosong!

Sebagai pelengkap, Astro menyediakan cara bagi pengguna untuk mengelola saluran suara sementara mereka, seperti mengganti nama saluran, mengubah batas pengguna, mengunci / menyembunyikan saluran, dan masih banyak lagi. Semua itu bisa dilakukan lewat perintah slash atau antarmuka Astro. Antarmuka adalah pesan dengan tombol yang dibuat oleh Astro agar pengguna dapat dengan cepat melakukan aksi pada saluran suara mereka.

Selain itu, Astro menyediakan cara untuk mengelompokkan sejumlah pengaturan dan menerapkannya sekaligus ke saluran suara sementara: templat. Misalnya kamu punya server gaming tempat pengguna memainkan banyak game berbeda, kamu bisa membuat templat untuk setiap game dengan nama, batas pengguna, dan lainnya sendiri.

Fitur lain yang sangat berguna adalah peran suara. Dengan peran suara, kamu bisa memastikan pengguna mendapatkan peran tertentu saat berada di saluran suara tertentu. Ini fitur yang sangat kuat yang membuka banyak skenario berbeda.

Kamu bisa membaca lebih lanjut tentang semua fitur tersebut di [panduan](/guides) masing-masing.  
Di sini kita akan membahas dasar-dasar untuk mulai menggunakan Astro di servermu!

## Mengundang bot

Hal pertama, undang bot ke servermu. Caranya cukup klik [tautan ini](/invite) lalu pilih server!  
Atau kamu juga bisa membuka [dasbor](/guilds) dan kamu akan otomatis diminta mengundang Astro ke server yang ingin kamu kelola jika belum ditambahkan.

## Pengaturan cepat

Tidak mau mengonfigurasi semuanya secara manual? Gunakan perintah `/setup`, atau tombol atur yang dikirim Astro saat bergabung ke servermu.  
Astro akan membuat kategori berisi generator dan antarmuka sehingga saluran suara sementara langsung berfungsi. Setelah itu kamu bisa mengubah nama, kategori, posisi, dan hal lainnya dari [dasbor](/guilds).

## Persyaratan server

Agar dapat menggunakan Astro di servermu, kamu harus memenuhi persyaratan berikut:

- memiliki kurang dari 50 bot (batas yang ditetapkan Discord)
- memiliki setidaknya izin `Kelola saluran`

## Izin bot

Astro memerlukan izin `Administrator` secara default agar berfungsi dan memastikan pengalaman yang hebat bagi pengguna Discord pada umumnya.

Jika kamu memiliki server profesional dan tidak dapat memberikan izin itu ke Astro karena alasan keamanan, kamu dapat menonaktifkan persyaratan ini lewat tombol yang tersedia di dasbor
![tombol izin administrator](/guides/admin_permissions.png 'Tombol izin administrator')
_Kamu boleh meminta panduan di Server Dukungan terkait izin yang dibutuhkan Astro agar berfungsi, tetapi dukungan mendalam untuk hal itu tidak disediakan._

## Izin perintah

Ingat bahwa kamu selalu bisa mengatur siapa yang memiliki akses ke perintah slash Astro lewat izin perintah slash Discord.  
[Baca selengkapnya di sini](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Bahasa server

Kamu bisa mengubah bahasa servermu dari pengaturan di dasbor, semua pesan yang dikirim bot di sana akan mengikutinya.

## Profil bot

Ingin Astro terlihat lebih seperti bagian dari servermu? Dari dasbor kamu bisa memberinya nama panggilan, avatar, banner, dan bio khusus, hanya untuk servermu.

## Error & masalah

Astro akan melaporkan semua masalah dan error yang ditemuinya saat bekerja di servermu.  
Kapan pun kamu merasa ada yang tidak berfungsi dengan benar, ingat untuk memeriksa bagian error di dasbor!

## Ultimate

Ultimate adalah versi premium Astro, menyediakan banyak fitur lanjutan yang berguna sekaligus menghapus semua batasan:

| Fitur                                         |                      Premium                      |                           Gratis                           |
| --------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Generator saluran suara sementara tanpa batas | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 2                         |
| Antarmuka tanpa batas                         | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 1                         |
| Peran suara tanpa batas                       | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 1                         |
| Templat tanpa batas                           | <span class="text-discord-green text-lg">✓</span> |                         Maksimal 3                         |
| Nama saluran suara bernomor                   | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Antarmuka yang dapat disesuaikan              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Filter kata kasar untuk nama saluran suara    | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Ruang tunggu                                  | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Obrolan teks pribadi                          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Peran suara untuk pemilik saluran             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Pesan kustom saat saluran suara dibuat        | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Generator cadangan                            | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Meningkatkan servermu ke Ultimate

Setelah membeli langganan di [halaman Ultimate](/ultimate) atau lewat [Discord App Store](https://discord.com/application-directory/715621848489918495/premium), kamu bisa meningkatkan servermu lewat tombol yang tersedia di dasbor
![peningkatan ultimate](/guides/ultimate.png 'Peningkatan Ultimate')

### Mengelola langgananmu

Kamu bisa melihat, mengelola, dan membatalkan langganan Ultimate lewat [portal tagihan](/billing).  
Jika kamu membeli Ultimate lewat checkout Discord App Store, lihat [panduan ini](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Dukungan

Silakan bergabung ke [Server Dukungan / Komunitas](/support) jika kamu punya pertanyaan!
