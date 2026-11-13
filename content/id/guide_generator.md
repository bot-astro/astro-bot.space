---
title: Generator
description: Pelajari cara mengonfigurasi dan menggunakan generator saluran suara sementara
---

## Apa itu generator?

Generator adalah saluran yang dibuat dan dikelola oleh Astro.  
Saat pengguna bergabung ke generator, Astro membuat saluran suara sementara dan memindahkan pengguna ke dalamnya.

Pengguna yang membuat saluran suara sementara disebut pemilik.
Pemilik dapat mengelola saluran dengan perintah slash Astro atau dengan [antarmuka](/guides/interface), keduanya memungkinkan pengguna mengubah nama saluran, batas pengguna, izin, dan hal lainnya.

Saat pemilik keluar, jika masih ada pengguna _non-bot_ di saluran, kepemilikan akan dipindahkan secara acak ke pengguna lain.  
Jika pemilik keluar dan tidak ada lagi pengguna di saluran, saluran akan dihapus.

Generator sangat dapat disesuaikan, di panduan ini kamu akan belajar mengonfigurasinya agar sesuai persis dengan kebutuhan servermu!

## Membuat dan mengelola generator

Astro dapat mengelola beberapa generator dan masing-masing memiliki pengaturannya sendiri.  
Di bagian generator pada dasbor, kamu bisa melihat semua generator di servermu, membuat yang baru, serta mengelola dan menghapusnya.

_Ingat bahwa tanpa [Ultimate](/ultimate) kamu hanya bisa memiliki maksimal 2 generator._

## Pengaturan nama

Saluran suara sementara dapat berada dalam tiga status berbeda: default, terkunci, atau tersembunyi.  
Status ini diubah oleh pengguna lewat perintah slash atau antarmuka.

Kamu bisa memberi nama untuk setiap status:
![pengaturan nama generator](/guides/generator_name.png 'Pengaturan nama generator')

### Variabel

Kamu bisa menggunakan `Variabel` untuk membuat nama saluran dinamis. Astro akan mengganti variabel dengan nilai yang sesuai saat menerapkan nama baru:

#### Variabel pemilik saluran suara

| Variabel     | Deskripsi                                             |
| ------------ | ----------------------------------------------------- |
| `{nickname}` | Nama panggilan (atau username jika tidak ada) pemilik |
| `{username}` | Username pemilik                                      |
| `{mention}`  | Mention (@nama) pemilik                               |
| `{id}`       | ID pemilik                                            |

#### Variabel aktivitas pemilik saluran suara · [membutuhkan Ultimate](/ultimate)

| Variabel                | Deskripsi                                                   |
| ----------------------- | ----------------------------------------------------------- |
| `{activity_name}`       | Nama aktivitas pemilik (misalnya nama game)                 |
| `{activity_emoji}`      | Emoji yang mewakili aktivitas                               |
| `{activity_start_time}` | Waktu saat pemilik memulai aktivitas                        |
| `{activity_end_time}`   | Waktu saat aktivitas akan atau telah berakhir               |
| `{activity_type}`       | Jenis aktivitas (bermain, menonton, mendengarkan, dll.)     |
| `{activity_link}`       | Tautan siaran Twitch jika aktivitasnya adalah siaran Twitch |

#### Variabel saluran suara

| Variabel         | Deskripsi                                           |
| ---------------- | --------------------------------------------------- |
| `{vc_name}`      | Nama saluran suara                                  |
| `{vc_bitrate}`   | Bitrate saluran suara                               |
| `{vc_userlimit}` | Batas pengguna saluran suara                        |
| `{vc_users}`     | Jumlah pengguna di saluran suara                    |
| `{vc_id}`        | ID saluran suara                                    |
| `{vc_mention}`   | Saluran suara dalam bentuk mention (#saluran-suara) |

#### Variabel nilai bertahap · [membutuhkan Ultimate](/ultimate)

| Variabel  | Deskripsi                                        |
| --------- | ------------------------------------------------ |
| `{n}`     | Angka bertahap sederhana (1, 2, 3...)            |
| `{nato}`  | Alfabet NATO bertahap (Alpha, Bravo, Charlie...) |
| `{roman}` | Angka Romawi bertahap (I, II, III, IV...)        |

**Bagaimana cara kerja angka bertahap?**  
Mengingat batasan baru Discord yang hanya mengizinkan penggantian nama saluran suara 2 kali setiap 10 menit, fitur ini bekerja sedikit berbeda dari yang mungkin kamu harapkan:  
Saluran suara akan dibuat secara bertahap: bot akan mencari saluran suara pertama yang hilang dan menempatkan saluran suara baru di posisinya.

Contoh: Kita punya 5 saluran suara yang dibuat Astro secara bertahap [VC #1, VC#2, VC #3, VC #4, dan VC#5], lalu VC #3 dihapus. Astro tidak akan mengganti nama setiap saluran ke nama yang tepat (VC#4 menjadi VC #3 dan seterusnya), melainkan saluran berikutnya yang dibuat bukan VC #6 tetapi VC #3 sehingga celahnya terisi.

Jika kamu melihat angkanya dimulai dari angka yang salah, kamu bisa menekan tombol `Hapus cache` di dasbor untuk mengatur ulang hitungan
![hapus cache](/guides/clear_cache.png 'Hapus cache')

### Kondisi pembaruan nama

Kamu juga bisa mengatur kapan nama saluran harus diperbarui:
![kondisi pembaruan nama generator](/guides/generator_name_conditions.png 'Kondisi pembaruan nama generator')

### Batasan pembaruan nama

Nama saluran suara Discord hanya dapat diubah 2 kali setiap 10 menit, Discord memperkenalkan batasan ini beberapa waktu lalu, sayangnya.
Karena itu nama saluran suara mungkin tidak selalu akurat jika terjadi perubahan yang sering.

## Pengaturan dasar

Di dasbor kamu juga akan menemukan opsi untuk mengubah:

- kategori tempat saluran suara sementara dibuat
- batas pengguna
- bitrate
- posisi: apakah saluran suara sementara dibuat tepat sebelum generator, tepat setelahnya, atau di bagian bawah kategori
- untuk mengubah wilayah, kamu bisa mengubah wilayah saluran generator langsung di dalam Discord
- status default saluran suara: teks kecil yang ditampilkan di bawah nama saluran suara, pemilik dapat mengubahnya kapan saja dengan perintah `/status`

## Pengaturan izin

### Pewarisan izin

Secara default saluran suara sementara mewarisi izin dari generator.  
Kamu bisa mengubah perilaku ini di dasbor, kamu bisa membuat saluran menyalin izin dari kategori atau tidak menyalin izin sama sekali.

### Peran target

Peran target adalah salah satu pengaturan terpenting. Saat izin saluran perlu diubah, misalnya ketika saluran dikunci atau disembunyikan, Astro akan mengubah izin peran target untuk mencapai status yang diinginkan.  
Misalnya, jika di servermu pengguna harus menyelesaikan proses verifikasi dan mendapatkan peran `Terverifikasi`, kamu mungkin ingin menjadikannya peran target.

### Peran moderator

Jika kamu menentukan peran moderator, peran itu akan selalu memiliki izin yang diperlukan untuk mengelola saluran, bahkan saat saluran dikunci atau disembunyikan.

### Status default

Kamu bisa menentukan apakah saluran suara sementara dibuat dalam keadaan terkunci atau tersembunyi secara default.

## Pengaturan perintah

Kamu bisa memberi beberapa batasan pada perintah pengguna, seperti apakah mereka boleh menggunakan kata kasar pada nama saluran suara mereka (hanya berfungsi dalam bahasa Inggris), serta menentukan nilai minimum dan maksimum yang dapat digunakan pengguna untuk batas pengguna dan bitrate.

## Utilitas

### Peran pemilik

Jika ditentukan, Astro akan memberikan peran ini kepada pemilik saluran suara sementara, dan mencabutnya saat mereka meninggalkan saluran atau saat kepemilikan dipindahkan.

### Mode antrean

Dengan mode antrean aktif, Astro akan mencoba mengisi saluran yang ada sebelum membuat yang baru.  
Fitur yang berguna ketika saluran memiliki batas pengguna dan kamu ingin memastikan semua saluran terisi penuh hingga jumlah pengguna maksimum.

### Generator cadangan

Saat kategori generator penuh (mencapai 50 saluran), pengguna yang bergabung ke generator akan dipindahkan ke generator cadangan jika sudah diatur.

## Ruang tunggu

Ruang tunggu adalah saluran suara yang dibuat di dekat saluran suara sementara.  
Pengguna dapat bergabung ke ruang tunggu untuk menandakan bahwa mereka menunggu masuk ke saluran suara sementara, dan pemiliknya dapat menyeret pengguna dari ruang tunggu ke salurannya.

Di dasbor kamu dapat memilih apakah Astro harus otomatis membuat ruang tunggu untuk setiap saluran suara sementara dan mengonfigurasi semua aspeknya: nama (variabel juga bisa digunakan di sini), batas pengguna, bitrate, dll.

Pengguna juga dapat membuat ruang tunggu dengan perintah slash atau tombol antarmuka yang sesuai.

## Obrolan teks pribadi

Obrolan teks pribadi adalah saluran teks yang hanya terlihat oleh pengguna di dalam saluran suara sementara.  
Kamu dapat mengatur di dasbor apakah Astro harus membuat obrolan teks pribadi untuk setiap saluran suara sementara, beserta pengaturannya, seperti pada ruang tunggu.

Pengguna juga dapat membuat obrolan teks pribadi dengan perintah slash atau tombol antarmuka yang sesuai.

### Pesan pembuatan

Kamu juga dapat menentukan pesan yang dikirim Astro ke saluran suara sementara saat dibuat.  
Pesan akan dikirim di obrolan teks pribadi jika ada, jika tidak di obrolan saluran suara (ya, ini membingungkan, tapi saluran suara sekarang juga memiliki obrolan teks terintegrasi).

Kamu bisa memilih apakah pesan berupa embed atau pesan teks biasa.

Atau, kamu bisa membuat Astro mengirim [antarmuka](/guides/interface) di obrolan teks!
