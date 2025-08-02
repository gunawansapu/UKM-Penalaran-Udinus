import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuotesSlider from '../components/SliderQuotes';

const About = () => {
  useEffect(() => {
    // Simulasi AOS initialization
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.add('animate-out');
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden">
      <style jsx>{`
        [data-aos] {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        [data-aos="fade-up"] {
          transform: translateY(50px);
        }
        
        [data-aos="fade-down"] {
          transform: translateY(-50px);
        }
        
        [data-aos="fade-left"] {
          transform: translateX(50px);
        }
        
        [data-aos="fade-right"] {
          transform: translateX(-50px);
        }
        
        [data-aos="zoom-in"] {
          transform: scale(0.8);
        }
        
        [data-aos="flip-left"] {
          transform: rotateY(-90deg);
        }
        
        [data-aos="slide-up"] {
          transform: translateY(100px);
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) rotateY(0) !important;
        }
        
        .animate-out {
          opacity: 0;
        }
        
        [data-aos="fade-up"].animate-in {
          transform: translateY(0);
        }
        
        [data-aos="fade-down"].animate-in {
          transform: translateY(0);
        }
        
        [data-aos="fade-left"].animate-in {
          transform: translateX(0);
        }
        
        [data-aos="fade-right"].animate-in {
          transform: translateX(0);
        }
        
        [data-aos="zoom-in"].animate-in {
          transform: scale(1);
        }
        
        [data-aos="flip-left"].animate-in {
          transform: rotateY(0);
        }
        
        [data-aos="slide-up"].animate-in {
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            data-aos="fade-down"
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-xs sm:text-sm font-medium mb-6"
          >
            ✨ Tentang Kami
          </div>
          <h1 
            data-aos="zoom-in"
            data-aos-delay="200"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight"
          >
            UKM Penalaran UDINUS
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Mengembangkan daya nalar dan pemikiran kritis mahasiswa melalui riset, diskusi, dan inovasi berkelanjutan
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            data-aos="slide-up"
            className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-white/20"
          >
            <div 
              data-aos="fade-right"
              className="flex items-center mb-6"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <span className="text-white text-lg sm:text-xl">🎓</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Profil Organisasi</h2>
            </div>
            <p 
              data-aos="fade-left"
              data-aos-delay="200"
              className="text-gray-700 text-base sm:text-lg leading-relaxed"
            >
              UKM Penalaran Universitas Dian Nuswantoro adalah organisasi mahasiswa yang berfokus pada pengembangan daya nalar, logika ilmiah, dan keterampilan berpikir kritis. Kami aktif dalam berbagai kegiatan seperti pelatihan debat, diskusi ilmiah, lomba karya tulis ilmiah, hingga pengabdian masyarakat berbasis riset.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Vision */}
            <div 
              data-aos="fade-right"
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-xl sm:text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Visi</h2>
              </div>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed italic">
                "Menjadi wadah pengembangan penalaran mahasiswa yang unggul dan berkontribusi aktif dalam bidang keilmuan dan sosial."
              </p>
            </div>

            {/* Mission */}
            <div 
              data-aos="fade-left"
              className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-white text-xl sm:text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Misi</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Menyelenggarakan pelatihan rutin dalam bidang kepenulisan dan penelitian ilmiah",
                  "Mengembangkan pemikiran kritis dan analitis melalui forum diskusi dan debat",
                  "Berpartisipasi aktif dalam perlombaan dan konferensi ilmiah tingkat nasional dan internasional",
                  "Menjalin relasi dengan organisasi kemahasiswaan dan lembaga ilmiah lainnya"
                ].map((misi, index) => (
                  <div 
                    key={index} 
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="flex items-start"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm">✓</span>
                    </div>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            data-aos="fade-up"
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 text-xs sm:text-sm font-medium mb-4">
              👥 Tim Kami
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Struktur Organisasi 2025</h2>
            <p className="text-gray-600 text-base sm:text-lg px-4">Hierarki kepemimpinan yang solid dan terstruktur</p>
          </div>
          
          {/* Organizational Chart - Pyramid Structure */}
          <div className="relative overflow-hidden">
            {/* Level 1 - Ketua */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div 
                data-aos="zoom-in"
                className="group relative"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 w-full max-w-xs sm:max-w-sm mx-4">
                  <div className="relative">
                    {/* Photo placeholder with crown */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/30 rounded-full flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl">👨‍💼</span>
                      </div>
                      {/* Crown decoration */}
                      <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2">
                        <span className="text-yellow-300 text-base sm:text-lg">👑</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl sm:text-2xl text-white text-center mb-2">Rizki Aditya</h3>
                    <p className="text-blue-100 text-center font-medium text-base sm:text-lg">Ketua Umum</p>
                    {/* Connecting lines - Hidden on mobile */}
                    <div className="hidden sm:block absolute -bottom-8 left-1/2 w-px h-8 bg-gradient-to-b from-indigo-300 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2 - Wakil Ketua */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div 
                data-aos="flip-left"
                data-aos-delay="200"
                className="group relative"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 max-w-xs mx-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">👩‍💼</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-white text-center mb-2">Laras Putri</h3>
                  <p className="text-purple-100 text-center font-medium text-sm sm:text-base">Wakil Ketua</p>
                </div>
                {/* Connecting lines - Hidden on mobile */}
                <div className="hidden sm:block absolute -bottom-6 left-1/2 w-px h-6 bg-gradient-to-b from-purple-300 to-transparent"></div>
                <div className="hidden lg:block absolute -bottom-6 left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent transform translate-y-6"></div>
              </div>
            </div>

            {/* Level 3 - Core Team */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center px-2">
              {[
                { name: 'Naufal Hidayat', role: 'Sekretaris', gradient: 'from-green-400 to-emerald-500', emoji: '📝', bgGradient: 'from-green-500 to-emerald-600' },
                { name: 'Dewi Lestari', role: 'Bendahara', gradient: 'from-yellow-400 to-orange-500', emoji: '💰', bgGradient: 'from-yellow-500 to-orange-600' },
                { name: 'Ahmad Faiz', role: 'Koordinator Riset', gradient: 'from-red-400 to-rose-500', emoji: '🔬', bgGradient: 'from-red-500 to-rose-600' },
                { name: 'Putri Nurul', role: 'Koordinator Event', gradient: 'from-cyan-400 to-blue-500', emoji: '🎪', bgGradient: 'from-cyan-500 to-blue-600' },
              ].map((pengurus, index) => (
                <div 
                  key={index} 
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  className="group relative w-full"
                >
                  <div className={`bg-gradient-to-br ${pengurus.bgGradient} rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full max-w-xs mx-auto`}>
                    {/* Photo with border */}
                    <div className={`w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br ${pengurus.gradient} rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300 border-2 sm:border-4 border-white/30`}>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/30 rounded-full flex items-center justify-center">
                        <span className="text-lg sm:text-xl">{pengurus.emoji}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-white text-center mb-2 leading-tight">{pengurus.name}</h3>
                    <p className="text-white/80 text-center font-medium text-xs sm:text-sm leading-tight">{pengurus.role}</p>
                  </div>
                  {/* Connecting dots - Hidden on mobile */}
                  <div className="hidden lg:block absolute -top-6 left-1/2 w-2 h-2 bg-purple-300 rounded-full transform -translate-x-1/2"></div>
                </div>
              ))}
            </div>

            {/* Decorative elements - Hidden on mobile */}
            <div className="hidden sm:block absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse`}
                  style={{
                    left: `${Math.max(10, Math.min(90, 20 + i * 15))}%`,
                    top: `${10 + i * 15}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Team Stats */}
          <div 
            data-aos="slide-up"
            className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { label: 'Anggota Aktif', value: '30+', icon: '👥', color: 'from-blue-500 to-indigo-600' },
              { label: 'Tahun Berdiri', value: '2018', icon: '📅', color: 'from-green-500 to-emerald-600' },
              { label: 'Prestasi', value: '25+', icon: '🏆', color: 'from-yellow-500 to-orange-600' },
              { label: 'Kegiatan/Tahun', value: '6+', icon: '🎯', color: 'from-purple-500 to-pink-600' },
            ].map((stat, index) => (
              <div 
                key={index} 
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className={`bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 text-xs sm:text-sm leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <QuotesSlider/>
      </section>
    </div>
  );
};

export default About;