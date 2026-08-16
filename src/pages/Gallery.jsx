// src/pages/Gallery.jsx
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching gallery: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* 👇 SPASI ATAS DIPERKETAT: pt-20 di HP dan md:pt-32 di layar besar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 sm:pt-24 md:pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
            {/* SVG Anti CSS Global */}
            <svg className="!w-8 !h-8 !text-white !bg-transparent" fill="none" style={{ fill: 'none', stroke: 'currentColor', backgroundColor: 'transparent' }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 leading-normal py-2">
            Galeri Kegiatan
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Dokumentasi kegiatan UKM Penalaran UDINUS yang membangun semangat berpikir kritis dan kolaboratif
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20 animate-pulse">Memuat foto galeri...</div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((img) => (
                <div 
                  key={img.id} 
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-100/50 backdrop-blur-sm pointer-events-none"></div>
                  
                  <div className="relative overflow-hidden rounded-3xl h-full">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{img.alt}</h3>
                      <div className="flex items-center text-sm opacity-90">
                        {/* SVG Anti CSS Global */}
                        <svg className="!w-4 !h-4 !mr-2 !bg-transparent" fill="none" style={{ fill: 'none', stroke: 'currentColor', backgroundColor: 'transparent' }} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Klik untuk memperbesar
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/20">
                      {/* SVG Anti CSS Global */}
                      <svg className="!w-5 !h-5 !text-white !bg-transparent" fill="none" style={{ fill: 'none', stroke: 'currentColor', backgroundColor: 'transparent' }} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <div className="text-center py-20 text-gray-500 font-medium">Belum ada foto yang dipublikasikan.</div>
            )}
          </>
        )}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="text-center p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-xl shadow-blue-900/5">
            <div className="text-4xl font-black text-blue-600 mb-2">{images.length}+</div>
            <div className="text-slate-600 font-medium">Kegiatan Terdokumentasi</div>
          </div>
          <div className="text-center p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-xl shadow-purple-900/5">
            <div className="text-4xl font-black text-purple-600 mb-2">30+</div>
            <div className="text-slate-600 font-medium">Anggota Aktif</div>
          </div>
          <div className="text-center p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-xl shadow-pink-900/5">
            <div className="text-4xl font-black text-pink-600 mb-2">12+</div>
            <div className="text-slate-600 font-medium">Tahun Berpengalaman</div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
            <div className="relative max-w-5xl w-full flex flex-col items-center">
              
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* TOMBOL CLOSE SUPER PAKSA (GLASSMORPHISM) */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 sm:top-4 sm:-right-16 !w-12 !h-12 !p-0 !m-0 !bg-white/10 hover:!bg-white/25 !border !border-white/20 backdrop-blur-lg !rounded-full !flex !items-center !justify-center !text-white transition-all duration-300 z-[150] shadow-xl hover:scale-110 !outline-none"
                title="Tutup"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '50%', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  appearance: 'none',
                  borderWidth: '1px'
                }}
              >
                {/* SVG SILANG SUPER PAKSA */}
                <svg 
                  className="!w-6 !h-6 !text-white !bg-transparent" 
                  fill="none" 
                  style={{ fill: 'none', stroke: '#ffffff', backgroundColor: 'transparent' }} 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="mt-6 text-center w-full max-w-3xl px-4">
                <div className="inline-block bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl px-6 py-4 text-white text-lg font-medium shadow-xl">
                  {selectedImage.alt || 'Dokumentasi UKM Penalaran'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;