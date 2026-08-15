import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Calendar, ArrowRight, Search, Newspaper } from 'lucide-react';
// IMPORT FIREBASE
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const News = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['Semua']);

  // FETCH DATA DARI FIREBASE & EKSTRAK KATEGORI SECARA OTOMATIS
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          category: doc.data().category && doc.data().category.trim() !== '' ? doc.data().category.trim() : 'Informasi'
        }));
        
        // Urutkan berdasarkan tanggal terbaru
        dataList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setNewsList(dataList);

        // OTOMATIS MENGAMBIL SEMUA KATEGORI UNIK DARI DATABASE
        const uniqueCategories = [
          'Semua', 
          ...new Set(
            dataList
              .map(news => news.category?.trim())
              .filter(cat => cat && cat !== '')
          )
        ];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching news: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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

  const filteredNews = newsList.filter(news => {
    const matchesCategory = selectedCategory === 'Semua' || news.category === selectedCategory;
    const matchesSearch = news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-[#f8fafc] py-24 px-6 relative overflow-hidden" style={{colorScheme: 'light'}}>
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 !bg-indigo-50 !text-indigo-600 rounded-full text-sm font-bold mb-4 border !border-indigo-100 shadow-sm">
            <Newspaper size={16} className="mr-2" /> Berita Terkini
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Informasi</span>
          </h1>
        </div>

        {/* Filter & Search Bento Bar (Tombol Kategori Muncul Otomatis Sesuai Postingan) */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-4 shadow-lg border border-white mb-12 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 !text-slate-400" size={20} />
                <input 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl !bg-slate-50 border !border-slate-200 focus:!ring-4 focus:!ring-indigo-500/20 focus:outline-none font-medium !text-slate-900"
                    placeholder="Cari judul berita..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border-0 ${selectedCategory === cat ? '!bg-slate-900 !text-white shadow-lg' : '!bg-slate-100 !text-slate-600 hover:!bg-slate-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {loading ? (
            <div className="text-center py-20 text-slate-500 font-medium animate-pulse">
                Mengambil data berita terbaru...
            </div>
        ) : (
            <>
                {/* Bento News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map((news) => (
                        <article key={news.id} className="group bento-card !bg-white rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border !border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="relative h-64 rounded-[1.5rem] overflow-hidden mb-6">
                                <img src={news.imageUrl || news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                                <div className="absolute top-4 left-4 !bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold !text-indigo-600 border !border-white">{news.category}</div>
                            </div>
                            <div className="px-3 pb-3">
                                <div className="flex items-center !text-slate-400 text-sm mb-3">
                                    <Calendar size={14} className="mr-2" /> {formatRelativeTime(news.createdAt || news.date)}
                                </div>
                                <h3 className="text-xl font-black !text-slate-900 mb-3 leading-snug group-hover:!text-indigo-600 transition-colors line-clamp-2">{news.title}</h3>
                                <p className="!text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{news.description}</p>
                                
                                <button 
                                    onClick={() => navigate(`/news/${news.id}`)}
                                    className="group/btn border-0 w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl !bg-slate-50 hover:!bg-indigo-600 transition-all duration-300"
                                >
                                    <span className="font-bold !text-indigo-600 group-hover/btn:!text-white transition-colors duration-300">Detail Berita</span>
                                    <ArrowRight className="!text-indigo-600 group-hover/btn:!text-white transition-colors" size={18} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
                
                {filteredNews.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        Tidak ada berita ditemukan.
                    </div>
                )}
            </>
        )}

      </div>
    </section>
  );
};

export default News;