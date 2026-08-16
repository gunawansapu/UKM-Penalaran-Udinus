// src/pages/admin/ManageNews.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
// 👇 Tambahkan addDoc dan serverTimestamp di import ini
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Link } from 'react-router-dom';
import { Edit, Trash2, ExternalLink, Plus, Loader2, ImageOff, Inbox, FileText } from 'lucide-react';

export default function ManageNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      dataList.sort((a, b) => {
        const timeA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const timeB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return timeB - timeA;
      });

      setNewsList(dataList);
    } catch (error) {
      console.error("Error fetching news: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus berita ini?");
    if (!confirmDelete) return;

    try {
      // Cari tau judul berita sebelum dihapus
      const newsToDelete = newsList.find(news => news.id === id);
      const newsTitle = newsToDelete ? newsToDelete.title : 'Tidak diketahui';

      await deleteDoc(doc(db, "news", id));

      // 👇 CCTV: CATAT KE AUDIT LOG
      await addDoc(collection(db, 'activity_logs'), {
        action: 'hapus', 
        module: 'Berita',
        description: `menghapus berita berjudul "${newsTitle}"`, 
        user: 'Admin', 
        timestamp: serverTimestamp()
      });
      // 👆 SELESAI

      alert("Berita berhasil dihapus!"); 
      setNewsList(newsList.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Gagal menghapus berita.");
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-7xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Kelola Berita & Prestasi</h1>
            <p className="text-slate-500 font-medium mt-1 text-base">Manajemen seluruh informasi, artikel, dan prestasi UKM Penalaran.</p>
          </div>
          <Link
            to="/admin/add-news"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold !text-white !bg-indigo-600 hover:!bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 active:scale-95 border-0"
          >
            <Plus size={20} className="!stroke-white" strokeWidth={3} />
            <span>Tambah Berita</span>
          </Link>
        </div>

        {/* Konten Utama */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50/30">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Memuat data berita...</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-5">Foto</th>
                    <th className="px-6 py-5 w-1/3">Judul Berita</th>
                    <th className="px-6 py-5">Kategori</th>
                    <th className="px-6 py-5">Tanggal</th>
                    <th className="px-6 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {newsList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                            <Inbox className="w-8 h-8 text-slate-400" />
                          </div>
                          <h3 className="text-slate-800 font-bold text-lg mb-1">Belum ada berita</h3>
                          <p className="text-slate-500 text-sm font-medium">Klik tombol "Tambah Berita" di atas untuk mulai mempublikasikan.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    newsList.map((news) => {
                      const imgSrc = news.imageUrl || news.image;
                      const dateStr = news.createdAt?.toDate 
                        ? news.createdAt.toDate().toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) 
                        : (news.date || '-');

                      return (
                        <tr key={news.id} className="hover:bg-slate-50/80 transition-colors group">
                          
                          {/* Kolom Foto */}
                          <td className="px-6 py-4">
                            {imgSrc ? (
                              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-white relative flex-shrink-0">
                                <img 
                                  src={imgSrc} 
                                  alt={news.title} 
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
                                <FileText className="w-6 h-6 text-slate-300" />
                              </div>
                            )}
                          </td>

                          {/* Kolom Judul */}
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900 text-base max-w-xs sm:max-w-sm md:max-w-md truncate" title={news.title}>
                              {news.title}
                            </div>
                          </td>

                          {/* Kolom Kategori */}
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider">
                              {news.category || 'Informasi'}
                            </span>
                          </td>

                          {/* Kolom Tanggal */}
                          <td className="px-6 py-4">
                            <span className="text-slate-500 font-medium text-sm">
                              {dateStr}
                            </span>
                          </td>

                          {/* Kolom Aksi */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2.5">
                              
                              {/* Tombol Lihat */}
                              <Link 
                                to={`/news/${news.id}`} 
                                target="_blank"
                                className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                                title="Lihat Berita"
                              >
                                <ExternalLink 
                                  style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }} 
                                  strokeWidth={2.5} 
                                  className="text-slate-600 group-hover/btn:text-white" 
                                />
                              </Link>

                              {/* Tombol Edit */}
                              <Link 
                                to={`/admin/edit-news/${news.id}`}
                                className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-amber-500 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                                title="Edit Berita"
                              >
                                <Edit 
                                  style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }} 
                                  strokeWidth={2.5} 
                                  className="text-slate-600 group-hover/btn:text-white" 
                                />
                              </Link>

                              {/* Tombol Hapus (Merah Solid & Ikon Putih Terkunci Ukurannya) */}
                              <button 
                                onClick={() => handleDelete(news.id)}
                                className="flex items-center justify-center w-10 h-10 !bg-red-600 hover:!bg-red-700 text-white rounded-xl transition-all duration-300 shadow-md shadow-red-500/20 border-0 cursor-pointer"
                                title="Hapus Berita"
                              >
                                <Trash2 
                                  style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px', color: '#ffffff' }} 
                                  strokeWidth={2.5} 
                                />
                              </button>
                              
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </SidebarAdmin>
  );
}