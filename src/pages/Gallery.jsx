import { useState } from 'react';

const images = [
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-08%20at%2017.15.30_da40381e.jpg", alt: "Juara 2 Krenova 2025" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.03_26183efc.jpg", alt: "Penalaran Juara" },
  { src: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.39.32_dbbd2f35.jpg", alt: "Seminar Penalaran" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.05_585625f8.jpg", alt: "Tim UKM Penalaran" },
  { src: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.42.16_57dde200.jpg", alt: "Workshop" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.07_4e3ba305.jpg", alt: "Game" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_e0628f45.jpg", alt: "Bootcamp" },
  { src: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-01%20at%2023.15.32_8c10ad4a.jpg", alt: "Kegiatan Organisasi" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_b04b3172.jpg", alt: "Coaching" },
  { src: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.21.50_d1fbb90c.jpg", alt: "Buka Bersama" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.07_3c4140f3.jpg", alt: "Hiking" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.08_fb3b81d4.jpg", alt: "Rapat Rutin" },
  { src: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.42.45_3d597c52.jpg", alt: "Tim UKM Penalaran" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.03_a6ffbb88.jpg", alt: "Tim UKM Penalaran" },
  { src: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.07_ba6efe2a.jpg", alt: "Tim UKM Penalaran" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Galeri Kegiatan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Dokumentasi kegiatan UKM Penalaran UDINUS yang membangun semangat berpikir kritis dan kolaboratif
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onClick={() => setSelectedImage(img)}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-100/50 backdrop-blur-sm"></div>
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 cursor-pointer"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-2">{img.alt}</h3>
                  <div className="flex items-center text-sm opacity-90">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Klik untuk memperbesar
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
            <div className="text-gray-600">Kegiatan Terdokumentasi</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="text-3xl font-bold text-purple-600 mb-2">30+</div>
            <div className="text-gray-600">Anggota Aktif</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20">
            <div className="text-3xl font-bold text-pink-600 mb-2">12+</div>
            <div className="text-gray-600">Tahun Berpengalaman</div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged image - FIXED VERSION */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            // Only close if clicking the background, not the image
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <div className="min-h-full flex items-start justify-center p-4 py-8">
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto object-contain rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="fixed top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image Caption */}
              <div className="mt-4 text-center">
                <div className="inline-block bg-black/50 backdrop-blur-sm rounded-xl px-6 py-3 text-white text-lg">
                  {selectedImage.alt}
                </div>
              </div>

              {/* Scroll Indicator - Only show for tall images */}
              <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm flex items-center space-x-2">
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>Scroll untuk melihat gambar penuh</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;