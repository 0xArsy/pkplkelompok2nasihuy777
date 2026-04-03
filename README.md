# PKPL Tugas 2 - Kelompok Nasihuy777

Repository ini dibuat untuk memenuhi Tugas 2 mata kuliah Pengantar Keamanan Perangkat Lunak (PKPL). Fokus utamanya adalah implementasi Authentication & Authorization menggunakan Google OAuth (Firebase).

## Fitur Utama
* **Dashboard Public:** Menampilkan kartu biodata anggota tim dengan desain linear dark mode.
* **Google Login:** Authentication menggunakan Firebase Auth dengan penyedia layanan Google.
* **Authorization (RBAC):** Hanya list email tertentu yang di-whitelist di `.env` yang bisa akses menu Settings.
* **Live CMS:** Bisa edit data bios (nama, npm, role, desc) dan warna tema langsung dari web, data tersimpan real-time di Cloud Firestore.

## Stack yang Kita Pake
* **Next.js 14-16 (App Router):** Sebagai framework utama, pake TurboPack biar kenceng developmentnya.
* **Firebase Authentication:** Buat handle login Google biar aman dan ga usah ribet urusan password.
* **Cloud Firestore:** Database NoSQL buat nyimpen settingan tema dan info biodata secara live.
* **Raw CSS:** Desain custom gaya Linear app, pake glassmorphism dan mouse-tracking glow effects.

## Cara Install
klo mau nyoba jalanin di lokal, silakan:

1. Clone repo ini
2. Jalanin `npm install`
3. Buat file `.env.local` terus isi config firebasenya (API Key dkk)
4. Terakhir `npm run dev`

---
*Dibuat oleh Kelompok Nasihuy777 untuk Fasilkom UI.*
