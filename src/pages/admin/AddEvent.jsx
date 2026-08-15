import React, { useState } from 'react';
import { db } from '../../config/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Tag, 
  FileText, 
  Link as LinkIcon, 
  Users, 
  DollarSign, 
  Mic, 
  ListChecks, 
  Image as ImageIcon,
  Video,
  BookOpen,
  Save
} from 'lucide-react';

export default function AddEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    status: 'upcoming', 
    registrationUrl: '',
    capacity: '',
    price: '',
    speaker: '',
    requirements: '', 
    imageUrl: '', 
    tutorialText: '',   // <-- Tambahan panduan teks
    tutorialImage: '',  // <-- Tambahan link foto panduan
    tutorialVideo: '',  // <-- Tambahan link video panduan (YouTube/Drive)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      alert("Masukkan link URL poster/foto event terlebih dahulu!");
      return;
    }
    
    setLoading(true);

    try {
      const reqArray = formData.requirements 
        ? formData.requirements.split(',').map(req => req.trim()).filter(t => t !== '') 
        : [];

      await addDoc(collection(db, "events"), {
        title: formData.title,
        date: formData.date,
        time: formData.time || null,
        location: formData.location || null,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        registrationUrl: formData.registrationUrl || null,
        capacity: formData.capacity || null,
        price: formData.price || "-",
        speaker: formData.speaker || "-",
        requirements: reqArray,
        image: formData.imageUrl, 
        tutorialText: formData.tutorialText || null,     // Simpan teks tutorial
        tutorialImage: formData.tutorialImage || null,   // Simpan link gambar tutorial
        tutorialVideo: formData.tutorialVideo || null,   // Simpan link video tutorial
        registeredCount: 0,
        createdAt: new Date().toISOString()
      });

      alert("Event/Kegiatan berhasil ditambahkan ke Firebase!");
      navigate('/admin/manage-events'); 

    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menambahkan event. Cek console log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Buat Event Baru</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Rencanakan dan publikasikan agenda kegiatan beserta tutorial pendaftarannya.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Field Nama Event */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <FileText className="w-4 h-4 text-indigo-500" />
                Nama Event
              </label>
              <input 
                type="text" 
                name="title" 
                required 
                onChange={handleChange} 
                value={formData.title}
                placeholder="Ex: Pelatihan Desain Grafis Dasar"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Field Kategori */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Tag className="w-4 h-4 text-indigo-500" />
                Kategori
              </label>
              <input 
                type="text" 
                name="category" 
                required 
                onChange={handleChange} 
                value={formData.category}
                placeholder="Ex: Workshop, Lomba, Seminar"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
            
            {/* Field Status Pendaftaran */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <FileText className="w-4 h-4 text-indigo-500" />
                Status Pendaftaran
              </label>
              <div className="relative">
                <select 
                  name="status" 
                  onChange={handleChange} 
                  value={formData.status}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                >
                  <option value="upcoming">Upcoming (Akan Datang / Buka)</option>
                  <option value="ongoing">Ongoing (Sedang Berlangsung)</option>
                  <option value="closed">Closed (Selesai / Tutup)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Field Waktu & Lokasi */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <CalendarDays className="w-4 h-4 text-indigo-500" />
                Tanggal Pelaksanaan
              </label>
              <input 
                type="text" 
                name="date" 
                required 
                onChange={handleChange} 
                value={formData.date}
                placeholder="Ex: 15-20 Agustus 2026"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Clock className="w-4 h-4 text-indigo-500" />
                Waktu
              </label>
              <input 
                type="text" 
                name="time" 
                onChange={handleChange} 
                value={formData.time}
                placeholder="Ex: 08.00 - Selesai"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <MapPin className="w-4 h-4 text-indigo-500" />
                Lokasi
              </label>
              <input 
                type="text" 
                name="location" 
                onChange={handleChange} 
                value={formData.location} 
                placeholder="Ex: Gedung D Lt 2, Kampus Udinus"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Link Pendaftaran & Pembicara */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <LinkIcon className="w-4 h-4 text-indigo-500" />
                Link Formulir Pendaftaran
              </label>
              <input 
                type="url" 
                name="registrationUrl" 
                onChange={handleChange} 
                value={formData.registrationUrl} 
                placeholder="Ex: https://forms.gle/..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Mic className="w-4 h-4 text-indigo-500" />
                Pembicara / Guest Star
              </label>
              <input 
                type="text" 
                name="speaker" 
                onChange={handleChange} 
                value={formData.speaker} 
                placeholder="Ex: Tim Ristek UDINUS (Opsional)"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* HTM & Kapasitas */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <DollarSign className="w-4 h-4 text-indigo-500" />
                Biaya Registrasi / HTM
              </label>
              <input 
                type="text" 
                name="price" 
                onChange={handleChange} 
                value={formData.price}
                placeholder="Ex: Gratis / Rp 15.000"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Users className="w-4 h-4 text-indigo-500" />
                Kapasitas Maksimal
              </label>
              <input 
                type="text" 
                name="capacity" 
                onChange={handleChange} 
                value={formData.capacity} 
                placeholder="Ex: 50 Orang (Opsional)"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Persyaratan */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ListChecks className="w-4 h-4 text-indigo-500" />
                Persyaratan <span className="text-slate-400 font-normal ml-1">(Pisahkan dengan koma)</span>
              </label>
              <input 
                type="text" 
                name="requirements" 
                onChange={handleChange} 
                value={formData.requirements} 
                placeholder="Ex: Membawa laptop, mahasiswa aktif Udinus"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Input Poster Event */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                URL / Link Foto Poster Event (Penting)
              </label>
              <input 
                type="url" 
                name="imageUrl" 
                required 
                onChange={handleChange} 
                value={formData.imageUrl}
                placeholder="Ex: https://i.ibb.co/... atau link gambar lainnya"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

          </div>

          <div className="space-y-8 border-t border-slate-100 pt-8">
            <h3 className="text-xl font-bold text-slate-900">Panduan / Tutorial Pendaftaran (Opsional)</h3>

            {/* Deskripsi Event */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <FileText className="w-4 h-4 text-indigo-500" />
                Deskripsi / Informasi Detail
              </label>
              <textarea 
                name="description" 
                required 
                onChange={handleChange} 
                value={formData.description}
                placeholder="Tuliskan latar belakang, tujuan, dan informasi penting lainnya..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[150px]"
              />
            </div>

            {/* Tutorial Teks */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Panduan Teks (Langkah-langkah pendaftaran)
              </label>
              <textarea 
                name="tutorialText" 
                onChange={handleChange} 
                value={formData.tutorialText}
                placeholder="1. Isi google form... 2. Gabung grup WhatsApp... 3. Konfirmasi ke panitia..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[120px]"
              />
            </div>

            {/* Tutorial Foto Link */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                URL / Link Infografis Panduan (Foto)
              </label>
              <input 
                type="url" 
                name="tutorialImage" 
                onChange={handleChange} 
                value={formData.tutorialImage}
                placeholder="Ex: https://i.ibb.co/infografis-alur.jpg (Opsional)"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Tutorial Video Link */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Video className="w-4 h-4 text-indigo-500" />
                URL / Link Video Panduan (YouTube atau MP4)
              </label>
              <input 
                type="url" 
                name="tutorialVideo" 
                onChange={handleChange} 
                value={formData.tutorialVideo}
                placeholder="Ex: https://www.youtube.com/embed/... (Opsional)"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
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
                  <span>Menerbitkan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Publikasikan Event</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </SidebarAdmin>
  );
}