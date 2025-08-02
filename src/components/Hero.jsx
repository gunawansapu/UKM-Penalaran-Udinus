import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Disable mouse effects on mobile/touch devices
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (!isMobile) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(79, 70, 229, 0.15) 0%, 
              rgba(147, 51, 234, 0.1) 25%, 
              rgba(59, 130, 246, 0.1) 50%, 
              rgba(255, 255, 255, 0.3) 100%)`
          }}
        />
        
        {/* Floating particles - reduced for mobile */}
        <div className="absolute inset-0">
          {[...Array(window.innerWidth <= 768 ? 8 : 25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* Geometric shapes - simplified for mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-32 left-32 w-24 h-24 border-2 border-indigo-300/40 rotate-45 animate-spin-slow" />
        <div className="hidden md:block absolute bottom-32 right-32 w-32 h-32 border-2 border-purple-300/40 rotate-12 animate-pulse" />
        <div className="hidden lg:block absolute top-1/2 left-16 w-16 h-16 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rotate-45 animate-bounce-slow rounded-lg" />
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-pink-300/30 to-orange-300/30 rounded-full animate-ping" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full border border-indigo-200/50 mb-8 animate-fadeInUp shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-slate-700">Unit Kegiatan Mahasiswa</span>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
            <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent animate-gradient">
              UKM
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-reverse">
              Penalaran
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Udinus
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Menginspirasi <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold">kreativitas</span>, 
            mengembangkan <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-bold">keilmiahan</span>, 
            dan membangun <span className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text font-bold">intelektualitas </span> 
            mahasiswa melalui riset dan penalaran ilmiah yang inovatif
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
  href="/tentang"
  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 shadow-lg"
  style={{ color: '#ffffff' }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  <span className="relative flex items-center gap-2" style={{ color: '#ffffff' }}>
    Jelajahi Kami
    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </span>
</a>
            
            <a
              href="/kontak"
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-white hover:border-indigo-300 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Hubungi Kami
              </span>
            </a>
          </div>

          {/* Stats/Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🔬", title: "Riset Inovatif", desc: "Penelitian berkualitas tinggi", color: "from-blue-500 to-cyan-500" },
              { icon: "🏆", title: "Prestasi Gemilang", desc: "Raih pencapaian terbaik", color: "from-purple-500 to-pink-500" },
              { icon: "🤝", title: "Kolaborasi", desc: "Jaringan akademisi luas", color: "from-emerald-500 to-teal-500" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400/60 rounded-full flex justify-center bg-white/40 backdrop-blur-sm">
          <div className="w-1 h-3 bg-slate-500/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-gradient-reverse {
          background-size: 200% 200%;
          animation: gradient-reverse 4s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-gradient {
            animation-duration: 6s; /* Slower on mobile */
          }
          .animate-gradient-reverse {
            animation-duration: 6s;
          }
          .animate-spin-slow {
            animation-duration: 40s; /* Much slower */
          }
          .animate-bounce-slow {
            animation-duration: 6s;
          }
        }
        
        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;