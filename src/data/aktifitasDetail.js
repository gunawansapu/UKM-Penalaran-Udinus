// aktifitasDetail.js

export const activityList = [
  {
    id: 1,
    title: "Open Recruitment Anggota Penalaran",
    date: "3-25 September 2025",
    description: "Bergabunglah dengan UKM Penalaran untuk mengembangkan kemampuan berpikir kritis dan analitis. Jadilah bagian dari mahasiswa berprestasi.",
    category: "Recruitment",
    time: null,
    location: null,
    image: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.42.16_57dde200.jpg",
    status: "closed",
    registeredCount: 23,
    requirements: ["Mahasiswa aktif semester 1-5", "Memiliki minat pada Penelitian dan Karya Tulis Ilmiah"],
    customButtons: [
       { text: "Form Pendaftaran", url: "https://docs.google.com/forms/", type: "primary" }
    ]
  },
  {
    id: 2,
    title: "Coaching Clinic X DinusLib",
    date: "4-25 Oktober 2025", 
    description: "Eksplorasi ide inovatif untuk penelitian bersama UPT Perpustakaan.",
    category: "Diskusi",
    time: "Menyusul",
    location: "Perpustakaan Udinus Lantai 1",
    image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_b04b3172.jpg",
    status: "closed",
    registeredCount: 18,
    price: 15000,
    speaker: "Tim DinusLib",
    requirements: ["Terbuka untuk Anggota Penalaran"],
    customButtons: []
  },
  {
    id: 3,
    title: "PKM Masterclass",
    date: "21-22 Desember 2025",
    description: "Pelatihan intensif bedah proposal Program Kreativitas Mahasiswa (PKM).",
    category: "Pelatihan",
    time: "08:00 - Selesai", 
    location: "Aula Gedung E",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1170&auto=format&fit=crop",
    status: "upcoming",
    registeredCount: 12,
    price:"coming soon",
    speaker: "Tim PKM Berprestasi",
    requirements: ["Mahasiswa yang ingin mengikuti PKM", "Membawa laptop", "Sudah memiliki ide dasar PKM"],
    customButtons: [
      { text: "Daftar PKM Masterclass", url: "#", type: "primary" }
    ]
  },
  // --- EVENT LKTIN (LENGKAP) ---
  {
    id: 4,
    title: "LKTIN (Lomba Karya Tulis Ilmiah Nasional)",
    date: "24 Januari 2026",
    description: `Seminar nasional dan kompetisi karya tulis ilmiah tingkat nasional yang menghadirkan inovasi-inovasi terbaik dari mahasiswa seluruh Indonesia.

    Segera lengkapi berkas pendaftaran Anda melalui tautan yang tersedia di bawah ini.`,
    category: "Seminar",
    time: "07:30 - Selesai",
    location: "Gedung i Lantai 3",
    image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/lktin.jpg",
    status: "upcoming",
    registeredCount: 87,
    price:"100.000",
    speaker: "Expert Speaker TBA",
    requirements: ["Terbuka untuk umum", "Siswa/Siswi SMK dan SMA seluruh Indonesia", "Tim terdiri dari 2-3 orang"],
    
    // DATA TOMBOL FLEKSIBEL (Sesuai Request)
    customButtons: [
      { text: "Daftar Ulang Peserta", url: "https://l1nk.dev/PendaftaranUlang-LKTIN4", type: "primary" },
      { text: "Pengumpulan Naskah", url: "https://acesse.one/PengumpulanNaskah-KTI", type: "primary" },
      { text: "Download Buku Panduan", url: "https://acesse.one/BUKUPANDUAN-LKTIN2026", type: "outline" },
      { text: "Pasang Twibbon", url: "https://l1nk.dev/TWIBBON-LKTIN2026", type: "secondary" }
    ],
    
    // DATA CP (Sesuai Request)
    contacts: [
      { name: "Nisa", phone: "6281234567890", url: "https://wa.me/6285695558355" }, 
      { name: "Arfi", phone: "6281234567890", url: "https://wa.me/6285936712078" } 
    ]
  },
  {
    id: 5,
    title: "Studi Banding",
    date: "21 Maret 2026",
    description: "Kunjungan ke universitas mitra.",
    category: "Diskusi",
    time: "Menyusul",
    location: "Menyusul",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop",
    status: "upcoming",
    customButtons: []
  },
  {
    id: 6,
    title: "KKN Aktivis",
    date: "Menyusul",
    description: "Pengabdian masyarakat.",
    category: "Pengabdian",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1170&auto=format&fit=crop",
    status: "upcoming",
    customButtons: []
  },
  {
    id: 7,
    title: "Rapat Rutin",
    date: "Menyusul",
    description: "Koordinasi bulanan.",
    category: "Diskusi",
    image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.08_fb3b81d4.jpg",
    status: "upcoming",
    customButtons: []
  },
  {
    id: 8,
    title: "Buka Bersama",
    date: "Menyusul",
    description: "Silaturahmi Ramadhan.",
    category: "Diskusi",
    image: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.21.50_d1fbb90c.jpg",
    status: "upcoming",
    customButtons: []
  },
  {
    id: 9,
    title: "Penalaran Hiking",
    date: "Menyusul",
    description: "Refreshing organisasi.",
    category: "Fun",
    image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.07_3c4140f3.jpg",
    status: "upcoming",
    customButtons: []
  },
  {
    id: 10,
    title: "Bootcamp",
    date: "Menyusul",
    description: "Pelatihan skill organisasi.",
    category: "Fun",
    image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_e0628f45.jpg",
    status: "upcoming",
    customButtons: []
  }
];