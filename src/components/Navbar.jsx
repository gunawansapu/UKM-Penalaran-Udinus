import { useState, useEffect } from 'react';
import { Menu, X, Brain, Lightbulb, Users,  Newspaper, Phone, GalleryVerticalEnd, HelpCircle } from 'lucide-react';
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

  const navItems = [
    { label: 'Beranda', to: '/', icon: <Users size={16} /> },
    { label: 'Tentang', to: '/tentang', icon: <Brain size={16} /> },
    { label: 'Kegiatan', to: '/kegiatan', icon: <Lightbulb size={16} /> },
    { label: 'Berita', to: '/berita', icon:<Newspaper size={16} />},
    { label: 'Galeri', to: '/galeri', icon:<GalleryVerticalEnd size={16} /> },
    { label: 'Kontak', to: '/kontak', icon:<Phone size={16} />},
    { label: 'Kuis', to: '/kuis',  icon:<HelpCircle size={16} /> },
  ];

  const handleMobileNavClick = () => {
    setOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'shadow-lg border-b' 
          : 'shadow-md'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.90)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
        borderBottomColor: scrolled ? '#f3f4f6' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
             <div className="w-10 h-10 rounded-xl flex items-center justify-center">
  <img
    src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png"
    alt="Logo Brain"
    className="w-full h-full object-contain"
  />
</div>

              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                UKM Penalaran
              </h1>
              <p className="text-xs font-medium" style={{ color: '#374151' }}>UDINUS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ label, to, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => 
                  `relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' 
                      : 'hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? '#ffffff' : '#1f2937'
                })}
              >
                {({ isActive }) => (
                  <>
                    {icon && (
                      <span 
                        className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                        style={{ color: isActive ? '#ffffff' : '#1f2937' }}
                      >
                        {icon}
                      </span>
                    )}
                    <span 
                      className="font-semibold transition-colors duration-300"
                      style={{ color: isActive ? '#ffffff' : '#1f2937' }}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button - Fixed untuk tidak terpengaruh dark mode */}
          <button
            className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-1 border"
            onClick={() => setOpen(!open)}
            style={{ 
              backgroundColor: open ? '#e0e7ff' : '#eef2ff',
              borderColor: '#c7d2fe',
              focusRingColor: '#4338ca'
            }}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Menu 
                size={18} 
                className={`absolute transition-all duration-300 ${
                  open ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
                style={{ color: '#4338ca' }}
              />
              <X 
                size={18} 
                className={`absolute transition-all duration-300 ${
                  open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
                }`}
                style={{ color: '#4338ca' }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 space-y-2">
            {navItems.map(({ label, to, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg transform scale-105' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-indigo-600 hover:to-purple-600 hover:transform hover:scale-105 hover:shadow-md'
                  }`
                }
                style={{ color: '#ffffff' }}
              >
                {({ isActive }) => (
                  <>
                    {icon && (
                      <span className="flex-shrink-0" style={{ color: '#ffffff' }}>
                        {icon}
                      </span>
                    )}
                    <span className="text-left" style={{ color: '#ffffff' }}>
                      {label}
                    </span>
                    <div className="flex-1"></div>
                    <div 
                      className={`w-2 h-2 rounded-full transition-colors duration-300`}
                      style={{ 
                        backgroundColor: '#ffffff', 
                        opacity: isActive ? 0.7 : 0.4 
                      }}
                    ></div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div 
          className="lg:hidden fixed inset-0 backdrop-blur-sm z-[-1]"
          onClick={() => setOpen(false)}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        ></div>
      )}
    </header>
  );
};

export default Navbar;