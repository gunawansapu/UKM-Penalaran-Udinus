import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecruitmentButton from '../components/RecruitmentButton';
import Hero from '../components/Hero';
import EventCard from '../components/EvenCard';
import OurTeam from '../components/OurTeam';
import { eventsData } from '../data/eventsData'; // Import Data dari file terpisah
import lktinBanner from '../assets/images/lktin.jpg'; // Sesuaikan path gambarnya
import wayangImg from '../assets/images/wayang.jpg';      // Hiasan 1
import borobudurImg from '../assets/images/borobudur.jpg'; // Hiasan 2
import indoImg from '../assets/images/indo.jpg';          // Hiasan 3

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // --- LOGIC MENGAMBIL 3 EVENT TERATAS ---
  const latestEvents = [...eventsData]
    .sort((a, b) => {
      // Prioritas: Ongoing(1) > Upcoming(2) > Closed(3) > Completed(4)
      const statusPriority = {
        'ongoing': 1,
        'upcoming': 2,
        'closed': 3,
        'completed': 4
      };
      const priorityA = statusPriority[a.status] || 99;
      const priorityB = statusPriority[b.status] || 99;
      return priorityA - priorityB;
    })
    .slice(0, 3); // Ambil 3 data pertama saja
  // ---------------------------------------

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const pages = [
    { 
      title: 'Ilmu', 
      desc: 'Fondasi pengetahuan yang kuat', 
      longDesc: 'Membangun pondasi pengetahuan yang kokoh melalui pembelajaran berkelanjutan dan pemahaman mendalam terhadap berbagai disiplin ilmu.',
      icon: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z', 
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      colors: ['blue', 'indigo', 'purple']
    },
    { 
      title: 'Penelitian', 
      desc: 'Eksplorasi dan penemuan baru', 
      longDesc: 'Melakukan riset mendalam untuk mengeksplorasi fenomena, menemukan solusi inovatif, dan mengembangkan pengetahuan baru yang bermanfaat.',
      icon: 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z', 
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      colors: ['green', 'emerald', 'teal']
    },
    { 
      title: 'Inovasi', 
      desc: 'Terobosan dan solusi kreatif', 
      longDesc: 'Menciptakan terobosan baru melalui pemikiran kreatif dan pendekatan inovatif untuk menyelesaikan berbagai tantangan kompleks.',
      icon: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z', 
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      colors: ['purple', 'pink', 'rose']
    },
    { 
      title: 'Karya', 
      desc: 'Hasil nyata yang bermanfaat', 
      longDesc: 'Menghasilkan karya nyata yang memberikan dampak positif dan manfaat berkelanjutan bagi masyarakat dan lingkungan sekitar.',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', 
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      colors: ['orange', 'red', 'rose']
    }
  ];

  const handleBookClick = () => {
    if (!isBookOpen) {
      setIsBookOpen(true);
      setCurrentPage(0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsBookOpen(false);
      setCurrentPage(0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCloseBook = () => {
    setIsBookOpen(false);
    setCurrentPage(0);
  };

  return (
    <>
      <Hero />

      <section className="relative py-20 md:py-24 overflow-hidden bg-[#0f0518]">
  
  {/* --- BACKGROUND DECORATIONS --- */}
  
  {/* 1. Landmark Indo - Silhouette di bagian bawah */}
  <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-1/2 z-0 pointer-events-none opacity-20 select-none">
    <img 
      src={indoImg} 
      alt="Indonesian Landmarks" 
      className="w-full h-full object-cover object-bottom mix-blend-luminosity filter grayscale contrast-125"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-[#0f0518]/50 to-transparent"></div>
  </div>

  {/* 2. Wayang - Hiasan Background */}
  <div 
    className="absolute top-10 -right-20 md:right-0 w-64 md:w-96 opacity-[0.15] z-0 pointer-events-none"
    data-aos="fade-left" 
    data-aos-duration="1500"
  >
    <img 
      src={wayangImg} 
      alt="Wayang Decoration" 
      className="w-full h-auto mix-blend-lighten filter sepia hue-rotate-[-50deg] contrast-150"
    />
    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0f0518]/50 to-[#0f0518]"></div>
  </div>

  {/* 3. Borobudur - Hiasan Background */}
  <div 
    className="absolute top-32 -left-12 md:left-0 w-64 md:w-[30rem] opacity-[0.08] z-0 pointer-events-none transform -translate-x-1/4 rotate-12"
    data-aos="fade-right"
    data-aos-duration="1500"
  >
    <img 
      src={borobudurImg} 
      alt="Borobudur Decoration" 
      className="w-full h-auto mix-blend-overlay filter grayscale blur-[1px]"
    />
  </div>

  {/* --- LIGHTING EFFECTS --- */}
  <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse z-0"></div>
  <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-pink-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse z-0" style={{animationDelay: '2s'}}></div>
  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-0"></div>


  {/* --- MAIN CONTENT --- */}
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    
    {/* === HEADER TEXT DENGAN EFEK "TAPLAK" DI MOBILE === */}
    <div 
      className="text-center mb-12 md:mb-16 relative 
                 /* Mobile Style (Taplak) */
                 bg-[#0f0518]/70 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl
                 /* Desktop Style (Reset jadi transparan) */
                 md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:shadow-none" 
      data-aos="fade-down"
    >
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-lg shadow-purple-500/10">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span className="text-[10px] md:text-xs font-bold tracking-widest text-purple-200 uppercase">Coming Soon 2026</span>
      </div>
      
      {/* Title */}
      <h2 className="text-3xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight drop-shadow-2xl">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-200">
          The Cultural Epic
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 font-serif italic">
          Is Loading...
        </span>
      </h2>
      
      {/* Description */}
      <p className="text-gray-300 max-w-xl md:max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
        Paduan kemegahan budaya nusantara dan inovasi ilmiah. Persiapkan tim terbaikmu untuk kompetisi paling bergengsi tahun depan.
      </p>
    </div>
    {/* ================================================= */}

    {/* THE STAR: Banner Container */}
    <div className="relative max-w-sm md:max-w-5xl mx-auto perspective-1000" data-aos="zoom-in-up" data-aos-duration="1000">
      
      {/* Glow Effects behind the card */}
      <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 rounded-[2rem] md:rounded-[2.5rem] blur-xl md:blur-2xl opacity-40 md:opacity-20 animate-tilt group-hover:opacity-40 transition duration-1000"></div>
      
      {/* Frame Card */}
      <div className="relative p-1.5 md:p-2 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
        <div className="relative rounded-xl overflow-hidden shadow-2xl group">
          
          {/* GAMBAR UTAMA (LKTIN BANNER) */}
          <img 
            src={lktinBanner} 
            alt="Dinustfest LKTIN 2026 Coming Soon" 
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:brightness-110"
          />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transform"></div>
        </div>
      </div>

      {/* Floating Particles / Hiasan Kecil */}
      <div className="absolute -top-6 -right-6 md:-top-12 md:-right-12 w-16 h-16 md:w-24 md:h-24 bg-yellow-500/30 rounded-full blur-lg md:blur-xl animate-bounce" style={{animationDuration: '4s'}}></div>
      <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-20 h-20 md:w-32 md:h-32 bg-purple-600/30 rounded-full blur-lg md:blur-xl animate-bounce" style={{animationDuration: '5s'}}></div>
    </div>

    {/* Call to Action */}
    <div className="text-center mt-12 md:mt-16" data-aos="fade-up" data-aos-delay="200">
      <button 
        onClick={() => window.open('https://www.instagram.com/lktin.dinusfest/', '_blank')}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-transparent rounded-full focus:outline-none transform hover:scale-105 active:scale-95"
      >
        {/* Button Glow */}
        <div className="absolute transition-all duration-200 rounded-full -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 blur-lg opacity-60 group-hover:opacity-100 group-hover:blur-xl"></div>
        
        {/* Button Body */}
        <div className="relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg bg-gray-900 rounded-full ring-1 ring-white/20 group-hover:ring-white/50 transition-all">
          <span className="mr-2">Nantikan Infonya</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
      </button>
    </div>

  </div>
</section>

      {/* Section: Tentang UKM */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
        data-aos="fade-up"
      >
        {/* Animated Blob Background */}
        <style>{`
          @keyframes blob-float-1 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(50px, -40px) rotate(120deg); }
            66% { transform: translate(-30px, 30px) rotate(240deg); }
          }
          @keyframes blob-float-2 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(-50px, 40px) rotate(-120deg); }
            66% { transform: translate(30px, -30px) rotate(-240deg); }
          }
          @keyframes blob-float-3 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            50% { transform: translate(40px, 40px) rotate(180deg); }
          }
          @keyframes blob-float-4 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            50% { transform: translate(-40px, -40px) rotate(-180deg); }
          }
        `}</style>

        {/* KUNING - Top Right */}
        <div 
          className="absolute top-20 left-20 w-80 h-80"
          style={{
            background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
            borderRadius: '70% 30% 50% 50% / 30% 50% 50% 70%',
            opacity: 1,
            filter: 'brightness(1.1) saturate(1.2)',
            animation: 'blob-float-2 25s ease-in-out infinite',
            zIndex: 0
          }}
        ></div>

        {/* UNGU - Center */}
        <div 
          className="absolute top-1/2 left-1/2 w-72 h-72"
          style={{
            background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
            borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
            opacity: 1,
            filter: 'brightness(1.1) saturate(1.3)',
            animation: 'blob-float-3 30s ease-in-out infinite',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}
        ></div>

        {/* PINK - Bottom Right */}
        <div 
          className="absolute bottom-20 right-20 w-96 h-96"
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            opacity: 1,
            filter: 'brightness(1.1) saturate(1.2)',
            animation: 'blob-float-4 28s ease-in-out infinite',
            zIndex: 0,
          }}
        ></div>

        {/* BIRU - Top Right */}
        <div
          className="absolute top-70 right-32 w-72 h-72"
          style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            opacity: 1,
            filter: 'brightness(1.05) saturate(1.2)',
            animation: 'blob-float-1 20s ease-in-out infinite',
            zIndex: 0
          }}
        ></div>

        {/* HIJAU - Bottom Left */}
        <div 
          className="absolute bottom-32 left-32 w-80 h-80"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
            borderRadius: '40% 60% 50% 50% / 60% 30% 70% 40%',
            opacity: 1,
            filter: 'brightness(1.1) saturate(1.2)',
            animation: 'blob-float-1 22s ease-in-out infinite reverse',
            zIndex: 0,
            boxShadow: '0 0 60px 20px rgba(16, 185, 129, 0.4)',
          }}
        ></div>

        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              ✨ Tentang Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              UKM Penalaran
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <p className="text-lg text-gray-700 leading-relaxed">
                UKM Penalaran adalah unit kegiatan mahasiswa yang berfokus pada pengembangan potensi intelektual, riset ilmiah, dan penguatan daya pikir kritis mahasiswa Universitas Dian Nuswantoro.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Kami berkomitmen untuk menciptakan lingkungan pembelajaran yang inspiratif dan kolaboratif, memfasilitasi mahasiswa dalam mengembangkan kemampuan analitis dan berpikir sistematis.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
                  <div className="text-sm text-gray-600">Anggota Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">6+</div>
                  <div className="text-sm text-gray-600">Program Tahunan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">12+</div>
                  <div className="text-sm text-gray-600">Tahun Berpengalaman</div>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="fade-left">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-700">Coaching Clinic</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-700">PKM Masterclass</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-700">LKTIN (Lomba Karya Tulis Ilmiah Nasional) </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-700">Studi Banding</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-700">KKN Aktivis</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce delay-500"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-300 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      <OurTeam />

      {/* Section: Kegiatan Terbaru */}
      <section className="py-20 bg-white relative" data-aos="fade-up">
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              🚀 Update Terbaru
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kegiatan <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Terbaru</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ikuti berbagai kegiatan menarik yang dirancang untuk mengembangkan potensi intelektual Anda
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestEvents.map((event, index) => (
              <div key={index} data-aos="zoom-in" className="transform hover:scale-105 transition-all duration-300">
                <EventCard {...event} />
              </div>
            ))}
          </div>
          <div className="mt-20 text-right" data-aos="fade-up">
            <a
              href="/kegiatan"
              className="text-white font-medium relative transition duration-300 hover:text-indigo-300 hover:underline hover:underline-offset-4"
            >
              Lihat kegiatan lainnya →
            </a>
          </div>

          <div className="text-center mt-20" data-aos="fade-up">
            <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 border-2 border-gradient-to-r from-blue-200 to-indigo-200 shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-indigo-200/30 to-transparent rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-blue-300/40 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-indigo-300/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Main Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" alt="Icon" className="w-20 h-20 object-contain" />
                </div>
                
                {/* Heading */}
                <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
                  Tertarik Bergabung?
                </h3>
                
                {/* Subheading */}
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Jadilah bagian dari komunitas mahasiswa yang berpikir kritis dan inovatif.
                  <span className="block mt-2 text-blue-600 font-medium">
                    Bergabunglah dengan puluhan mahasiswa lainnya!
                  </span>
                </p>
                
                {/* Stats Row */}
                <div className="flex justify-center space-x-8 mb-10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">30+</div>
                    <div className="text-sm text-gray-500">Anggota Aktif</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">6+</div>
                    <div className="text-sm text-gray-500">Event Per Tahun</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-500">Dukungan Komunitas</div>
                  </div>
                </div>

                {/* Enhanced Button Area with QR Code */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
                  
                  {/* Left Side - Button and Text */}
                  <div className="flex-1 max-w-md">
                    <div className="space-y-4">
                      <RecruitmentButton />
                      
                      {/* Additional Info */}
                      <div className="flex flex-col space-y-3 text-sm text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Mahasiswa Semester 1-5</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Resmi Terdaftar</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                  <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                  {/* Right Side - QR Code */}
                  <div className="flex-1 max-w-sm">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Scan QR Code</h4>
                        <p className="text-sm text-gray-600">Akses cepat untuk pendaftaran</p>
                      </div>
                      
                      {/* QR Code Container */}
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-gray-100 hover:border-blue-300 transition-colors duration-300">
                          <img 
                            src=""
                            alt="QR Code untuk Pendaftaran" 
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-gray-500">
                          Atau klik tombol daftar sekarang untuk akses mudah
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Text */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    🚀 Bergabunglah sekarang dan mulai perjalanan Anda menuju inovasi dan pemikiran kritis!
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              📚 Perjalanan Pengetahuan
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Journey of <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Knowledge</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4 leading-relaxed">
              Dari ilmu menuju inovasi, mari bersama membuka lembar demi lembar perjalanan pengetahuan
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>

          {/* Interactive Book Section */}
          <div className="relative flex justify-center items-center min-h-[500px] sm:min-h-[600px]">
            
            {/* Closed Book */}
            {!isBookOpen && (
              <div 
                onClick={handleBookClick}
                className="relative w-72 h-96 sm:w-80 sm:h-[28rem] md:w-96 md:h-[32rem] cursor-pointer group"
                style={{perspective: '1000px'}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-orange-700 rounded-lg shadow-2xl group-hover:scale-105 transition-all duration-500" 
                     style={{
                       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
                       transform: 'translate3d(0, 0, 0)'
                     }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-white">
                    {/* Logo/Icon */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-4.41 0-8-3.59-8-8V8.3l8-3.6 8 3.6V12c0 4.41-3.59 8-8 8z"/>
                        <path d="M10.5 13l-2.5-2.5 1.41-1.41L10.5 10.17l4.09-4.08L16 7.5z"/>
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3">UKM Penalaran</h3>
                    <p className="text-sm sm:text-base md:text-lg text-center text-white/90 mb-4 sm:mb-6">Membuka Cakrawala Ilmu</p>
                    
                    {/* Click indicator */}
                    <div className="mt-4 sm:mt-6 flex flex-col items-center animate-bounce">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm text-white/80 font-medium">Klik untuk membuka</span>
                    </div>
                  </div>
                  
                  {/* Book Spine Effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-black/30 to-transparent"></div>
                  
                  {/* Book Pages Edge */}
                  <div className="absolute right-0 top-2 bottom-2 w-1 bg-white/30"></div>
                  <div className="absolute right-1 top-3 bottom-3 w-1 bg-white/20"></div>
                  <div className="absolute right-2 top-4 bottom-4 w-1 bg-white/10"></div>
                </div>
              </div>
            )}

            {/* Open Book */}
            {isBookOpen && (
              <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden min-h-[600px] sm:min-h-[500px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Left Page - Navigation/Info */}
                    <div className={`p-6 sm:p-8 md:p-12 bg-gradient-to-br ${pages[currentPage].bgGradient} flex flex-col justify-between relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px]`}>
                      {/* Page number */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-xs text-gray-400">
                        Halaman {currentPage + 1} dari {pages.length}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center items-center text-center py-6 sm:py-8">
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br ${pages[currentPage].gradient} rounded-full flex items-center justify-center shadow-2xl mb-4 sm:mb-6 md:mb-8 animate-float`}>
                          <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d={pages[currentPage].icon}/>
                          </svg>
                        </div>
                        
                        <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${pages[currentPage].gradient} bg-clip-text text-transparent`}>
                          {pages[currentPage].title}
                        </h3>
                        
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 px-2">
                          {pages[currentPage].desc}
                        </p>
                        
                        <div className="flex space-x-2">
                          {pages[currentPage].colors.map((color, i) => (
                            <div key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 bg-${color}-400 rounded-full animate-bounce`} style={{animationDelay: `${i * 0.1}s`}}></div>
                          ))}
                        </div>
                      </div>

                      {/* Progress dots */}
                      <div className="flex justify-center space-x-2 mt-4 sm:mt-6 md:mt-8 pb-2">
                        {pages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              idx === currentPage ? 'bg-gray-800 w-8' : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right Page - Content */}
                    <div className="p-6 sm:p-8 md:p-12 bg-white flex flex-col justify-between relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
                      {/* Close button */}
                      <button
                        onClick={handleCloseBook}
                        className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="flex-1 flex flex-col justify-center pt-8 sm:pt-0">
                        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                          <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                            Tentang {pages[currentPage].title}
                          </h4>
                          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                            {pages[currentPage].longDesc}
                          </p>
                          
                          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-orange-500">
                            <p className="text-xs sm:text-sm text-gray-500 italic">
                              "Setiap langkah dalam perjalanan pengetahuan membawa kita lebih dekat pada pemahaman yang lebih dalam dan kontribusi yang lebih bermakna."
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-2">
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 0}
                          className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${
                            currentPage === 0
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span className="hidden xs:inline">Sebelumnya</span>
                          <span className="xs:hidden">Prev</span>
                        </button>

                        <button
                          onClick={handleNextPage}
                          className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${
                            currentPage === pages.length - 1
                              ? 'bg-orange-500 text-white hover:bg-orange-600'
                              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                          }`}
                        >
                          <span>{currentPage === pages.length - 1 ? 'Tutup' : 'Lanjut'}</span>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Description */}
          <div className="text-center mt-12 sm:mt-16 lg:mt-20 px-4">
            <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Perjalanan pengetahuan dimulai dari <span className="text-blue-400 font-semibold">ilmu</span> yang kokoh, 
              dikembangkan melalui <span className="text-green-400 font-semibold">penelitian</span> yang mendalam, 
              melahirkan <span className="text-purple-400 font-semibold">inovasi</span> yang bermakna, 
              hingga menghasilkan <span className="text-orange-400 font-semibold">karya</span> yang berdampak.
            </p>
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed 
          bottom-6 right-6 w-12 h-12
          sm:bottom-8 sm:right-8 sm:w-14 sm:h-14
          bg-gradient-to-r from-blue-500 to-indigo-600
          rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:shadow-xl hover:scale-110 hover:-translate-y-1
          active:scale-95
          focus:outline-none focus:ring-4 focus:ring-blue-300
          z-40
          ${showScrollTop 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
          }
        `}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 hover:-translate-y-0.5" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        </svg>
      </button>
    </>
  );
};

export default Home;