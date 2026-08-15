// src/pages/admin/AddNews.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Save, Image as ImageIcon, Type, AlignLeft, Hash, Tag } from 'lucide-react';

export default function AddNews() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const currentDate = new Date();
      const dateString = currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      await addDoc(collection(db, 'news'), {
        title,
        category: category || 'Informasi', 
        excerpt,
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(t => t !== ''),
        imageUrl, 
        date: dateString,
        createdAt: currentDate,
        views: 0,
        author: 'Admin UKM Penalaran'
      });

      alert('Berita berhasil ditambahkan!');
      navigate('/admin/manage-news');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Gagal menambahkan berita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Tulis Berita Baru</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Publikasikan informasi, prestasi, atau kegiatan terbaru UKM Penalaran.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Field Judul */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Type className="w-4 h-4 text-indigo-500" />
                Judul Berita
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Masukkan judul yang menarik..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Field Kategori */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <AlignLeft className="w-4 h-4 text-indigo-500" />
                Kategori
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Contoh: Prestasi, Workshop, Lomba"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Field Tags */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Tag className="w-4 h-4 text-indigo-500" />
                Tags <span className="text-slate-400 font-normal">(Pisahkan koma)</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="udinus, pkm, lomba"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Field Gambar URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                URL / Link Foto Dokumentasi
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                placeholder="https://i.ibb.co/... atau link gambar lainnya"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* Field Deskripsi Singkat */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Hash className="w-4 h-4 text-indigo-500" />
                Deskripsi Singkat
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                placeholder="Ringkasan singkat untuk ditampilkan di kartu berita depan..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none h-28"
              />
            </div>

            {/* Field Konten Lengkap */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <AlignLeft className="w-4 h-4 text-indigo-500" />
                Konten Lengkap
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Tuliskan isi berita lengkap di sini..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-y min-h-[300px]"
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
                  <span>Terbitkan Berita</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </SidebarAdmin>
  );
}