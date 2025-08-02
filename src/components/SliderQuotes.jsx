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
    <div className="relative">
      <div className={`bg-gradient-to-br ${currentQuote.color} rounded-3xl p-8 md:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden transition-all duration-700 ease-in-out`}>
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 transition-all duration-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/3 rounded-full -translate-x-16 -translate-y-16 transition-all duration-1000"></div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Photo & Quote Mark */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
              {/* Author Photo */}
              <div className="relative group">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20 transition-all duration-500 group-hover:ring-white/40">
                  <img
                    src={currentQuote.image}
                    alt={currentQuote.author}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Quote Mark Overlay */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-2xl font-serif text-white leading-none">"</div>
                </div>
              </div>

              {/* Author Info */}
              <div className="text-center lg:text-left">
                <h3 className="text-xl lg:text-2xl font-bold mb-1">{currentQuote.author}</h3>
                <p className="text-white/80 text-sm lg:text-base">{currentQuote.title}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto lg:mx-0 rounded-full mt-3"></div>
              </div>
            </div>

            {/* Quote Content */}
            <div className="lg:col-span-8 text-center lg:text-left">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 italic leading-tight transition-all duration-500">
                  "{currentQuote.quote}"
                </h2>
              </div>
              
              {/* Context Box */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">Relevansi untuk UKM</span>
                </div>
                <p className="text-white/90 font-medium leading-relaxed text-lg">
                  {currentQuote.context}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
        <button
          onClick={prevSlide}
          className="hidden lg:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden lg:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation - Diperbaiki dengan background yang lebih kontras */}
      <div className="flex lg:hidden justify-between items-center mt-6 px-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-700/90 transition-all duration-300 shadow-lg border border-gray-600/50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex space-x-3">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg'
                  : 'w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-500 shadow-md'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-700/90 transition-all duration-300 shadow-lg border border-gray-600/50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Desktop Dots Indicator - Diperbaiki dengan warna yang lebih kontras */}
      <div className="hidden lg:flex justify-center mt-8 space-x-3">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-10 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg'
                : 'w-4 h-4 bg-gray-400 rounded-full hover:bg-gray-500 shadow-md'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator - Smaller on mobile */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`flex items-center space-x-2 px-3 py-2 lg:px-4 rounded-full text-xs lg:text-sm transition-all duration-300 ${
            isAutoPlaying 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isAutoPlaying ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Auto-play aktif</span>
              <span className="sm:hidden">Auto</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="hidden sm:inline">Auto-play pause</span>
              <span className="sm:hidden">Pause</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuotesSlider;