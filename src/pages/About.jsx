import { useEffect } from 'react';
import QuotesSlider from '../components/SliderQuotes';
import OurTeam from '../components/OurTeam';
import { Target, Compass, Users, Award, Activity, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

const About = () => {
  // --- AOS Initialization & Mouse Glow Effect ---
  useEffect(() => {
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

    // Mouse Glow Effect Logic
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

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-x-hidden relative font-sans w-full max-w-[100vw]">
      {/* Global Styles for Animations */}
      <style>{`
        [data-aos] { opacity: 0; transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        [data-aos="fade-up"] { transform: translateY(50px); }
        [data-aos="fade-down"] { transform: translateY(-50px); }
        [data-aos="fade-left"] { transform: translateX(50px); }
        [data-aos="fade-right"] { transform: translateX(-50px); }
        [data-aos="zoom-in"] { transform: scale(0.9); }
        
        .animate-in { opacity: 1 !important; transform: translate(0) scale(1) !important; }
        .animate-out { opacity: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 2s; }
      `}</style>

      {/* --- BACKGROUND AMBIENT DECORATIONS --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-10"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-left space-y-6 order-2 lg:order-1" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-full shadow-sm">
              <Sparkles size={16} className="text-indigo-500" />
              <span className="text-sm font-bold text-indigo-700 tracking-wide uppercase">Tentang Kami</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Wadah <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Intelektual</span> <br/>
              Muda Berkarya.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
              Mengembangkan daya nalar dan pemikiran kritis mahasiswa melalui riset, diskusi, dan inovasi berkelanjutan demi masa depan yang berdampak.
            </p>

            <div className="flex gap-4 pt-6 items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    className="w-12 h-12 rounded-full border-2 border-white object-cover bg-gray-200 hover:-translate-y-1 transition-transform" 
                    src={`https://ui-avatars.com/api/?name=M+${i}&background=random&color=fff`} 
                    alt="Member Avatar" 
                  />
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-slate-800 text-lg">30+ Anggota Aktif</span>
                <span className="text-sm text-slate-500 font-medium">Telah bergabung bersama kami</span>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 block" data-aos="fade-left">
            <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px]">
              <img 
                src="https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.42.16_57dde200.jpg" 
                alt="Group Discussion" 
                className="absolute top-0 right-0 w-4/5 h-4/5 object-cover rounded-[2.5rem] shadow-2xl z-10 animate-float border-[6px] border-white/50 backdrop-blur-sm"
              />
              <img 
                src="https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_e0628f45.jpg" 
                alt="Workshop" 
                className="absolute bottom-0 left-0 w-[55%] h-[55%] object-cover rounded-[2rem] shadow-xl border-[6px] border-white z-20 animate-float-delayed"
              />
              <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-500/30 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>

        </div>
      </section>

      {/* --- BENTO GRID SECTION: PROFIL, VISI, MISI, STATS --- */}
      <section className="py-20 px-6 relative z-10 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 auto-rows-[auto] gap-6">
          
          <div data-aos="fade-up" className="bento-card relative lg:col-span-2 rounded-[2.5rem] p-8 md:p-12 overflow-hidden group bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.08), transparent 40%)' }}></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-bl-full -z-0"></div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Profil Organisasi
                </h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <p className="text-lg text-slate-600 leading-relaxed font-medium flex-1">
                  UKM Penalaran Universitas Dian Nuswantoro adalah organisasi mahasiswa yang berfokus pada pengembangan daya nalar, logika ilmiah, dan keterampilan berpikir kritis. Kami aktif dalam berbagai kegiatan seperti pelatihan debat, diskusi ilmiah, lomba karya tulis ilmiah, hingga pengabdian masyarakat berbasis riset.
                </p>
                <div className="w-full md:w-48 h-48 flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-[2rem] transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  <img 
                    src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" 
                    alt="Logo Penalaran" 
                    className="absolute inset-0 w-full h-full object-contain rounded-[2rem] shadow-sm bg-white p-2 border border-slate-100 transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100" className="bento-card relative rounded-[2.5rem] p-6 overflow-hidden group bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.08), transparent 40%)' }}></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
              {[
                { label: 'Anggota', value: '30+', icon: <Users size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Tahun', value: '2012', icon: <Calendar size={20}/>, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Prestasi', value: '25+', icon: <Award size={20}/>, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Event', value: '6+', icon: <Activity size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((stat, idx) => (
                <div key={idx} className={`p-4 rounded-3xl ${stat.bg} flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 border border-white/50 shadow-sm`}>
                  <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                  <div className={`text-2xl sm:text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="bento-card relative rounded-[2.5rem] p-8 md:p-10 overflow-hidden group bg-slate-900 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.25), transparent 40%)' }}></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                <Compass size={28} className="text-indigo-400" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">Visi</h3>
              <p className="text-slate-300 text-base leading-relaxed italic font-light relative z-10">
                "Menjadi UKM terdepan yang membentuk generasi mahasiswa berkarakter ilmiah, berintegritas, dan berdampak nyata bagi masyarakat melalui penalaran, pendidikan, pengabdian, serta literasi yang inovatif."
              </p>
              <div className="mt-auto pt-8">
                <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className="bento-card relative lg:col-span-2 rounded-[2.5rem] p-8 md:p-10 overflow-hidden group bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(236,72,153,0.08), transparent 40%)' }}></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="lg:w-1/3">
                <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6 border border-pink-200 group-hover:-rotate-12 transition-transform duration-500">
                  <Target size={28} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Misi</h3>
                <p className="text-slate-500 font-medium text-sm">Langkah konkret kami dalam mewujudkan ekosistem mahasiswa yang berprestasi.</p>
              </div>
              
              <div className="lg:w-2/3">
                <ul className="space-y-3">
                  {[
                    "Mengembangkan daya kritis, kreativitas, dan inovasi melalui program terarah.",
                    "Menumbuhkan budaya berpikir ilmiah berlandaskan integritas dan tanggung jawab sosial.",
                    "Membangun kesadaran literasi guna mendukung penguasaan teknologi.",
                    "Mendorong lahirnya karya dan publikasi bermanfaat sebagai wujud pengabdian."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 hover:bg-white rounded-2xl border border-transparent hover:border-slate-100 hover:shadow-sm transition-all duration-300">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- OUR TEAM SECTION (Murni dari Komponen) --- */}
      <div className="w-full overflow-hidden">
        <OurTeam />
      </div>

      {/* --- QUOTES SECTION (Murni dari Komponen) --- */}
      <div className="w-full overflow-hidden">
        <QuotesSlider />
      </div>

    </div>
  );
};

export default About;