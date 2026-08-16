// src/pages/admin/EditGallery.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
// 👇 Tambahkan query, where, getDocs, dan writeBatch untuk fitur "Sapu Jagat"
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs, writeBatch } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { 
  Image as ImageIcon, 
  FileText, 
  Save,
  Loader2,
  CheckSquare
} from 'lucide-react';

export default function EditGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // State untuk menyimpan teks asli (sebelum diedit) buat patokan pencarian typo
  const [originalAlt, setOriginalAlt] = useState('');
  
  // State untuk checkbox "Terapkan ke semua"
  const [applyToAll, setApplyToAll] = useState(false);

  const [formData, setFormData] = useState({
    altText: '',
    imageUrl: '' 
  });

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
          // Simpan teks typo-nya sebagai patokan
          setOriginalAlt(data.alt || '');
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
      if (applyToAll && originalAlt !== '') {
        // --- FITUR SAPU JAGAT (BATCH UPDATE) ---
        // 1. Cari semua foto yang keterangan (alt)-nya persis sama dengan yang typo ini
        const q = query(collection(db, 'gallery'), where('alt', '==', originalAlt));
        const querySnapshot = await getDocs(q);
        
        // 2. Gunakan writeBatch untuk mengupdate banyak dokumen sekaligus dengan aman
        const batch = writeBatch(db);
        let updatedCount = 0;

        querySnapshot.forEach((documentSnap) => {
          batch.update(documentSnap.ref, {
            // URL cuma update yg lg dibuka, foto lain URL nya tetap asli
            src: documentSnap.id === id ? formData.imageUrl : documentSnap.data().src, 
            alt: formData.altText, // Keterangan diubah semua ke teks baru
            updatedAt: new Date().toISOString()
          });
          updatedCount++;
        });

        // Eksekusi batch update ke server Firebase
        await batch.commit();

        // Audit Log
        await addDoc(collection(db, 'activity_logs'), {
          action: 'edit', 
          module: 'Galeri',
          description: `memperbaiki typo masal dari "${originalAlt}" menjadi "${formData.altText}" (${updatedCount} foto)`, 
          user: 'Admin', 
          timestamp: serverTimestamp()
        });

        alert(`Berhasil! ${updatedCount} foto dengan keterangan yang sama telah diperbarui.`);

      } else {
        // --- FITUR UPDATE BIASA (SATU FOTO SAJA) ---
        const docRef = doc(db, 'gallery', id);
        await updateDoc(docRef, {
          src: formData.imageUrl,
          alt: formData.altText,
          updatedAt: new Date().toISOString()
        });

        // Audit Log
        await addDoc(collection(db, 'activity_logs'), {
          action: 'edit', 
          module: 'Galeri',
          description: `memperbarui foto galeri "${formData.altText}"`, 
          user: 'Admin', 
          timestamp: serverTimestamp()
        });

        alert('Satu foto berhasil diperbarui!');
      }

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
        
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Edit Foto Galeri</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Perbarui informasi atau link foto dokumentasi UKM Penalaran.</p>
        </div>

        <form onSubmit={handleUpdate} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="grid grid-cols-1 gap-8 mb-8">
            
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
                placeholder="Ex: https://i.ibb.co/dokumentasi.jpg"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

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

            {/* 👇 KOTAK CHECKBOX AJAIB: Hanya muncul kalau teks diubah */}
            {originalAlt !== '' && formData.altText !== originalAlt && (
              <div className="flex items-start gap-3 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl animate-fade-in-up">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="applyToAll"
                    type="checkbox"
                    checked={applyToAll}
                    onChange={(e) => setApplyToAll(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-600 cursor-pointer"
                  />
                </div>
                <label htmlFor="applyToAll" className="text-sm text-indigo-900 cursor-pointer select-none">
                  <span className="font-bold flex items-center gap-1.5 mb-0.5">
                    <CheckSquare className="w-4 h-4" /> Terapkan ke foto lain juga?
                  </span>
                  Ubah semua teks <strong className="line-through opacity-70">"{originalAlt}"</strong> menjadi <strong className="text-indigo-700">"{formData.altText}"</strong> di semua galeri sekaligus.
                </label>
              </div>
            )}

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

          <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg ${applyToAll ? '!bg-indigo-600 hover:!bg-indigo-700 hover:shadow-indigo-500/30' : '!bg-amber-500 hover:!bg-amber-600 hover:shadow-amber-500/30'}`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin !text-white" />
                  <span>{applyToAll ? 'Menyapu Bersih Typo...' : 'Menyimpan...'}</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{applyToAll ? 'Update Massal' : 'Update 1 Foto'}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}