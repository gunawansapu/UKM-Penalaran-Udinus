// src/pages/admin/EditNews.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { 
  Save, 
  Loader2, 
  Type, 
  LayoutList, 
  AlignLeft, 
  FileText, 
  Tags as TagsIcon, 
  Image as ImageIcon 
} from 'lucide-react';

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Ambil data lama untuk di-load ke formulir
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setExcerpt(data.excerpt || data.description || '');
          setContent(data.content || data.fullContent || '');
          setCategory(data.category || 'Informasi');
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
          setImageUrl(data.imageUrl || data.image || '');
        } else {
          alert('Berita tidak ditemukan!');
          navigate('/admin/manage-news');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [id, navigate]);

  // Fungsi simpan perubahan (UPDATE)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const docRef = doc(db, 'news', id);
      await updateDoc(docRef, {
        title,
        excerpt,
        content,
        category,
        tags: tags.split(',').map((tag) => tag.trim()).filter((t) => t !== ''),
        imageUrl,
        updatedAt: new Date().toISOString()
      });

      alert('Berita berhasil diperbarui!');
      navigate('/admin/manage-news');
    } catch (error) {
      console.error('Error updating document: ', error);
      alert('Gagal mengupdate berita.');
    } finally {
      setSaving(false);
    }
  };

  // Loading Screen yang terpusat di dalam Sidebar
  if (loading) {
    return (
      <SidebarAdmin>
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Loader2 className="!w-10 !h-10 !text-indigo-600 animate-spin mb-4 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
          <p className="text-slate-500 font-medium">Memuat data berita...</p>
        </div>
      </SidebarAdmin>
    );
  }

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Edit Berita</h1>
          <p className="text-slate-500 font-medium mt-2 text-base">Perbarui informasi, artikel, atau detail prestasi UKM Penalaran.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleUpdate} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Field Judul Berita */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Type className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Judul Berita
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Masukkan judul berita yang menarik..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Field Kategori */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <LayoutList className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Kategori
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Prestasi, Informasi, Workshop"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Field Tags */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <TagsIcon className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Tags (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Ex: lomba, nasional, lkti"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Field Deskripsi Singkat (Excerpt) */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <AlignLeft className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Deskripsi Singkat (Excerpt)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows="2"
                placeholder="Tulis ringkasan singkat untuk ditampilkan di halaman depan..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none"
              />
            </div>

            {/* Field Konten Lengkap */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <FileText className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                Konten Lengkap Berita
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="8"
                placeholder="Tulis isi berita secara lengkap di sini..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Field URL / Link Foto Utama */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <ImageIcon className="!w-4 !h-4 !text-indigo-500 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                URL / Link Foto Utama
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                placeholder="Ex: https://i.ibb.co/foto-berita.jpg atau link Google Drive"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
              
              {/* Preview Gambar (Sangat berguna untuk UX Halaman Edit) */}
              {imageUrl && (
                <div className="mt-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 w-fit">
                  <p className="text-xs font-bold text-slate-500 mb-2">Preview Foto Saat Ini:</p>
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="h-32 w-auto object-cover rounded-xl shadow-sm border border-slate-200"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>

          </div>

          {/* Area Tombol Submit */}
          <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="group flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 !bg-amber-500 hover:!bg-amber-600 !text-white font-bold rounded-2xl transition-all duration-300 border-0 disabled:opacity-70 shadow-lg hover:shadow-amber-500/30"
            >
              {saving ? (
                <>
                  <Loader2 className="!w-5 !h-5 animate-spin !text-white !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  <span>Menyimpan Perubahan...</span>
                </>
              ) : (
                <>
                  <Save className="!w-5 !h-5 group-hover:scale-110 transition-transform !bg-transparent !text-white" style={{ fill: 'none', stroke: 'currentColor' }} />
                  <span>Update Berita</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </SidebarAdmin>
  );
}