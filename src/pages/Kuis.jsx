import React, { useEffect, useState } from 'react';
import { ExternalLink, HelpCircle , Users, BookOpen, Target, Sparkles, Zap } from 'lucide-react';

const QuizRedirect = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleQuizRedirect = () => {
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdlfoVDJVeToiWTaFnRzn2mk3qN3tq545xKy5LJ6SYlLW-_tw/viewform";
    window.open(googleFormUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes cyber-lines {
          0% { transform: translateX(-100vw); }
          100% { transform: translateX(100vw); }
        }
        @keyframes circuit-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes data-flow {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-matrix-rain {
          animation: matrix-rain 4s linear infinite;
        }
        .animate-cyber-lines {
          animation: cyber-lines 8s linear infinite;
        }
        .animate-circuit-pulse {
          animation: circuit-pulse 2s ease-in-out infinite;
        }
        .animate-data-flow {
          animation: data-flow 3s ease-in-out infinite;
        }
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        .glassmorphism {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 255, 255, 0.2);
        }
        .text-shadow {
          text-shadow: 0 0 10px rgba(0,255,255,0.5);
        }
        .cyber-gradient {
          background: linear-gradient(45deg, #000000, #001122, #002244, #000000);
        }
      `}</style>

      <div className="min-h-screen cyber-gradient relative overflow-hidden">
        {/* Cyber Background Elements */}
        <div className="absolute inset-0">
          {/* Moving cyber lines */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60 animate-cyber-lines"
                style={{
                  top: `${10 + i * 12}%`,
                  width: '200%',
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          {/* Vertical tech lines */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-circuit-pulse"
                style={{
                  left: `${5 + i * 8}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Matrix rain effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-cyan-400 text-sm font-mono animate-matrix-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                {'01010110'.split('').map((char, j) => (
                  <div key={j} className="mb-4">{char}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Circuit nodes */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-circuit-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
              }}
            />
          ))}

          {/* Glowing orbs */}
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          ></div>
          <div 
            className="absolute top-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          ></div>

          {/* Tech hexagons */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-cyan-500/20 transform rotate-45 animate-spin-slow"
              style={{
                width: '60px',
                height: '60px',
                left: `${20 + i * 15}%`,
                top: `${10 + i * 15}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${20 + i * 5}s`
              }}
            />
          ))}
        </div>

        {/* Floating data packets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-300 text-xs font-mono animate-data-flow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              {['[DATA]', '[PROC]', '[EXEC]', '[SYS]', '[NET]'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        {/* Scanlines */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 255, 0.03) 2px,
              rgba(0, 255, 255, 0.03) 4px
            )`
          }}
        />

        <div className="max-w-6xl mx-auto p-6 relative z-10">
          {/* Header Section */}
          <div 
            id="header"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible.header ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-green-400 rounded-3xl mb-8 shadow-2xl relative overflow-hidden group animate-float border-2 border-cyan-400/30">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent animate-shimmer"></div>
              <HelpCircle  className="w-12 h-12 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <Sparkles className="absolute top-2 right-2 w-5 h-5 text-yellow-300 animate-bounce" />
              <div className="absolute inset-0 rounded-3xl animate-glow"></div>
            </div>
            
            <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-300 via-blue-200 to-green-300 bg-clip-text text-transparent mb-6 leading-tight text-shadow">
              <span className="animate-glitch inline-block">Kuis Penalaran & Logika</span>
            </h1>
            <p className="text-xl text-cyan-100/90 max-w-3xl mx-auto leading-relaxed mb-6">
              Uji kemampuan berpikir kritis dan logis Anda melalui serangkaian pertanyaan berbentuk studi kasus nyata yang telah dirancang khusus untuk mengasah intelektualitas
            </p>
            
            {/* Animated cyber underline */}
            <div className="relative w-32 h-1 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute -left-2 -right-2 top-0 h-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Floating tech icons */}
            <div className="flex justify-center gap-8 mt-8">
              {[Target, BookOpen, Users].map((Icon, index) => (
                <div
                  key={index}
                  className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center animate-float border border-cyan-400/30 relative"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <Icon className="w-6 h-6 text-cyan-300" />
                  <div className="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Quiz Card */}
          <div 
            id="mainCard"
            data-animate
            className={`glassmorphism rounded-3xl shadow-2xl overflow-hidden mb-10 relative group transition-all duration-1000 border-2 border-cyan-400/20 ${
              isVisible.mainCard ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
          >
            {/* Animated cyber border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-green-500/50 rounded-3xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-glow"></div>
            <div className="absolute inset-0.5 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 p-12 text-white relative overflow-hidden">
                {/* Animated cyber background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-cyber-lines"
                        style={{
                          top: `${20 * i}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: '4s'
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <h2 className="text-4xl font-bold text-shadow">Siapkah Untuk Tantangan dari UKM Penalaran?</h2>
                  <div className="relative">
                    <Target className="w-12 h-12 opacity-80 animate-spin-slow" />
                    <Zap className="absolute top-1 right-1 w-5 h-5 text-yellow-300 animate-bounce" />
                    <div className="absolute inset-0 rounded-full bg-yellow-300/20 animate-ping"></div>
                  </div>
                </div>
                <p className="text-cyan-100 leading-relaxed text-lg relative z-10">
                  Kuis ini akan menguji pemahaman Anda tentang logika, penalaran ilmiah, 
                  dan kemampuan berpikir kritis yang menjadi dasar dari kegiatan UKM Penalaran UDINUS.
                </p>
                
                {/* Decorative cyber elements */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-cyan-300/50 rounded-full animate-ping border border-cyan-400"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>

                {/* Corner tech decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/50"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/50"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400/50"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/50"></div>
              </div>

              <div className="p-12">
                {/* Quiz Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {[
                    { icon: BookOpen, title: "Soal Studi Kasus Nyata", desc: "Pertanyaan seputar logika dan penalaran ilmiah", color: "cyan" },
                    { icon: Users, title: "Untuk Semua", desc: "Terbuka untuk mahasiswa dan umum", color: "green" },
                    { icon: HelpCircle , title: "Asah Logika", desc: "Tingkatkan kemampuan berpikir kritis", color: "blue" }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="text-center p-8 group hover:scale-110 transition-all duration-500 glassmorphism rounded-2xl relative overflow-hidden border border-cyan-400/20"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-400/20 to-${feature.color}-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-${feature.color}-400/30 group-hover:to-${feature.color}-600/40 transition-all duration-300 animate-float relative z-10 border border-${feature.color}-400/30`}
                           style={{ animationDelay: `${index * 0.2}s` }}>
                        <feature.icon className={`w-10 h-10 text-${feature.color}-300 group-hover:scale-125 transition-transform duration-300`} />
                      </div>
                      
                      <h3 className="font-bold text-white mb-4 text-xl relative z-10">{feature.title}</h3>
                      <p className="text-cyan-100/80 leading-relaxed relative z-10">{feature.desc}</p>
                      
                      {/* Tech corners */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-400/50"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-400/50"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-400/50"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-400/50"></div>
                      
                      {/* Cyber effect */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                  ))}
                </div>

                {/* Instructions */}
                <div className="glassmorphism rounded-3xl p-10 mb-10 border border-cyan-400/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
                  
                  <h3 className="font-bold text-white mb-8 flex items-center gap-4 text-2xl relative z-10">
                    <span className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse border border-cyan-300"></span>
                    Petunjuk Pengerjaan
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {[
                      { text: "Klik tombol 'Mulai Kuis' untuk membuka Google Form resmi UKM Penalaran", icon: "🚀" },
                      { text: "Isi data diri seperti Email, Nama, NIM, Program Studi, dan Akun Instagram", icon: "📝" },
                      { text: "Baca dan pahami studi kasus dengan saksama sebelum menjawab", icon: "🧠" },
                      { text: "Unggah bukti follow akun Instagram UKM Penalaran dan file pendukung (maks 10 MB)", icon: "📎" },
                      { text: "Pastikan semua isian benar, lalu klik 'Submit' untuk mengirim jawaban", icon: "✅" }
                    ].map((instruction, index) => (
                      <div key={index} className="flex items-start gap-4 group p-4 glassmorphism rounded-xl hover:scale-105 transition-all duration-300 border border-cyan-400/10 relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-600/30 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-cyan-400/30">
                          {instruction.icon}
                        </div>
                        <div>
                          <span className="font-bold text-cyan-400 text-lg">Step {index + 1}</span>
                          <p className="text-cyan-100/90 leading-relaxed mt-1">{instruction.text}</p>
                        </div>
                        
                        {/* Corner decoration */}
                        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-cyan-400/30"></div>
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-cyan-400/30"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <button
                    onClick={handleQuizRedirect}
                    className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 hover:from-cyan-400 hover:via-blue-400 hover:to-green-400 text-white font-bold px-16 py-8 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25 active:scale-95 overflow-hidden text-xl border-2 border-cyan-400/50"
                  >
                    {/* Animated cyber background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                    
                    <HelpCircle  className="w-8 h-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10 text-shadow">Mulai Kuis Sekarang</span>
                    <ExternalLink className="w-6 h-6 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    
                    {/* Multiple cyber sparkle effects */}
                    <div className="absolute top-3 right-3 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                    <div className="absolute bottom-3 left-3 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 left-4 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Corner tech elements */}
                    <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <p className="text-cyan-200/70 mt-6 animate-pulse text-lg">
                    ✨ Kuis akan dibuka di tab baru melalui Google Form ✨
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div 
            id="infoCards"
            data-animate
            className={`grid md:grid-cols-2 gap-10 transition-all duration-1000 delay-300 ${
              isVisible.infoCards ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
          >
            <div className="glassmorphism rounded-3xl p-10 group hover:scale-105 transition-all duration-500 relative overflow-hidden border border-cyan-400/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="font-bold text-blue-100 mb-6 flex items-center gap-4 text-2xl relative z-10">
                <span className="w-4 h-4 bg-blue-400 rounded-full animate-pulse border border-blue-300"></span>
                Tentang Kuis
                <BookOpen className="w-6 h-6 ml-auto opacity-60" />
              </h3>
              <p className="text-blue-200/90 leading-relaxed text-lg relative z-10">
                Kuis ini dirancang untuk mengasah kemampuan logika dan penalaran yang menjadi 
                fokus utama UKM Penalaran UDINUS. Setiap soal telah disusun berdasarkan 
                materi pembelajaran yang relevan dan disesuaikan dengan standar akademik.
              </p>
              
              <div className="mt-6 flex gap-2 relative z-10">
                {['Logic', 'Critical Thinking', 'Problem Solving'].map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm border border-blue-400/30">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Cyber corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50"></div>
            </div>

            <div className="glassmorphism rounded-3xl p-10 group hover:scale-105 transition-all duration-500 relative overflow-hidden border border-cyan-400/20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="font-bold text-green-100 mb-6 flex items-center gap-4 text-2xl relative z-10">
                <span className="w-4 h-4 bg-green-400 rounded-full animate-pulse border border-green-300"></span>
                Setelah Kuis
                <Target className="w-6<h3 className="font-bold text-green-100 mb-6 flex items-center gap-4 text-2xl relative z-10></Target>
                <span className="w-4 h-4 bg-green-400 rounded-full animate-pulse border border-green-300"></span>
                Setelah Kuis
                <Target className="w-6 h-6 ml-auto opacity-60" />
              </h3>
              <p className="text-green-200/90 leading-relaxed text-lg relative z-10">
                Hasil kuis akan dianalisis oleh tim UKM Penalaran UDINUS. Informasi lebih lanjut 
                mengenai kegiatan dan program pengembangan akan disampaikan melalui media sosial 
                dan website resmi organisasi.
              </p>
              
              
              
              {/* Cyber corners */}
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pb-10">
            <div className="glassmorphism rounded-2xl p-8 inline-block border border-cyan-400/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
              <p className="text-cyan-200/80 text-lg mb-4 relative z-10">
                Dikembangkan dengan ❤️ oleh <span className="font-bold text-cyan-400">UKM Penalaran UDINUS</span>
              </p>
              <div className="flex justify-center gap-4 relative z-10">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce border border-cyan-300"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-cyan-400/50"></div>
              <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-cyan-400/50"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-cyan-400/50"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-cyan-400/50"></div>
            </div>
          </div>
        </div>

        {/* Tech overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner tech brackets */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-400/30"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30"></div>
          
          {/* Status indicators */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {['SYSTEM', 'READY', 'ACTIVE'].map((status, index) => (
              <div key={index} className="flex items-center gap-1 text-cyan-400 text-xs font-mono">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse border border-green-300"></div>
                <span>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizRedirect;