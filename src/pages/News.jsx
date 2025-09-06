import { Calendar, ArrowRight, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const newsList = [
  {
    id: 1,
    title: 'PENALARAN BERPRESTASI',
    date: '16 November 2022',
    description: 'Anggota UKM Penalaran kembali lagi mengukir prestasi👏Selamat dan sukses kepada Afinzaki Amiral atas lolosnya pendanaan riset melalui LPDP dalam program Garuda Research and Academic of Excellence (Garuda ACE) 2022 serta mendapatkan Letter of Experience (LoA) dari profesor USA.Semoga kedepannya bisa terus berkarya serta dapat memberikan semangat dan motivasi kepada seluruh mahasiswa/i Universitas Dian Nuswantoro untuk selalu meningkatkan inovasi dan prestasi. #UKMPenalaran #Penalaran #PenalaranUdinus',
    image: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/Screenshot%202025-08-28%20at%2018-51-16%20(3)%20Instagram.png',
    category: 'Prestasi'
  },
  {
    id: 2,
    title: 'Diskusi Ilmiah Edisi Juli: AI dan Masa Depan Pendidikan',
    date: '18 Juli 2025',
    description: 'Diskusi rutin membahas dampak positif dan negatif kecerdasan buatan di dunia pendidikan.',
    image: 'https://dinus.ac.id/wp-content/uploads/2025/06/Coaching-Clinic-Dinuslib-1-scaled.jpg',
    category: 'Diskusi'
  },
  {
    id: 3,
    title: 'Pelatihan PKM dan Strategi Lolos Hibah',
    date: '7 Juli 2025',
    description: 'Kegiatan pelatihan intensif bersama alumni yang sudah sukses lolos pendanaan hibah PKM DIKTI.',
    image: 'https://dinus.ac.id/wp-content/uploads/2024/01/IMG_4368-900x675.jpg',
    category: 'Workshop'
  },
  {
    id: 4,
    title: 'Wisudawan Terbaik Universitas Dian Nuswantoro🤩',
    date: '31 Agustus 2022',
    description: 'Selamat kepada senior UKM Penalaran Usamah Bienladen (@ladenoesami )NIM E11.2018.00933. Telah terpilih sebagai wisudawan terbaik berprestasi angkatan ke-75. .Semoga gelar dan prestasi yang diperoleh dapat bermanfaat bagi diri sendiri dan masyarakat. Serta dapat menjadi motivasi bagi teman-teman UKM Penalaran dan mahasiswa UDINUS. ✨. Ayo join UKM Penalaran, menggapai prestasi bersama!',
    image: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/Screenshot%202025-08-28%20at%2018-56-46%20(3)%20Instagram.png',
    category: 'Prestasi'
  },
  {
    id: 5,
    title: 'Di Danai Proposal KBMI💰',
    date: '5 Agustus 2020',
    description: 'Selamat dan sukses kepada Team yang lolos KBMI 2020 semoga dapat memberikan semangat dan motivasi kepada seluruh mahasiswa/i UDINUS untuk mampu terus meningkatkan inovasi dan prestasi. Semoga tahun depan bisa semakin banyak lagi yang akan mendapatkan pendanaan proposal baik KBMI maupun lainya dari Kemendikbud. Aamiin.... Congratulation 🎊 Proud of them💕',
    image: 'https://raw.githubusercontent.com/gunawansapu/avatar/main/Screenshot%202025-08-30%20at%2020-50-35%20(3)%20Instagram.png',
    category: 'Prestasi'
  },
];

const categories = ['Semua', 'Prestasi', 'Diskusi', 'Workshop'];

// Tambahkan prop onNewsClick untuk navigasi (akan dihandle oleh React Router)
const News = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [likedNews, setLikedNews] = useState(new Set());
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set());

  const filteredNews = newsList.filter(news => {
    const matchesCategory = selectedCategory === 'Semua' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (newsId) => {
    const newLiked = new Set(likedNews);
    if (newLiked.has(newsId)) {
      newLiked.delete(newsId);
    } else {
      newLiked.add(newsId);
    }
    setLikedNews(newLiked);
  };

  const toggleBookmark = (newsId) => {
    const newBookmarked = new Set(bookmarkedNews);
    if (newBookmarked.has(newsId)) {
      newBookmarked.delete(newsId);
    } else {
      newBookmarked.add(newsId);
    }
    setBookmarkedNews(newBookmarked);
  };

  // Handler untuk navigasi ke detail menggunakan React Router
  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <section className="min-h-screen py-8 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" style={{colorScheme: 'light'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-4 border border-blue-200" style={{colorScheme: 'light'}}>
            📰 Berita Terkini
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Informasi Terbaru
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Ikuti perkembangan terbaru seputar kegiatan dan pencapaian 
            <span className="font-semibold text-indigo-600"> UKM Penalaran UDINUS</span>
          </p>
        </div>

        {/* Search and Filter Section - Mobile First */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 order-2 sm:order-1">
              <div className={`flex items-center bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm transition-all duration-300 ${showSearch ? 'ring-2 ring-indigo-500' : ''}`}>
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setShowSearch(false)}
                  className="flex-1 px-3 py-2 sm:py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
                  style={{colorScheme: 'light'}}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mr-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter - Mobile Scrollable */}
            <div className="order-1 sm:order-2">
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80'
                    }`}
                    style={{colorScheme: 'light'}}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {(searchTerm || selectedCategory !== 'Semua') && (
          <div className="mb-4 text-sm text-gray-600">
            Menampilkan {filteredNews.length} berita
            {searchTerm && ` untuk "${searchTerm}"`}
            {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
          </div>
        )}

        {/* News Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              className="group bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 border border-white/50 overflow-hidden cursor-pointer"
              style={{colorScheme: 'light'}}
              onClick={() => handleNewsClick(news.id)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-semibold rounded-full border border-white/50">
                    {news.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      toggleLike(news.id);
                    }}
                    className={`w-8 h-8 rounded-full backdrop-blur-sm border border-white/50 flex items-center justify-center transition-all duration-300 ${
                      likedNews.has(news.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      toggleBookmark(news.id);
                    }}
                    className={`w-8 h-8 rounded-full backdrop-blur-sm border border-white/50 flex items-center justify-center transition-all duration-300 ${
                      bookmarkedNews.has(news.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:bg-yellow-500 hover:text-white'
                    }`}
                  >
                    🔖
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  {news.date}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                  {news.description}
                </p>
                
                {/* Enhanced button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double trigger
                    handleNewsClick(news.id);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg group/btn transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
                  style={{colorScheme: 'light'}}
                >
                  Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-gray-600 mb-4">Coba ubah kata kunci atau filter kategori</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Semua');
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Bottom CTA - Mobile Optimized */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 sm:mb-6 shadow-lg">
            <span className="text-xl sm:text-2xl">📚</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Ingin Tahu Lebih Banyak?
          </h3>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
            Jangan lewatkan update terbaru dari kegiatan UKM Penalaran
          </p>
          <button 
            onClick={() => navigate('/semua-berita')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
            style={{colorScheme: 'light'}}
          >
            Lihat Semua Berita
          </button>
        </div>

       {/* Modern Interactive Cards - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Quick Actions Hub */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/50 shadow-lg group hover:shadow-2xl transition-all duration-300" style={{colorScheme: 'light'}}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-lg">⚡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                Quick Actions
              </h4>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Akses cepat ke fitur-fitur penting UKM Penalaran
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.98] group/btn">
                <span className="mr-2">📝</span>
                <span>Daftar</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-sm font-medium rounded-lg transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.98] group/btn">
                <span className="mr-2">💬</span>
                <span>Kontak</span>
              </button>
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/50 shadow-lg group hover:shadow-2xl transition-all duration-300" style={{colorScheme: 'light'}}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-lg">🏆</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                Achievement Hub
              </h4>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Jelajahi prestasi dan pencapaian terbaru anggota
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200/50">
                <span className="text-sm text-gray-700">🥇 Prestasi Terbaru</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">2 baru</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/50">
                <span className="text-sm text-gray-700">📊 Riset Published</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">5 artikel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Mobile Friendly */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="text-2xl font-bold text-indigo-600 mb-1">{newsList.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Berita</div>
          </div>
          <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="text-2xl font-bold text-blue-600 mb-1">{likedNews.size}</div>
            <div className="text-xs sm:text-sm text-gray-600">Disukai</div>
          </div>
          <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="text-2xl font-bold text-green-600 mb-1">{bookmarkedNews.size}</div>
            <div className="text-xs sm:text-sm text-gray-600">Disimpan</div>
          </div>
          <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="text-2xl font-bold text-purple-600 mb-1">{categories.length - 1}</div>
            <div className="text-xs sm:text-sm text-gray-600">Kategori</div>
          </div>
        </div>
      </div>

      {/* Custom CSS for line clamp and scrollbar hide */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default News;