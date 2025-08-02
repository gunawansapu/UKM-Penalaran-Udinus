import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RecruitmentButton from '../components/RecruitmentButton'; // taruh di atas

import Hero from '../components/Hero';
import EventCard from '../components/EvenCard';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // animasi tetap aktif tiap scroll
    });
  }, []);

  const events = [
    {
      title: 'Diskusi Ilmiah Bulanan',
      date: '30 Juli 2025',
      description: 'Sesi diskusi topik terkini bersama anggota UKM.',
      image: '/images/diskusi.jpg',
    },
    {
      title: 'Pelatihan Debat Mahasiswa',
      date: '12 Agustus 2025',
      description: 'Pelatihan untuk meningkatkan kemampuan berpikir kritis dan berbicara.',
      image: '/images/debat.jpg',
    },
    {
      title: 'Workshop Riset Ilmiah',
      date: '25 Agustus 2025',
      description: 'Pembelajaran metodologi penelitian dan penulisan karya ilmiah.',
      image: '/images/workshop.jpg',
    },
  ];

  return (
    <>
      <Hero />

      {/* Section: Tentang UKM */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              ✨ Tentang Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              UKM Penalaran
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <p className="text-lg text-gray-700 leading-relaxed">
                UKM Penalaran adalah unit kegiatan mahasiswa yang berfokus pada pengembangan potensi intelektual, riset ilmiah, dan penguatan daya pikir kritis mahasiswa Universitas Dian Nuswantoro.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Kami berkomitmen untuk menciptakan lingkungan pembelajaran yang inspiratif dan kolaboratif, memfasilitasi mahasiswa dalam mengembangkan kemampuan analitis dan berpikir sistematis.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
                  <div className="text-sm text-gray-600">Anggota Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Program Tahunan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                  <div className="text-sm text-gray-600">Tahun Berpengalaman</div>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="fade-left">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-700">Diskusi Ilmiah Berkala</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-700">Pelatihan Debat & Public Speaking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-700">Workshop Metodologi Penelitian</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-700">Seminar Nasional</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce delay-500"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-300 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Kegiatan Terbaru */}
      <section className="py-20 bg-white relative" data-aos="fade-up">
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              🚀 Update Terbaru
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kegiatan <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Terbaru</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ikuti berbagai kegiatan menarik yang dirancang untuk mengembangkan potensi intelektual Anda
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div key={index} data-aos="zoom-in" className="transform hover:scale-105 transition-all duration-300">
                <EventCard {...event} />
              </div>
            ))}
          </div>
          <div className="mt-20 text-right" data-aos="fade-up">
  <a
    href="/kegiatan"
    className="text-white font-medium relative transition duration-300 hover:text-indigo-300 hover:underline hover:underline-offset-4"
  >
    Lihat kegiatan lainnya →
  </a>
</div>


          <div className="text-center mt-20" data-aos="fade-up">
  <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 border-2 border-gradient-to-r from-blue-200 to-indigo-200 shadow-2xl overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-indigo-200/30 to-transparent rounded-full translate-x-20 translate-y-20"></div>
    <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-blue-300/40 rounded-full animate-pulse"></div>
    <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-indigo-300/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
    <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
    
    {/* Main Content */}
    <div className="relative z-10">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
  <img src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" alt="Icon" className="w-20 h-20 object-contain" />
</div>


      {/* Heading */}
      <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
        Tertarik Bergabung?
      </h3>

      {/* Subheading */}
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Jadilah bagian dari komunitas mahasiswa yang berpikir kritis dan inovatif. 
        <span className="block mt-2 text-blue-600 font-medium">
          Bergabunglah dengan ribuan mahasiswa lainnya!
        </span>
      </p>

      {/* Stats Row */}
      <div className="flex justify-center space-x-8 mb-10">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">30+</div>
          <div className="text-sm text-gray-500">Anggota Aktif</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">6+</div>
          <div className="text-sm text-gray-500">Event Per Tahun</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">24/7</div>
          <div className="text-sm text-gray-500">Dukungan Komunitas</div>
        </div>
      </div>

      {/* Enhanced Button Area */}
      <div className="space-y-4">
        <RecruitmentButton />
        
        {/* Additional Info */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Mahasiswa Semester 1-5</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Resmi</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>
    </>
  );
};

export default Home;
