// src/pages/admin/EditGallery.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
// 👇 Tambahkan collection, addDoc, dan serverTimestamp di import ini
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { 
  Image as ImageIcon, 
  FileText, 
  Save,
  Loader2
} from 'lucide-react';

export default function EditGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    altText: '',
    imageUrl: '' 
  });

  // Ambil data foto galeri yang sudah ada berdasarkan ID
  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const docRef = doc(db, 'gallery', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            altText: data.alt || '',
            imageUrl: data.src || '' 
          });
        } else {
          alert('Foto tidak ditemukan!');
          navigate('/admin/manage-gallery');
        }
      } catch (error) {
        console.error('Error fetching gallery item: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItem();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      alert("Masukkan link URL foto terlebih dahulu!");
      return;
    }
    
    setSaving(true);

    try {
      const docRef = doc(db, 'gallery', id);
      await updateDoc(docRef, {
        src: formData.imageUrl,
        alt: formData.altText,
        updatedAt: new Date().toISOString()
      });

      // 👇 CCTV: CATAT KE AUDIT LOG
      await addDoc(collection(db, 'activity_logs'), {
        action: 'edit', 
        module: 'Galeri',
        description: `memperbarui foto galeri "${formData.altText}"`, 
        user: 'Admin', 
        timestamp: serverTimestamp()
      });
      // 👆 SELESAI

      alert('Foto berhasil diperbarui!');
      navigate('/admin/manage-gallery'); 
    } catch (error) {
      console.error("Error updating photo:", error);
      alert("Gagal memperbarui foto.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SidebarAdmin>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Memuat data foto...</p>
        </div>
      </SidebarAdmin>
    );
  }

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Edit Foto Galeri</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Perbarui informasi atau link foto dokumentasi UKM Penalaran.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleUpdate} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="grid grid-cols-1 gap-8 mb-8">
            
            {/* Field URL Gambar */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                URL / Link Foto (Penting)
              </label>
              <input 
                type="url" 
                name="imageUrl" 
                required 
                onChange={handleChange} 
                value={formData.imageUrl}
                placeholder="Ex: https://i.ibb.co/dokumentasi.jpg atau link Google Drive"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Field Keterangan / Alt Text */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <FileText className="w-4 h-4 text-indigo-500" />
                Judul / Keterangan Foto
              </label>
              <input 
                type="text" 
                name="altText" 
                required 
                onChange={handleChange} 
                value={formData.altText}
                placeholder="Ex: Juara 2 LKTIN Nasional 2026 di Universitas Brawijaya"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Preview Foto (Opsional, sangat membantu UX) */}
            {formData.imageUrl && (
              <div className="mt-4">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1 mb-3">
                  Preview Foto Saat Ini:
                </label>
                <div className="w-48 h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              </div>
            )}

          </div>

          {/* Area Tombol */}
          <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !bg-amber-500 hover:!bg-amber-600 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg hover:shadow-amber-500/30"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin !text-white" />
                  <span>Menyimpan Perubahan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Update Foto Galeri</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}