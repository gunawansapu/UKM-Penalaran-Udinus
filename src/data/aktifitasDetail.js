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
    location: "perpustakaan lantai 1",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1170&auto=format&fit=crop",
    status: "closed",
    registeredCount: 12,
    price: "35.000 (individu), 100.000 (TIM)",
    speaker: "Tim PKM Berprestasi",
    requirements: ["Mahasiswa yang ingin mengikuti PKM", "Membawa laptop", "Sudah memiliki ide dasar PKM"],
    customButtons: [
      { text: "Daftar PKM Masterclass", url: "#", type: "primary" }
    ]
  },
  // --- EVENT LKTIN (UPDATED DENGAN EMBED) ---
  {
    id: 4,
    title: "LKTIN (Lomba Karya Tulis Ilmiah Nasional)",
    date: "24 Januari 2026",
    description: `Menginjak tahun ke-4 penyelenggaraan, LKTIN Dinusfest 2026 siap hadir kembali sebagai wadah inovasi dan karya ilmiah siswa-siswi seluruh Indonesia.

Diselenggarakan oleh UKM Penalaran, kami siap menyambut ide terbaikmu! 🌟

💰 Biaya Pendaftaran:
• Gelombang 1: Rp 60.000
• Gelombang 2: Rp 75.000`,
    category: "Lomba",
    time: "07:30 - Selesai",
    location: "Hybrid",
    image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/lktin.jpg",
    status: "upcoming",
    registeredCount: 87,
    price: "Gel 1. 60.000 - Gel 2. 75.000", 
    speaker: "Expert Speaker TBA",
    
    // 👇 DATA EMBED DI SINI 👇
    embedHtml: `<div style="position:relative; width:100%; height:550px;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/Gcorporation/evtd/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>`,
    
    requirements: ["Terbuka untuk umum", "Siswa/Siswi SMK dan SMA seluruh Indonesia", "Tim terdiri dari 2-3 orang"],
    customButtons: [
      { text: "Daftar Ulang Peserta", url: "https://l1nk.dev/PendaftaranUlang-LKTIN4", type: "primary" },
      { text: "Pengumpulan Naskah", url: "https://acesse.one/PengumpulanNaskah-KTI", type: "primary" },
      { text: "Download Buku Panduan", url: "https://drive.google.com/file/d/10uIbGhbXQVwtEvSRD70po9qIV1fJTfwp/view?usp=drivesdk", type: "outline" },
      { text: "Pasang Twibbon", url: "https://www.canva.com/design/DAG5-v4rITo/8FZD33DN4pnFduBRlJpz4Q/edit?utm_content=DAG5-v4rITo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", type: "secondary" }
    ],
    contacts: [
      { name: "Nisa", phone: "6285695558355", url: "https://wa.me/6285695558355" }, 
      { name: "Arfi", phone: "6285936712078", url: "https://wa.me/6285936712078" } 
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