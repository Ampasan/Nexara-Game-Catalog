## Nexara

Aplikasi katalog game berbasis **React Native + Expo**. Menyediakan beranda dengan list game, pencarian, halaman detail (rating, screenshot, trailer), serta navigasi tab + stack.

### Fitur

- **Home**: daftar/rekomendasi game (horizontal list)
- **Search**: pencarian game + hasil pencarian
- **Game Detail**: deskripsi, **rating stars**, **screenshot gallery** (fullscreen/zoom), dan **trailer**
- **Navigation**: bottom tabs + native stack (`Home`, `Search`, `Profile`)

### Tech Stack

- **Expo**: `~55.0.5`
- **React / React Native**: `19.2.0` / `0.83.2`
- **React Navigation**:
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **Media & UI**:
  - `react-native-image-viewing` (fullscreen image viewer untuk screenshot)
  - `react-native-youtube-iframe` (player trailer YouTube)
  - `react-native-webview`
  - `react-native-safe-area-context`
  - `react-native-screens`

### Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan Metro/Expo:

```bash
npx expo start
```

### Data

Sumber data saat ini menggunakan data lokal di `src/data/game.json`.