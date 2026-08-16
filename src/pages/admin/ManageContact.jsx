// src/pages/admin/ManageContact.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
// 👇 Tambahkan collection, addDoc, dan serverTimestamp di import ini
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { 
  Save, 
  Loader2, 
  Phone, 
  User, 
  Link as LinkIcon, 
  MessageCircle, 
  Megaphone 
} from 'lucide-react';

export default function ManageContact() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    cp1Name: '',
    cp1Wa: '',
    cp2Name: '',
    cp2Wa: '',
    medpartLink: ''
  });

  // Ambil data kontak saat ini dari Firestore
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const docRef = doc(db, "settings", "contact_info");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchContactData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // setDoc akan menimpa data yang lama dengan yang baru di ID 'contact_info'
      await setDoc(doc(db, "settings", "contact_info"), formData);

      // 👇 CCTV: CATAT KE AUDIT LOG
      await addDoc(collection(db, 'activity_logs'), {
        action: 'edit', 
        module: 'Sistem', // Dikategorikan ke modul Sistem karena ini pengaturan inti
        description: `memperbarui nomor Kontak dan Link Medpart`, 
        user: 'Admin', 
        timestamp: serverTimestamp()
      });
      // 👆 SELESAI

      alert("Pengaturan kontak berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Gagal memperbarui kontak.");
    } finally {
      setLoading(false);
    }
  };

  // Loading Screen saat pertama kali buka halaman
  if (fetching) {
    return (
      <SidebarAdmin>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="!w-10 !h-10 !text-indigo-600 animate-spin mb-4 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          <p className="text-slate-500 font-medium">Memuat data kontak...</p>
        </div>
      </SidebarAdmin>
    );
  }

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Pengaturan Kontak & CP</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Kelola nomor WhatsApp penghubung dan tautan media partner UKM Penalaran.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-8">
          
          {/* --- BLOK CONTACT PERSON 1 --- */}
          <div className="p-6 md:p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-inner">
                <MessageCircle className="!w-6 !h-6 !text-emerald-600 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Contact Person 1</h3>
                <p className="text-sm text-slate-500 font-medium">Penanggung jawab utama (WhatsApp)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <User className="!w-4 !h-4 !text-emerald-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Nama CP 1
                </label>
                <input 
                  type="text" 
                  name="cp1Name" 
                  value={formData.cp1Name} 
                  onChange={handleChange} 
                  required
                  placeholder="Ex: Salwa"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <Phone className="!w-4 !h-4 !text-emerald-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Nomor WA (Awali dengan 62)
                </label>
                <input 
                  type="text" 
                  name="cp1Wa" 
                  value={formData.cp1Wa} 
                  onChange={handleChange} 
                  required
                  placeholder="Ex: 6283107154446"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" 
                />
              </div>
            </div>
          </div>

          {/* --- BLOK CONTACT PERSON 2 --- */}
          <div className="p-6 md:p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-inner">
                <MessageCircle className="!w-6 !h-6 !text-emerald-600 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Contact Person 2</h3>
                <p className="text-sm text-slate-500 font-medium">Penanggung jawab alternatif (WhatsApp)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <User className="!w-4 !h-4 !text-emerald-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Nama CP 2
                </label>
                <input 
                  type="text" 
                  name="cp2Name" 
                  value={formData.cp2Name} 
                  onChange={handleChange} 
                  required
                  placeholder="Ex: Nadya Nissa"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <Phone className="!w-4 !h-4 !text-emerald-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Nomor WA (Awali dengan 62)
                </label>
                <input 
                  type="text" 
                  name="cp2Wa" 
                  value={formData.cp2Wa} 
                  onChange={handleChange} 
                  required
                  placeholder="Ex: 6285602024636"
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" 
                />
              </div>
            </div>
          </div>

          {/* --- BLOK MEDIA PARTNER --- */}
          <div className="p-6 md:p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center shadow-inner">
                <Megaphone className="!w-6 !h-6 !text-purple-600 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Media Partner</h3>
                <p className="text-sm text-slate-500 font-medium">Tautan persyaratan kerja sama (SOP)</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <LinkIcon className="!w-4 !h-4 !text-purple-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Link Google Drive SOP Medpart
              </label>
              <input 
                type="url" 
                name="medpartLink" 
                value={formData.medpartLink} 
                onChange={handleChange} 
                required
                placeholder="Ex: https://drive.google.com/..."
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" 
              />
            </div>
          </div>

          {/* Area Tombol Submit */}
          <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !bg-indigo-600 hover:!bg-indigo-700 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg hover:shadow-indigo-500/30"
            >
              {loading ? (
                <>
                  <Loader2 className="!w-5 !h-5 animate-spin !text-white !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  <span>Menyimpan Pengaturan...</span>
                </>
              ) : (
                <>
                  <Save className="!w-5 !h-5 group-hover:scale-110 transition-transform !bg-transparent !text-white" style={{ fill: 'none', stroke: 'currentColor' }} />
                  <span>Simpan Pengaturan</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}