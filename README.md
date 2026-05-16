# 🎬 MovieWishlist

Aplikasi **MovieWishlist** adalah platform pencarian dan manajemen daftar film berbasis **React Native** dan **Expo**. Aplikasi ini dirancang dengan antarmuka modern yang responsif untuk penggunaan di perangkat mobile maupun web.

### Fitur Utama

* **Pencarian Film Real-time**: Menggunakan integrasi TMDB API untuk mencari ribuan judul film.
* **Manajemen Daftar Keinginan**: Fitur untuk menyimpan film ke daftar "To Watch" atau menandainya sebagai "Reviewed".
* **Mode Gelap & Terang**: Mendukung tema dinamis (Dark/Light Mode) yang dapat disesuaikan secara global melalui pengaturan.
* **Dukungan Multi-Bahasa**: Pilihan antarmuka antara Bahasa Indonesia dan English (US).
* **Antarmuka Responsif**: Desain UI yang dioptimalkan untuk berbagai ukuran layar dengan tipografi Poppins.
* **Navigasi ala iOS**: Menggunakan sistem navigasi tab bar dan stack yang elegan.

### Cara Instalasi

1. **Clone Repository**
   ```bash
   git clone [https://github.com/username/MovieWishlist.git](https://github.com/username/MovieWishlist.git)
   cd MovieWishlist

2. Instal Dependensi
   ```bash
   npm install

3. Menjalankan Aplikasi
   ```bash
   Web :
   npx expo start --web
   
   Android/iOS :
   npx expo start

### Teknologi Utama
* **Framework**: React Native & Expo.
* **Navigasi**: React Navigation (Native Stack & Bottom Tabs).
* **State Management**: React Context API untuk pengelolaan tema, bahasa, dan data wishlist secara global.
* **Sumber Data**: The Movie Database (TMDB) API.
* **Styling**: StyleSheet API dengan dukungan Google Fonts (Poppins).

### Struktur Project
* **src/context**: Logika State Global untuk pengaturan aplikasi dan data film.
* **src/screens**: Kumpulan halaman utama seperti Home, Profile, Wishlist, dan Settings.
* **src/components**: Komponen UI yang dapat digunakan kembali seperti Header dan Search Bar.
* **src/services**: Konfigurasi layanan API untuk pengambilan data film.
* **src/navigation**: Arsitektur navigasi antar halaman.


© 2026 MovieWishlist Project.