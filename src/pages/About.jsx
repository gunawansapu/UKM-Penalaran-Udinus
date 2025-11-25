import { useEffect } from 'react';
import QuotesSlider from '../components/SliderQuotes';
import OurTeam from '../components/OurTeam';

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

    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden relative font-sans">
      {/* Global Styles for Animations */}
      <style jsx>{`
        [data-aos] { opacity: 0; transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        [data-aos="fade-up"] { transform: translateY(50px); }
        [data-aos="fade-down"] { transform: translateY(-50px); }
        [data-aos="fade-left"] { transform: translateX(50px); }
        [data-aos="fade-right"] { transform: translateX(-50px); }
        [data-aos="zoom-in"] { transform: scale(0.9); }
        
        .animate-in { opacity: 1 !important; transform: translate(0) scale(1) !important; }
        .animate-out { opacity: 0; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }
      `}</style>

      {/* --- BACKGROUND DECORATIONS (Light Theme) --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-[80px] transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-left space-y-6 order-2 lg:order-1" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-indigo-100 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-sm font-bold text-indigo-600 tracking-wide uppercase">Tentang Kami</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Wadah <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Intelektual</span> <br/>
              Muda Berkarya.
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Mengembangkan daya nalar dan pemikiran kritis mahasiswa melalui riset, diskusi, dan inovasi berkelanjutan.
            </p>

            <div className="flex gap-4 pt-4 items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    className="w-12 h-12 rounded-full border-2 border-white object-cover bg-gray-200" 
                    src={`https://ui-avatars.com/api/?name=M+${i}&background=random&color=fff`} 
                    alt="Member Avatar" 
                  />
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-slate-800 text-lg">30+ Anggota Aktif</span>
                <span className="text-xs text-slate-500 font-medium">Bergabung bersama kami</span>
              </div>
            </div>
          </div>

          {/* Right: Image Composition (Sekarang Tampil di Mobile!) */}
          <div className="relative order-1 lg:order-2 block" data-aos="fade-left">
            {/* Container Height Responsif: Kecil di HP, Besar di Laptop */}
            <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px]">
              
              {/* Main Image */}
              <img 
                src="https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.42.16_57dde200.jpg" 
                alt="Group Discussion" 
                className="absolute top-0 right-0 w-4/5 h-4/5 object-cover rounded-3xl shadow-2xl z-10 animate-float"
              />
              
              {/* Secondary Image */}
              <img 
                src="https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_e0628f45.jpg" 
                alt="Workshop" 
                className="absolute bottom-0 left-0 w-2/5 h-2/5 object-cover rounded-2xl shadow-xl border-4 border-white z-20 animate-float-delayed"
              />
              
              {/* Decorative Blobs */}
              <div className="absolute top-10 left-10 w-24 h-24 lg:w-32 lg:h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 right-20 w-32 h-32 lg:w-48 lg:h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>

        </div>
      </section>

      {/* --- PROFILE SECTION --- */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Profile Card */}
          <div 
            data-aos="fade-up"
            className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 overflow-hidden mb-12"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-[10rem] -z-0"></div>
            
            <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </span>
                  Profil Organisasi
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed text-justify">
                  UKM Penalaran Universitas Dian Nuswantoro adalah organisasi mahasiswa yang berfokus pada pengembangan daya nalar, logika ilmiah, dan keterampilan berpikir kritis. Kami aktif dalam berbagai kegiatan seperti pelatihan debat, diskusi ilmiah, lomba karya tulis ilmiah, hingga pengabdian masyarakat berbasis riset.
                </p>
              </div>
              <div className="md:col-span-4 flex justify-center">
                 <img 
                  src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" 
                  alt="Teamwork" 
                  className="rounded-2xl shadow-lg rotate-3 hover:rotate-0 transition-all duration-500 w-full object-cover h-64"
                />
              </div>
            </div>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <div 
              data-aos="fade-right"
              className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 p-10 text-white shadow-2xl"
            >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Visi</h3>
                  <p className="text-indigo-100 text-lg leading-relaxed italic font-light">
                    "Menjadi UKM terdepan yang membentuk generasi mahasiswa berkarakter ilmiah, berintegritas, dan berdampak nyata bagi masyarakat melalui penalaran, pendidikan, pengabdian, serta literasi yang inovatif, efektif, dan efisien."
                  </p>
                </div>
                <div className="mt-8 h-1 w-20 bg-yellow-400 rounded-full group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>

            {/* Mission */}
            <div 
              data-aos="fade-left"
              className="rounded-[2.5rem] bg-white p-10 shadow-xl border border-slate-100 flex flex-col"
            >
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Misi</h3>
              
              <ul className="space-y-4 flex-1">
                {[
                  "Mengembangkan daya kritis, kreativitas, dan inovasi mahasiswa melalui berbagai program pengembangan diri yang terarah.",
                  "Menumbuhkan budaya berpikir ilmiah yang berlandaskan integritas dan tanggung jawab sosial.",
                  "Membangun kesadaran dan keterampilan literasi di kalangan mahasiswa untuk mendukung penguasaan pengetahuan dan teknologi.",
                  "Mendorong lahirnya karya dan publikasi yang bermanfaat bagi masyarakat sebagai wujud pengabdian nyata."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-slate-700 font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-20 px-6 relative z-10 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Component Team */}
          <div data-aos="fade-up">
            <OurTeam />
          </div>

          {/* Stats Floating Cards */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl transform -rotate-1"></div>
            <div 
              data-aos="zoom-in"
              className="relative bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {[
                  { label: 'Anggota Aktif', value: '30+', icon: 'users', color: 'text-blue-600' },
                  { label: 'Tahun Berdiri', value: '2012', icon: 'calendar', color: 'text-purple-600' },
                  { label: 'Prestasi', value: '25+', icon: 'award', color: 'text-yellow-500' },
                  { label: 'Kegiatan/Tahun', value: '6+', icon: 'activity', color: 'text-green-500' },
                ].map((stat, index) => (
                  <div key={index} className="p-6 text-center hover:bg-slate-50 transition-colors duration-300 group">
                    <div className={`text-4xl font-extrabold mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-500 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA (KEMBALI KE DESAIN AWAL) --- */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative z-10">
        <QuotesSlider/>
      </section>

    </div>
  );
};

export default About;