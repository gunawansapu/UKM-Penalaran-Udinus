import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import innovationAnimation from "../assets/Scientist.json";
import innovationAnimation2 from "../assets/Champion.json";
import innovationAnimation3 from "../assets/Business meeting in office.json";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (!isMobile) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      };

      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const features = [
    {
      lottie: innovationAnimation,
      title: "Riset Inovatif",
      desc: "Penelitian berkualitas tinggi",
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/50",
    },
    {
      lottie: innovationAnimation2,
      title: "Prestasi Gemilang",
      desc: "Raih pencapaian terbaik",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/50",
    },
    {
      lottie: innovationAnimation3,
      title: "Kolaborasi",
      desc: "Jaringan akademisi luas",
      color: "from-emerald-500 to-teal-500",
      glow: "shadow-emerald-500/50",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-60">
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(99, 102, 241, 0.4) 0%, 
                rgba(168, 85, 247, 0.3) 20%, 
                rgba(59, 130, 246, 0.2) 40%, 
                transparent 70%),
              radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, 
                rgba(236, 72, 153, 0.3) 0%, 
                rgba(147, 51, 234, 0.2) 30%, 
                transparent 60%)
            `
          }}
        />
      </div>

      {/* Grid overlay with glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating orbs with blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl animate-float-slow"
          style={{
            top: '10%',
            left: '10%',
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-3xl animate-float-slower"
          style={{
            top: '60%',
            right: '15%',
            animationDelay: '2s',
            transform: `translateY(${scrollY * -0.15}px)`
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float-slow"
          style={{
            bottom: '10%',
            left: '20%',
            animationDelay: '1s',
            transform: `translateY(${scrollY * 0.08}px)`
          }}
        />
      </div>

      {/* Animated particles - premium version */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(window.innerWidth <= 768 ? 15 : 40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-500/50" />
          </div>
        ))}
      </div>

      {/* Geometric shapes with glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block absolute top-32 left-20 w-32 h-32 border border-indigo-500/40 rotate-45 animate-spin-slow shadow-lg shadow-indigo-500/20" />
        <div className="hidden lg:block absolute bottom-32 right-24 w-40 h-40 border border-purple-500/40 rotate-12 animate-pulse-slow shadow-lg shadow-purple-500/20" />
        <div className="hidden xl:block absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rotate-45 animate-float-slow rounded-xl backdrop-blur-sm" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center py-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Premium Badge with glow */}
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-xl rounded-full border border-indigo-400/30 mb-10 animate-fadeInUp shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">Unit Kegiatan Mahasiswa</span>
          </div>

          {/* Ultra premium heading with effects */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-8 tracking-tight">
            <span className="block mb-3 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
              UKM
            </span>
            <span className="block mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-reverse drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              Penalaran
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Udinus
            </span>
          </h1>

          {/* Premium subtitle with glow effect */}
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto mb-14 leading-relaxed font-medium drop-shadow-lg">
            Menginspirasi{' '}
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
              kreativitas
            </span>
            , mengembangkan{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-bold drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
              keilmiahan
            </span>
            , dan membangun{' '}
            <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text font-bold drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]">
              intelektualitas
            </span>{' '}
            mahasiswa melalui riset dan penalaran ilmiah yang inovatif
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <a
              href="/tentang"
              className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-white overflow-hidden transition-all duration-500 hover:scale-110 shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/80 animate-pulse-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <span className="relative flex items-center gap-3 text-lg">
                Jelajahi Kami
                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </a>
            
            <a
              href="/kontak"
              className="group relative px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl font-bold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-500 hover:scale-105 shadow-2xl shadow-white/10 hover:shadow-white/30"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
              <span className="relative flex items-center gap-3 text-lg">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Hubungi Kami
              </span>
            </a>
          </div>

          {/* Premium Feature Cards with 3D effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="group relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl"
                style={{ 
                  animationDelay: `${idx * 0.2}s`,
                  transform: `perspective(1000px) rotateX(${scrollY * 0.01}deg)`
                }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                
                {/* Card content */}
                <div className="relative">
                  <div className="w-36 h-36 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                    <Lottie animationData={item.lottie} loop={true} />
                  </div>
                  <h3 className={`text-2xl font-black mb-4 text-center bg-gradient-to-r ${item.color} bg-clip-text text-transparent drop-shadow-lg`}>
                    {item.title}
                  </h3>
                  <p className="text-blue-100/80 text-center font-medium text-lg">{item.desc}</p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-40 animate-pulse" />
          <div className="relative w-7 h-12 border-2 border-white/60 rounded-full flex justify-center bg-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-500/30">
            <div className="w-1.5 h-4 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mt-2 animate-pulse shadow-lg shadow-indigo-400/50" />
          </div>
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
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-gradient-reverse {
          background-size: 200% 200%;
          animation: gradient-reverse 4s ease infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .animate-gradient {
            animation-duration: 6s;
          }
          .animate-gradient-reverse {
            animation-duration: 6s;
          }
          .animate-float-slow {
            animation-duration: 8s;
          }
          .animate-spin-slow {
            animation-duration: 40s;
          }
        }
        
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

