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

      {/* 👇 SPASI ATAS DIPANGKAS JADI pt-24 (sebelumnya sm:pt-28) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        
        {/* Header - Jarak mb ditipiskan */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent tracking-tight leading-normal py-1">
            Galeri Kegiatan
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-1">
            Dokumentasi kegiatan UKM Penalaran UDINUS yang membangun semangat berpikir kritis dan kolaboratif.
          </p>
        </div>

        {/* TAB FILTER / ALBUM DENGAN TOMBOL NAVIGASI < > (Jarak margin mb ditipiskan) */}
        {!loading && albums.length > 0 && (
          <div className="mb-8 animate-fade-in-up relative max-w-4xl mx-auto flex items-center px-8 sm:px-12">
            
            {/* Tombol Panah Kiri (<) */}
            <div
              role="button"
              tabIndex={0}
              onClick={scrollLeft}
              className="absolute left-0 z-20 flex items-center justify-center bg-white/90 hover:bg-white text-slate-700 shadow-md rounded-full w-9 h-9 border border-slate-200 cursor-pointer transition-transform hover:scale-110 select-none"
              title="Geser Kiri"
              style={{ backgroundColor: '#ffffff', color: '#334155' }}
            >
              &#10094;
            </div>

            {/* Container Scroll */}
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

            {/* Tombol Panah Kanan (>) */}
            <div
              role="button"
              tabIndex={0}
              onClick={scrollRight}
              className="absolute right-0 z-20 flex items-center justify-center bg-white/90 hover:bg-white text-slate-700 shadow-md rounded-full w-9 h-9 border border-slate-200 cursor-pointer transition-transform hover:scale-110 select-none"
              title="Geser Kanan"
              style={{ backgroundColor: '#ffffff', color: '#334155' }}
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
                  <div className="relative overflow-hidden rounded-3xl h-full bg-slate-100">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-105 select-none"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                      <h3 className="text-base font-bold mb-2 line-clamp-2">{img.alt}</h3>
                      <div className="flex items-center text-xs opacity-90 font-medium">
                        <svg className="!w-3.5 !h-3.5 !mr-1.5 !bg-transparent" fill="none" style={{ fill: 'none', stroke: 'currentColor', backgroundColor: 'transparent' }} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Klik untuk memperbesar
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/20 text-white">
                      <svg className="!w-4 !h-4 !text-white !bg-transparent" fill="none" style={{ fill: 'none', stroke: 'currentColor', backgroundColor: 'transparent' }} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
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

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="text-center p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-lg shadow-blue-900/5">
            <div className="text-3xl font-black text-blue-600 mb-1">{images.length}+</div>
            <div className="text-slate-600 font-medium text-sm">Kegiatan Terdokumentasi</div>
          </div>
          <div className="text-center p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-lg shadow-purple-900/5">
            <div className="text-3xl font-black text-purple-600 mb-1">30+</div>
            <div className="text-slate-600 font-medium text-sm">Anggota Aktif</div>
          </div>
          <div className="text-center p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-lg shadow-pink-900/5">
            <div className="text-3xl font-black text-pink-600 mb-1">12+</div>
            <div className="text-slate-600 font-medium text-sm">Tahun Berpengalaman</div>
          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL (RESPONSIF & PROPORTIONAL) ================= */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-all duration-300 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          {/* Modal Container dengan my-auto agar di HP tidak melar/lonjong */}
          <div 
            className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden max-w-xl sm:max-w-3xl w-full flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
            }}
          >
            {/* Top Bar (Header dengan Logo Penalaran) */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center shrink-0">
                  <img 
                    src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" 
                    alt="Logo Penalaran" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">UKM Penalaran UDINUS</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Dokumentasi Resmi</p>
                </div>
              </div>
              
              {/* Tombol Tutup */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedImage(null)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-all duration-200 select-none shadow-sm"
                title="Tutup"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Container Area Foto (Dibatasi tingginya di HP max-[45vh] agar tidak lonjong) */}
            <div className="p-4 sm:p-8 bg-slate-50/50 flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[45vh] sm:max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-sm select-none"
              />
            </div>

            {/* Footer Keterangan Foto */}
            <div className="px-6 sm:px-8 py-5 sm:py-6 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
              <p className="text-slate-800 text-sm sm:text-base font-bold leading-relaxed">
                {selectedImage.alt || 'Dokumentasi Kegiatan UKM Penalaran'}
              </p>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                Gallery
              </span>
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