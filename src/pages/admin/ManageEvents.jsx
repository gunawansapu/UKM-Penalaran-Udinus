// src/pages/admin/ManageEvents.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Trash2, Edit, ExternalLink, Plus, Loader2, ImageOff, Inbox, CalendarDays } from 'lucide-react';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventList);
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus event ini?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        setEvents(events.filter(event => event.id !== id));
        alert("Event berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting event: ", error);
        alert("Gagal menghapus event.");
      }
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-7xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Kelola Event & Kegiatan</h1>
            <p className="text-slate-500 font-medium mt-1 text-base">Manajemen seluruh agenda kegiatan, pelatihan, dan pendaftaran UKM.</p>
          </div>
          <Link 
            to="/admin/add-event"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold !text-white !bg-indigo-600 hover:!bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 active:scale-95 border-0"
          >
            <Plus size={20} className="!stroke-white" strokeWidth={3} />
            <span>Tambah Event</span>
          </Link>
        </div>

        {/* Tabel Data Container */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50/30">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Memuat data event...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                <Inbox className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-slate-800 font-bold text-lg mb-1">Belum ada event</h3>
              <p className="text-slate-500 text-sm font-medium">Klik tombol "Tambah Event" di atas untuk mulai membuat agenda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-5">Poster</th>
                    <th className="px-6 py-5 w-1/3">Nama Event</th>
                    <th className="px-6 py-5">Kategori</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Tanggal</th>
                    <th className="px-6 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* Kolom Poster */}
                      <td className="px-6 py-4">
                        {event.image ? (
                          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-white relative flex-shrink-0">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden absolute inset-0 bg-slate-50 items-center justify-center">
                              <ImageOff className="w-5 h-5 text-slate-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-center shadow-sm">
                            <CalendarDays className="w-6 h-6 text-slate-300" />
                          </div>
                        )}
                      </td>

                      {/* Kolom Nama Event */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-base max-w-xs sm:max-w-sm md:max-w-md truncate" title={event.title}>
                          {event.title}
                        </div>
                      </td>

                      {/* Kolom Kategori */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider">
                          {event.category}
                        </span>
                      </td>

                      {/* Kolom Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          event.status === 'upcoming' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : event.status === 'ongoing'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                          {event.status}
                        </span>
                      </td>

                      {/* Kolom Tanggal */}
                      <td className="px-6 py-4">
                        <span className="text-slate-500 font-medium text-sm">
                          {event.date}
                        </span>
                      </td>

                      {/* Kolom Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2.5">
                          
                          {/* Tombol Lihat Detail */}
                          <Link 
                            to={`/kegiatan/${event.id}`} 
                            target="_blank"
                            className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                            title="Lihat Detail Event"
                          >
                            <ExternalLink 
                              style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }} 
                              strokeWidth={2.5} 
                              className="text-slate-600 group-hover/btn:text-white" 
                            />
                          </Link>

                          {/* Tombol Edit */}
                          <Link 
                            to={`/admin/edit-event/${event.id}`} 
                            className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-amber-500 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                            title="Edit Event"
                          >
                            <Edit 
                              style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }} 
                              strokeWidth={2.5} 
                              className="text-slate-600 group-hover/btn:text-white" 
                            />
                          </Link>

                          {/* Tombol Hapus (Merah Solid & Ikon Putih Terkunci Ukurannya) */}
                          <button 
                            onClick={() => handleDelete(event.id)}
                            className="flex items-center justify-center w-10 h-10 !bg-red-600 hover:!bg-red-700 text-white rounded-xl transition-all duration-300 shadow-md shadow-red-500/20 border-0 cursor-pointer"
                            title="Hapus Event"
                          >
                            <Trash2 
                              style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px', color: '#ffffff' }} 
                              strokeWidth={2.5} 
                            />
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </SidebarAdmin>
  );
}