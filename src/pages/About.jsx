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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            data-aos="fade-down"
            className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6"
          >
            ✨ Tentang Kami
          </div>
          <h1 
            data-aos="zoom-in"
            data-aos-delay="200"
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            UKM Penalaran UDINUS
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Mengembangkan daya nalar dan pemikiran kritis mahasiswa melalui riset, diskusi, dan inovasi berkelanjutan
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            data-aos="slide-up"
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20"
          >
            <div 
              data-aos="fade-right"
              className="flex items-center mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎓</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Profil Organisasi</h2>
            </div>
            <p 
              data-aos="fade-left"
              data-aos-delay="200"
              className="text-gray-700 text-lg leading-relaxed"
            >
              UKM Penalaran Universitas Dian Nuswantoro adalah organisasi mahasiswa yang berfokus pada pengembangan daya nalar, logika ilmiah, dan keterampilan berpikir kritis. Kami aktif dalam berbagai kegiatan seperti pelatihan debat, diskusi ilmiah, lomba karya tulis ilmiah, hingga pengabdian masyarakat berbasis riset.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div 
              data-aos="fade-right"
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold">Visi</h2>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed italic">
                "Menjadi wadah pengembangan penalaran mahasiswa yang unggul dan berkontribusi aktif dalam bidang keilmuan dan sosial."
              </p>
            </div>

            {/* Mission */}
            <div 
              data-aos="fade-left"
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Misi</h2>
              </div>
              <div className="space-y-4">
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
                    <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700 text-lg">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            data-aos="fade-up"
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 text-sm font-medium mb-4">
              👥 Tim Kami
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Struktur Organisasi 2025</h2>
            <p className="text-gray-600 text-lg">Hierarki kepemimpinan yang solid dan terstruktur</p>
          </div>
          
          {/* Organizational Chart - Pyramid Structure */}
          <div className="relative">
            {/* Level 1 - Ketua */}
            <div className="flex justify-center mb-8">
              <div 
                data-aos="zoom-in"
                className="group relative"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 max-w-sm">
                  <div className="relative">
                    {/* Photo placeholder with crown */}
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                        <span className="text-3xl">👨‍💼</span>
                      </div>
                      {/* Crown decoration */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="text-yellow-300 text-lg">👑</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-2xl text-white text-center mb-2">Rizki Aditya</h3>
                    <p className="text-blue-100 text-center font-medium text-lg">Ketua Umum</p>
                    {/* Connecting lines */}
                    <div className="absolute -bottom-8 left-1/2 w-px h-8 bg-gradient-to-b from-indigo-300 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2 - Wakil Ketua */}
            <div className="flex justify-center mb-8">
              <div 
                data-aos="flip-left"
                data-aos-delay="200"
                className="group relative"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-400">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👩‍💼</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-white text-center mb-2">Laras Putri</h3>
                  <p className="text-purple-100 text-center font-medium">Wakil Ketua</p>
                </div>
                {/* Connecting lines to level 3 */}
                <div className="absolute -bottom-6 left-1/2 w-px h-6 bg-gradient-to-b from-purple-300 to-transparent"></div>
                <div className="absolute -bottom-6 left-1/2 w-40 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent transform translate-y-6"></div>
              </div>
            </div>

            {/* Level 3 - Core Team */}
            <div className="grid md:grid-cols-4 gap-6 justify-items-center">
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
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${pengurus.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 max-w-xs`}>
                    {/* Photo with border */}
                    <div className={`w-18 h-18 bg-gradient-to-br ${pengurus.gradient} rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300 border-4 border-white/30`}>
                      <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center">
                        <span className="text-xl">{pengurus.emoji}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-white text-center mb-2">{pengurus.name}</h3>
                    <p className="text-white/80 text-center font-medium text-sm">{pengurus.role}</p>
                  </div>
                  {/* Connecting dots */}
                  <div className="absolute -top-6 left-1/2 w-2 h-2 bg-purple-300 rounded-full transform -translate-x-1/2"></div>
                </div>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Team Stats */}
          <div 
            data-aos="slide-up"
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
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
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6">
      <QuotesSlider/>
      </section>
    </div>
  );
};

export default About;