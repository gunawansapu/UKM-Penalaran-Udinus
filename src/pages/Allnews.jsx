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
  List
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

  // Store current page in session storage when component mounts
  useEffect(() => {
    sessionStorage.setItem('previousPage', '/semua-berita');
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

  const NewsCard = ({ news, isFeatured = false }) => (
    <article
      className={`group cursor-pointer transition-all duration-300 ${
        isFeatured 
          ? 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1'
          : 'bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-0.5'
      }`}
      onClick={() => handleNewsClick(news.id)}
    >
      <div className={`${isFeatured ? 'flex flex-col lg:grid lg:grid-cols-2 gap-0' : 'flex flex-col md:grid md:grid-cols-3 gap-0'}`}>
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={news.image}
            alt={news.title}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
              isFeatured ? 'h-64 lg:h-80' : 'h-48 md:h-40'
            }`}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400/e5e7eb/9ca3af?text=Image+Not+Found';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className={`absolute ${isFeatured ? 'top-6 left-6' : 'top-3 left-3'}`}>
            <span className={`px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full shadow-lg ${
              isFeatured ? 'text-sm' : 'text-xs'
            }`}>
              {news.category}
            </span>
          </div>
        </div>
        
        <div className={`${isFeatured ? 'p-8' : 'md:col-span-2 p-6'} flex flex-col justify-between`}>
          <div>
            <h3 className={`font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-3 ${
              isFeatured ? 'text-2xl lg:text-3xl mb-4' : 'text-lg mb-3'
            }`}>
              {news.title}
            </h3>
            <p className={`text-gray-600 line-clamp-3 ${
              isFeatured ? 'text-base mb-6' : 'text-sm mb-4'
            }`}>
              {news.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className={`flex items-center gap-6 text-gray-500 ${
              isFeatured ? 'text-sm' : 'text-xs'
            }`}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{news.author || 'Admin UKM'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{formatViews(news.views)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
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
                <span className={isFeatured ? 'text-base' : 'text-sm'}>Baca Selengkapnya</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PN</span>
              </div>
              <span className="font-bold text-gray-900 hidden sm:block">Penalaran News</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-80 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Kategori:</span>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort & View Options */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="terbaru">Terbaru</option>
                <option value="populer">Terpopuler</option>
              </select>
              
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Info */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">
              Menampilkan {filteredNews.length} berita
              {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
              {searchTerm && ` dengan kata kunci "${searchTerm}"`}
            </span>
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
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  Berita Utama
                </h2>
                <NewsCard news={getFeaturedNews()} isFeatured={true} />
              </section>
            )}

            {/* Regular News */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Berita Lainnya
              </h2>
              
              <div className="grid gap-6">
                {getRegularNews().map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
              
              {/* No Results */}
              {filteredNews.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada berita ditemukan</h3>
                  <p className="text-gray-600 mb-4">
                    Coba ubah kata kunci pencarian atau filter kategori
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Semua');
                    }}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Stats */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Berita</span>
                    <span className="font-semibold">{Object.keys(newsData).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori</span>
                    <span className="font-semibold">{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-semibold">
                      {formatViews(Object.values(newsData).reduce((total, news) => total + (news.views || 0), 0))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag Populer</h3>
                <div className="flex flex-wrap gap-2">
                  {['LPDP', 'Prestasi', 'Workshop', 'AI', 'PKM', 'Alumni'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dapatkan Update</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Berlangganan untuk mendapatkan berita terbaru
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email Anda"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
                    Berlangganan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNews;