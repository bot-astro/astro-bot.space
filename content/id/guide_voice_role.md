---
title: Peran suara
description: Pelajari cara mengonfigurasi peran suara agar servermu terlihat ekstra keren
---

## Apa itu peran suara

Peran suara (sebelumnya disebut koneksi) memungkinkan menghubungkan saluran suara dengan peran.  
Peran suara memungkinkan pengguna mendapatkan peran saat berada di dalam saluran suara tertentu, dan Astro akan mencabut peran itu saat mereka keluar dari saluran tersebut.

Dalam contoh ini, peran suara dibuat pada kategori. Pengguna menerima peran yang memungkinkannya melihat beberapa saluran yang terkait dengan kategori itu:
![contoh peran suara](/illustration/voice_role.gif 'Contoh peran suara')

## Membuat dan mengelola peran suara

Kamu dapat membuat, mengelola, dan menghapus peran suara di dasbor.

_Ingat bahwa tanpa [Ultimate](/ultimate) kamu hanya dapat memiliki 1 peran suara._

## Pengaturan saluran

Saat membuat atau mengedit peran suara, kamu harus memilih saluran untuknya.  
Saluran dapat berupa:

- saluran suara biasa (termasuk saluran panggung)
- kategori: setiap saluran suara di dalamnya akan memicu peran suara
- generator: setiap saluran suara sementara yang dibuat oleh generator itu akan memicu peran suara

## Pengaturan aksi

Ada tiga aksi berbeda yang bisa kamu pilih:

- `Berikan`: Astro memberikan peran kepada pengguna saat bergabung ke saluran dan mencabutnya saat pengguna keluar
- `Cabut`: mencabut peran saat pengguna bergabung ke saluran dan mengembalikannya saat pengguna keluar
- `Alihkan`: jika pengguna belum memiliki peran sebelum bergabung ke saluran, akan berperilaku seperti `Berikan`, jika sudah maka seperti `Cabut` (pada dasarnya mengalihkan peran, seperti namanya)
