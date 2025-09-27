import { useEffect, useState } from 'react';

// EvenCard Component with flexible registration
const EvenCard = ({ 
  title, 
  date, 
  description, 
  category, 
  time, 
  location, 
  image, 
  className,
  registrationUrl,
  registrationDeadline,
  status = 'upcoming',
  capacity,
  registeredCount,
  price,
  speaker,
  requirements
}) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop':
        return 'from-blue-500 to-indigo-600';
      case 'Diskusi':
        return 'from-green-500 to-emerald-600';
      case 'Pelatihan':
        return 'from-purple-500 to-pink-600';
      case 'Seminar':
        return 'from-orange-500 to-red-600';
      case 'Kompetisi':
        return 'from-yellow-500 to-orange-600';
      case 'Pengabdian':
        return 'from-yellow-800 to-red-500';
      case 'Recruitment':
        return 'from-cyan-500 to-blue-600';
      case 'Fun':
        return 'from-yellow-400 to-green-200';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Berlangsung';
      case 'closed': return 'Pendaftaran Ditutup';
      case 'completed': return 'Selesai';
      default: return 'Status Tidak Diketahui';
    }
  };

  const handleRegistration = () => {
    if (registrationUrl) {
      window.open(registrationUrl, '_blank');
    }
  };

  const handleClosedRegistration = () => {
    // Show modal for closed registration
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl transform">
        <div class="text-6xl mb-4">🚫</div>
        <h3 class="text-2xl font-bold text-red-600 mb-4">Pendaftaran Ditutup</h3>
        <p class="text-gray-600 mb-6">Maaf, periode pendaftaran untuk <strong>${title}</strong> sudah berakhir.<br><br>Nantikan kegiatan berikutnya!</p>
        <button onclick="this.parentElement.parentElement.remove()" class="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
          Mengerti
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
    }, 4000);
  };

  const handleCompletedEvent = () => {
    // Show modal for completed event
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl transform">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-2xl font-bold text-green-600 mb-4">Kegiatan Selesai</h3>
        <p class="text-gray-600 mb-6">Kegiatan <strong>${title}</strong> telah selesai dilaksanakan.<br><br>Terima kasih kepada semua peserta yang telah berpartisipasi!</p>
        <button onclick="this.parentElement.parentElement.remove()" class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
          Oke
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
    }, 4000);
  };

  const isRegistrationOpen = status === 'upcoming' || status === 'ongoing';
  const isRegistrationClosed = status === 'closed';
  const isEventCompleted = status === 'completed';
  const showCapacity = capacity && registeredCount !== undefined;

  const getButtonConfig = () => {
    if (isEventCompleted) {
      return {
        text: 'Kegiatan Selesai',
        onClick: handleCompletedEvent,
        className: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white cursor-pointer hover:from-gray-600 hover:to-gray-700',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      };
    }
    
    if (isRegistrationClosed) {
      return {
        text: 'Pendaftaran Ditutup',
        onClick: handleClosedRegistration,
        className: 'bg-gradient-to-r from-red-500 to-red-600 text-white cursor-pointer hover:from-red-600 hover:to-red-700',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        )
      };
    }
    
    if (registrationUrl && isRegistrationOpen) {
      return {
        text: 'Daftar Sekarang',
        onClick: handleRegistration,
        className: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        )
      };
    }
    
    return null;
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 ${className}`}>
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
          {date || 'TBA'}
        </div>
        <div className={`absolute bottom-4 left-4 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        <div className="space-y-2 mb-4">
          {time && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {time}
            </div>
          )}
          {location && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          )}
          {speaker && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {speaker}
            </div>
          )}
          {price !== undefined && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {price === 0 ? 'Gratis' : `Rp ${price.toLocaleString('id-ID')}`}
            </div>
          )}
          {showCapacity && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {registeredCount}/{capacity} peserta
            </div>
          )}
        </div>

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Persyaratan:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Registration deadline */}
        {registrationDeadline && isRegistrationOpen && (
          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700">
              <span className="font-medium">Batas pendaftaran:</span> {registrationDeadline}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {buttonConfig && (
            <button
              onClick={buttonConfig.onClick}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${buttonConfig.className}`}
            >
              {buttonConfig.icon}
              {buttonConfig.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Open Recruitment Anggota Penalaran",
      date: "3-25 September 2025",
      description: "Bergabunglah dengan UKM Penalaran untuk mengembangkan kemampuan berpikir kritis dan analitis.",
      category: "Recruitment",
      time: null,
      location: null,
      image: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.42.16_57dde200.jpg",
      status: "closed", // Changed to closed for demonstration
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeMMFycrPpbOl94W_uS5Vo4V_6E9BE7Wq9xABT1jRhkw7JGEw/viewform",
      registrationDeadline: null,
      capacity: null,
      registeredCount: 23,
      speaker: null,
      requirements: [
        "Mahasiswa aktif semester 1-5",
        "Memiliki minat pada Penelitian dan Karya Tulis Ilmiah",
      ]
    },
    {
      id: 2,
      title: "Coaching Clinic X DinusLib",
      date: "4-25 Oktober 2025", 
      description: "Eksplorasi ide inovatif untuk penelitian",
      category: "Diskusi",
      time: "Menyusul",
      location: "Perpustakaan Udinus Lantai 1",
      image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_b04b3172.jpg",
      status: "upcoming", // Changed to completed for demonstration
      registrationUrl: null,
      registrationDeadline: null,
      capacity: null,
      registeredCount: 18,
      price: 0,
      speaker: "Tim DinusLib",
      requirements: [
        "Terbuka untuk Anggota Penalaran",
      ]
    },
    {
      id: 3,
      title: "PKM Masterclass",
      date: "27-28 November 2025",
      description: "Coming Soon",
      category: "Pelatihan",
      time: "Menyusul", 
      location: "Menyusul",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "upcoming", // Keep as ongoing
      registrationUrl:null,
      registrationDeadline: null,
      capacity: null,
      registeredCount: 12,
      speaker: "Tim PKM Berprestasi & Dosen Pembimbing",
      requirements: [
        "Mahasiswa yang ingin mengikuti PKM",
        "Membawa laptop",
        "Sudah memiliki ide dasar PKM",
      ]
    },
    {
      id: 4,
      title: "LKTIN (Lomba Karya Tulis Ilmiah Nasional)",
      date: "28-29 Januari 2026",
      description: "Seminar nasional karya tulis ilmiah",
      category: "Seminar",
      time: "Menyusul",
      location: "Gedung i Lantai 3",
      image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Screenshot%20(708).png",
      status: "upcoming",
      registrationUrl: null,
      registrationDeadline: null,
      capacity: null,
      registeredCount: 87,
      price:"-",
      speaker: "-",
      requirements: [
        "Terbuka untuk umum",
      ]
    },
    {
      id: 5,
      title: "Studi Banding",
      date: "21 Maret 2026",
      description: "Coming Soon",
      category: "Diskusi",
      time: "Menyusul",
      location: "Menyusul",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "upcoming",
      registrationUrl: null,
      capacity: null,
      registeredCount: 0,
      price: "-",
      speaker: "-",
      requirements: [
        "Anggota UKM Penalaran",
      ]
    },
    {
      id: 6,
      title: "KKN Aktivis",
      date: "Menyusul",
      description: "Coming Soon",
      category: "Pengabdian",
      time: "Menyusul",
      location: "Menyusul",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "upcoming",
      registrationUrl: null,
      capacity: "-",
      registeredCount: null,
      price: "-",
    },
    {
      id: 7,
      title: "Rapat Rutin",
      date: "Menyusul",
      description: "Coming Soon",
      category: "Diskusi",
      time: "Menyusul",
      location: "Menyusul",
      image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.08_fb3b81d4.jpg",
      status: "upcoming",
      registrationUrl: null,
      capacity: "-",
      registeredCount: null,
    },
    {
      id: 8,
      title: "Buka Bersama (Ramadhan)",
      date: "Menyusul",
      description: "Coming Soon",
      category: "Diskusi",
      time: "Menyusul",
      location: "Menyusul",
      image: "https://raw.githubusercontent.com/gunawansapu/avatar/main/WhatsApp%20Image%202025-08-02%20at%2014.21.50_d1fbb90c.jpg",
      status: "upcoming",
      registrationUrl: null,
      capacity: "-",
      registeredCount: null,
    },
    {
      id: 9,
      title: "Penalaran Hiking",
      date: "Menyusul",
      description: "Coming Soon",
      category: "Fun",
      time: "Menyusul",
      location: "Menyusul",
      image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.07_3c4140f3.jpg",
      status: "upcoming",
      registrationUrl: null,
      capacity: "-",
      registeredCount: null,
      price:"-",
    },
    {
      id: 10,
      title: "Bootcamp",
      date: "Menyusul",
      description: "Coming Soon",
      category: "Fun",
      time: "Menyusul",
      location: "Menyusul",
      image: "https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/WhatsApp%20Image%202025-09-06%20at%2019.56.06_e0628f45.jpg",
      status: "upcoming",
      registrationUrl: null,
      capacity: "-",
      registeredCount: null,
      price:"-",
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Filter events based on status and category - PINDAHKAN KE SINI
  const filteredEvents = events.filter(event => {
    const statusMatch = filterStatus === 'all' || event.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || event.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const categories = [...new Set(events.map(event => event.category))];
  const statuses = [...new Set(events.map(event => event.status))];

  useEffect(() => {
    // CSS styles for animations
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Effect untuk handling scroll animations
  useEffect(() => {
    // Reset semua animasi ketika filter berubah
    const resetAnimations = () => {
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach(el => {
        el.classList.remove('animate-in', 'animate-out');
      });
    };

    resetAnimations();

    // Setup observer dengan delay sedikit untuk memastikan DOM sudah updated
    const setupObserver = () => {
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

      // Observe all visible elements with data-aos attribute
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach(el => observer.observe(el));

      return observer;
    };

    // Delay setup untuk memastikan render selesai
    const timeoutId = setTimeout(() => {
      const observer = setupObserver();
      
      // Cleanup function akan dijalankan saat effect berubah
      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filterStatus, filterCategory, filteredEvents.length]); // Sekarang filteredEvents sudah terdefinisi

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div 
          data-aos="fade-up"
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Status</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'upcoming' && 'Akan Datang'}
                    {status === 'ongoing' && 'Berlangsung'}
                    {status === 'closed' && 'Pendaftaran Ditutup'}
                    {status === 'completed' && 'Selesai'}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Kategori</label>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setFilterCategory('all');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Menampilkan {filteredEvents.length} dari {events.length} kegiatan
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
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

        {filteredEvents.length === 0 && (
          <div 
            data-aos="fade-up"
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kegiatan ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter untuk melihat kegiatan lainnya.</p>
          </div>
        )}

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
              onClick={() => window.open('https://www.instagram.com/penalaranudinus/', '_blank')}
            >
              Info Kegiatan Terbaru
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                gradient: "from-purple-500 to-pink-500",
                number: `${categories.length}`,
                label: "Kategori Kegiatan"
              },
              {
                number: "30+",
                label: "Anggota Aktif"
              },
              {
                number: "12+", 
                label: "Tahun Berpengalaman"
              }
            ].map((stat, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100 + 500}
                className={index === 0 ? "text-center" : "text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20"}
              >
                {index === 0 ? (
                  <>
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      {stat.icon}
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${index === 1 ? 'text-purple-600' : 'text-pink-600'}`}>{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;