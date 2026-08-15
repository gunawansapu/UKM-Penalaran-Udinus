// src/pages/admin/EditEvent.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
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
    tutorialText: '', 
    tutorialImage: '', 
    tutorialVideo: '', 
  });

  // Ambil data event lama
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || '',
            date: data.date || '',
            time: data.time || '',
            location: data.location || '',
            description: data.description || '',
            category: data.category || '',
            status: data.status || 'upcoming',
            registrationUrl: data.registrationUrl || '',
            capacity: data.capacity || '',
            price: data.price || '',
            speaker: data.speaker || '',
            requirements: Array.isArray(data.requirements) ? data.requirements.join(', ') : '',
            imageUrl: data.image || '',
            tutorialText: data.tutorialText || '',
            tutorialImage: data.tutorialImage || '',
            tutorialVideo: data.tutorialVideo || '',
          });
        } else {
          alert('Event tidak ditemukan!');
          navigate('/admin/manage-events');
        }
      } catch (error) {
        console.error('Error fetching event: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const reqArray = formData.requirements 
        ? formData.requirements.split(',').map(req => req.trim()).filter(t => t !== '') 
        : [];

      const docRef = doc(db, 'events', id);
      await updateDoc(docRef, {
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
        tutorialText: formData.tutorialText || null,
        tutorialImage: formData.tutorialImage || null,
        tutorialVideo: formData.tutorialVideo || null,
        updatedAt: new Date().toISOString()
      });

      alert('Event berhasil diperbarui!');
      navigate('/admin/manage-events');
    } catch (error) {
      console.error('Error updating event: ', error);
      alert('Gagal mengupdate event.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">Memuat data...</div>;
  }

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Edit Event & Kegiatan</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Perbarui informasi atau panduan pendaftaran kegiatan.</p>
        </div>

        <form onSubmit={handleUpdate} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
            
            {/* Field Status */}
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            {/* Input Poster */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                URL / Link Foto Poster Event
              </label>
              <input 
                type="url" 
                name="imageUrl" 
                required 
                onChange={handleChange} 
                value={formData.imageUrl}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

          </div>

          <div className="space-y-8 border-t border-slate-100 pt-8">
            <h3 className="text-xl font-bold text-slate-900">Panduan / Tutorial Pendaftaran</h3>

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
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Panduan Teks
              </label>
              <textarea 
                name="tutorialText" 
                onChange={handleChange} 
                value={formData.tutorialText}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                URL / Link Infografis Panduan
              </label>
              <input 
                type="url" 
                name="tutorialImage" 
                onChange={handleChange} 
                value={formData.tutorialImage}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Video className="w-4 h-4 text-indigo-500" />
                URL / Link Video Panduan
              </label>
              <input 
                type="url" 
                name="tutorialVideo" 
                onChange={handleChange} 
                value={formData.tutorialVideo}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" 
              />
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !bg-indigo-600 hover:!bg-indigo-700 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg hover:shadow-indigo-500/30"
            >
              {saving ? 'Menyimpan Perubahan...' : 'Update Event'}
            </button>
          </div>
        </form>

      </div>
    </SidebarAdmin>
  );
}