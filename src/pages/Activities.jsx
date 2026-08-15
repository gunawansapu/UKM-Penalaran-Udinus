// src/pages/Activities.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Calendar, MapPin, Tag, RefreshCcw, Activity as ActivityIcon, Rocket } from 'lucide-react';

// IMPORT FIREBASE
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

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
      case 'Recruitment': return 'from-cyan-500 to-blue-600 shadow-cyan-500/30';
      default: return 'from-slate-500 to-slate-600 shadow-slate-500/30';
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'closed' || status === 'Ditutup') return 'bg-rose-100/90 text-rose-700 border-rose-200';
    if (status === 'ongoing' || status === 'Sedang Berlangsung') return 'bg-amber-100/90 text-amber-700 border-amber-200';
    return 'bg-emerald-100/90 text-emerald-700 border-emerald-200'; // upcoming
  };

  const getStatusText = (status) => {
    if (status === 'closed' || status === 'Ditutup') return 'Ditutup';
    if (status === 'ongoing' || status === 'Sedang Berlangsung') return 'Berlangsung';
    return 'Akan Datang';
  };

  return (
    <div className={`group relative bg-white rounded-[2rem] p-2 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden ${className}`}>
      <Link to={`/kegiatan/${id}`} className="relative h-56 rounded-[1.5rem] overflow-hidden flex-shrink-0 cursor-pointer block">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(category)} shadow-lg backdrop-blur-md`}>
          {category}
        </div>
        <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${getStatusStyle(status)} shadow-sm`}>
          {getStatusText(status)}
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow relative bg-white z-10">
        <Link to={`/kegiatan/${id}`} className="block mb-2 !no-underline">
          <h3 className="text-xl lg:text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-tight tracking-tight">
            {title}
          </h3>
        </Link>
        <p className="text-slate-500 mb-6 line-clamp-2 text-sm font-medium leading-relaxed">{description}</p>
        
        <div className="space-y-2 mb-8 mt-auto">
           {time && (
             <div className="flex items-center gap-3 text-sm text-slate-600">
               <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><Calendar size={16} /></div>
               <span className="font-medium truncate">{date} - {time}</span>
             </div>
           )}
           {location && (
             <div className="flex items-center gap-3 text-sm text-slate-600">
               <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0"><MapPin size={16} /></div>
               <span className="font-medium truncate">{location}</span>
             </div>
           )}
           {price && (
              <div className="flex items-center gap-3 text-sm text-slate-600">
                 <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0"><Tag size={16} /></div>
                 <span className="font-bold text-emerald-600">{price === '0' || price === 'Gratis' || price === '-' ? 'Gratis' : `Rp ${price}`}</span>
              </div>
           )}
        </div>

        <Link to={`/kegiatan/${id}`} className="group/btn w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl !bg-indigo-50 hover:!bg-indigo-600 transition-all duration-300 active:scale-95 !no-underline border-none">
          <span className="font-bold !text-indigo-600 group-hover/btn:!text-white transition-colors duration-300">Detail Kegiatan</span>
          <svg className="w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-1 !text-indigo-600 group-hover/btn:!text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
};

const Activities = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(dataList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter(event => {
      const statusMatch = filterStatus === 'all' || event.status === filterStatus;
      const categoryMatch = filterCategory === 'all' || event.category === filterCategory;
      return statusMatch && categoryMatch;
    });

  const categories = [...new Set(events.map(event => event.category))];
  const statuses = [...new Set(events.map(event => event.status))];

  return (
    <section className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans pb-20">
      <div className="relative pt-32 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-full shadow-sm mb-6">
            <Rocket size={16} className="text-indigo-500" />
            <span className="text-sm font-bold text-indigo-700 tracking-wide uppercase">Agenda Terbaru</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Kegiatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Penalaran</span>
          </h1>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 z-10">
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 border border-white">
           <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-end">
              <div className="flex-1">
                 <label className="flex items-center gap-2 text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-wider pl-1"><ActivityIcon size={14}/> Status</label>
                 <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full pl-4 pr-10 py-3.5 !bg-slate-50 border border-slate-200 rounded-2xl outline-none capitalize">
                    <option value="all">Semua Status</option>
                    {statuses.map(s => (
                      <option key={s} value={s}>
                        {s === 'closed' || s === 'Ditutup' ? 'Ditutup' : s === 'ongoing' ? 'Sedang Berlangsung' : s === 'upcoming' ? 'Akan Datang' : s}
                      </option>
                    ))}
                 </select>
              </div>
              <div className="flex-1">
                 <label className="flex items-center gap-2 text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-wider pl-1"><Tag size={14}/> Kategori</label>
                 <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full pl-4 pr-10 py-3.5 !bg-slate-50 border border-slate-200 rounded-2xl outline-none">
                    <option value="all">Semua Kategori</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
              <div className="md:w-auto">
                 <button onClick={() => {setFilterStatus('all'); setFilterCategory('all')}} className="w-full md:w-auto px-6 py-3.5 !bg-slate-900 hover:!bg-slate-800 rounded-2xl font-bold !text-white flex gap-2"><RefreshCcw size={18} /> Reset</button>
              </div>
           </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {loading ? (
            <div className="text-center py-20 text-slate-500 font-medium animate-pulse">Memuat kegiatan...</div>
        ) : (
            <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="h-full"><EvenCard {...event} /></div>
                    ))}
                </div>
                {filteredEvents.length === 0 && (
                    <div className="text-center py-24 w-full flex justify-center text-slate-500">Tidak ada kegiatan.</div>
                )}
            </>
        )}
      </div>
    </section>
  );
};

export default Activities;