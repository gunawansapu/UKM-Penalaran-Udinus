import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Eye, 
  Clock, 
  User, 
  Search, 
  Filter,
  TrendingUp,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  Tag,
  Bell,
  BarChart3,
  Grid3x3,
  List,
  Menu,
  X,
  Flame,
  Star,
  ArrowUp
} from 'lucide-react';
import newsData from '../data/newsdata';

const AllNews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('terbaru');
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState(['Semua']);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Store current page in session storage when component mounts
  useEffect(() => {
    sessionStorage.setItem('previousPage', '/semua-berita');
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Convert newsData object to array and prepare data
  useEffect(() => {
    const newsArray = Object.values(newsData);
    
    // Extract unique categories
    const uniqueCategories = ['Semua', ...new Set(newsArray.map(news => news.category))];
    setCategories(uniqueCategories);
    
    // Filter and sort news
    let filtered = newsArray;
    
    // Filter by category
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort news
    filtered = filtered.sort((a, b) => {
      if (sortBy === 'terbaru') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'populer') {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });
    
    setFilteredNews(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleNewsClick = (newsId) => {
    navigate(`/berita/${newsId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views?.toString() || '0';
  };

  const formatDate = (dateStr) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    
    const parts = dateStr.split(' ');
    if (parts.length >= 3) {
      const day = parts[0];
      const monthIndex = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].indexOf(parts[1]);
      const month = monthIndex !== -1 ? months[monthIndex] : parts[1];
      const year = parts[2];
      return `${day} ${month} ${year}`;
    }
    return dateStr;
  };

  const getFeaturedNews = () => {
    return filteredNews.slice(0, 1)[0] || null;
  };

  const getRegularNews = () => {
    return filteredNews.slice(1);
  };

  const NewsCard = ({ news, isFeatured = false, isCompact = false }) => (
    <article
      className={`group cursor-pointer transition-all duration-300 ${
        isFeatured 
          ? 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border border-gray-100'
          : isCompact
          ? 'bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 border border-gray-100'
          : 'bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 border border-gray-100'
      }`}
      onClick={() => handleNewsClick(news.id)}
    >
      <div className={`${
        isFeatured 
          ? 'flex flex-col lg:grid lg:grid-cols-2 gap-0' 
          : isCompact
          ? 'flex gap-3 p-4'
          : viewMode === 'list' 
          ? 'flex flex-col sm:flex-row gap-4 p-4'
          : 'flex flex-col'
      }`}>
        
        {/* Image Section */}
        <div className={`relative overflow-hidden flex-shrink-0 ${
          isCompact ? 'w-20 h-20 rounded-lg' : 
          viewMode === 'list' ? 'w-full sm:w-48' : 'w-full'
        }`}>
          <img
            src={news.image}
            alt={news.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
              isFeatured ? 'h-64 lg:h-80' : 
              isCompact ? 'rounded-lg' :
              viewMode === 'list' ? 'h-40 sm:h-32' : 'h-52'
            }`}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400/e5e7eb/9ca3af?text=Image+Not+Found';
            }}
          />
          
          {!isCompact && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`absolute ${isFeatured ? 'top-6 left-6' : 'top-3 left-3'}`}>
                <span className={`px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full shadow-lg backdrop-blur-sm ${
                  isFeatured ? 'text-sm' : 'text-xs'
                }`}>
                  {news.category}
                </span>
              </div>
              
              {isFeatured && (
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-1 px-2 py-1 bg-black/50 text-white rounded-full text-xs backdrop-blur-sm">
                    <Flame className="w-3 h-3" />
                    <span>Trending</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Content Section */}
        <div className={`${
          isFeatured ? 'p-8' : 
          isCompact ? 'flex-1' :
          viewMode === 'list' ? 'sm:col-span-2 p-6' : 'p-6'
        } flex flex-col justify-between`}>
          
          {isCompact && (
            <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full mb-2 w-fit">
              {news.category}
            </span>
          )}
          
          <div>
            <h3 className={`font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 ${
              isFeatured ? 'text-2xl lg:text-3xl mb-4 line-clamp-2' : 
              isCompact ? 'text-sm mb-2 line-clamp-2' :
              'text-lg mb-3 line-clamp-3'
            }`}>
              {news.title}
            </h3>
            
            {!isCompact && (
              <p className={`text-gray-600 line-clamp-3 ${
                isFeatured ? 'text-base mb-6' : 'text-sm mb-4'
              }`}>
                {news.description}
              </p>
            )}
          </div>
          
          <div className={`space-y-4 ${isCompact ? 'space-y-2' : ''}`}>
            <div className={`flex items-center ${isCompact ? 'gap-3' : 'gap-6'} text-gray-500 ${
              isFeatured ? 'text-sm' : isCompact ? 'text-xs' : 'text-xs'
            }`}>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3 h-3" />
                <span>{formatViews(news.views)}</span>
              </div>
            </div>
            
            {!isCompact && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-200">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all duration-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-yellow-50 hover:text-yellow-600 rounded-full transition-all duration-200">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all duration-300">
                  <span className={isFeatured ? 'text-base' : 'text-sm'}>Baca</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Enhanced Header - Reduced z-index to avoid conflict with navbar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">PN</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-gray-900">Penalaran News</span>
                  <span className="text-xs text-gray-500">Berita Terpercaya & Terkini</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{formatDate(new Date().toLocaleDateString('id-ID'))}</span>
              </div>
            </div>
            
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-red-600 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search and Navigation */}
          <div className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari berita terbaru..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 text-sm"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none min-w-0"
                >
                  <option value="terbaru">🕒 Terbaru</option>
                  <option value="populer">🔥 Terpopuler</option>
                </select>
                
                <div className="hidden sm:flex bg-gray-50 rounded-lg p-1 border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter - Reduced z-index */}
      <div className={`bg-white border-b border-gray-200 relative z-30 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Kategori
              </h3>
              <button
                className="md:hidden text-gray-500"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {category}
                  {category !== 'Semua' && (
                    <span className="ml-1 opacity-75">
                      ({Object.values(newsData).filter(news => news.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-100">
              <span>
                📊 Menampilkan <span className="font-semibold text-gray-900">{filteredNews.length}</span> berita
                {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
                {searchTerm && ` untuk "${searchTerm}"`}
              </span>
              
              {(selectedCategory !== 'Semua' || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Semua');
                  }}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* News Content */}
          <div className="xl:col-span-3 space-y-8">
            
            {/* Featured News */}
            {getFeaturedNews() && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-bold">Berita Utama</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <NewsCard news={getFeaturedNews()} isFeatured={true} />
              </section>
            )}

            {/* Regular News */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-bold">Berita Terbaru</span>
                </div>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              
              <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
              }`}>
                {getRegularNews().map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
              
              {/* No Results */}
              {filteredNews.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada berita ditemukan</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Coba ubah kata kunci pencarian atau pilih kategori yang berbeda
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Semua');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Reset Semua Filter
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-60 space-y-6">
              
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Statistik Platform
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-600 text-sm">Total Berita</span>
                    <span className="font-bold text-lg text-blue-600">{Object.keys(newsData).length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-600 text-sm">Kategori Aktif</span>
                    <span className="font-bold text-lg text-green-600">{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-600 text-sm">Total Pembaca</span>
                    <span className="font-bold text-lg text-purple-600">
                      {formatViews(Object.values(newsData).reduce((total, news) => total + (news.views || 0), 0))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trending News */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  Trending Hari Ini
                </h3>
                <div className="space-y-3">
                  {Object.values(newsData)
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, 3)
                    .map((news, index) => (
                      <NewsCard key={news.id} news={news} isCompact={true} />
                    ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-green-500" />
                  Tag Populer
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['LPDP', 'Prestasi', 'Workshop', 'AI', 'PKM', 'Alumni', 'Teknologi', 'Pendidikan'].map((tag, index) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                        index % 4 === 0 ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                        index % 4 === 1 ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                        index % 4 === 2 ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                        'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-red-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-500" />
                  Berlangganan Newsletter
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Dapatkan update berita terbaru langsung di email Anda
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                  <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-semibold">
                    🚀 Berlangganan Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - Reduced z-index */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-30"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AllNews;