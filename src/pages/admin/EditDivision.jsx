// src/pages/admin/EditDivision.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Save, Loader2, Image as ImageIcon, FileText, ArrowLeft, Layout } from 'lucide-react';

export default function EditDivision() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ groupImage: '', groupDesc: '' });

  const divisionNames = {
    ketua: 'Ketua Umum', wakil: 'Wakil Ketua', sekretaris: 'Sekretaris',
    bendahara: 'Bendahara', humas: 'Divisi Humas', ristek: 'Divisi Ristek',
    pengmas: 'Divisi Pengmas', medkref: 'Divisi Medkref'
  };

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const docRef = doc(db, 'division_settings', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching division settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDivision();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'division_settings', id), formData);
      alert('Pengaturan divisi berhasil diperbarui!');
      navigate('/admin/manage-divisions');
    } catch (error) {
      console.error("Error updating division:", error);
      alert('Gagal memperbarui pengaturan divisi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SidebarAdmin>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="!w-10 !h-10 !text-indigo-600 animate-spin mb-4 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          <p className="text-slate-500 font-medium">Memuat pengaturan divisi...</p>
        </div>
      </SidebarAdmin>
    );
  }

  return (
    <SidebarAdmin>
      <div className="max-w-4xl mx-auto pb-12 animate-fade-in-up">
        
        {/* TOMBOL KEMBALI KEBAL CSS GLOBAL (Inline Style Mutlak) */}
        <button
          onClick={() => navigate('/admin/manage-divisions')}
          style={{
            all: 'unset',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            fontWeight: '600',
            fontSize: '0.95rem',
            marginBottom: '24px',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#4f46e5';
            e.currentTarget.style.borderColor = '#c7d2fe';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          <ArrowLeft style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor' }} /> 
          <span>Kembali ke Kelola Divisi</span>
        </button>

        {/* Header Title */}
        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner">
            <Layout className="!w-7 !h-7 !text-indigo-600 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Edit Divisi: {divisionNames[id] || id}
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-base">Perbarui foto grup bersama dan sub-teks untuk halaman publik.</p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-8">
          
          {/* Field URL Foto Grup */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <ImageIcon className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              URL Link Foto Grup Bersama
            </label>
            <input 
              type="url" 
              value={formData.groupImage} 
              onChange={e => setFormData({...formData, groupImage: e.target.value})} 
              required
              placeholder="Ex: https://i.ibb.co/grup.jpg atau link Google Drive"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
            />
            
            {/* Preview Foto */}
            {formData.groupImage && (
              <div className="mt-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 w-fit">
                <p className="text-xs font-bold text-slate-500 mb-2">Preview Foto Saat Ini:</p>
                <img 
                  src={formData.groupImage} 
                  alt="Preview" 
                  className="h-36 w-auto object-cover rounded-xl shadow-sm border border-slate-200"
                  onError={e => e.target.style.display = 'none'} 
                />
              </div>
            )}
          </div>

          {/* Field Deskripsi Divisi */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <FileText className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              Deskripsi / Sub-teks Divisi
            </label>
            <textarea 
              value={formData.groupDesc} 
              onChange={e => setFormData({...formData, groupDesc: e.target.value})} 
              required
              rows="3"
              placeholder="Ex: Pimpinan UKM Penalaran Periode 2025/2026..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none" 
            />
          </div>

          {/* Tombol Simpan Kebal CSS Global */}
          <div className="pt-8 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              style={{ 
                all: 'unset', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px', 
                width: '100%', 
                maxWidth: '240px', 
                padding: '16px 28px', 
                backgroundColor: '#f59e0b', 
                color: '#ffffff', 
                fontWeight: '700', 
                fontSize: '1rem', 
                borderRadius: '1rem', 
                boxShadow: '0 10px 20px -5px rgba(245, 158, 11, 0.4)',
                textAlign: 'center',
                boxSizing: 'border-box',
                cursor: 'pointer',
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}