import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { activityList } from '../data/aktifitasDetail';

// --- EvenCard Component ---
const EvenCard = ({ 
  id, title, date, description, category, time, location, image, 
  status = 'upcoming', capacity, registeredCount, price, className
}) => {
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop': return 'from-blue-500 to-indigo-600';
      case 'Diskusi': return 'from-green-500 to-emerald-600';
      case 'Pelatihan': return 'from-purple-500 to-pink-600';
      case 'Lomba': return 'from-orange-500 to-red-600';
      case 'Kompetisi': return 'from-yellow-500 to-orange-600';
      case 'Pengabdian': return 'from-yellow-800 to-red-500';
      case 'Recruitment': return 'from-cyan-500 to-blue-600';
      case 'Fun': return 'from-yellow-400 to-green-200';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'ongoing': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'closed': return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'completed': return 'bg-slate-50 text-slate-700 border border-slate-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Berlangsung';
      case 'closed': return 'Pendaftaran Ditutup';
      case 'completed': return 'Selesai';
      default: return 'Status Tidak Diketahui';
    }
  };

  return (
    <div className={`bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden border-2 border-gray-100 transition-all duration-500 flex flex-col h-full group ${className}`}>
      {/* Image Section */}
      <Link to={`/kegiatan/${id}`} className="relative h-56 overflow-hidden flex-shrink-0 cursor-pointer">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
        
        {/* Category Badge */}
        <div className={`absolute top-5 left-5 px-4 py-2 rounded-2xl text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(category)} shadow-lg backdrop-blur-sm`}>
          {category}
        </div>
        
        {/* Status Badge */}
        <div className={`absolute bottom-5 right-5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-7 flex flex-col flex-grow">
        <Link to={`/kegiatan/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-5 line-clamp-3 text-sm leading-relaxed">{description}</p>
        
        {/* Info Details */}
        <div className="space-y-3 mb-6 text-sm text-gray-600">
           {time && (
             <div className="flex items-center bg-blue-50 rounded-xl px-3 py-2">
               <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               <span className="font-medium">{time}</span>
             </div>
           )}
           {location && (
             <div className="flex items-center bg-purple-50 rounded-xl px-3 py-2">
               <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               <span className="font-medium">{location}</span>
             </div>
           )}
           {price !== undefined && (
              <div className="flex items-center bg-green-50 rounded-xl px-3 py-2">
                 <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                 <span className="font-bold text-green-700">{price === 0 || price === "-" ? 'Gratis' : `Rp ${price.toLocaleString('id-ID')}`}</span>
              </div>
           )}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link 
            to={`/kegiatan/${id}`}
            className="w-full flex items-center justify-center px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 duration-300 group"
          >
            <span className="text-white font-semibold">Lihat Detail</span>
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const Activities = () => {
  const [events] = useState(activityList);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredEvents = events
    .filter(event => {
      const statusMatch = filterStatus === 'all' || event.status === filterStatus;
      const categoryMatch = filterCategory === 'all' || event.category === filterCategory;
      return statusMatch && categoryMatch;
    })
    .sort((a, b) => {
      const statusPriority = { 'ongoing': 1, 'upcoming': 2, 'closed': 3, 'completed': 4 };
      const priorityA = statusPriority[a.status] || 99;
      const priorityB = statusPriority[b.status] || 99;
      return priorityA - priorityB;
    });

  const categories = [...new Set(events.map(event => event.category))];
  const statuses = [...new Set(events.map(event => event.status))];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      [data-aos] { opacity: 0; transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      [data-aos="fade-up"] { transform: translateY(50px); }
      [data-aos="fade-down"] { transform: translateY(-50px); }
      [data-aos="zoom-in"] { transform: scale(0.8); }
      [data-aos="fade-in"] { opacity: 0; }
      .animate-in { opacity: 1 !important; transform: translateY(0) scale(1) !important; }
      .animate-out { opacity: 0; }
    `;
    document.head.appendChild(style);
    return () => { if (style.parentNode) document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.add('animate-out');
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredEvents.length]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <div data-aos="fade-down" className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-bold mb-6 shadow-md border border-blue-200">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            Agenda Kegiatan Terbaru
          </div>
          <h1 data-aos="zoom-in" className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-tight">
            Kegiatan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Penalaran
            </span>
          </h1>
          <p data-aos="fade-up" className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi berbagai kegiatan pengembangan diri, workshop, seminar, dan kompetisi yang dirancang untuk mengasah kemampuan dan memperluas wawasan Anda
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div data-aos="fade-up" className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-gray-100">
           <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="flex-1">
                 <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Status Kegiatan</label>
                 <select 
                   value={filterStatus} 
                   onChange={(e) => setFilterStatus(e.target.value)} 
                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 font-medium bg-white shadow-sm hover:border-gray-300"
                 >
                    <option value="all">🎯 Semua Status</option>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
              </div>
              
              <div className="flex-1">
                 <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Kategori</label>
                 <select 
                   value={filterCategory} 
                   onChange={(e) => setFilterCategory(e.target.value)} 
                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-gray-700 font-medium bg-white shadow-sm hover:border-gray-300"
                 >
                    <option value="all">📂 Semua Kategori</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
              
              <div className="lg:pt-6">
                 <button 
                   onClick={() => {setFilterStatus('all'); setFilterCategory('all')}} 
                   className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-2xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 duration-300"
                 >
                   <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                   Reset Filter
                 </button>
              </div>
           </div>
           
           <div className="mt-5 pt-5 border-t-2 border-gray-100 flex items-center justify-between">
             <div className="text-sm">
               <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{filteredEvents.length}</span>
               <span className="text-gray-600 ml-2 font-medium">kegiatan tersedia</span>
             </div>
             <div className="flex gap-2">
               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
               <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
             </div>
           </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <div key={event.id} data-aos="fade-up" style={{ transitionDelay: `${index * 100}ms` }}>
              <EvenCard {...event} className="h-full" />
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
           <div data-aos="fade-in" className="text-center py-20">
             <div className="inline-block p-8 bg-white rounded-3xl shadow-lg border-2 border-gray-100">
               <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <p className="text-xl font-bold text-gray-700 mb-2">Tidak ada kegiatan ditemukan</p>
               <p className="text-gray-500">Coba ubah filter atau reset pencarian Anda</p>
             </div>
           </div>
        )}
      </div>
    </section>
  );
};

export default Activities;