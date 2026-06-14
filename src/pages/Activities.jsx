import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { activityList } from '../data/aktifitasDetail';
import { Calendar, MapPin, Tag, RefreshCcw, Activity as ActivityIcon, Rocket } from 'lucide-react';

// --- EvenCard Component (Redesigned to Modern Bento Style) ---
const EvenCard = ({ 
  id, title, date, description, category, time, location, image, 
  status = 'upcoming', capacity, registeredCount, price, className
}) => {
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop': return 'from-blue-500 to-indigo-600 shadow-blue-500/30';
      case 'Diskusi': return 'from-emerald-500 to-teal-600 shadow-emerald-500/30';
      case 'Pelatihan': return 'from-purple-500 to-pink-600 shadow-purple-500/30';
      case 'Lomba': return 'from-orange-500 to-red-600 shadow-orange-500/30';
      case 'Kompetisi': return 'from-amber-500 to-orange-600 shadow-amber-500/30';
      case 'Pengabdian': return 'from-rose-500 to-red-600 shadow-rose-500/30';
      case 'Recruitment': return 'from-cyan-500 to-blue-600 shadow-cyan-500/30';
      case 'Fun': return 'from-yellow-400 to-amber-500 shadow-yellow-500/30';
      default: return 'from-slate-500 to-slate-600 shadow-slate-500/30';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-emerald-100/80 text-emerald-700 border-emerald-200';
      case 'ongoing': return 'bg-blue-100/80 text-blue-700 border-blue-200';
      case 'closed': return 'bg-rose-100/80 text-rose-700 border-rose-200';
      case 'completed': return 'bg-slate-100/80 text-slate-700 border-slate-200';
      default: return 'bg-gray-100/80 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Berlangsung';
      case 'closed': return 'Ditutup';
      case 'completed': return 'Selesai';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`group relative bg-white rounded-[2rem] p-2 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden ${className}`}>
      {/* Image Section - Khas Bento dengan padding kecil */}
      <Link 
        to={`/kegiatan/${id}`} 
        className="relative h-56 rounded-[1.5rem] overflow-hidden flex-shrink-0 cursor-pointer block"
      >
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge - Melayang Estetik */}
        <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(category)} shadow-lg backdrop-blur-md`}>
          {category}
        </div>
        
        {/* Status Badge */}
        <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${getStatusStyle(status)} shadow-sm`}>
          {getStatusText(status)}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative bg-white z-10">
        <Link to={`/kegiatan/${id}`} className="block mb-2 !no-underline">
          <h3 className="text-xl lg:text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-tight tracking-tight">
            {title}
          </h3>
        </Link>
        <p className="text-slate-500 mb-6 line-clamp-2 text-sm font-medium leading-relaxed">
          {description}
        </p>
        
        {/* Info Details (Icons) */}
        <div className="space-y-2 mb-8 mt-auto">
           {time && (
             <div className="flex items-center gap-3 text-sm text-slate-600">
               <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                 <Calendar size={16} />
               </div>
               <span className="font-medium truncate">{time}</span>
             </div>
           )}
           {location && (
             <div className="flex items-center gap-3 text-sm text-slate-600">
               <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                 <MapPin size={16} />
               </div>
               <span className="font-medium truncate">{location}</span>
             </div>
           )}
           {price !== undefined && (
              <div className="flex items-center gap-3 text-sm text-slate-600">
                 <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                   <Tag size={16} />
                 </div>
                 <span className="font-bold text-emerald-600">
                    {price === 0 || price === "-" ? 'Gratis' : `Rp ${price.toLocaleString('id-ID')}`}
                 </span>
              </div>
           )}
        </div>

        {/* CTA Button - FIX BUG WARNA HOVER TEXT */}
        {/* Menggunakan teknik group/btn dan target spesifik span agar menang melawan CSS Global */}
        <Link 
          to={`/kegiatan/${id}`}
          className="group/btn w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl !bg-indigo-50 hover:!bg-indigo-600 transition-all duration-300 active:scale-95 !no-underline border-none"
        >
          <span className="font-bold !text-indigo-600 group-hover/btn:!text-white transition-colors duration-300">
            Detail Kegiatan
          </span>
          <svg className="w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-1 !text-indigo-600 group-hover/btn:!text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
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
      [data-aos="fade-up"] { transform: translateY(30px); }
      [data-aos="fade-down"] { transform: translateY(-30px); }
      [data-aos="zoom-in"] { transform: scale(0.95); }
      [data-aos="fade-in"] { opacity: 0; }
      .animate-in { opacity: 1 !important; transform: translateY(0) scale(1) !important; }
      .animate-out { opacity: 0; }
    `;
    document.head.appendChild(style);
    return () => { if (style.parentNode) document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
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
    <section className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans pb-20">
      
      {/* --- BACKGROUND AMBIENT DECORATIONS --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-full shadow-sm mb-6">
            <Rocket size={16} className="text-indigo-500" />
            <span className="text-sm font-bold text-indigo-700 tracking-wide uppercase">Agenda Terbaru</span>
          </div>
          
          <h1 data-aos="zoom-in" className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Kegiatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Penalaran</span>
          </h1>
          
          <p data-aos="fade-up" className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Jelajahi berbagai kegiatan pengembangan diri, workshop, seminar, dan kompetisi yang dirancang untuk mengasah kemampuan intelektualmu.
          </p>

        </div>
      </div>

      {/* --- FILTER SECTION (BENTO STYLE) --- */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 z-10">
        <div data-aos="fade-up" className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 border border-white">
           <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-end">
              
              {/* Status Filter */}
              <div className="flex-1">
                 <label className="flex items-center gap-2 text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-wider pl-1">
                    <ActivityIcon size={14}/> Status Kegiatan
                 </label>
                 <div className="relative">
                     <select 
                       value={filterStatus} 
                       onChange={(e) => setFilterStatus(e.target.value)} 
                       className="w-full pl-4 pr-10 py-3.5 !bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 !text-slate-700 font-bold transition-all cursor-pointer"
                     >
                        <option value="all">Semua Status</option>
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                     </div>
                 </div>
              </div>
              
              {/* Kategori Filter */}
              <div className="flex-1">
                 <label className="flex items-center gap-2 text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-wider pl-1">
                    <Tag size={14}/> Kategori
                 </label>
                 <div className="relative">
                     <select 
                       value={filterCategory} 
                       onChange={(e) => setFilterCategory(e.target.value)} 
                       className="w-full pl-4 pr-10 py-3.5 !bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 !text-slate-700 font-bold transition-all cursor-pointer"
                     >
                        <option value="all">Semua Kategori</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                     </div>
                 </div>
              </div>
              
              {/* Reset Button - Override Total CSS Global */}
              <div className="md:w-auto">
                 <button 
                   onClick={() => {setFilterStatus('all'); setFilterCategory('all')}} 
                   className="w-full md:w-auto px-6 py-3.5 !bg-slate-900 hover:!bg-slate-800 active:scale-95 rounded-2xl text-sm font-bold !text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 outline-none"
                 >
                   <RefreshCcw size={18} />
                   <span>Reset</span>
                 </button>
              </div>
           </div>
           
           {/* Result Counter */}
           <div className="mt-6 pt-5 border-t border-slate-200/60 flex items-center justify-between">
             <div className="text-sm">
               <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                   {filteredEvents.length}
               </span>
               <span className="text-slate-500 ml-2 font-semibold">kegiatan ditemukan</span>
             </div>
             <div className="flex gap-1.5">
               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
               <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
             </div>
           </div>
        </div>
      </div>

      {/* --- GRID CARDS SECTION --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {filteredEvents.map((event, index) => (
            <div key={event.id} data-aos="fade-up" style={{ transitionDelay: `${index * 50}ms` }} className="h-full">
              <EvenCard {...event} />
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredEvents.length === 0 && (
           <div data-aos="fade-in" className="text-center py-24 w-full flex justify-center">
             <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-slate-100 p-12 max-w-md">
               <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
                   <ActivityIcon size={40} />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">Tidak ada kegiatan</h3>
               <p className="text-slate-500 font-medium">Coba sesuaikan filter pencarianmu untuk melihat kegiatan lainnya.</p>
               
               {/* Override untuk tombol reset kosong */}
               <button 
                 onClick={() => {setFilterStatus('all'); setFilterCategory('all')}}
                 className="group/reset mt-8 px-6 py-3 !bg-indigo-50 hover:!bg-indigo-600 rounded-xl transition-colors outline-none"
               >
                 <span className="font-bold !text-indigo-600 group-hover/reset:!text-white transition-colors">
                   Tampilkan Semua
                 </span>
               </button>
             </div>
           </div>
        )}
      </div>

    </section>
  );
};

export default Activities;