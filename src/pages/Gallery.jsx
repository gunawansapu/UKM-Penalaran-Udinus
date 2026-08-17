// src/pages/Gallery.jsx
import { useState, useEffect, useRef } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState('Semua');

  // REF UNTUK KONTROL SCROLL HORIZONTAL OTOMATIS
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        dataList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setImages(dataList);

        const uniqueAlbums = [...new Set(dataList.map(item => item.alt || 'Tanpa Keterangan'))];
        setAlbums(uniqueAlbums);

      } catch (error) {
        console.error("Error fetching gallery: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = activeAlbum === 'Semua' 
    ? images 
    : images.filter(img => (img.alt || 'Tanpa Keterangan') === activeAlbum);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 sm:pt-10 pb-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent tracking-tight leading-normal py-1">
            Galeri Kegiatan
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-1">
            Dokumentasi kegiatan UKM Penalaran UDINUS yang membangun semangat berpikir kritis dan kolaboratif.
          </p>
        </div>

        {/* TAB FILTER / ALBUM */}
        {!loading && albums.length > 0 && (
          <div className="mb-8 animate-fade-in-up relative max-w-4xl mx-auto flex items-center px-8 sm:px-12">
            
            <div
              role="button"
              tabIndex={0}
              onClick={scrollLeft}
              className="absolute left-0 z-20 flex items-center justify-center bg-white/90 hover:bg-white text-slate-700 shadow-md rounded-full w-9 h-9 border border-slate-200 cursor-pointer transition-transform hover:scale-110 select-none"
              title="Geser Kiri"
            >
              &#10094;
            </div>

            <div 
              ref={scrollRef}
              className="flex overflow-x-auto pb-3 pt-1 gap-2.5 hide-scrollbar snap-x items-center w-full scroll-smooth px-2"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveAlbum('Semua')}
                className={`snap-center flex-shrink-0 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 border whitespace-nowrap cursor-pointer select-none flex items-center justify-center ${
                  activeAlbum === 'Semua'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                }`}
              >
                Semua Foto
              </div>

              {albums.map((albumName, index) => (
                <div
                  role="button"
                  tabIndex={0}
                  key={index}
                  onClick={() => setActiveAlbum(albumName)}
                  className={`snap-center flex-shrink-0 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 border whitespace-nowrap cursor-pointer select-none flex items-center justify-center ${
                    activeAlbum === albumName
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                      : 'bg-white text-slate-600 border-slate-200/80 hover:border-purple-400 hover:text-purple-600 shadow-sm'
                  }`}
                  title={albumName}
                >
                  {albumName}
                </div>
              ))}
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={scrollRight}
              className="absolute right-0 z-20 flex items-center justify-center bg-white/90 hover:bg-white text-slate-700 shadow-md rounded-full w-9 h-9 border border-slate-200 cursor-pointer transition-transform hover:scale-110 select-none"
              title="Geser Kanan"
            >
              &#10095;
            </div>

          </div>
        )}

        {/* Gallery Content */}
        {loading ? (
          <div className="text-center text-gray-500 py-20 animate-pulse font-medium">Memuat foto galeri...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((img) => (
                <div 
                  key={img.id} 
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 cursor-pointer border border-slate-100"
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="relative overflow-hidden rounded-3xl h-72 bg-slate-100">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 select-none"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                      <h3 className="text-base font-bold mb-2 line-clamp-2">{img.alt}</h3>
                      <div className="flex items-center text-xs opacity-90 font-medium">
                        Klik untuk memperbesar
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16 text-gray-500 font-medium bg-white rounded-3xl border border-slate-100 shadow-sm">
                Belum ada foto yang dipublikasikan untuk kategori ini.
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= LIGHTBOX MODAL (AESTHETIC INSTAGRAM STYLE) ================= */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 transition-all duration-300 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImage(null);
          }}
          // Memaksa penggunaan Apple System Font / IG Font
          style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
        >
          {/* Modal Container berbentuk Postingan IG */}
          <div 
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-md sm:max-w-xl w-full flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. HEADER (Profile Picture & Username IG) */}
            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <div className="flex items-center gap-3">
                {/* Lingkaran Gradasi Story IG */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] cursor-pointer">
                  <div className="w-full h-full rounded-full border-[1.5px] border-white overflow-hidden bg-white">
                    <img 
                      src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" 
                      alt="Logo Penalaran" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                {/* Username Lowercase ala IG */}
                <div className="flex flex-col">
                  <h4 className="text-[13px] font-semibold text-slate-900 leading-none tracking-tight">
                    ukmpenalaran
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal mt-1">
                    Universitas Dian Nuswantoro
                  </p>
                </div>
              </div>
              
              {/* Tombol X */}
              <div
                role="button"
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* 2. AREA FOTO (Background Hitam supaya pop-up) */}
            <div className="bg-slate-50 flex items-center justify-center overflow-hidden border-y border-slate-100">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[55vh] sm:max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* 3. FOOTER (Ikon Interaksi & Caption IG) */}
            <div className="px-4 py-3 bg-white flex flex-col gap-2">
              
              {/* Action Buttons (Like, Comment, Share, Save) */}
              <div className="flex items-center justify-between mt-1">
                 <div className="flex items-center gap-4 text-slate-900">
                    <svg aria-label="Suka" className="w-6 h-6 hover:text-slate-500 cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                    <svg aria-label="Komentari" className="w-6 h-6 hover:text-slate-500 cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path></svg>
                    <svg aria-label="Bagikan" className="w-6 h-6 hover:text-slate-500 cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path></svg>
                 </div>
                 <svg aria-label="Simpan" className="w-6 h-6 text-slate-900 hover:text-slate-500 cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path></svg>
              </div>

              {/* Likes (Aesthetic Detail) */}
              <p className="text-[13px] font-semibold text-slate-900 mt-1">
                Disukai oleh udinus_smg dan lainnya
              </p>

              {/* Teks Caption */}
              <p className="text-[13.5px] text-slate-900 leading-snug">
                <span className="font-semibold mr-1.5 cursor-pointer">ukmpenalaran</span>
                {selectedImage.alt || 'Dokumentasi Kegiatan UKM Penalaran'}
              </p>
              
              {/* Tanggal/Waktu */}
              <p className="text-[10px] text-slate-400 font-medium uppercase mt-1 tracking-widest">
                Dokumentasi Resmi
              </p>
            </div>

          </div>
        </div>
      )}

      {/* CSS Tambahan */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default Gallery;