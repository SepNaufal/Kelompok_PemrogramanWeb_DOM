# 🌐 TaskMate — Implementasi Document Object Model (DOM) JavaScript

> Tugas Mata Kuliah Pemrograman Web: Sistem Sederhana Berbasis DOM JavaScript beserta Slide & Skrip Presentasi.

---

## 📌 Deskripsi Proyek

**TaskMate** adalah aplikasi To-Do List interaktif yang dirancang untuk mendemonstrasikan implementasi cara kerja **DOM (Document Object Model)** pada JavaScript secara nyata. Seluruh manipulasi antarmuka, penambahan elemen, interaktivitas, dan styling dinamis dibuat murni menggunakan **Vanilla JavaScript** tanpa framework atau library eksternal.

Proyek ini juga dilengkapi dengan:
1. **Aplikasi Web Interaktif** (`index.html`)
2. **Slide Presentasi Web 17 Slide** (`presentasi.html`)
3. **Panduan & Naskah Narasi Presentasi + Q&A** (`skrip-presentasi.html`)

---

## ✨ Fitur Aplikasi TaskMate

- ➕ **Tambah Tugas:** Menambahkan tugas baru dengan level prioritas (Rendah / Sedang / Tinggi).
- ✅ **Tandai Selesai:** Mengubah status tugas menjadi selesai dengan efek visual coret teks dan penurunan opasitas.
- ✏️ **Edit Tugas:** Modal dialog pop-up untuk memperbarui nama dan prioritas tugas.
- 🗑️ **Hapus Tugas:** Menghapus tugas satuan dengan animasi keluar, atau hapus seluruh tugas yang telah selesai sekaligus.
- 🔍 **Pencarian Real-Time:** Menyaring daftar tugas seketika saat user mengetik karakter.
- 🏷️ **Filter Status:** Menyaring tampilan berdasarkan tugas *Semua*, *Belum Selesai*, atau *Selesai*.
- 📊 **Statistik & Progress Bar:** Menghitung total, selesai, sisa tugas, dan persentase ketercapaian secara otomatis.
- 💾 **Penyimpanan Lokal:** Terintegrasi dengan `localStorage` browser sehingga data tetap tersimpan saat halaman dimuat ulang.

---

## 🧠 Konsep DOM yang Diimplementasikan

| Fitur Aplikasi | Konsep & Metode DOM yang Digunakan |
|---|---|
| **Seleksi Elemen** | `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()` |
| **Manipulasi Konten** | `element.textContent`, `element.innerHTML`, `element.value` |
| **Buat & Hapus Elemen** | `document.createElement()`, `element.appendChild()`, `element.remove()` |
| **Manipulasi Style & Class** | `element.classList` (`add`, `remove`, `toggle`), `element.style.width` |
| **Event Handling** | `addEventListener()` untuk event `submit`, `click`, `input`, `keydown`, serta `event.preventDefault()` |
| **DOM Traversal** | `element.parentElement`, `element.children`, `element.lastElementChild` |
| **Data Attributes** | `element.setAttribute('data-id', ...)` & `element.getAttribute('data-filter')` |

---

## 📁 Struktur Berkas

```
├── index.html              # Aplikasi web utama To-Do List (TaskMate)
├── style.css               # Styling dark mode modern & responsive CSS
├── script.js               # Seluruh logika manipulasi DOM JavaScript
├── presentasi.html         # Slide presentasi interaktif (17 slide)
├── skrip-presentasi.html   # Skrip naskah narasi, panduan live demo, & jawaban Q&A
└── README.md               # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

Tidak memerlukan instalasi server atau dependensi tambahan (`npm`, dll). Cukup buka berkas langsung di browser:

1. **Menjalankan Aplikasi:**
   - Double-klik berkas `index.html` pada browser apa pun (Google Chrome, Mozilla Firefox, Microsoft Edge, dll).
2. **Membuka Slide Presentasi:**
   - Buka berkas `presentasi.html` di browser. Gunakan tombol panah kanan (`→`) / Spasi untuk slide berikutnya, atau panah kiri (`←`) untuk slide sebelumnya.
3. **Membaca Skrip Presentasi:**
   - Buka berkas `skrip-presentasi.html` di browser untuk panduan berbicara per slide dan kunci jawaban tanya jawab.

---

## 👥 Pengembang

- **Kelompok Pemrograman Web** — 2026
