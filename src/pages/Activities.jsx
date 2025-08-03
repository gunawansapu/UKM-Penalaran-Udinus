import { useEffect } from 'react';

// EvenCard Component
const EvenCard = ({ title, date, description, category, time, location, image, className }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop':
        return 'from-blue-500 to-indigo-600';
      case 'Diskusi':
        return 'from-green-500 to-emerald-600';
      case 'Pelatihan':
        return 'from-purple-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 ${className}`}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(category)}`}>
          {category}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-gray-700 font-medium">
          {date}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {time}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  useEffect(() => {
    // Simulasi AOS initialization dengan Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.add('animate-out');
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const events = [
    {
      title: "Seminar Kepenulisan Ilmiah",
      date: "10 September 2025",
      description: "Pelatihan menulis karya tulis ilmiah untuk mahasiswa baru.",
      category: "Workshop",
      time: "09:00 - 16:00 WIB",
      location: "Ruang Seminar Lt. 3",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&crop=faces"
    },
    {
      title: "Diskusi Rutin",
      date: "24 September 2025", 
      description: "Forum diskusi bulanan tentang isu sosial dan teknologi.",
      category: "Diskusi",
      time: "19:00 - 21:00 WIB",
      location: "Aula Utama",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&crop=faces"
    },
    {
      title: "Pelatihan PKM",
      date: "5 Oktober 2025",
      description: "Workshop penyusunan proposal PKM dengan pembicara ahli.",
      category: "Pelatihan",
      time: "13:00 - 17:00 WIB", 
      location: "Lab Komputer",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=faces"
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <style jsx>{`
        [data-aos] {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        [data-aos="fade-up"] {
          transform: translateY(50px);
        }
        
        [data-aos="fade-down"] {
          transform: translateY(-50px);
        }
        
        [data-aos="fade-left"] {
          transform: translateX(50px);
        }
        
        [data-aos="fade-right"] {
          transform: translateX(-50px);
        }
        
        [data-aos="zoom-in"] {
          transform: scale(0.8);
        }
        
        [data-aos="flip-up"] {
          transform: rotateX(-90deg);
        }
        
        [data-aos="slide-up"] {
          transform: translateY(100px);
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) rotateX(0) !important;
        }
        
        .animate-out {
          opacity: 0;
        }
        
        [data-aos="fade-up"].animate-in {
          transform: translateY(0);
        }
        
        [data-aos="fade-down"].animate-in {
          transform: translateY(0);
        }
        
        [data-aos="fade-left"].animate-in {
          transform: translateX(0);
        }
        
        [data-aos="fade-right"].animate-in {
          transform: translateX(0);
        }
        
        [data-aos="zoom-in"].animate-in {
          transform: scale(1);
        }
        
        [data-aos="flip-up"].animate-in {
          transform: rotateX(0);
        }
        
        [data-aos="slide-up"].animate-in {
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center">
            <div 
              data-aos="fade-down"
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Agenda Kegiatan
            </div>
            <h1 
              data-aos="zoom-in"
              data-aos-delay="200"
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              Kegiatan
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Kami</span>
            </h1>
            <p 
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Berbagai kegiatan pengembangan diri dan peningkatan kapasitas di UKM Penalaran
            </p>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <EvenCard 
                {...event}
                className="transform hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button 
              data-aos="slide-up"
              data-aos-delay="400"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Daftar Kegiatan
            </button>
            <button 
              data-aos="slide-up"
              data-aos-delay="600"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-200"
            >
              Lihat Arsip Kegiatan
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          data-aos="flip-up"
          data-aos-delay="300"
          className="mt-20 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                gradient: "from-blue-500 to-indigo-500",
                number: "30+",
                label: "Peserta Aktif"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: "from-green-500 to-emerald-500",
                number: "6+",
                label: "Kegiatan Terlaksana"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                gradient: "from-purple-500 to-pink-500",
                number: "25+",
                label: "Program Unggulan"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100 + 500}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;