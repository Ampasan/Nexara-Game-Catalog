## Nexara — Game Catalog Mobile App

Nexara adalah aplikasi mobile berbasis **React Native + Expo** yang menampilkan katalog game dengan tampilan modern, lengkap dengan kategori, detail game, rating, screenshot, dan trailer.

### Fitur Utama

- **Beranda Game**
  - Menampilkan daftar dan rekomendasi game dalam beberapa section/horizontal list.
  - Kartu game dengan gambar, judul, genre, dan rating.
- **Detail Game**
  - Halaman detail dengan deskripsi, rating bintang, screenshot gallery, dan trailer video (YouTube iframe).
- **Pencarian**
  - Layar pencarian game dengan input search dan tampilan hasil.
- **Navigasi Multi-Halaman**
  - Menggunakan `@react-navigation/native`, `@react-navigation/native-stack`, dan `@react-navigation/bottom-tabs` untuk navigasi stack dan tab (`Home`, `Search`, `Profile`).

### Teknologi yang Digunakan

- **React Native**
- **Expo**
- **React Navigation**
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **UI & Utilities**
  - `react-native-safe-area-context`
  - `react-native-screens`
  - `react-native-youtube-iframe` (untuk memutar trailer dalam WebView)

### Cara Menjalankan Proyek

1. **Clone repo ini**

   ```bash
   git clone
   ```

2. **Install dependency**

   ```bash
   npm install
   ```

3. **Jalankan aplikasi dengan Expo**

   ```bash
   npx expo start
   ```
