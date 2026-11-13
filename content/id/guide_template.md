---
title: Template
description: Temukan template dan pelajari cara mengonfigurasinya, penggunamu pasti akan menyukainya
---

## Apa itu template

Template menyatukan sejumlah pengaturan saluran suara yang dapat diterapkan sekaligus ke saluran suara sementara.

This is useful for example in gaming servers where users might be playing many different games.  
Having a template for each game would allow to make the voice channel more fitting to that game, for example with a specific name or user limit.

## Menggunakan template

Pengguna servermu dapat menggunakan template lewat `/template` yang menyediakan pelengkapan otomatis untuk template yang tersedia, atau lewat tombol interface yang sesuai.

## Membuat dan mengelola template

Kamu dapat membuat, mengelola, dan menghapus template di [dashboard](/guilds).

_Ingat bahwa tanpa [Ultimate](/ultimate) kamu dapat memiliki maksimal 3 template._

## Nama template

The name of a template is simply a name useful to users to identify a template.  
**It is not** the name that the temporary voice channel gets when the template is applied.

Saat pengguna ingin menerapkan template ke salurannya, mereka hanya akan melihat daftar template yang masing-masing memiliki namanya sendiri.

## Pengaturan saluran suara

Di dashboard kamu dapat mengonfigurasi pengaturan yang diterapkan ke saluran suara sementara saat sebuah template digunakan.

Kamu dapat memilih:

- nama saluran suara, yang mendukung [variabel](/guides/generator#variables)
- batas pengguna
- bitrate
- wilayah

_Tidak ada satu pun pengaturan ini yang wajib, jadi kamu tidak perlu mengatur semuanya._

## Generator yang diaktifkan

If you want to restrict a template to some specific generators you can do that on the dashboard.  
If you do so, the template will not be usable by any temporary voice channel that has been created by a generator not in that `Enabled generators` list.
