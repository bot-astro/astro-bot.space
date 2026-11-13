---
title: Antarmuka
description: Pelajari cara membuat antarmukamu terlihat luar biasa dan unik dengan panduan ini
---

## Apa itu antarmuka?

Antarmuka adalah pesan yang memungkinkan pengguna mengelola saluran suara sementara mereka dengan cepat lewat tombol sederhana.  
Seperti inilah tampilan antarmuka default:
![antarmuka default](/guides/default_interface.png 'Antarmuka default')

## Membuat antarmuka

Kamu bisa membuat antarmuka baru di dasbor, pada bagian antarmuka.  
Akan diminta sebuah saluran dan kamu bisa memilih yang kamu inginkan.

## Mengganti saluran atau mengirim ulang antarmuka

Jika kamu tidak sengaja menghapus pesan antarmuka atau hanya ingin mengganti saluran, kamu bisa melakukannya dari pengaturan antarmuka di dasbor.

## Menyesuaikan antarmuka

Kamu bisa menyesuaikan setiap antarmuka di dasbor: buka bagian antarmuka, pilih antarmuka, lalu klik kelola.  
Setelah selesai, simpan perubahanmu dan Astro akan langsung memperbarui pesannya.

_Ingat bahwa tanpa [Ultimate](/ultimate) kamu hanya bisa menonaktifkan atau mengaktifkan tombol pada antarmuka, hal lainnya memerlukan Ultimate._

### Pengaturan pesan

Pesan dibagi menjadi tiga bagian, masing-masing dengan pengaturannya sendiri:

- `Header`: nama penulis, tautan penulis, dan gambar penulis
- `Isi`: judul, tautan judul, gambar mini, deskripsi, dan gambar
- `Footer`: teks footer, gambar footer, warna garis di sebelah kiri pesan, dan stempel waktu

Setiap pengaturan bersifat opsional, jika kamu mengosongkan sebuah teks maka teks itu tidak akan ditampilkan.  
Gambar penulis dan gambar memiliki nilai default, kamu bisa mengembalikannya dengan tombol `Atur ulang ke default`.

### Gambar

Gambar dipilih dari penyimpanan media servermu. Klik `Pilih gambar` untuk membukanya, dari sana kamu bisa:

- mengunggah gambar baru
- melihat pratinjau gambar yang sudah kamu unggah
- memilih gambar untuk pengaturan yang sedang kamu edit
- menghapus gambar yang tidak lagi kamu butuhkan

_Menghapus gambar juga menghapusnya dari pengaturan antarmuka yang sedang kamu edit, antarmuka lain yang menggunakannya akan menampilkan gambar rusak sampai kamu mengubahnya._

Gambar yang tidak digunakan oleh antarmuka mana pun akan dibersihkan secara otomatis dari waktu ke waktu.

### Emoji kustom

Emoji dapat digunakan pada teks pesan dan pada tombol. Emoji standar bisa langsung ditempel, sedangkan emoji kustom Discord membutuhkan kodenya:

1. Buka Discord dan tulis emoji diawali garis miring terbalik, misalnya `\:nama:`
2. Kirim pesan, Discord akan mengirim kode emoji, seperti `<:nama:id>` (atau `<a:nama:id>` untuk emoji beranimasi)
3. Salin kode itu dan tempel di dasbor

## Tombol

Antarmuka dapat memiliki hingga 5 baris dengan masing-masing 5 tombol, dasbor menampilkannya dalam bentuk grid.  
Klik tombol untuk mengeditnya, atau klik posisi kosong untuk menambahkan yang baru.

Setiap tombol memiliki pengaturan berikut:

- `Tombol`: tombol mana yang ditampilkan di posisi ini. Satu tombol hanya dapat digunakan sekali per antarmuka, sehingga tombol yang sudah ditempatkan di posisi lain tidak dapat dipilih. Pilih `Tanpa tombol` untuk menghapusnya
- `Dinonaktifkan`: pengguna dapat melihat tombol tetapi tidak dapat mengkliknya
- `Nama`: teks yang ditampilkan pada tombol
- `Emoji`: emoji yang ditampilkan pada tombol
- `Gaya`: warna tombol

Tombol membutuhkan setidaknya nama atau emoji agar dapat ditampilkan.

## Menghapus antarmuka

Kamu bisa menghapus antarmuka kapan saja dari dasbor.

### Contoh antarmuka kustom

Gambar di bawah ini adalah contoh antarmuka kustom:
![antarmuka kustom](/illustration/custom_interface.png 'Antarmuka kustom')
