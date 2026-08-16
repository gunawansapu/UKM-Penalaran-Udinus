import { Calendar, Eye, Clock, Tag, Instagram, TrendingUp, Type, AlignJustify, Check, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// IMPORT FIREBASE
import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs, updateDoc, increment } from 'firebase/firestore';

const DetailNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentNews, setCurrentNews] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATE FITUR KENYAMANAN BACA ---
  const [fontSize, setFontSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [lineHeight, setLineHeight] = useState('relaxed'); // 'normal' | 'relaxed' | 'loose'
  const [readingTime, setReadingTime] = useState(1);
  const [copied, setCopied] = useState(false);

  // Function untuk navigasi ke berita lain
  const handleNewsClick = (newsId) => {
    setCurrentNews(null);
    navigate(`/berita/${newsId}`);
  };

  // Effect untuk load data berita Spesifik & Hitung Waktu Baca
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "news", id);
        
        await updateDoc(docRef, {
          views: increment(1)
        });

        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentNews({ id: docSnap.id, ...data });

          // Hitung estimasi waktu baca (rata-rata 200 kata per menit)
          const textContent = (data.content || data.fullContent || '') + ' ' + (data.description || '');
          const wordCount = textContent.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
          const calculatedTime = Math.ceil(wordCount / 200);
          setReadingTime(calculatedTime < 1 ? 1 : calculatedTime);

        } else {
          setCurrentNews(null);
        }
      } catch (error) {
        console.error("Error fetching news detail: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  // Effect untuk load Berita Trending di Sidebar
  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const trending = dataList
          .filter(news => news.id !== id)
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 4);
          
        setTrendingNews(trending);
      } catch (error) {
        console.error("Error fetching trending news: ", error);
      }
    };

    fetchTrendingNews();
  }, [id]);

  // --- FUNGSI COPY LINK ---
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin w-12 h-12 border-3 border-red-600 border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg font-medium">Memuat berita...</p>
        </div>
      </div>
    );
  }

  if (!currentNews) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-sm w-full mx-4">
          <h3 className="text-lg font-bold text-slate-900">Berita tidak ditemukan</h3>
          <Link to="/berita" className="text-red-600 font-semibold mt-4 block hover:underline">
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    );
  }

  // FUNGSI WAKTU RELATIF
  const formatRelativeTime = (dateVal) => {
    if (!dateVal) return 'Baru saja';
    let date;
    if (dateVal.toDate) {
      date = dateVal.toDate();
    } else {
      date = new Date(dateVal);
    }
    if (isNaN(date.getTime())) return 'Baru saja';

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Baru saja';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} hari yang lalu`;

    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const newsImage = currentNews.imageUrl || currentNews.image;
  const newsDescription = currentNews.excerpt || currentNews.description;
  const newsContent = currentNews.content || currentNews.fullContent;
  const newsCategory = currentNews.category || 'Informasi';
  const newsDate = formatRelativeTime(currentNews.createdAt || currentNews.date);

  const fontSizeClasses = {
    small: 'text-[0.95rem]',
    normal: 'text-[1.1rem]',
    large: 'text-[1.25rem]'
  };

  const lineHeightClasses = {
    normal: 'leading-[1.6]',
    relaxed: 'leading-[2]',
    loose: 'leading-[2.5]'
  };

  return (
    // 👇 SPASI ATAS DIPERKETAT: pt-16 (mobile) & md:pt-28 (desktop) agar tidak ada jarak kosong besar
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-16 sm:pt-20 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* ================= FLOATING SHARE BUTTONS (Desktop Only) ================= */}
        <div className="hidden xl:flex flex-col gap-3 fixed left-8 top-1/3 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center mb-1">Share</span>
          
          {/* Tombol WhatsApp */}
          <a 
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentNews.title + ' - ' + window.location.href)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#25D366',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)',
              transition: 'transform 0.2s'
            }}
            title="Bagikan ke WhatsApp"
          >
            <svg style={{ width: '22px', height: '22px', fill: '#ffffff' }} viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>

          {/* Tombol Salin Tautan */}
          <div 
            role="button"
            tabIndex={0}
            onClick={handleCopyLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              cursor: 'pointer',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
            title="Salin Tautan"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <svg style={{ width: '20px', height: '20px', fill: 'none', stroke: '#475569' }} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Main Article Content */}
          <div className="xl:col-span-3">
            <article className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <div className="p-6 lg:p-10 pb-4">
                
                {/* Kategori & Meta Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-md">
                    {newsCategory}
                  </span>

                  <div className="flex items-center text-gray-500 text-sm gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{newsDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span className="font-semibold text-indigo-600">~{readingTime} min baca</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-red-500" />
                      <span className="font-bold text-gray-800">{currentNews.views?.toLocaleString() || '1'} Dilihat</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                  {currentNews.title}
                </h1>

                {/* ================= MOBILE SHARE BAR (Teks WA putih, Salin Link aman inline style) ================= */}
                <div className="flex xl:hidden items-center justify-between bg-slate-50 border border-slate-200/60 rounded-2xl p-3 mb-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-indigo-500" /> BAGIKAN:
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Tombol WhatsApp Mobile dengan teks putih mutlak */}
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentNews.title + ' - ' + window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        backgroundColor: '#25D366',
                        color: '#ffffff',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: '0 2px 5px rgba(37, 211, 102, 0.2)'
                      }}
                    >
                      <svg style={{ width: '14px', height: '14px', fill: '#ffffff' }} viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span style={{ color: '#ffffff' }}>WhatsApp</span>
                    </a>

                    {/* Tombol Salin Link Mobile dengan warna gelap kebal CSS global */}
                    <button 
                      onClick={handleCopyLink}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(15, 23, 42, 0.2)'
                      }}
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Tag className="w-3.5 h-3.5 text-white" />}
                      <span style={{ color: '#ffffff' }}>{copied ? 'Tersalin!' : 'Salin Link'}</span>
                    </button>
                  </div>
                </div>

                {/* ================= BAR KONTROL (Ukuran Huruf & Spasi) ================= */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-end gap-4">
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    
                    {/* Kontrol Ukuran Font */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
                      <Type className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
                      <span className="text-xs font-bold text-slate-500 mr-2">Huruf:</span>
                      
                      <div 
                        role="button"
                        tabIndex={0}
                        onClick={() => setFontSize('small')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          backgroundColor: fontSize === 'small' ? '#0f172a' : 'transparent',
                          color: fontSize === 'small' ? '#ffffff' : '#475569',
                          userSelect: 'none'
                        }}
                      >
                        A-
                      </div>
                      
                      <div 
                        role="button"
                        tabIndex={0}
                        onClick={() => setFontSize('normal')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          backgroundColor: fontSize === 'normal' ? '#0f172a' : 'transparent',
                          color: fontSize === 'normal' ? '#ffffff' : '#475569',
                          userSelect: 'none'
                        }}
                      >
                        Norm
                      </div>
                      
                      <div 
                        role="button"
                        tabIndex={0}
                        onClick={() => setFontSize('large')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          backgroundColor: fontSize === 'large' ? '#0f172a' : 'transparent',
                          color: fontSize === 'large' ? '#ffffff' : '#475569',
                          userSelect: 'none'
                        }}
                      >
                        A+
                      </div>
                    </div>

                    {/* Kontrol Jarak Spasi Baris */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
                      <AlignJustify className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
                      <span className="text-xs font-bold text-slate-500 mr-2">Spasi:</span>
                      
                      <div 
                        role="button"
                        tabIndex={0}
                        onClick={() => setLineHeight('normal')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          backgroundColor: lineHeight === 'normal' ? '#0f172a' : 'transparent',
                          color: lineHeight === 'normal' ? '#ffffff' : '#475569',
                          userSelect: 'none'
                        }}
                      >
                        Rapat
                      </div>
                      
                      <div 
                        role="button"
                        tabIndex={0}
                        onClick={() => setLineHeight('relaxed')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          backgroundColor: lineHeight === 'relaxed' ? '#0f172a' : 'transparent',
                          color: lineHeight === 'relaxed' ? '#ffffff' : '#475569',
                          userSelect: 'none'
                        }}
                      >
                        Norm
                      </div>
                      
                      <div 
                        role="button"
                        tabIndex={0}
                        onClick={() => setLineHeight('loose')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          backgroundColor: lineHeight === 'loose' ? '#0f172a' : 'transparent',
                          color: lineHeight === 'loose' ? '#ffffff' : '#475569',
                          userSelect: 'none'
                        }}
                      >
                        Longgar
                      </div>
                    </div>

                  </div>

                </div>

                {/* Profil Penulis */}
                <div className="flex items-center gap-4 border-t border-b border-slate-100 py-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border border-slate-200 flex-shrink-0 bg-white flex items-center justify-center p-1">
                    <img
                      src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png"
                      alt="Logo UKM Penalaran"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://ui-avatars.com/api/?name=Penalaran+Udinus&background=dc2626&color=fff&bold=true";
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{currentNews.author || 'Admin UKM Penalaran'}</p>
                    <p className="text-sm text-gray-500 font-medium">Reporter UKM Penalaran</p>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {newsImage && (
                <div className="px-6 lg:px-10 mb-8">
                  <div className="relative group overflow-hidden rounded-2xl bg-slate-900/5 flex justify-center shadow-sm">
                    <img
                      src={newsImage}
                      alt={currentNews.title}
                      className="w-full h-auto max-h-[600px] object-cover rounded-2xl transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400/e5e7eb/9ca3af?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate-400 mt-3 text-center font-medium italic">
                    Dokumentasi resmi UKM Penalaran UDINUS
                  </p>
                </div>
              )}

              {/* Article Content / Description */}
              <div className="px-6 lg:px-10 pb-12">
                {newsDescription && (
                  <div className="text-xl text-gray-700 mb-10 font-medium leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border-l-4 border-red-500 shadow-sm">
                    {newsDescription}
                  </div>
                )}

                {/* Konten Utama */}
                <div 
                  className={`text-gray-800 text-justify whitespace-pre-line max-w-none transition-all duration-300 ${fontSizeClasses[fontSize]} ${lineHeightClasses[lineHeight]}`}
                  dangerouslySetInnerHTML={{ __html: newsContent || '<p class="text-gray-600 italic">Konten kosong.</p>' }}
                />

                {/* Tags */}
                {currentNews.tags && currentNews.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-red-600" />
                      <h4 className="text-lg font-bold text-gray-900">Tags Terkait</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {currentNews.tags.map((tag, index) => (
                        <span key={index} className="px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 text-sm font-medium rounded-xl cursor-pointer shadow-sm transition">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Berita Lainnya */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Berita Lainnya</h3>
                </div>
                <div className="space-y-4">
                  {trendingNews.length > 0 ? (
                    trendingNews.map((news, index) => (
                      <div 
                        key={news.id} 
                        className="flex gap-4 cursor-pointer group hover:bg-slate-50 p-3 rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                        onClick={() => handleNewsClick(news.id)}
                      >
                        <div className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-600 line-clamp-2 leading-snug mb-2">
                            {news.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>{formatRelativeTime(news.createdAt || news.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">Tidak ada berita lain saat ini.</p>
                  )}
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                <a 
                  href="https://www.instagram.com/penalaranudinus/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl shadow-lg font-medium hover:opacity-95 transition"
                >
                  <Instagram className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">Instagram</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailNews;