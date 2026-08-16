// src/pages/admin/ManageRecruitment.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
// 👇 Tambahkan collection, addDoc, dan serverTimestamp di import ini
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Save, Loader2, QrCode, ToggleRight, Link as LinkIcon } from 'lucide-react';

export default function ManageRecruitment() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    isOpen: true, 
    registrationUrl: '',
    barcodeImage: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'recruitment');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching recruitment settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'recruitment'), formData);

      // 👇 CCTV: CATAT KE AUDIT LOG
      await addDoc(collection(db, 'activity_logs'), {
        action: 'edit', 
        module: 'Sistem',
        description: `memperbarui pengaturan Pendaftaran & Barcode (Status: ${formData.isOpen ? 'BUKA' : 'TUTUP'})`, 
        user: 'Admin', 
        timestamp: serverTimestamp()
      });
      // 👆 SELESAI

      alert('Pengaturan pendaftaran berhasil diperbarui!');
    } catch (error) {
      console.error("Error saving settings:", error);
      alert('Gagal menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SidebarAdmin>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="!w-10 !h-10 !text-indigo-600 animate-spin mb-4 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          <p className="text-slate-500 font-medium">Memuat pengaturan...</p>
        </div>
      </SidebarAdmin>
    );
  }

  return (
    <SidebarAdmin>
      <div className="max-w-4xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Title */}
        <div className="mb-10 mt-4 md:mt-0 flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner">
            <QrCode className="!w-7 !h-7 !text-indigo-600 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Kelola Pendaftaran & Barcode</h1>
            <p className="text-slate-500 font-medium mt-1 text-base">Atur status tombol pendaftaran dan gambar QR Barcode untuk halaman publik.</p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-8">
          
          {/* Status Pendaftaran (Buka / Tutup) */}
          <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 space-y-4">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <ToggleRight className="!w-5 !h-5 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              Status Tombol Pendaftaran
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isOpen: true })}
                style={{
                  all: 'unset',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '1rem',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  backgroundColor: formData.isOpen ? '#059669' : '#ffffff',
                  color: formData.isOpen ? '#ffffff' : '#475569',
                  border: formData.isOpen ? '2px solid #059669' : '2px solid #e2e8f0',
                  boxShadow: formData.isOpen ? '0 10px 20px -5px rgba(5, 150, 105, 0.4)' : 'none'
                }}
              >
                🟢 BUKA (Daftar Sekarang)
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, isOpen: false })}
                style={{
                  all: 'unset',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '1rem',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  backgroundColor: !formData.isOpen ? '#e11d48' : '#ffffff',
                  color: !formData.isOpen ? '#ffffff' : '#475569',
                  border: !formData.isOpen ? '2px solid #e11d48' : '2px solid #e2e8f0',
                  boxShadow: !formData.isOpen ? '0 10px 20px -5px rgba(225, 29, 72, 0.4)' : 'none'
                }}
              >
                🔒 TUTUP (Pendaftaran Ditutup)
              </button>
            </div>
          </div>

          {/* URL Google Form / Link Pendaftaran */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <LinkIcon className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              Link Google Form Pendaftaran <span className="text-xs text-slate-400 font-normal">(Wajib)</span>
            </label>
            <input 
              type="url" 
              value={formData.registrationUrl || ''} 
              onChange={e => setFormData({ ...formData, registrationUrl: e.target.value })} 
              placeholder="Ex: https://docs.google.com/forms/..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
            />
          </div>

          {/* URL Barcode Image */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <QrCode className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              URL Link Gambar Barcode / QR <span className="text-xs text-slate-400 font-normal">(Opsional / Boleh Kosong)</span>
            </label>
            <input 
              type="url" 
              value={formData.barcodeImage || ''} 
              onChange={e => setFormData({ ...formData, barcodeImage: e.target.value })} 
              placeholder="Ex: https://i.ibb.co/xxxxx/barcode.png"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
            />
            
            {/* Preview Barcode */}
            {formData.barcodeImage && (
              <div className="mt-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 w-fit">
                <p className="text-xs font-bold text-slate-500 mb-2">Preview Barcode:</p>
                <img 
                  src={formData.barcodeImage} 
                  alt="Preview Barcode" 
                  className="h-32 w-32 object-contain rounded-xl shadow-sm border border-slate-200 bg-white p-2"
                  onError={e => e.target.style.display = 'none'} 
                />
              </div>
            )}
          </div>

          {/* Tombol Simpan */}
          <div className="pt-8 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              style={{ all: 'unset', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', maxWidth: '240px', padding: '16px 28px', backgroundColor: '#f59e0b', color: '#ffffff', fontWeight: '700', fontSize: '1rem', borderRadius: '1rem', boxShadow: '0 10px 20px -5px rgba(245, 158, 11, 0.4)', textAlign: 'center', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Simpan Pengaturan</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}