import { useState, useEffect } from 'react';
import { Menu, X, Brain, Lightbulb, Users, Newspaper, Phone, GalleryVerticalEnd } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menutup menu mobile jika rute berubah
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Beranda', to: '/', icon: <Users size={16} /> },
    { label: 'Tentang', to: '/tentang', icon: <Brain size={16} /> },
    { label: 'Kegiatan', to: '/kegiatan', icon: <Lightbulb size={16} /> },
    { label: 'Berita', to: '/berita', icon: <Newspaper size={16} /> },
    { label: 'Galeri', to: '/galeri', icon: <GalleryVerticalEnd size={16} /> },
    { label: 'Kontak', to: '/kontak', icon: <Phone size={16} /> },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Wrapper utama - pointer-events-auto agar bisa diklik */}
      <div className="w-full max-w-5xl relative pointer-events-auto">
        
        {/* Floating Capsule Main Navbar */}
        <nav 
          className={`relative flex items-center justify-between px-3 py-2 !rounded-full transition-all duration-500 ease-out border ${
            scrolled 
              ? '!bg-white/80 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] translate-y-0' 
              : '!bg-white/60 backdrop-blur-md border-white/30 shadow-[0_4px_20px_rgb(0,0,0,0.05)] translate-y-1'
          }`}
        >
          {/* Logo Section */}
          <Link 
            to="/"
            className="flex items-center space-x-3 px-2 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex-shrink-0">
              {/* Container Logo Dibundarkan Penuh */}
              <div className="w-10 h-10 !rounded-full bg-white flex items-center justify-center shadow-md border-2 border-indigo-50 overflow-hidden">
                <img
                  src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png"
                  alt="Logo"
                  className="w-full h-full object-cover !rounded-full"
                />
              </div>
            </div>
            
            {/* Teks dengan Special Character yang kamu mau */}
            <div className="flex flex-col justify-center">
              <h1 
                className="text-[1.5rem] sm:text-[1.7rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-none drop-shadow-sm pb-1"
                aria-label="Penalaran"
              >
                𝓟𝓮𝓷𝓪𝓵𝓪𝓻𝓪𝓷
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation (Pill layout) */}
          <div className="hidden lg:flex items-center p-1 space-x-1 !bg-white/40 border border-gray-200/50 !rounded-full">
            {navItems.map(({ label, to, icon }) => (
              <NavLink
                key={to}
                to={to}
                // Memaksa warna text-white saat active dan menghilangkan style bentrok
                style={({ isActive }) => ({ color: isActive ? '#ffffff' : '' })}
                className={({ isActive }) => 
                  `relative flex items-center space-x-1.5 px-4 py-2 !rounded-full text-sm font-semibold transition-all duration-300 group ${
                    isActive 
                      ? '!bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white shadow-md' 
                      : '!text-gray-600 hover:!text-indigo-600 hover:!bg-white/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="relative z-10 flex items-center space-x-1.5">
                    {icon && (
                      <span className={`transition-transform duration-300 ${isActive ? 'scale-100 !text-white' : 'group-hover:scale-110 !text-gray-400 group-hover:!text-indigo-500'}`}>
                        {icon}
                      </span>
                    )}
                    <span className={isActive ? '!text-white' : ''}>{label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Toggle Button (Override Total Warna Cyan) */}
          <button
            type="button"
            className={`lg:hidden relative w-10 h-10 !rounded-full flex items-center justify-center transition-all duration-300 shadow-sm !border !outline-none ${
              open 
                ? '!bg-indigo-50 !border-indigo-200 !text-indigo-600 rotate-90' 
                : '!bg-white !border-gray-200 !text-gray-700 hover:!bg-gray-50'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Menu 
                size={22} 
                strokeWidth={2.5}
                className={`absolute transition-all duration-300 ${open ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
              />
              <X 
                size={22} 
                strokeWidth={2.5}
                className={`absolute transition-all duration-300 ${open ? 'opacity-100 scale-100 -rotate-90' : 'opacity-0 scale-50 rotate-90'}`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Navigation Dropdown (Floating Card) */}
        <div 
          className={`lg:hidden absolute top-[calc(100%+1rem)] left-0 w-full transition-all duration-400 ease-out origin-top ${
            open ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-4 scale-95 invisible'
          }`}
        >
          <div className="!bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_20px_40px_rgb(0,0,0,0.1)] !rounded-3xl p-3 overflow-hidden">
            <nav className="flex flex-col space-y-1">
              {navItems.map(({ label, to, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative flex items-center px-4 py-3.5 !rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      isActive 
                        ? '!bg-gradient-to-r !from-indigo-50 !to-purple-50 !text-indigo-600' 
                        : '!text-gray-600 hover:!bg-gray-50 hover:!text-indigo-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Indicator Line */}
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 !rounded-r-full bg-gradient-to-b from-indigo-500 to-purple-500 transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}></div>
                      
                      <div className="flex items-center space-x-3 ml-2">
                        <span className={`p-1.5 !rounded-xl transition-colors duration-300 ${isActive ? '!bg-white shadow-sm !text-indigo-500' : '!bg-gray-100 !text-gray-500'}`}>
                          {icon}
                        </span>
                        <span>{label}</span>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            
            {/* Quick Action Mobile Footer */}
            <div className="mt-3 p-4 bg-gradient-to-br from-indigo-600 to-purple-600 !rounded-2xl flex items-center justify-between !text-white shadow-lg">
              <div>
                <h4 className="font-semibold text-sm !text-white">Punya Pertanyaan?</h4>
                <p className="text-xs !text-white/80 mt-0.5">Hubungi tim kami sekarang</p>
              </div>
              <Link to="/kontak" onClick={() => setOpen(false)} className="px-5 py-2 !bg-white !text-indigo-600 !rounded-xl text-xs font-bold hover:shadow-md transition-all duration-300 active:scale-95">
                Chat
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Background Overlay for Mobile Menu */}
      {open && (
        <div 
          className="lg:hidden fixed inset-0 z-[-1] !bg-slate-900/10 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;