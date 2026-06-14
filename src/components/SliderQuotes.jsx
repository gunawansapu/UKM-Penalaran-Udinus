import { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
    },
    {
      id: 2,
      quote: "Satu-satunya sumber pengetahuan sejati adalah pengalaman",
      author: "Albert Einstein",
      title: "Fisikawan Teoretis",
      image: "https://harianmuba.bacakoran.co/upload/5cb1db2aed89a872065ae7092e7c84e9.jpg",
      context: "Mengingatkan kita bahwa pembelajaran aktif dan praktik langsung adalah kunci penguasaan ilmu",
    },
    {
      id: 3,
      quote: "Keraguan adalah awal dari kebijaksanaan",
      author: "Aristoteles",
      title: "Filosof dan Ilmuwan Yunani",
      image: "https://www.shutterstock.com/image-vector/aristotle-greek-philosopher-polymath-classical-600nw-2439473963.jpg",
      context: "Mengajarkan pentingnya sikap kritis dan mempertanyakan segala sesuatu dalam proses pembelajaran",
    },
    {
      id: 4,
      quote: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia",
      author: "Nelson Mandela",
      title: "Pemimpin Anti-Apartheid",
      image: "https://www.willy-brandt-biography.com/wp-content/uploads/2015/10/3690_Mandela_1024x768-456x500.jpg",
      context: "Motivasi bagi mahasiswa untuk menggunakan ilmu pengetahuan sebagai alat perubahan positif",
    },
    {
      id: 5,
      quote: "Belajar tanpa berpikir itu sia-sia, berpikir tanpa belajar itu berbahaya",
      author: "Konfusius",
      title: "Filosof Tiongkok",
      image: "https://khonghucu.kemenag.go.id/storage/posts/big/1727682828.jpg",
      context: "Menekankan keseimbangan antara pembelajaran dan refleksi dalam pengembangan intelektual",
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, quotes.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % quotes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + quotes.length) % quotes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const currentQuote = quotes[currentSlide];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-sans mb-20">
      
      {/* Header Judul */}
      <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
           𝓘𝓷𝓼𝓹𝓲𝓻𝓪𝓼𝓲 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">𝓟𝓮𝓷𝓪𝓵𝓪𝓻𝓪𝓷</span>
          </h2>
      </div>

      {/* Main Glassmorphism Container */}
      <div 
        className="relative bg-white/70 backdrop-blur-2xl border border-white rounded-[2.5rem] p-6 sm:p-10 md:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-700 min-h-[450px] flex items-center justify-center group"
        data-aos="zoom-in"
      >
        
        {/* Subtle Background Glow (Warna-warni pastel halus) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3 transition-all duration-1000 group-hover:bg-indigo-200/50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/60 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3 transition-all duration-1000 group-hover:bg-purple-200/50"></div>
        
        <Quote className="absolute top-8 left-8 w-24 h-24 text-slate-100/50 -rotate-12 -z-10" />

        <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          
          {/* FOTO TOKOH (Kiri) */}
          <div className="flex-shrink-0 relative">
            <div className="w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-2xl ring-4 ring-white border border-slate-100 transition-all duration-700 ease-in-out">
              <img
                src={currentQuote.image}
                alt={currentQuote.author}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000 grayscale-[20%] hover:grayscale-0"
              />
            </div>
          </div>

          {/* QUOTE CONTENT (Kanan) */}
          <div className="flex-1 text-center md:text-left">
            {/* Teks Kutipan */}
            <h3 key={`quote-${currentSlide}`} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 leading-tight mb-6 animate-in slide-in-from-right-8 fade-in duration-700">
              "{currentQuote.quote}"
            </h3>
            
            {/* Author Info */}
            <div key={`author-${currentSlide}`} className="mb-6 animate-in slide-in-from-right-8 fade-in duration-700 delay-100">
              <h4 className="text-xl font-bold text-slate-900">{currentQuote.author}</h4>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mt-1">{currentQuote.title}</p>
            </div>

            {/* Context Box */}
            <div key={`context-${currentSlide}`} className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 shadow-sm animate-in slide-in-from-right-8 fade-in duration-700 delay-200">
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                <span className="font-bold text-indigo-700">Relevansi: </span> {currentQuote.context}
              </p>
            </div>
          </div>

        </div>

        {/* Absolute Navigation Buttons (Kanan & Kiri) - Tampil di Desktop */}
        <div className="hidden md:flex justify-between items-center absolute inset-x-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={prevSlide}
            // OVERRIDE PAKSA (!bg-white, !text-indigo-600, dll)
            className="!w-12 !h-12 !bg-white/90 backdrop-blur-md !border !border-slate-200 !text-indigo-600 !rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:!bg-indigo-50 transition-all duration-300 outline-none"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            // OVERRIDE PAKSA
            className="!w-12 !h-12 !bg-white/90 backdrop-blur-md !border !border-slate-200 !text-indigo-600 !rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:!bg-indigo-50 transition-all duration-300 outline-none"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </div>

      </div>

      {/* --- KONTROL BAWAH (Dots & Autoplay) --- */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8" data-aos="fade-up" data-aos-delay="200">
        
        {/* Play/Pause Button (Override Global CSS) */}
        <button
          type="button"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center gap-2 !px-5 !py-2.5 !rounded-full !bg-white !border !border-slate-200 shadow-sm !text-indigo-600 hover:!bg-indigo-50 transition-all duration-300 active:scale-95 text-sm font-bold outline-none"
        >
          {isAutoPlaying ? <Pause size={18} strokeWidth={2.5} /> : <Play size={18} strokeWidth={2.5} />}
          {isAutoPlaying ? "Pause" : "Play"}
        </button>

        {/* Pagination Dots (Override Global CSS) */}
        <div className="flex items-center gap-3 !bg-white !border !border-slate-200 shadow-sm px-5 py-3 !rounded-full">
          {quotes.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 !rounded-full outline-none ${
                index === currentSlide
                  ? '!w-8 !h-2.5 !bg-gradient-to-r !from-indigo-600 !to-purple-600 shadow-md scale-110'
                  : '!w-2.5 !h-2.5 !bg-slate-300 hover:!bg-indigo-400 hover:scale-125'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter Mobile */}
        <div className="sm:hidden text-xs font-bold text-slate-500 tracking-widest uppercase bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
          {currentSlide + 1} / {quotes.length}
        </div>

      </div>
    </div>
  );
};

export default QuotesSlider;