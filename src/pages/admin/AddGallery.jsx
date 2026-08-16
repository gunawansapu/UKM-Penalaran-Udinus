// src/pages/admin/AddGallery.jsx
import React, { useState } from 'react';
import { db } from '../../config/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { 
  Image as ImageIcon, 
  FileText, 
  Save,
  Layers
} from 'lucide-react';

export default function AddGallery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState('single'); // 'single' atau 'multiple'
  
  const [formData, setFormData] = useState({
    altText: '',
    imageUrl: '', // Untuk single upload
    multipleUrls: '' // Untuk multiple upload
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (uploadType === 'single') {
        if (!formData.imageUrl) {
          alert("Masukkan link URL foto terlebih dahulu!");
          setLoading(false);
          return;
        }

        await addDoc(collection(db, "gallery"), {
          src: formData.imageUrl,
          alt: formData.altText,
          createdAt: new Date().toISOString()
        });

        // Audit Log
        await addDoc(collection(db, 'activity_logs'), {
          action: 'tambah', 
          module: 'Galeri',
          description: `menambahkan foto galeri "${formData.altText}"`, 
          user: 'Admin', 
          timestamp: serverTimestamp()
        });

        alert("Foto berhasil ditambahkan ke Galeri!");

      } else {
        // MODE MULTIPLE UPLOAD
        const urlList = formData.multipleUrls.split('\n').map(url => url.trim()).filter(url => url !== '');

        if (urlList.length === 0) {
          alert("Masukkan minimal 1 link gambar di area teks!");
          setLoading(false);
          return;
        }

        const uploadPromises = urlList.map((url) => {
          return addDoc(collection(db, "gallery"), {
            src: url,
            alt: formData.altText,
            createdAt: new Date().toISOString()
          });
        });

        await Promise.all(uploadPromises);

        // Audit Log
        await addDoc(collection(db, 'activity_logs'), {
          action: 'tambah', 
          module: 'Galeri',
          description: `menambahkan ${urlList.length} foto galeri massal "${formData.altText}"`, 
          user: 'Admin', 
          timestamp: serverTimestamp()
        });

        alert(`Berhasil mengunggah ${urlList.length} foto dokumentasi!`);
      }

      navigate('/admin/manage-gallery'); 

    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menambahkan foto. Cek console log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Tambah Foto Galeri</h1>
            <p className="text-slate-500 font-medium mt-2 text-base">Publikasikan dokumentasi kegiatan atau prestasi UKM Penalaran.</p>
          </div>
          
          {/* 👇 PERBAIKAN: Toggles Upload Type Menggunakan DIV agar kebal CSS Global */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit border border-slate-200 shadow-sm">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setUploadType('single')}
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer select-none"
              style={{
                backgroundColor: uploadType === 'single' ? '#ffffff' : 'transparent',
                color: uploadType === 'single' ? '#4f46e5' : '#64748b',
                boxShadow: uploadType === 'single' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              Upload Satuan
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setUploadType('multiple')}
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer select-none"
              style={{
                backgroundColor: uploadType === 'multiple' ? '#ffffff' : 'transparent',
                color: uploadType === 'multiple' ? '#4f46e5' : '#64748b',
                boxShadow: uploadType === 'multiple' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              Upload Massal
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="grid grid-cols-1 gap-8 mb-8">
            
            {/* Field Keterangan / Alt Text (Digunakan di kedua mode) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <FileText className="w-4 h-4 text-indigo-500" />
                Judul / Keterangan Kegiatan
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
              {uploadType === 'multiple' && (
                <p className="text-xs text-slate-500 ml-1 mt-1">Keterangan ini akan dipakai otomatis untuk semua link foto di bawah.</p>
              )}
            </div>

            {uploadType === 'single' ? (
              /* Field URL Gambar (Single) */
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <ImageIcon className="w-4 h-4 text-indigo-500" />
                  URL / Link Foto
                </label>
                <input 
                  type="url" 
                  name="imageUrl" 
                  onChange={handleChange} 
                  value={formData.imageUrl}
                  placeholder="Ex: https://i.ibb.co/dokumentasi.jpg"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
                  required={uploadType === 'single'}
                />
              </div>
            ) : (
              /* Field URL Gambar (Multiple) */
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  Link Foto Massal (Pisahkan dengan Enter)
                </label>
                <textarea 
                  name="multipleUrls" 
                  onChange={handleChange} 
                  value={formData.multipleUrls}
                  placeholder={`https://link-gambar-1.com/foto1.jpg\nhttps://link-gambar-2.com/foto2.jpg\nhttps://link-gambar-3.com/foto3.jpg`}
                  rows={6}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 whitespace-pre-wrap" 
                  required={uploadType === 'multiple'}
                />
              </div>
            )}

          </div>

          <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !bg-indigo-600 hover:!bg-indigo-700 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg hover:shadow-indigo-500/30"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 !text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mengunggah Foto...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Simpan ke Galeri</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}