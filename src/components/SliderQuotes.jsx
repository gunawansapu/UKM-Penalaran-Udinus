import { useState, useEffect } from 'react';

const QuotesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const quotes = [
    {
      id: 1,
      quote: "Berpikir adalah dialog jiwa dengan dirinya sendiri",
      author: "Plato",
      title: "Filosof Yunani Kuno",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg",
      context: "Inspirasi yang mendasari setiap kegiatan UKM Penalaran UDINUS dalam mengembangkan kemampuan berpikir kritis",
      color: "from-indigo-500 via-purple-600 to-blue-700"
    },
    {
      id: 2,
      quote: "Satu-satunya sumber pengetahuan sejati adalah pengalaman",
      author: "Albert Einstein",
      title: "Fisikawan Teoretis",
      image: "https://harianmuba.bacakoran.co/upload/5cb1db2aed89a872065ae7092e7c84e9.jpg",
      context: "Mengingatkan kita bahwa pembelajaran aktif dan praktik langsung adalah kunci penguasaan ilmu",
      color: "from-blue-500 via-indigo-600 to-purple-700"
    },
    {
      id: 3,
      quote: "Keraguan adalah awal dari kebijaksanaan",
      author: "Aristoteles",
      title: "Filosof dan Ilmuwan Yunani",
      image: "https://www.shutterstock.com/image-vector/aristotle-greek-philosopher-polymath-classical-600nw-2439473963.jpg",
      context: "Mengajarkan pentingnya sikap kritis dan mempertanyakan segala sesuatu dalam proses pembelajaran",
      color: "from-purple-500 via-pink-600 to-red-700"
    },
    {
      id: 4,
      quote: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia",
      author: "Nelson Mandela",
      title: "Pemimpin Anti-Apartheid",
      image: "https://www.willy-brandt-biography.com/wp-content/uploads/2015/10/3690_Mandela_1024x768-456x500.jpg",
      context: "Motivasi bagi mahasiswa untuk menggunakan ilmu pengetahuan sebagai alat perubahan positif",
      color: "from-green-500 via-teal-600 to-blue-700"
    },
    {
      id: 5,
      quote: "Belajar tanpa berpikir itu sia-sia, berpikir tanpa belajar itu berbahaya",
      author: "Konfusius",
      title: "Filosof Tiongkok",
      image: "https://khonghucu.kemenag.go.id/storage/posts/big/1727682828.jpg",
      context: "Menekankan keseimbangan antara pembelajaran dan refleksi dalam pengembangan intelektual",
      color: "from-orange-500 via-red-600 to-pink-700"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, quotes.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % quotes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + quotes.length) % quotes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentQuote = quotes[currentSlide];

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-2 sm:px-4" 
      style={{ 
        colorScheme: 'light',
        isolation: 'isolate'
      }}
    >
      <div className={`bg-gradient-to-br ${currentQuote.color} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 text-white shadow-2xl relative overflow-hidden transition-all duration-700 ease-in-out`}>
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-24 sm:translate-x-24 lg:-translate-y-32 lg:translate-x-32 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-12 -translate-x-12 sm:translate-y-16 sm:-translate-x-16 lg:translate-y-24 lg:-translate-x-24 transition-all duration-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/3 rounded-full -translate-x-8 -translate-y-8 sm:-translate-x-12 sm:-translate-y-12 lg:-translate-x-16 lg:-translate-y-16 transition-all duration-1000"></div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {/* Author Info Header - Mobile */}
            <div className="flex items-center space-x-3 mb-4">
              {/* Author Photo - Smaller for mobile */}
              <div className="relative group flex-shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-xl ring-2 ring-white/30 transition-all duration-500">
                  <img
                    src={currentQuote.image}
                    alt={currentQuote.author}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                {/* Quote Mark Overlay - Smaller */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                  <div className="text-xs font-serif text-white leading-none">"</div>
                </div>
              </div>

              {/* Author Info - Horizontal layout */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold mb-1 truncate">{currentQuote.author}</h3>
                <p className="text-white/80 text-sm truncate">{currentQuote.title}</p>
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mt-2"></div>
              </div>
            </div>

            {/* Quote Content - Mobile */}
            <div className="text-center">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-4 italic leading-tight">
                  "{currentQuote.quote}"
                </h2>
              </div>
              
              {/* Context Box - Mobile */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">Relevansi untuk UKM</span>
                </div>
                <p className="text-white/90 font-medium leading-relaxed text-sm text-left">
                  {currentQuote.context}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Photo & Quote Mark */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Author Photo */}
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl ring-1 sm:ring-2 lg:ring-4 ring-white/20 transition-all duration-500 group-hover:ring-white/40">
                  <img
                    src={currentQuote.image}
                    alt={currentQuote.author}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Quote Mark Overlay */}
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 lg:-bottom-4 lg:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-sm sm:text-lg lg:text-2xl font-serif text-white leading-none">"</div>
                </div>
              </div>

              {/* Author Info */}
              <div className="text-center lg:text-left">
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold mb-1">{currentQuote.author}</h3>
                <p className="text-white/80 text-xs sm:text-sm lg:text-base">{currentQuote.title}</p>
                <div className="w-10 sm:w-12 lg:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto lg:mx-0 rounded-full mt-1 sm:mt-2 lg:mt-3"></div>
              </div>
            </div>

            {/* Quote Content */}
            <div className="lg:col-span-8 text-center lg:text-left">
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 italic leading-tight transition-all duration-500">
                  "{currentQuote.quote}"
                </h2>
              </div>
              
              {/* Context Box */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-8 border border-white/20">
                <div className="flex items-center space-x-2 mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-xs lg:text-sm font-semibold text-white/90 uppercase tracking-wider">Relevansi untuk UKM</span>
                </div>
                <p className="text-white/90 font-medium leading-relaxed text-xs sm:text-sm lg:text-lg">
                  {currentQuote.context}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Outside card */}
      <div className="hidden lg:flex justify-between items-center absolute top-1/2 -translate-y-1/2 -left-20 -right-20 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto group relative overflow-hidden w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            color: '#000000'
          }}
        >
          <svg className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto group relative overflow-hidden w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            color: '#000000'
          }}
        >
          <svg className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation - Improved responsive layout */}
      <div className="block lg:hidden mt-3 sm:mt-4">
        {/* Navigation buttons and dots on mobile */}
        <div className="flex items-center justify-between px-1 gap-2">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="group relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(0, 0, 0, 0.08)',
              color: '#1f2937'
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>

          {/* Dots Container - Centered and responsive */}
          <div className="flex-1 flex justify-center items-center px-2">
            <div className="flex space-x-2 sm:space-x-3 items-center max-w-xs overflow-x-auto scrollbar-hide">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 flex-shrink-0 shadow-sm hover:shadow-md active:scale-90 ${
                    index === currentSlide
                      ? 'w-8 h-3 sm:w-10 sm:h-4 rounded-full scale-110'
                      : 'w-3 h-3 sm:w-4 sm:h-4 rounded-full hover:scale-125'
                  }`}
                  style={
                    index === currentSlide
                      ? {
                          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                          border: '2px solid rgba(255, 255, 255, 0.9)'
                        }
                      : {
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(4px)'
                        }
                  }
                >
                  {index === currentSlide && (
                    <div 
                      className="absolute inset-0 rounded-full animate-pulse opacity-40"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                    ></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="group relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(0, 0, 0, 0.08)',
              color: '#1f2937'
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Slide counter for mobile */}
        <div className="flex justify-center mt-2 sm:mt-3">
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#4b5563',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            {currentSlide + 1} / {quotes.length}
          </div>
        </div>
      </div>

      {/* Desktop Dots Indicator - Fixed with solid colors */}
      <div className="hidden lg:flex justify-center mt-10 space-x-4">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative overflow-hidden transition-all duration-500 shadow-lg hover:scale-125 ${
              index === currentSlide
                ? 'w-12 h-4 rounded-full'
                : 'w-4 h-4 rounded-full'
            }`}
            style={
              index === currentSlide
                ? {
                    background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
                  }
                : {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.6)'
                  }
            }
          >
            {index === currentSlide && (
              <>
                <div 
                  className="absolute inset-0 rounded-full animate-pulse opacity-60"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                ></div>
                <div 
                  className="absolute -inset-1 rounded-full opacity-20 blur-sm animate-pulse"
                  style={{ backgroundColor: 'rgba(99, 102, 241, 0.5)' }}
                ></div>
              </>
            )}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            ></div>
          </button>
        ))}
      </div>

      {/* Auto-play indicator - Fixed with solid background */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`group relative overflow-hidden flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 border active:scale-95`}
          style={
            isAutoPlaying 
              ? {
                  backgroundColor: 'rgba(240, 253, 244, 0.95)',
                  color: '#047857',
                  borderColor: 'rgba(34, 197, 94, 0.3)'
                }
              : {
                  backgroundColor: 'rgba(249, 250, 251, 0.95)',
                  color: '#4b5563',
                  borderColor: 'rgba(156, 163, 175, 0.3)'
                }
          }
        >
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            style={{ 
              backgroundColor: isAutoPlaying ? '#10b981' : '#6b7280'
            }}
          ></div>
          
          {isAutoPlaying ? (
            <>
              <div className="relative">
                <div 
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                  style={{ backgroundColor: '#10b981' }}
                ></div>
                <div 
                  className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: '#34d399' }}
                ></div>
              </div>
              <span className="relative z-10">Auto-play Aktif</span>
            </>
          ) : (
            <>
              <div 
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full relative"
                style={{ backgroundColor: '#9ca3af' }}
              >
                <div 
                  className="absolute inset-0.5 rounded-full"
                  style={{ backgroundColor: '#d1d5db' }}
                ></div>
              </div>
              <span className="relative z-10">Auto-play Pause</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuotesSlider;