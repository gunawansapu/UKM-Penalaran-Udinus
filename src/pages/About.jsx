import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuotesSlider from '../components/SliderQuotes';
import OurTeam from '../components/OurTeam'; // tambahkan ini


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
                "Menjadi UKM terdepan yang membentuk generasi mahasiswa berkarakter ilmiah, berintegritas, dan berdampak nyata bagi masyarakat melalui penalaran, pendidikan, pengabdian, serta literasi yang inovatif, efektif, dan efisien. "
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
                  "Mengembangkan daya kritis, kreativitas, dan inovasi mahasiswa melalui berbagai program pengembangan diri yang terarah. ",
                  "Menumbuhkan budaya berpikir ilmiah yang berlandaskan integritas dan tanggung jawab sosial. ",
                  "Membangun kesadaran dan keterampilan literasi di kalangan mahasiswa untuk mendukung penguasaan pengetahuan dan teknologi. ",
                  "Mendorong lahirnya karya dan publikasi yang bermanfaat bagi masyarakat sebagai wujud pengabdian nyata. "
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
      <OurTeam />
      </div>
    {/* Team Stats */}
    <div 
      data-aos="slide-up"
      className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {[
        { label: 'Anggota Aktif', value: '30+', icon: '👥', color: 'from-blue-500 to-indigo-600' },
        { label: 'Tahun Berdiri', value: '2012', icon: '📅', color: 'from-green-500 to-emerald-600' },
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