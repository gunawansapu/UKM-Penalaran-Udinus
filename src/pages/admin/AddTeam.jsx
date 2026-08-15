// src/pages/admin/AddTeam.jsx
import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Save, Loader2, User, Image as ImageIcon } from 'lucide-react';

export default function AddTeam() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    division: 'ketua',
    desc: '',
    image1: '', // Official
    image2: '', // Executive
    image3: '', // Signature
    image4: '', // Freestyle
  });

  const divisions = [
    { id: 'ketua', label: 'Ketua Umum' },
    { id: 'wakil', label: 'Wakil Ketua' },
    { id: 'sekretaris', label: 'Sekretaris' },
    { id: 'bendahara', label: 'Bendahara' },
    { id: 'humas', label: 'Humas' },
    { id: 'ristek', label: 'Ristek' },
    { id: 'pengmas', label: 'Pengmas' },
    { id: 'medkref', label: 'Medkref' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "team"), {
        ...formData,
        createdAt: new Date().toISOString()
      });

      alert("Anggota tim berhasil ditambahkan!");
      navigate('/admin/manage-team');
    } catch (error) {
      console.error("Error adding team member:", error);
      alert("Gagal menambahkan anggota. Cek console log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section (Tanpa tombol kembali kotak biru yang aneh) */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Tambah Anggota Tim</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Masukkan data pengurus UKM Penalaran ke dalam database.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Info Dasar */}
            <div className="md:col-span-2 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3">
                <User className="!w-5 !h-5 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Informasi Dasar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                  <input type="text" name="name" required onChange={handleChange} value={formData.name} placeholder="Ex: Kayla Assifa Rizqi Utami"
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Jabatan / Role</label>
                  <input type="text" name="role" required onChange={handleChange} value={formData.role} placeholder="Ex: Ketua UKM Penalaran"
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Pilih Divisi</label>
                  <select name="division" required onChange={handleChange} value={formData.division}
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer">
                    {divisions.map(div => (
                      <option key={div.id} value={div.id}>{div.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Deskripsi / Quotes Singkat</label>
                  <textarea name="desc" required onChange={handleChange} value={formData.desc} rows="2" placeholder="Ex: Memimpin dan mengkoordinasi seluruh kegiatan UKM..."
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none" />
                </div>
              </div>
            </div>

            {/* Info Tautan Foto */}
            <div className="md:col-span-2 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3">
                <ImageIcon className="!w-5 !h-5 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Tautan URL Foto (Gunakan link publik Drive / ImgBB)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 1 (Official / Utama)</label>
                  <input type="url" name="image1" required onChange={handleChange} value={formData.image1} placeholder="Wajib diisi..."
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 2 (Executive)</label>
                  <input type="url" name="image2" onChange={handleChange} value={formData.image2} placeholder="Opsional..."
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 3 (Signature)</label>
                  <input type="url" name="image3" onChange={handleChange} value={formData.image3} placeholder="Opsional..."
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">URL Foto 4 (Freestyle)</label>
                  <input type="url" name="image4" onChange={handleChange} value={formData.image4} placeholder="Opsional..."
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-end">
            <button type="submit" disabled={loading} className="group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !bg-indigo-600 hover:!bg-indigo-700 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg hover:shadow-indigo-500/30">
              {loading ? (
                <>
                  <Loader2 className="!w-5 !h-5 animate-spin !text-white !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="!w-5 !h-5 group-hover:scale-110 transition-transform !bg-transparent !text-white" style={{ fill: 'none', stroke: 'currentColor' }} />
                  <span>Simpan Anggota</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}