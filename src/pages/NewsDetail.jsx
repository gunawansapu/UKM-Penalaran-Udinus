import { Calendar, Eye, Clock, Tag, Instagram, TrendingUp } from 'lucide-react';
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

  // Function untuk navigasi ke berita lain
  const handleNewsClick = (newsId) => {
    setCurrentNews(null);
    navigate(`/berita/${newsId}`);
  };

  // Effect untuk load data berita Spesifik & Increment Views (Real-time)
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "news", id);
        
        // Update / Increment views secara real-time di Firestore
        await updateDoc(docRef, {
          views: increment(1)
        });

        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCurrentNews({ id: docSnap.id, ...docSnap.data() });
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

  // FUNGSI WAKTU RELATIF ALA IG / WA / TWITTER
  const formatRelativeTime = (dateVal) => {
    if (!dateVal) return 'Baru saja';
    
    let date;
    if (dateVal.toDate) {
      date = dateVal.toDate(); // Firestore Timestamp
    } else {
      date = new Date(dateVal); // String / Number
    }

    if (isNaN(date.getTime())) return 'Baru saja';

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
      return 'Baru saja';
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} menit yang lalu`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} jam yang lalu`;
    }
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} hari yang lalu`;
    }

    // Jika sudah lebih dari 7 hari, tampilkan format tanggal lengkap
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const newsImage = currentNews.imageUrl || currentNews.image;
  const newsDescription = currentNews.excerpt || currentNews.description;
  const newsContent = currentNews.content || currentNews.fullContent;
  const newsCategory = currentNews.category || 'Informasi';
  const newsDate = formatRelativeTime(currentNews.createdAt || currentNews.date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Main Article Content */}
          <div className="xl:col-span-3">
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="p-6 lg:p-8 pb-4">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-md">
                    {newsCategory}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{newsDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-red-500" />
                      <span className="font-bold text-gray-800">{currentNews.views?.toLocaleString() || '1'} Dilihat</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                  {currentNews.title}
                </h1>

                {/* Profil Penulis dengan Logo Resmi UKM Penalaran */}
                <div className="flex items-center gap-4 border-t border-b border-gray-200 py-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border border-gray-200 flex-shrink-0 bg-white flex items-center justify-center p-1">
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
                    <p className="text-sm text-gray-500 font-medium">Reporter</p>
                  </div>
                </div>
              </div>

              {/* Featured Image - Hybrid Proporsional */}
              {newsImage && (
                <div className="px-6 lg:px-8 mb-8">
                  <div className="relative group overflow-hidden rounded-xl bg-slate-900/5 flex justify-center">
                    <img
                      src={newsImage}
                      alt={currentNews.title}
                      className="w-full h-auto max-h-[800px] object-contain rounded-xl transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400/e5e7eb/9ca3af?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center font-medium">
                    Dokumentasi kegiatan UKM Penalaran UDINUS
                  </p>
                </div>
              )}

              {/* Article Content / Description */}
              <div className="px-6 lg:px-8 pb-8">
                {newsDescription && (
                  <div className="text-xl text-gray-700 mb-8 font-medium leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
                    {newsDescription}
                  </div>
                )}

                <div 
                  className="text-base text-gray-800 leading-relaxed space-y-6 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: newsContent || '<p class="text-gray-600 italic">Konten kosong.</p>' }}
                />

                {/* Tags */}
                {currentNews.tags && currentNews.tags.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-red-600" />
                      <h4 className="text-lg font-bold text-gray-900">Tags</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {currentNews.tags.map((tag, index) => (
                        <span key={index} className="px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 text-sm font-medium rounded-full cursor-pointer shadow-sm">
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
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Berita Lainnya</h3>
                </div>
                <div className="space-y-4">
                  {trendingNews.length > 0 ? (
                    trendingNews.map((news, index) => (
                      <div 
                        key={news.id} 
                        className="flex gap-4 cursor-pointer group hover:bg-gray-50 p-3 rounded-xl transition-all shadow-sm"
                        onClick={() => handleNewsClick(news.id)}
                      >
                        <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-600 line-clamp-2 leading-snug mb-2">
                            {news.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatRelativeTime(news.createdAt || news.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Tidak ada berita lain saat ini.</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                <a 
                  href="https://www.instagram.com/penalaranudinus/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl shadow-lg font-medium hover:opacity-95 transition"
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