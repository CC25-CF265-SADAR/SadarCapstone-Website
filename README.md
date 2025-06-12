# SADAR Website - Documentation

Dokumentasi ini ditujukan sebagai panduan setup dasar untuk aplikasi website SADAR: Saring, Amankan, Deteksi, Anti-Rugi yang menggunakan webpack untuk proses bundling, Babel untuk transpile JavaScript, serta mendukung proses build dan serving aplikasi.<br>

## Deskripsi

SADAR: Saring, Amankan, Deteksi, Anti-Rugi adalah aplikasi deteksi dan pencegahan penipuan digital berbasis website. Aplikasi ini memiliki 3 fitur utama, yaitu: Detektor Penipuan (CekAjaDulu), Modul Edukasi (AntiTertipu), dan Simulasi Penipuan (TipuMeter).

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (disarankan versi 12 atau lebih tinggi)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. Download starter project [di sini](https://github.com/CC25-CF265-SADAR/SadarCapstone-Website/archive/refs/heads/main.zip).
2. Lakukan unzip file.
3. Pasang seluruh dependencies dengan perintah berikut.
   ```shell
   npm install
   ```

## Scripts

- Build for Production:

  ```shell
  npm run build
  ```

  Script ini menjalankan webpack dalam mode production menggunakan konfigurasi `webpack.prod.js` dan menghasilkan sejumlah file build ke direktori `dist`.

- Start Development Server:

  ```shell
  npm run start-dev
  ```

  Script ini menjalankan server pengembangan webpack dengan fitur live reload dan mode development sesuai konfigurasi di`webpack.dev.js`.

- Serve:
  ```shell
  npm run serve
  ```
  Script ini menggunakan [`http-server`](https://www.npmjs.com/package/http-server) untuk menyajikan konten dari direktori `dist`.

## Project Structure

Proyek starter ini dirancang agar kode tetap modular dan terorganisir.

```text
SadarCapstone-Website/
├── dist/                   # Compiled files for production
├── src/                    # Source project files
│   ├── public/             # Public files
│   ├── scripts/            # Source JavaScript files
|   |   └── config.js       # Global configuration (API URL, keys, etc.)
│   │   └── index.js        # Main JavaScript entry file
|   |   └── sw.js           # Service Worker script for caching/PWA
│   ├── styles/             # Source CSS files
│   │   └── styles.css      # Main CSS file
│   └── index.html/         # Main HTML file
├── .gitignore              # Files/Folders that Git will not track (like node_modules)
├── .prettierrc             # Prettier configuration for code format consistency
├── package-lock.json       # Project metadata and dependencies
├── package.json            # Project metadata and dependencies
├── tailwind.config.js      # Tailwind CSS configuration (custom, extend utilities)
├── README.md               # Project documentation
├── webpack.common.js       # Webpack common configuration
├── webpack.dev.js          # Webpack development configuration
└── webpack.prod.js         # Webpack production configuration
```
