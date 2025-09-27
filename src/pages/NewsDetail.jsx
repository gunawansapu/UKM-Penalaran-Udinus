import { Calendar, Share2, Heart, Bookmark, Eye, MessageCircle, User, Clock, Facebook, Twitter, TrendingUp, Tag, Instagram  } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import newsData from '../data/newsdata'; // Import data dari file terpisah

const DetailNews = () => {
  // Gunakan useParams untuk mendapatkan ID dari URL
  const { id } = useParams();
  const navigate = useNavigate();
  const newsId = parseInt(id); // Convert string ke number
  
  const [currentNews, setCurrentNews] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareDropdown, setShareDropdown] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [fontNotification, setFontNotification] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Muhammad Arhan',
      content: 'Selamat untuk prestasi yang luar biasa! Semoga bisa mengikuti jejak yang sama.',
      time: '2 jam yang lalu',
      likes: 5,
      isLiked: false
    },
    {
      id: 2,
      author: 'Gunawan Saputra',
      content: 'Bangga dengan pencapaian adik-adik UKM Penalaran. Keep it up!',
      time: '5 jam yang lalu',
      likes: 8,
      isLiked: false
    }
  ]);
  const [newComment, setNewComment] = useState('');

  // Function untuk navigasi ke berita lain
  const handleNewsClick = (newsId) => {
    // Reset state terlebih dahulu
    setCurrentNews(null);
    setIsLiked(false);
    setIsBookmarked(false);
    setShareDropdown(false);
    
    // Navigate ke URL baru
    navigate(`/berita/${newsId}`);
    
    // Scroll ke atas
    window.scrollTo(0, 0);
  };

  // Effect untuk load data berita
  useEffect(() => {
    console.log('🔍 URL Parameter ID:', id);
    console.log('🔢 Parsed News ID:', newsId);
    console.log('📊 Available News Data:', Object.keys(newsData));
    
    // Reset scroll position
    window.scrollTo(0, 0);
    
    if (newsId && newsData[newsId]) {
      const selectedNews = newsData[newsId];
      console.log('✅ Found news:', selectedNews.title);
      setCurrentNews(selectedNews);
      
      // Reset interactive states when switching news
      setIsLiked(false);
      setIsBookmarked(false);
      setShareDropdown(false);
      
    } else {
      console.error('❌ News not found for ID:', newsId);
      console.log('Available IDs:', Object.keys(newsData));
      
      // Jika ID tidak valid, redirect ke berita pertama
      const firstNewsId = Object.keys(newsData)[0];
      if (firstNewsId) {
        navigate(`/berita/${firstNewsId}`, { replace: true });
      }
    }
  }, [id, newsId, navigate]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = currentNews?.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link berhasil disalin!');
        break;
    }
    setShareDropdown(false);
  };

  const handleFontChange = (size) => {
    setFontSize(size);
    setFontNotification(true);
    setTimeout(() => setFontNotification(false), 2000);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'Anda',
        content: newComment,
        time: 'Baru saja',
        likes: 0,
        isLiked: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const toggleCommentLike = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const getFontSize = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  const getFontSizeName = () => {
    switch (fontSize) {
      case 'small': return 'Kecil';
      case 'large': return 'Besar';
      default: return 'Sedang';
    }
  };

  // Loading state
  if (!currentNews) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin w-12 h-12 border-3 border-red-600 border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg font-medium">Memuat berita...</p>
          <p className="text-gray-500 text-sm mt-2">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Font Size Notification */}
      {fontNotification && (
        <div className="fixed top-20 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-40 flex items-center gap-3 animate-slideInRight">
          <div className="w-3 h-3 bg-green-200 rounded-full animate-pulse"></div>
          <span className="font-medium">Ukuran font: {getFontSizeName()}</span>
        </div>
      )}
      
      {/* Modern Header with Floating Actions - Fixed z-index untuk mobile */}
      <div className="sticky top-16 z-40 backdrop-blur-md bg-white/90 border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand - Tambah Penalaran News untuk mobile */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PN</span>
              </div>
              <span className="font-bold text-gray-900">Penalaran News</span>
            </div>

            {/* Action Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Font Size Controls */}
              <div className="flex items-center gap-1 bg-gray-100/80 backdrop-blur rounded-full p-1">
                <button
                  onClick={() => handleFontChange('small')}
                  className={`w-8 h-8 flex items-center justify-center text-xs rounded-full transition-all duration-300 ${
                    fontSize === 'small' 
                      ? 'bg-red-500 text-white shadow-md scale-110' 
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => handleFontChange('medium')}
                  className={`w-8 h-8 flex items-center justify-center text-sm rounded-full transition-all duration-300 ${
                    fontSize === 'medium' 
                      ? 'bg-red-500 text-white shadow-md scale-110' 
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => handleFontChange('large')}
                  className={`w-8 h-8 flex items-center justify-center text-base rounded-full transition-all duration-300 ${
                    fontSize === 'large' 
                      ? 'bg-red-500 text-white shadow-md scale-110' 
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  A
                </button>
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShareDropdown(!shareDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Bagikan</span>
                </button>
                
                {shareDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-52 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/80 py-3 z-50 animate-fadeIn">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-3 font-medium"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-400 transition-all duration-200 flex items-center gap-3 font-medium"
                    >
                      <Twitter className="w-5 h-5" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 flex items-center gap-3 font-medium"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        Salin Link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container - Tambah padding top untuk mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 pt-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Main Content */}
          <div className="xl:col-span-3">
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg">
              
              {/* Article Header */}
              <div className="p-6 lg:p-8 pb-4">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-md">
                    {currentNews.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm gap-4 lg:gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{currentNews.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{currentNews.views?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                  {currentNews.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-b border-gray-200 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-sm">
                      <User className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{currentNews.author || 'Admin UKM'}</p>
                      <p className="text-sm text-gray-500 font-medium">Reporter</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                        isLiked 
                          ? 'bg-red-100 text-red-600 shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium text-sm">Suka</span>
                    </button>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                        isBookmarked 
                          ? 'bg-yellow-100 text-yellow-600 shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      <span className="font-medium text-sm">Simpan</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {currentNews.image && (
                <div className="px-6 lg:px-8 mb-8">
                  <div className="relative group overflow-hidden rounded-xl">
                    <img
                      src={currentNews.image}
                      alt={currentNews.title}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400/e5e7eb/9ca3af?text=Image+Not+Found';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center font-medium">
                    Dokumentasi kegiatan UKM Penalaran UDINUS
                  </p>
                </div>
              )}

              {/* Article Content */}
              <div className="px-6 lg:px-8 pb-8">
                <div className="text-xl text-gray-700 mb-8 font-medium leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
                  {currentNews.description}
                </div>

                <div 
                  className={`${getFontSize()} text-gray-800 leading-relaxed space-y-6 prose prose-lg max-w-none`}
                  dangerouslySetInnerHTML={{ __html: currentNews.fullContent || '<p class="text-gray-600 italic">Konten lengkap sedang dimuat...</p>' }}
                />

                {/* Tags */}
                {currentNews.tags && (
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-red-600" />
                      <h4 className="text-lg font-bold text-gray-900">Tags</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {currentNews.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-8 bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Komentar ({comments.length})
                </h3>
              </div>

              {/* Add Comment Form */}
              <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tulis komentar Anda di sini..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none shadow-sm"
                  rows="4"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
                  >
                    Kirim Komentar
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-bold text-gray-900 text-lg">{comment.author}</span>
                          <span className="text-sm text-gray-500 font-medium">{comment.time}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4 text-base">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleCommentLike(comment.id)}
                            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 px-3 py-1 rounded-full ${
                              comment.isLiked 
                                ? 'text-red-600 bg-red-50' 
                                : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                            {comment.likes > 0 && comment.likes}
                          </button>
                          <button className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 font-medium px-3 py-1 rounded-full hover:bg-red-50">
                            Balas
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modern Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-36 space-y-6">
              {/* Trending News */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Berita Trending
                  </h3>
                </div>
                <div className="space-y-4">
                  {newsData && Object.values(newsData)
                    .filter(news => news.id !== currentNews.id)
                    .slice(0, 4)
                    .map((news, index) => (
                      <div 
                        key={`trending-${news.id}`} 
                        className="flex gap-4 cursor-pointer group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                        onClick={() => {
                          console.log('Clicking trending news:', news.id);
                          handleNewsClick(news.id);
                        }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:from-red-600 group-hover:to-red-700 transition-all shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-200 line-clamp-2 leading-snug mb-2">
                            {news.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{news.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Social Media Follow */}
               <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
      <div className="space-y-3">
        <a 
          href="https://www.instagram.com/penalaranudinus/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium no-underline !text-white hover:!text-white visited:!text-white"
        >
          <Instagram className="w-5 h-5" />
          Instagram
        </a>
      </div>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNews;