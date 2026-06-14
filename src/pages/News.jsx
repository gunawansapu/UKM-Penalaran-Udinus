import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Lottie from "lottie-react";
import { Calendar, ArrowRight, Search, Zap, Newspaper, BookOpen } from 'lucide-react';
import bookAnim from "../assets/Books.json";
import { activityList } from '../data/aktifitasDetail'; // Pastikan path benar

const newsList = [
  { id: 7, title: 'Coaching Clinic x Dinus Lib 2025 Hari Pertama: Belajar Tanda Baca & EYD ✍️', date: '4 Oktober 2025', description: 'Hari pertama Coaching Clinic x Dinus Lib 2025 resmi dimulai! Peserta antusias mengikuti sesi pembelajaran tentang penggunaan tanda baca dan kaidah EYD yang baik dan benar sebagai dasar penulisan ilmiah yang berkualitas.', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/DSC00058.JPG', category: 'Workshop' },
  { id: 1, title: 'Amelia Calista dan Tim berhasil raih Gold Medal ISPC 2025.🏆', date: '16 September 2025', description: 'Selamat kepada Amelia Calista dan tim karena telah mendapat Gold Medal dari International Science Project Competition (ISPC) 2025!', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Screenshot%202025-09-16%20at%2018-18-39%20(3)%20Instagram.png', category: 'Prestasi' },
  { id: 2, title: 'Juara 2 Krenova Kategori Mahasiswa 2025', date: '8 September 2025', description: 'Kayla Assifa Rizqi Utami berhasil meraih Juara 2 Krenova 2025 melalui karya inovatif yang mencerminkan kreativitas.', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/2.jpg', category: 'Prestasi' },
  { id: 3, title: 'PENALARAN BERPRESTASI', date: '16 November 2022', description: 'Anggota UKM Penalaran kembali mengukir prestasi melalui pendanaan riset LPDP.', image: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/Screenshot%202025-08-28%20at%2018-51-16%20(3)%20Instagram.png', category: 'Prestasi' },
  { id: 4, title: 'UKM Penalaran X DinusLib', date: '18 Juli 2025', description: 'Eksplorasi ide inovatif untuk penelitian bersama DinusLib.', image: 'https://dinus.ac.id/wp-content/uploads/2025/06/Coaching-Clinic-Dinuslib-1-scaled.jpg', category: 'Diskusi' },
  { id: 5, title: 'Wisudawan Terbaik Universitas Dian Nuswantoro🤩', date: '31 Agustus 2022', description: 'Selamat kepada senior UKM Penalaran Usamah Bienladen terpilih sebagai wisudawan terbaik.', image: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/Screenshot%202025-08-28%20at%2018-56-46%20(3)%20Instagram.png', category: 'Prestasi' },
];

const News = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsList.filter(news => {
    const matchesCategory = selectedCategory === 'Semua' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-[#f8fafc] py-24 px-6 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold mb-4 border border-indigo-100 shadow-sm">
            <Newspaper size={16} className="mr-2" /> Berita Terkini
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Informasi</span>
          </h1>
        </div>

        {/* Filter & Search Bento Bar */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-4 shadow-lg border border-white mb-12 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none font-medium"
                    placeholder="Cari judul berita..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {['Semua', 'Prestasi', 'Diskusi', 'Workshop'].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? '!bg-slate-900 !text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Bento News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
                <article key={news.id} className="group bento-card bg-white rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-64 rounded-[1.5rem] overflow-hidden mb-6">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-indigo-600 border border-white">{news.category}</div>
                    </div>
                    <div className="px-3 pb-3">
                        <div className="flex items-center text-slate-400 text-sm mb-3">
                            <Calendar size={14} className="mr-2" /> {news.date}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">{news.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{news.description}</p>
                        
                        <button 
                            onClick={() => navigate(`/news/${news.id}`)}
                            className="group/btn w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl !bg-slate-50 hover:!bg-indigo-600 transition-all duration-300"
                        >
                            <span className="font-bold !text-indigo-600 group-hover/btn:!text-white transition-colors duration-300">Detail Berita</span>
                            <ArrowRight className="!text-indigo-600 group-hover/btn:!text-white transition-colors" size={18} />
                        </button>
                    </div>
                </article>
            ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
             <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-3xl flex items-center justify-center mb-6">
                <Lottie animationData={bookAnim} className="w-12 h-12" />
             </div>
             <h3 className="text-3xl font-black text-slate-900 mb-4">Ingin tahu lebih banyak?</h3>
             <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">Lihat Semua Berita</button>
        </div>
      </div>
    </section>
  );
};

export default News;