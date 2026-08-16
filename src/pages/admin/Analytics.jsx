import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Activity, Clock, PlusCircle, Pencil, Trash2, TrendingUp, Award, Newspaper, Calendar, Users, Eye, Images } from 'lucide-react';

// 👇 IMPORT SIDEBAR ADMIN
import SidebarAdmin from '../../components/admin/SidebarAdmin';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalViews: 0,
    totalEvents: 0,
    totalTeam: 0,
    totalGallery: 0, // <--- Tambahan state galeri
  });
  
  const [topNews, setTopNews] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const newsRef = collection(db, 'news');
        const newsSnapshot = await getDocs(newsRef);
        
        let viewsCount = 0;
        let newsCount = newsSnapshot.size;
        
        newsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.views) viewsCount += data.views;
        });

        const topNewsQuery = query(newsRef, orderBy('views', 'desc'), limit(5));
        const topNewsSnapshot = await getDocs(topNewsQuery);
        
        const topNewsData = topNewsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            shortTitle: data.title.length > 18 ? data.title.substring(0, 18) + '...' : data.title,
            views: data.views || 0,
            category: data.category || 'Umum'
          };
        });

        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const teamSnapshot = await getDocs(collection(db, 'team'));
        const gallerySnapshot = await getDocs(collection(db, 'gallery')); // <--- Ambil data galeri dari Firebase

        // === AMBIL DATA AUDIT LOGS ===
        try {
          const logsRef = collection(db, 'activity_logs');
          const logsQuery = query(logsRef, orderBy('timestamp', 'desc'), limit(10));
          const logsSnapshot = await getDocs(logsQuery);
          const logsData = logsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setActivityLogs(logsData);
        } catch (logError) {
          console.warn("Collection activity_logs belum ada.");
        }

        setStats({
          totalNews: newsCount,
          totalViews: viewsCount,
          totalEvents: eventsSnapshot.size,
          totalTeam: teamSnapshot.size,
          totalGallery: gallerySnapshot.size, // <--- Masukkan total galeri ke state
        });
        setTopNews(topNewsData);

      } catch (error) {
        console.error("Gagal mengambil data analitik: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Format Waktu untuk Log
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Baru saja';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // Fungsi untuk menentukan Ikon & Badge aksi
  const getActionBadge = (action) => {
    switch (action) {
      case 'tambah': 
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100"><PlusCircle size={12} /> Tambah</span>;
      case 'edit': 
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100"><Pencil size={12} /> Edit</span>;
      case 'hapus': 
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100"><Trash2 size={12} /> Hapus</span>;
      default: 
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100"><Activity size={12} /> Sistem</span>;
    }
  };

  if (loading) return (
    <SidebarAdmin>
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    </SidebarAdmin>
  );

  return (
    <SidebarAdmin>
      <div className="p-6 md:p-10 max-w-7xl mx-auto font-sans bg-slate-50/50 min-h-screen">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Dashboard Analitik</h1>
            <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Ringkasan performa konten dan audit aktivitas sistem secara real-time.</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs font-bold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Sistem Aktif & Terhubung
          </div>
        </div>
        
        {/* 1. Baris Overview Cards (Kini dengan 5 Kartu Statistik Termasuk Galeri) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          
          {/* Card Total Berita */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all duration-300">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Berita</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.totalNews}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Newspaper size={26} />
            </div>
          </div>

          {/* Card Total Views */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Views</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.totalViews.toLocaleString()}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Eye size={26} />
            </div>
          </div>

          {/* Card Total Kegiatan */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center justify-between group hover:border-purple-200 transition-all duration-300">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Kegiatan</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.totalEvents}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Calendar size={26} />
            </div>
          </div>

          {/* Card Total Pengurus */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center justify-between group hover:border-amber-200 transition-all duration-300">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Pengurus</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.totalTeam}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users size={26} />
            </div>
          </div>

          {/* Card Total Galeri (Baru) */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center justify-between group hover:border-pink-200 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Galeri</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.totalGallery}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Images size={26} />
            </div>
          </div>

        </div>

        {/* Grid Layout untuk Grafik dan Tabel Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* 2. Bagian Grafik (Horizontal Bar Chart) */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900">Grafik Views Berita</h2>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Top 5 Berita</span>
            </div>
            
            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={topNews} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="shortTitle" type="category" width={130} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '1rem', border: 'none', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="views" name="Jumlah Views" fill="#4f46e5" radius={[0, 8, 8, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Bagian Tabel (Leaderboard Paling Banyak Dibaca) */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900">Top 5 Paling Dibaca</h2>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">Leaderboard</span>
            </div>

            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-4 pl-2">Judul Berita</th>
                    <th className="pb-4">Kategori</th>
                    <th className="pb-4 text-center pr-2">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {topNews.length > 0 ? (
                    topNews.map((news, index) => (
                      <tr key={news.id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="py-4 pl-2 font-bold text-slate-800 max-w-[220px] truncate" title={news.title}>
                          <span className="text-slate-400 mr-2">#{index + 1}</span> {news.title}
                        </td>
                        <td className="py-4">
                          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 uppercase tracking-wider">
                            {news.category}
                          </span>
                        </td>
                        <td className="py-4 pr-2 text-center font-black text-emerald-600">
                          {news.views} 👀
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="py-8 text-center text-slate-400 font-medium">Belum ada data berita.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. BAGIAN AUDIT LOG (RIWAYAT AKTIVITAS SISTEM) */}
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Activity size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Riwayat Aktivitas Sistem (Audit Log)</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Catatan riwayat perubahan data yang dilakukan oleh admin</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-xl">10 Log Terbaru</span>
          </div>
          
          <div className="space-y-3">
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0">
                      {getActionBadge(log.action)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        <span className="text-indigo-600">{log.user || 'Admin'}</span> <span className="font-medium text-slate-600">{log.description}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 font-medium">
                        <span className="font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                          Modul {log.module}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 sm:text-right flex-shrink-0 pl-10 sm:pl-0">
                    <Clock size={13} className="text-slate-400" />
                    <span>{formatTime(log.timestamp)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <Activity className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-600">Belum ada riwayat aktivitas yang tercatat.</p>
                <p className="text-xs text-slate-400 mt-1">Aksi tambah, edit, atau hapus konten akan muncul di sini secara otomatis.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </SidebarAdmin>
  );
};

export default Analytics;