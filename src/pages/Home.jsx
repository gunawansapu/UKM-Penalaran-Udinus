// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Brain, Users, Target, Lightbulb, ArrowUpRight, Award, Zap, 
  QrCode, Rocket, BookOpen, Microscope, Cpu, Trophy, Sparkles 
} from 'lucide-react';
import RecruitmentButton from '../components/RecruitmentButton';
import Hero from '../components/Hero';
import EventCard from '../components/EvenCard';
import OurTeam from '../components/OurTeam';

// IMPORT FIREBASE
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // STATE FIREBASE UNTUK KEGIATAN TERBARU
  const [latestEvents, setLatestEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // FETCH 3 EVENT TERATAS DARI FIREBASE
  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Urutkan berdasarkan prioritas status
        dataList.sort((a, b) => {
          const statusPriority = { 'upcoming': 1, 'ongoing': 2, 'closed': 3, 'completed': 4 };
          const priorityA = statusPriority[a.status] || 99;
          const priorityB = statusPriority[b.status] || 99;
          return priorityA - priorityB;
        });

        // Ambil 3 teratas
        setLatestEvents(dataList.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest events: ", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchLatestEvents();
  }, []);

  // Setup AOS & Scroll to Top
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- EFEK MOUSE GLOW UNTUK SEMUA BENTO CARDS ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.bento-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Hero />

      {/* --- SECTION 1: BENTO GRID TENTANG KAMI --- */}
      <section className="py-24 bg-[#f8fafc] relative overflow-hidden flex justify-center">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl w-full px-6 relative z-10">
          <div className="mb-16 md:mb-20 text-center" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
              <Zap size={16} className="mr-2 text-indigo-500" />
              Tentang Kami
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Ekosistem <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Penalaran</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Unit Kegiatan Mahasiswa yang berfokus pada pengembangan potensi intelektual, riset ilmiah, dan penguatan daya pikir kritis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6">
            {/* CARD 1: Visi Utama (Span 2) */}
            <div className="bento-card relative md:col-span-2 rounded-3xl p-8 overflow-hidden group bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" data-aos="fade-up">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.08), transparent 40%)' }}></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-600 shadow-sm group-hover:scale-110 transition-transform duration-500"><Brain size={28} /></div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white shadow-sm transition-all duration-300 -rotate-45 group-hover:rotate-0"><ArrowUpRight size={20} /></div>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">Fondasi Intelektualitas</h3>
                  <p className="text-slate-600 max-w-lg leading-relaxed">Memfasilitasi mahasiswa dalam mengembangkan kemampuan analitis dan berpikir sistematis melalui pembelajaran interaktif.</p>
                </div>
              </div>
            </div>

            {/* CARD 2: Anggota Aktif */}
            <div className="bento-card relative rounded-3xl p-8 overflow-hidden group bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" data-aos="fade-up" data-aos-delay="100">
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.08), transparent 40%)' }}></div>
               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center border border-emerald-200 text-emerald-600 shadow-sm group-hover:rotate-12 transition-transform duration-500"><Users size={28} /></div>
                  <div>
                    <h3 className="text-4xl font-black text-slate-800 mb-1">30+</h3>
                    <h4 className="text-lg font-bold text-emerald-600 mb-2">Anggota Aktif</h4>
                    <p className="text-sm text-slate-500">Komunitas solid dalam riset dan inovasi.</p>
                  </div>
               </div>
            </div>

            {/* CARD 3: Pengalaman */}
            <div className="bento-card relative rounded-3xl p-8 overflow-hidden group bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" data-aos="fade-up" data-aos-delay="200">
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245,158,11,0.08), transparent 40%)' }}></div>
               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center border border-amber-200 text-amber-600 shadow-sm group-hover:-rotate-12 transition-transform duration-500"><Award size={28} /></div>
                  <div>
                    <h3 className="text-4xl font-black text-slate-800 mb-1">12+</h3>
                    <h4 className="text-lg font-bold text-amber-600 mb-2">Tahun Berkarya</h4>
                    <p className="text-sm text-slate-500">Lebih dari satu dekade mencetak karya nyata.</p>
                  </div>
               </div>
            </div>

            {/* CARD 4: Program Unggulan (Span 2) */}
            <div className="bento-card relative md:col-span-2 rounded-3xl p-8 overflow-hidden group bg-gradient-to-br from-indigo-600 to-blue-700 border border-indigo-500 shadow-xl" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none mix-blend-overlay" style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.3), transparent 40%)' }}></div>
              <div className="relative z-10 h-full flex items-center gap-8">
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white mb-6 shadow-sm"><Target size={28} /></div>
                  <h3 className="text-2xl font-bold text-white mb-4">6+ Program Unggulan</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Coaching Clinic', 'PKM Masterclass', 'LKTIN Nasional', 'Studi Banding', 'KKN Aktivis'].map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm text-white/90 font-medium transition-colors cursor-default backdrop-blur-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex flex-shrink-0 relative w-32 h-32 mr-8">
                  <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-4 border-2 border-white/50 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center"><Lightbulb size={32} className="text-white drop-shadow-md" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurTeam />

      {/* --- SECTION 2: KEGIATAN TERBARU & CTA BENTO --- */}
      <section className="py-24 bg-white relative overflow-hidden flex justify-center">
        <div className="max-w-7xl w-full px-6 relative z-10">
          
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
              <Rocket size={16} className="mr-2" /> Update Terbaru
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Kegiatan <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Terbaru</span>
            </h2>
          </div>

          {/* 👇 SOLUSI BUG: Ganjalan Skeleton Loading Biar Tinggi Layar Tidak Melar Mendadak 👇 */}
          {loadingEvents ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-[400px] rounded-3xl bg-slate-100 animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {latestEvents.map((event, index) => (
                <div key={event.id} data-aos="zoom-in" data-aos-delay={index * 100} className="transform hover:scale-[1.02] transition-all duration-300 h-full">
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center md:text-right mb-24" data-aos="fade-up">
            <a href="/kegiatan" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors group">
              Lihat semua kegiatan <ArrowUpRight className="ml-1 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* TERTARIK BERGABUNG - BENTO CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-aos="fade-up">
            
            {/* Main CTA Card (Span 2) */}
            <div className="bento-card relative lg:col-span-2 rounded-3xl p-8 md:p-12 overflow-hidden group bg-slate-900 shadow-2xl">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.2), transparent 40%)' }}></div>
              <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mb-6">
                    <img src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" alt="Icon" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    Mulai Inovasimu <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Sekarang Juga!</span>
                  </h3>
                  <p className="text-slate-400 text-lg max-w-md mb-8">
                    Jadilah bagian dari komunitas eksklusif mahasiswa yang berpikir kritis, inovatif, dan haus akan prestasi akademik.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <RecruitmentButton />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-medium"><Sparkles size={16} className="text-yellow-400"/> Mahasiswa Semester 1-5</div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-medium"><Sparkles size={16} className="text-yellow-400"/> Resmi Terdaftar di UDINUS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Info Cards */}
            <div className="flex flex-col gap-6">
              {/* Stats Card */}
              <div className="bento-card relative rounded-3xl p-8 overflow-hidden group bg-indigo-50 border border-indigo-100 shadow-sm flex-1">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.1), transparent 40%)' }}></div>
                <div className="relative z-10 flex flex-col justify-center h-full">
                  <div className="flex justify-between items-end mb-6">
                    <h4 className="text-5xl font-black text-indigo-600">24/7</h4>
                    <Users size={32} className="text-indigo-300" />
                  </div>
                  <h5 className="font-bold text-slate-800 text-lg">Dukungan Penuh</h5>
                  <p className="text-slate-500 text-sm mt-2">Mentoring, diskusi, dan jaringan relasi terbuka kapan saja untuk mematangkan ide risetmu.</p>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="bento-card relative rounded-3xl p-8 overflow-hidden group bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(15,23,42,0.05), transparent 40%)' }}></div>
                <div className="relative z-10">
                  <h5 className="font-bold text-slate-800">Scan Disini</h5>
                  <p className="text-slate-500 text-xs mt-1">Akses cepat pendaftaran</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <QrCode size={32} className="text-slate-800" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: JOURNEY OF KNOWLEDGE (DARK BENTO MODE) --- */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden flex justify-center">
        {/* Deep Ambient Background */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none z-0"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl w-full px-6 relative z-10">
          
          <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 text-white/80 backdrop-blur-md rounded-full text-sm font-semibold mb-6 shadow-sm">
              <BookOpen size={16} className="mr-2 text-purple-400" />
              Perjalanan Pengetahuan
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Knowledge</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Dari literatur menuju inovasi. Inilah tahapan dedikasi kami dalam mengolah ide mentah menjadi karya nyata yang berdampak besar.
            </p>
          </div>

          {/* Apple/Linear Style Dark Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4 md:gap-6">
            
            {/* Item 1: Ilmu */}
            <div className="bento-card relative rounded-3xl p-8 overflow-hidden group bg-white/[0.03] border border-white/10 backdrop-blur-md" data-aos="fade-up" data-aos-delay="0">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.15), transparent 40%)' }}></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400"><BookOpen size={24} /></div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">1. Ilmu</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Fondasi kokoh melalui kajian literatur dan pembelajaran komprehensif.</p>
                </div>
              </div>
            </div>

            {/* Item 2: Penelitian (Span 2) */}
            <div className="bento-card relative md:col-span-2 rounded-3xl p-8 overflow-hidden group bg-white/[0.03] border border-white/10 backdrop-blur-md" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.15), transparent 40%)' }}></div>
              <div className="relative z-10 h-full flex items-center gap-8">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 mb-6"><Microscope size={24} /></div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">2. Penelitian</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">Eksplorasi fenomena, pengambilan data, dan perumusan metodologi akurat untuk memecahkan problematika terkini.</p>
                </div>
                <div className="hidden md:block w-32 h-32 opacity-20 group-hover:opacity-60 transition-opacity duration-500"><Microscope size={128} className="text-emerald-500" /></div>
              </div>
            </div>

            {/* Item 3: Inovasi (Span 2) */}
            <div className="bento-card relative md:col-span-2 rounded-3xl p-8 overflow-hidden group bg-white/[0.03] border border-white/10 backdrop-blur-md" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(168,85,247,0.15), transparent 40%)' }}></div>
              <div className="relative z-10 h-full flex items-center gap-8">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 text-purple-400 mb-6"><Cpu size={24} /></div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">3. Inovasi</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">Transformasi gagasan mentah menjadi prototipe cerdas, arsitektur sistem, dan terobosan teknologi aplikatif.</p>
                </div>
                <div className="hidden md:block w-32 h-32 opacity-20 group-hover:opacity-60 transition-opacity duration-500"><Cpu size={128} className="text-purple-500" /></div>
              </div>
            </div>

            {/* Item 4: Karya */}
            <div className="bento-card relative rounded-3xl p-8 overflow-hidden group bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 backdrop-blur-md" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249,115,22,0.2), transparent 40%)' }}></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]"><Trophy size={24} /></div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">4. Karya</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">Produk akhir yang tervalidasi, memenangkan kompetisi, dan berdampak nyata.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Scroll to Top Button (Apple Glassmorphism Style) --- */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-14 h-14 !bg-white/60 backdrop-blur-xl !border !border-white/60 !text-slate-800 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center transition-all duration-500 ease-out hover:!bg-white/90 hover:scale-110 hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] active:scale-95 z-50 outline-none ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUpRight size={24} className="-rotate-45" />
      </button>
    </>
  );
};

export default Home;