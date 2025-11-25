import { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-react";
import innovationAnimation from "../assets/Scientist.json";
import innovationAnimation2 from "../assets/Champion.json";
import innovationAnimation3 from "../assets/Business meeting in office.json";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        // Parallax effect logic
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      lottie: innovationAnimation,
      title: "Riset Inovatif",
      desc: "Penelitian berkualitas tinggi",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0s"
    },
    {
      lottie: innovationAnimation2,
      title: "Prestasi Gemilang",
      desc: "Raih pencapaian terbaik",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.2s"
    },
    {
      lottie: innovationAnimation3,
      title: "Kolaborasi",
      desc: "Jaringan akademisi luas",
      gradient: "from-emerald-500 to-teal-500",
      delay: "0.4s"
    },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f8fafc] font-sans perspective-1000"
    >
      
      {/* --- 1. CINEMATIC ATMOSPHERE (Background) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-10"></div>
        
        <div 
          className="absolute top-1/2 left-1/2 w-[140vw] h-[140vw] bg-gradient-conic from-indigo-100 via-purple-100 to-sky-100 rounded-full blur-[120px] opacity-70 animate-spin-slow"
          style={{ 
            transform: `translate(-50%, -50%) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` 
          }}
        ></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-[100px] mix-blend-overlay opacity-90"></div>
      </div>

      {/* --- 2. FLOATING 3D CHARACTERS --- */}
      {/* z-index diatur ke 10 agar berada di antara background dan konten utama */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        
        {/* Scientist (KIRI) - Posisi diturunkan agar tidak menabrak teks */}
        <div 
          className="absolute top-[23%] -left-4 md:top-[20%] md:left-[5%] w-36 md:w-72 transition-transform duration-100 ease-out animate-float"
          style={{ transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px) rotate(-6deg)` }}
        >
          <div className="relative bg-white/40 backdrop-blur-xl p-3 md:p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.15)] border border-white/60 ring-1 ring-white/50">
             <Lottie animationData={innovationAnimation} loop={true} />
             <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/40 to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Champion (KANAN) */}
        <div 
          className="absolute top-[8%] right-2 md:top-[15%] md:right-[5%] w-36 md:w-72 transition-transform duration-100 ease-out animate-float-delayed"
          style={{ transform: `translate(${mousePosition.x * -50}px, ${mousePosition.y * -50}px) rotate(6deg)` }}
        >
          <div className="relative bg-white/40 backdrop-blur-xl p-3 md:p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.15)] border border-white/60 ring-1 ring-white/50">
             <Lottie animationData={innovationAnimation2} loop={true} />
             <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-bl from-white/40 to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Meeting (BAWAH) - PERBAIKAN: WARNA JELAS
            - Menghapus opacity, blur, dan grayscale.
            - Memperbesar ukuran sedikit agar mengisi ruang bawah.
            - z-index 0 agar di belakang tombol.
        */}
        <div 
          className="absolute bottom-[-8%] left-1/2 transform -translate-x-1/2 w-72 md:w-[35rem] transition-transform duration-100 ease-out z-0"
          style={{ transform: `translate(-50%, 0) translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
        >
           <Lottie animationData={innovationAnimation3} loop={true} />
        </div>
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      {/* z-30 memastikan teks dan tombol bisa diklik dan berada di atas lottie bawah */}
      <div className="relative z-30 container mx-auto px-4 text-center mt-16 md:mt-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-lg shadow-indigo-500/10 mb-8 animate-fade-in-up hover:scale-105 transition-transform duration-300">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-extrabold tracking-[0.2em] text-indigo-900 uppercase">Unit Kegiatan Mahasiswa</span>
        </div>

        {/* MASSIVE TYPOGRAPHY */}
        <div className="relative mb-8 md:mb-12 perspective-text">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter drop-shadow-xl">
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-slate-800 to-slate-600 transform hover:scale-105 transition-transform duration-500 cursor-default">
              UKM
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 animate-gradient-x pb-2 md:pb-4 transform hover:scale-105 transition-transform duration-500 cursor-default filter drop-shadow-sm">
              PENALARAN
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-400 mt-2 md:mt-4 tracking-normal transform hover:scale-105 transition-transform duration-500 cursor-default">
              UDINUS
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="relative max-w-2xl mx-auto mb-12 p-6 md:p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl animate-fade-in-up group hover:bg-white/50 transition-all duration-500" style={{animationDelay: '0.3s'}}>
          <p className="text-base md:text-xl text-slate-700 font-medium leading-relaxed">
            Menginspirasi kreativitas, mengembangkan keilmiahan, dan membangun intelektualitas mahasiswa UDINUS melalui riset dan penalaran inovatif.
          </p>
        </div>

        {/* Buttons */}
        {/* pb-20 memberikan ruang agar tombol tidak terlalu mepet dengan lottie bawah di mobile */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-fade-in-up px-6 pb-20 md:pb-0" style={{animationDelay: '0.5s'}}>
          <a 
            href="/tentang" 
            className="group relative px-8 md:px-12 py-4 md:py-5 rounded-full bg-slate-900 text-white font-bold text-lg shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-3">
              Jelajahi Kami
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </a>
          
          <a 
            href="/kontak" 
            className="group px-8 md:px-12 py-4 md:py-5 rounded-full bg-white/60 backdrop-blur-xl border border-white text-slate-800 font-bold text-lg shadow-lg hover:bg-white hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="flex items-center justify-center gap-2">
              Hubungi Kami
            </span>
          </a>
        </div>

      </div>

      {/* --- 4. FEATURE CARDS --- */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 mt-16 md:mt-24 pb-10">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="group relative bg-white/40 backdrop-blur-lg rounded-[2rem] p-1 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: item.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-[2rem]"></div>
              <div className="relative h-full bg-gradient-to-br from-white/90 to-white/40 p-6 rounded-[1.8rem] flex items-center gap-4 overflow-hidden">
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-full blur-[50px] opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Lottie animationData={item.lottie} loop={true} />
                </div>
                <div className="text-left relative z-10">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                  <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-6deg); }
            50% { transform: translateY(-15px) rotate(-6deg); }
        }
        @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(6deg); }
            50% { transform: translateY(-15px) rotate(6deg); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float-delayed 7s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;