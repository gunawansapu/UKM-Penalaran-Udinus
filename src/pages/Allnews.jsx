import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Eye, Search, ChevronRight, Tag
} from 'lucide-react';

// IMPORT FIREBASE
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const AllNews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('terbaru');
  const [newsDataList, setNewsDataList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState(['Semua']);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem('previousPage', '/semua-berita');
    const fetchAllNews = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNewsDataList(dataList);
      } catch (error) {
        console.error("Error fetching all news: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  useEffect(() => {
    if (newsDataList.length === 0) return;
    const uniqueCategories = ['Semua', ...new Set(newsDataList.map(news => news.category))];
    setCategories(uniqueCategories);
    
    let filtered = [...newsDataList];
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(news =>
        news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    filtered = filtered.sort((a, b) => {
      if (sortBy === 'terbaru') return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
      if (sortBy === 'populer') return (b.views || 0) - (a.views || 0);
      return 0;
    });
    setFilteredNews(filtered);
  }, [searchTerm, selectedCategory, sortBy, newsDataList]);

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const NewsCard = ({ news, isFeatured = false }) => (
    <article
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      onClick={() => navigate(`/berita/${news.id}`)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={news.imageUrl || news.image} // FIX: Fallback ke news.image jika imageUrl kosong
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400/e5e7eb/9ca3af?text=Image+Not+Found'; }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-indigo-600 border border-white">
          {news.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-400 text-sm mb-3 gap-4">
          <div className="flex items-center gap-1.5"><Calendar size={14} /> {news.date}</div>
          <div className="flex items-center gap-1.5"><Eye size={14} /> {formatViews(news.views)}</div>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{news.description}</p>
        <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all font-bold text-indigo-600">
          Detail Berita <ChevronRight size={18} />
        </button>
      </div>
    </article>
  );

  if(loading) return <div className="min-h-screen flex items-center justify-center">Memuat seluruh berita...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center">
            <input type="text" placeholder="Cari berita..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-gray-200" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 bg-white border border-gray-200 rounded-xl">
                <option value="terbaru">Terbaru</option>
                <option value="populer">Terpopuler</option>
            </select>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => <NewsCard key={news.id} news={news} />)}
        </div>
      </div>
    </div>
  );
};

export default AllNews;