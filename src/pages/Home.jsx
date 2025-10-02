import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecruitmentButton from '../components/RecruitmentButton'; // taruh di atas
import Hero from '../components/Hero';
import EventCard from '../components/EvenCard';

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // animasi tetap aktif tiap scroll
    });

    // Handle scroll untuk tombol scroll to top
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

  // Tambahkan ini di bagian atas component (dalam useEffect atau script terpisah)
useEffect(() => {
  const eventStart = new Date('2025-10-04T00:00:00');
  const eventEnd = new Date('2025-10-25T23:59:59');

  const updateCountdown = () => {
    const now = new Date();
    const countdownSection = document.getElementById('event-countdown-section');
    
    if (now < eventStart) {
      // FASE 1: Sebelum Event (Countdown)
      const difference = eventStart - now;
      
      document.getElementById('countdown-days').textContent = 
        String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
      document.getElementById('countdown-hours').textContent = 
        String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      document.getElementById('countdown-minutes').textContent = 
        String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0');
      document.getElementById('countdown-seconds').textContent = 
        String(Math.floor((difference / 1000) % 60)).padStart(2, '0');
      
      // Show countdown elements
      document.getElementById('phase-before').style.display = 'block';
      document.getElementById('phase-during').style.display = 'none';
      document.getElementById('phase-after').style.display = 'none';
      
      countdownSection.className = countdownSection.className.replace(/from-\S+-\d+/g, 'from-indigo-600');
      countdownSection.className = countdownSection.className.replace(/via-\S+-\d+/g, 'via-purple-600');
      countdownSection.className = countdownSection.className.replace(/to-\S+-\d+/g, 'to-pink-600');
      
    } else if (now >= eventStart && now <= eventEnd) {
      // FASE 2: Event Berlangsung (Meriah!)
      const difference = eventEnd - now;
      
      document.getElementById('countdown-days-during').textContent = 
        String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
      document.getElementById('countdown-hours-during').textContent = 
        String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      document.getElementById('countdown-minutes-during').textContent = 
        String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0');
      document.getElementById('countdown-seconds-during').textContent = 
        String(Math.floor((difference / 1000) % 60)).padStart(2, '0');
      
      document.getElementById('phase-before').style.display = 'none';
      document.getElementById('phase-during').style.display = 'block';
      document.getElementById('phase-after').style.display = 'none';
      
      // Gradient meriah
      countdownSection.className = countdownSection.className.replace(/from-\S+-\d+/g, 'from-yellow-400');
      countdownSection.className = countdownSection.className.replace(/via-\S+-\d+/g, 'via-orange-500');
      countdownSection.className = countdownSection.className.replace(/to-\S+-\d+/g, 'to-red-500');
      
    } else {
      // FASE 3: Event Selesai
      document.getElementById('phase-before').style.display = 'none';
      document.getElementById('phase-during').style.display = 'none';
      document.getElementById('phase-after').style.display = 'block';
      
      countdownSection.className = countdownSection.className.replace(/from-\S+-\d+/g, 'from-gray-600');
      countdownSection.className = countdownSection.className.replace(/via-\S+-\d+/g, 'via-gray-700');
      countdownSection.className = countdownSection.className.replace(/to-\S+-\d+/g, 'to-gray-800');
    }
  };

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  return () => clearInterval(timer);
}, []);

  const events = [
    {
      title: 'UKM Penalaran X DinusLIb',
      date: 'Coming Soon',
      description: 'Sesi diskusi topik terkini bersama anggota UKM.',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_b04b3172.jpg',
    },
    {
      title: 'LKTIN (Lomba Karya Tulis Ilmiah Nasional)',
      date: 'Coming Soon',
      description: 'Lomba tingkat nasional',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Screenshot%20(708).png',
    },
    {
      title: 'PKM Masterclass',
      date: 'Coming Soon',
      description: 'Nantikan Segera',
      image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <>
      <Hero />

      {/* Section: Tentang UKM */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
        data-aos="fade-up"
      >
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



<section id="event-countdown-section" className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden transition-all duration-1000" data-aos="fade-up">
  {/* Animated Background Elements */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
    <div className="absolute top-10 left-10 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
    <div className="absolute top-20 right-20 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
    <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-white/30 rounded-full animate-bounce"></div>
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    {/* FASE 1: SEBELUM EVENT (COUNTDOWN) */}
    <div id="phase-before">
      <div className="text-center mb-12" data-aos="fade-down">
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
          ⏰ Event Segera Hadir
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Coaching Clinic X DinusLib
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Eksplorasi ide inovatif untuk penelitian bersama Tim DinusLib
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl" data-aos="zoom-in">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { id: 'days', label: 'Hari' },
            { id: 'hours', label: 'Jam' },
            { id: 'minutes', label: 'Menit' },
            { id: 'seconds', label: 'Detik' }
          ].map((unit, index) => (
            <div key={unit.id} className="text-center" data-aos="flip-up" data-aos-delay={index * 100}>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div id={`countdown-${unit.id}`} className="text-5xl md:text-6xl font-bold text-white mb-2">00</div>
                <div className="text-white/80 text-sm uppercase tracking-wider font-medium">{unit.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center justify-center space-x-3 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">4-25 Oktober 2025</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Perpustakaan Udinus Lt. 1</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-medium">HTM Rp 15.000</span>
          </div>
        </div>

        <div className="text-center">
          <a href="/kegiatan#event-2" className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            Lihat Detail Event
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    {/* FASE 2: EVENT BERLANGSUNG (MERIAH!) */}
    <div id="phase-during" style={{display: 'none'}}>
      <div className="text-center mb-12" data-aos="fade-down">
        <div className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 animate-pulse">
          🎉 EVENT SEDANG BERLANGSUNG!
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
          Coaching Clinic X DinusLib
        </h2>
        <p className="text-2xl text-white font-bold max-w-2xl mx-auto animate-bounce">
          🔥 Ayo Bergabung Sekarang! 🔥
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border-4 border-yellow-300 shadow-2xl animate-pulse" data-aos="zoom-in">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-white mb-2">⏰ Event Berakhir Dalam:</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { id: 'days-during', label: 'Hari' },
            { id: 'hours-during', label: 'Jam' },
            { id: 'minutes-during', label: 'Menit' },
            { id: 'seconds-during', label: 'Detik' }
          ].map((unit, index) => (
            <div key={unit.id} className="text-center" data-aos="flip-up" data-aos-delay={index * 100}>
              <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl p-6 border-4 border-white shadow-xl transform hover:scale-110 transition-all">
                <div id={`countdown-${unit.id}`} className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">00</div>
                <div className="text-gray-800 text-sm uppercase tracking-wider font-bold">{unit.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-gray-900 font-bold">
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>4-25 Oktober 2025</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Perpustakaan Udinus Lt. 1</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🎊</span>
              <span>Gratis untuk Semua!</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="/kegiatan#event-2" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full font-bold text-xl hover:from-yellow-300 hover:to-orange-400 transform hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-white animate-bounce">
            🚀 Join Event Sekarang!
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    {/* FASE 3: EVENT SELESAI */}
    <div id="phase-after" style={{display: 'none'}}>
      <div className="text-center mb-12" data-aos="fade-down">
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
          ✅ Event Telah Selesai
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Coaching Clinic X DinusLib
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Terima kasih kepada semua peserta yang telah bergabung!
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl" data-aos="zoom-in">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-white/70 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-3xl font-bold text-white mb-4">Event Telah Berakhir</h3>
            <p className="text-white/80 text-lg mb-8">
              Event Coaching Clinic X DinusLib telah selesai dilaksanakan pada 25 Oktober 2025.
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-8">
            <p className="text-white/70 text-lg">
              📅 Periode Event: 4-25 Oktober 2025<br/>
              📍 Lokasi: Perpustakaan Udinus Lt. 1
            </p>
          </div>

          <a href="/kegiatan" className="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 border border-white/30">
            Lihat Event Lainnya
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

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
            {events.map((event, index) => (
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