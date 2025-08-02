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
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className={`bg-gradient-to-br ${currentQuote.color} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 text-white shadow-2xl relative overflow-hidden transition-all duration-700 ease-in-out`}>
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-24 sm:translate-x-24 lg:-translate-y-32 lg:translate-x-32 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-12 -translate-x-12 sm:translate-y-16 sm:-translate-x-16 lg:translate-y-24 lg:-translate-x-24 transition-all duration-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/3 rounded-full -translate-x-8 -translate-y-8 sm:-translate-x-12 sm:-translate-y-12 lg:-translate-x-16 lg:-translate-y-16 transition-all duration-1000"></div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Photo & Quote Mark */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-4 lg:space-y-6">
              {/* Author Photo */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-white/20 transition-all duration-500 group-hover:ring-white/40">
                  <img
                    src={currentQuote.image}
                    alt={currentQuote.author}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Quote Mark Overlay */}
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 lg:-bottom-4 lg:-right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-serif text-white leading-none">"</div>
                </div>
              </div>

              {/* Author Info */}
              <div className="text-center lg:text-left">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">{currentQuote.author}</h3>
                <p className="text-white/80 text-sm lg:text-base">{currentQuote.title}</p>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto lg:mx-0 rounded-full mt-2 lg:mt-3"></div>
              </div>
            </div>

            {/* Quote Content */}
            <div className="lg:col-span-8 text-center lg:text-left">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 italic leading-tight transition-all duration-500">
                  "{currentQuote.quote}"
                </h2>
              </div>
              
              {/* Context Box */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 lg:mb-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider">Relevansi untuk UKM</span>
                </div>
                <p className="text-white/90 font-medium leading-relaxed text-sm sm:text-base lg:text-lg">
                  {currentQuote.context}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Arrows - Perfectly symmetrical positioning */}
      <div className="hidden lg:flex justify-between items-center absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none px-6">
        <button
          onClick={prevSlide}
          className="pointer-events-auto group relative overflow-hidden w-16 h-16 bg-gradient-to-br from-white/25 via-white/15 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:from-white/35 hover:via-white/25 hover:to-white/10 transition-all duration-500 shadow-2xl border-2 border-white/30 hover:border-white/50 hover:scale-105 hover:-translate-y-1 -translate-x-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="absolute inset-0.5 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-xl opacity-50"></div>
          <svg className="w-7 h-7 relative z-10 transition-all duration-500 group-hover:-translate-x-1 group-hover:scale-110 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/25 to-purple-400/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto group relative overflow-hidden w-16 h-16 bg-gradient-to-br from-white/25 via-white/15 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:from-white/35 hover:via-white/25 hover:to-white/10 transition-all duration-500 shadow-2xl border-2 border-white/30 hover:border-white/50 hover:scale-105 hover:-translate-y-1 translate-x-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="absolute inset-0.5 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-xl opacity-50"></div>
          <svg className="w-7 h-7 relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/25 to-pink-400/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
        </button>
      </div>

      {/* Mobile Navigation - Enhanced with glassmorphism and better touch targets */}
      <div className="flex lg:hidden justify-between items-center mt-6 px-2 sm:px-4">
        <button
          onClick={prevSlide}
          className="group relative overflow-hidden w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-white/25 via-white/15 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center text-gray-800 active:text-gray-900 transition-all duration-300 shadow-xl border-2 border-white/40 active:border-white/60 active:scale-95 touch-manipulation"
          style={{ minHeight: '56px', minWidth: '56px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/15 to-white/25 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-xl"></div>
          <div className="absolute inset-0.5 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-xl opacity-60"></div>
          <svg className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform duration-200 group-active:-translate-x-1 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-active:opacity-100 transition-opacity duration-200 blur-lg"></div>
        </button>

        <div className="flex space-x-2 sm:space-x-3 flex-1 justify-center max-w-xs mx-4">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-400 flex-shrink-0 relative overflow-hidden touch-manipulation ${
                index === currentSlide
                  ? 'w-12 h-4 sm:w-14 sm:h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg ring-2 ring-white/40'
                  : 'w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full active:from-gray-500 active:to-gray-600 shadow-md active:scale-90'
              }`}
              style={{ minHeight: '20px', minWidth: '16px' }}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse opacity-50"></div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="group relative overflow-hidden w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-white/25 via-white/15 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center text-gray-800 active:text-gray-900 transition-all duration-300 shadow-xl border-2 border-white/40 active:border-white/60 active:scale-95 touch-manipulation"
          style={{ minHeight: '56px', minWidth: '56px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/15 to-white/25 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-xl"></div>
          <div className="absolute inset-0.5 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-xl opacity-60"></div>
          <svg className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform duration-200 group-active:translate-x-1 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-active:opacity-100 transition-opacity duration-200 blur-lg"></div>
        </button>
      </div>

      {/* Desktop Dots Indicator - Premium glassmorphism design */}
      <div className="hidden lg:flex justify-center mt-10 space-x-4">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative overflow-hidden transition-all duration-500 ${
              index === currentSlide
                ? 'w-12 h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-xl ring-2 ring-indigo-300/50 ring-offset-2 ring-offset-white'
                : 'w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full hover:from-indigo-300 hover:to-purple-400 shadow-lg hover:shadow-xl hover:scale-125 hover:ring-2 hover:ring-indigo-200/50 hover:ring-offset-1 hover:ring-offset-white'
            }`}
          >
            {index === currentSlide && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-sm animate-pulse"></div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* Auto-play indicator - Luxury design */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-500 backdrop-blur-xl border shadow-xl hover:shadow-2xl hover:scale-105 ${
            isAutoPlaying 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200/50 hover:from-green-100 hover:to-emerald-100' 
              : 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border-gray-200/50 hover:from-gray-100 hover:to-slate-100'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
            isAutoPlaying ? 'from-green-400 to-emerald-400' : 'from-gray-400 to-slate-400'
          }`}></div>
          
          {isAutoPlaying ? (
            <>
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="relative z-10">Auto-play Aktif</span>
              <div className="w-1 h-1 bg-green-400 rounded-full opacity-60"></div>
            </>
          ) : (
            <>
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full relative">
                <div className="absolute inset-0.5 bg-gray-300 rounded-full"></div>
              </div>
              <span className="relative z-10">Auto-play Pause</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full opacity-60"></div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuotesSlider;