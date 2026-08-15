// src/pages/admin/ManageGallery.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Link } from 'react-router-dom';
import { Trash2, Edit, ExternalLink, Plus, Loader2, ImageOff, Inbox } from 'lucide-react';

export default function ManageGallery() {
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dataList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setGalleryList(dataList);
    } catch (error) {
      console.error("Error fetching gallery: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus foto ini?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "gallery", id));
      alert("Foto berhasil dihapus!");
      setGalleryList(galleryList.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting photo: ", error);
      alert("Gagal menghapus foto.");
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-7xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Kelola Galeri</h1>
            <p className="text-slate-500 font-medium mt-1 text-base">Manajemen dokumentasi foto kegiatan dan prestasi UKM Penalaran.</p>
          </div>
          <Link
            to="/admin/add-gallery"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold !text-white !bg-indigo-600 hover:!bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 active:scale-95 border-0"
          >
            <Plus size={20} className="!stroke-white" strokeWidth={3} />
            <span>Tambah Foto</span>
          </Link>
        </div>

        {/* Konten Utama */}
        {loading ? (
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center py-20 px-6">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Memuat data galeri...</p>
          </div>
        ) : galleryList.length === 0 ? (
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center py-20 px-6">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
              <Inbox className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-slate-800 font-bold text-lg mb-1">Galeri Masih Kosong</h3>
            <p className="text-slate-500 text-sm font-medium">Klik tombol "Tambah Foto" di atas untuk mengunggah dokumentasi.</p>
          </div>
        ) : (
          /* Grid Layout untuk Kartu Foto */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryList.map((item) => {
              const dateStr = item.createdAt 
                ? new Date(item.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }) 
                : '-';

              return (
                <div key={item.id} className="group relative bg-white rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col">
                  
                  {/* Area Gambar */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-slate-100 items-center justify-center flex-col gap-2">
                      <ImageOff className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>

                  {/* Konten Teks & Tombol Aksi */}
                  <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                    
                    {/* Judul & Tanggal */}
                    <div>
                      <p className="text-slate-800 font-bold text-sm leading-snug line-clamp-2 mb-1.5" title={item.alt}>
                        {item.alt || 'Tanpa Keterangan'}
                      </p>
                      <p className="text-slate-400 text-xs font-medium">
                        {dateStr}
                      </p>
                    </div>

                    {/* DERETAN TOMBOL (100% COPY PASTE DARI MANAGE NEWS) */}
                    <div className="flex items-center justify-center gap-2.5 pt-4 border-t border-slate-100 mt-auto">
                      
                      {/* Tombol Lihat (Murni pakai kodingan ManageNews mu) */}
                      <Link 
                        to="/galeri" 
                        target="_blank"
                        className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                        title="Lihat Galeri"
                      >
                        <ExternalLink 
                          style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }} 
                          strokeWidth={2.5} 
                          className="text-slate-600 group-hover/btn:text-white" 
                        />
                      </Link>

                      {/* Tombol Edit (Murni pakai kodingan ManageNews mu) */}
                      <Link 
                        to={`/admin/edit-gallery/${item.id}`}
                        className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-amber-500 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                        title="Edit Foto"
                      >
                        <Edit 
                          style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }} 
                          strokeWidth={2.5} 
                          className="text-slate-600 group-hover/btn:text-white" 
                        />
                      </Link>

                      {/* Tombol Hapus (Murni pakai kodingan ManageNews mu) */}
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center justify-center w-10 h-10 !bg-red-600 hover:!bg-red-700 text-white rounded-xl transition-all duration-300 shadow-md shadow-red-500/20 border-0 cursor-pointer"
                        title="Hapus Foto"
                      >
                        <Trash2 
                          style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px', color: '#ffffff' }} 
                          strokeWidth={2.5} 
                        />
                      </button>
                      
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </SidebarAdmin>
  );
}