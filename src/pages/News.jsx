import { Calendar, ArrowRight } from 'lucide-react';

const newsList = [
  {
    title: 'UKM Penalaran Sabet Juara 1 LKTI Nasional',
    date: '25 Juli 2025',
    description: 'Tim dari UKM Penalaran berhasil meraih juara 1 dalam Lomba Karya Tulis Ilmiah Nasional di Universitas Gadjah Mada.',
    image: '/images/berita1.jpg',
    category: 'Prestasi'
  },
  {
    title: 'Diskusi Ilmiah Edisi Juli: AI dan Masa Depan Pendidikan',
    date: '18 Juli 2025',
    description: 'Diskusi rutin membahas dampak positif dan negatif kecerdasan buatan di dunia pendidikan.',
    image: '/images/berita2.jpg',
    category: 'Diskusi'
  },
  {
    title: 'Pelatihan PKM dan Strategi Lolos Hibah',
    date: '7 Juli 2025',
    description: 'Kegiatan pelatihan intensif bersama alumni yang sudah sukses lolos pendanaan hibah PKM DIKTI.',
    image: '/images/berita3.jpg',
    category: 'Workshop'
  },
];

const News = () => {
  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            📰 Berita Terkini
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Informasi Terbaru
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ikuti perkembangan terbaru seputar kegiatan dan pencapaian 
            <span className="font-semibold text-indigo-600"> UKM Penalaran UDINUS</span>
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news, index) => (
            <article
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-semibold rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {news.date}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                  {news.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {news.description}
                </p>
                
                <button className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm group/btn transition-colors duration-300">
                  Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ingin Tahu Lebih Banyak?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Jangan lewatkan update terbaru dari kegiatan UKM Penalaran
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Lihat Semua Berita
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;