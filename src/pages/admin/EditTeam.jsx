// src/pages/admin/EditTeam.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Save, Loader2, User, Image as ImageIcon, Users } from 'lucide-react';

export default function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', role: '', division: 'ketua', desc: '', 
    image1: '', image2: '', image3: '', image4: '',
  });

  const divisions = [
    { id: 'ketua', label: 'Ketua Umum' }, { id: 'wakil', label: 'Wakil Ketua' },
    { id: 'sekretaris', label: 'Sekretaris' }, { id: 'bendahara', label: 'Bendahara' },
    { id: 'humas', label: 'Humas' }, { id: 'ristek', label: 'Ristek' },
    { id: 'pengmas', label: 'Pengmas' }, { id: 'medkref', label: 'Medkref' }
  ];

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docRef = doc(db, 'team', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          alert('Data anggota tidak ditemukan!');
          navigate('/admin/manage-team');
        }
      } catch (error) {
        console.error('Error fetching member:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docRef = doc(db, 'team', id);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      alert('Berhasil diperbarui!');
      navigate('/admin/manage-team');
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Gagal mengupdate.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SidebarAdmin>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="!w-10 !h-10 !text-indigo-600 animate-spin mb-4 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          <p className="text-slate-500 font-medium">Memuat data anggota...</p>
        </div>
      </SidebarAdmin>
    );
  }

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section (Bersih tanpa tombol kembali) */}
        <div className="mb-10 flex items-center gap-4 mt-4 md:mt-0">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center shadow-inner">
            <Users className="!w-7 !h-7 !text-amber-600 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Edit Anggota Tim</h1>
            <p className="text-slate-500 font-medium mt-1 text-base">Perbarui profil atau tautan foto pengurus UKM Penalaran.</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info Dasar */}
            <div className="md:col-span-2 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3">
                <User className="!w-5 !h-5 !text-amber-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Informasi Dasar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                  <input type="text" name="name" required onChange={handleChange} value={formData.name} 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Jabatan / Role</label>
                  <input type="text" name="role" required onChange={handleChange} value={formData.role} 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Pilih Divisi</label>
                  <select name="division" required onChange={handleChange} value={formData.division}
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 cursor-pointer">
                    {divisions.map(div => (
                      <option key={div.id} value={div.id}>{div.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Deskripsi / Quotes Singkat</label>
                  <textarea name="desc" required onChange={handleChange} value={formData.desc} rows="2" 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 resize-none" />
                </div>
              </div>
            </div>

            {/* Info Tautan Foto */}
            <div className="md:col-span-2 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3">
                <ImageIcon className="!w-5 !h-5 !text-amber-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Tautan URL Foto (Gunakan link publik Drive / ImgBB)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 1 (Official / Utama)</label>
                  <input type="url" name="image1" required onChange={handleChange} value={formData.image1} 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 2 (Executive)</label>
                  <input type="url" name="image2" onChange={handleChange} value={formData.image2} 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 3 (Signature)</label>
                  <input type="url" name="image3" onChange={handleChange} value={formData.image3} 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 4 (Freestyle)</label>
                  <input type="url" name="image4" onChange={handleChange} value={formData.image4} 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" />
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={saving} 
              className="group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !bg-amber-500 hover:!bg-amber-600 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg hover:shadow-amber-500/30 cursor-pointer"
              style={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" style={{ width: '20px', height: '20px', fill: 'none', stroke: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Mengupdate...</span>
                </>
              ) : (
                <>
                  <Save style={{ width: '20px', height: '20px', fill: 'none', stroke: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Update Anggota</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}