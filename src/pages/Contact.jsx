// src/pages/Contact.jsx
import { useState, useEffect, useRef } from 'react';

// Toast Component (Tidak berubah)
const Toast = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-400';
      case 'info':
        return 'bg-blue-500 border-blue-400';
      case 'warning':
        return 'bg-yellow-500 border-yellow-400';
      case 'error':
        return 'bg-red-500 border-red-400';
      default:
        return 'bg-gray-500 border-gray-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.684-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`${getToastStyles()} text-white px-6 py-4 rounded-2xl shadow-2xl border-l-4 backdrop-blur-sm min-w-80 max-w-md`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom hook for scroll animations (Tidak berubah)
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.dataset.animateId));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const elementsToObserve = document.querySelectorAll('[data-animate-id]');
    elementsToObserve.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const isVisible = (id) => visibleElements.has(id);

  return { isVisible };
};

// Custom hook for toast management (Tidak berubah)
const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });

  const showToast = (message, type = 'info', duration = 4000) => {
    setToast({ message, type, isVisible: true });
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, duration);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return { toast, showToast, hideToast };
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const { isVisible } = useScrollAnimation();

  // GANTI LINK GOOGLE DRIVE DI SINI
  const medpartDriveLink = "https://drive.google.com/file/d/1Jhw1IxZfAzwSW6MgeYwQYZhjuxbSyS2v/view?usp=drive_link";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      showToast('Pesan berhasil dikirim! Terima kasih atas pesan Anda.', 'success', 5000);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${type} berhasil disalin ke clipboard! 📋`, 'success', 3000);
    } catch (err) {
      showToast(`Gagal menyalin ${type}. Silakan coba lagi.`, 'error', 3000);
    }
  };

  const handleDownloadSOP = () => {
    if (medpartDriveLink === "LINK_GOOGLE_DRIVE_KAMU_DISINI") {
       showToast('Link SOP belum diatur. Silakan hubungi admin.', 'warning');
    } else {
       window.open(medpartDriveLink, '_blank');
       showToast('Membuka SOP Media Partner... 📄', 'info');
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          {/* Header Section */}
          <div 
            className={`text-center mb-8 sm:mb-16 transition-all duration-1000 transform ${
              isVisible('header') 
                ? 'translate-y-0 opacity-100' 
                : '-translate-y-10 opacity-0'
            }`}
            data-animate-id="header"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 sm:mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Hubungi Kami
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              Jika kamu memiliki pertanyaan, saran, atau ingin mengajukan <b>Media Partner</b>, 
              silakan hubungi kami melalui kanal di bawah ini.
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div 
              className={`mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-2xl animate-bounce transition-all duration-700 transform ${
                isVisible('success') 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-5 opacity-0 scale-95'
              }`}
              data-animate-id="success"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Pesan berhasil dikirim! Terima kasih.
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* LEFT COLUMN: Contact Form */}
            <div 
              className={`bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-1000 transform ${
                isVisible('contact-form') 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              data-animate-id="contact-form"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nama Lengkap"
                      className="w-full p-3 sm:p-4 bg-gray-50/50 border-2 border-gray-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 group-hover:border-gray-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full p-3 sm:p-4 bg-gray-50/50 border-2 border-gray-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 group-hover:border-gray-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subjek"
                    className="w-full p-3 sm:p-4 bg-gray-50/50 border-2 border-gray-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 group-hover:border-gray-200 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Pesan"
                    rows="4"
                    className="w-full p-3 sm:p-4 bg-gray-50/50 border-2 border-gray-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 group-hover:border-gray-200 resize-none text-sm sm:text-base"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-semibold transform transition-all duration-300 shadow-lg text-sm sm:text-base ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: Contact Info & Medpart */}
            <div 
              className={`space-y-4 sm:space-y-6 transition-all duration-1000 transform ${
                isVisible('contact-info') 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              data-animate-id="contact-info"
            >
              {/* Contact Info Card */}
              <div 
                className={`bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-1200 transform delay-100 ${
                  isVisible('info-card') 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-15 opacity-0 scale-95'
                }`}
                data-animate-id="info-card"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Informasi Kontak</h2>
                <div className="space-y-4 sm:space-y-6">
                  {/* Address */}
                  <div 
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-0 hover:bg-blue-50/50 rounded-xl transition-all duration-800 transform ${
                      isVisible('address-item') 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-10 opacity-0'
                    }`}
                    data-animate-id="address-item"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Alamat</h3>
                      <p className="text-gray-600 text-sm sm:text-base">Kampus UDINUS, Semarang</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div 
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-0 hover:bg-green-50/50 rounded-xl transition-all duration-900 transform cursor-pointer group delay-100 ${
                      isVisible('email-item') 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-10 opacity-0'
                    }`}
                    data-animate-id="email-item"
                    onClick={() => copyToClipboard('penalaranudinus@gmail.com', 'Email')}
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Email</h3>
                      <p className="text-gray-600 text-sm sm:text-base">penalaranudinus@gmail.com</p>
                      <p className="text-xs text-gray-400 mt-1 group-hover:text-green-600 transition-colors">Klik untuk copy</p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div 
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-0 hover:bg-pink-50/50 rounded-xl transition-all duration-1000 transform cursor-pointer group delay-200 ${
                      isVisible('instagram-item') 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-10 opacity-0'
                    }`}
                    data-animate-id="instagram-item"
                    onClick={() => copyToClipboard('@penalaranudinus', 'Instagram')}
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 1v1a1 1 0 001 1h8a1 1 0 001-1V5M7 4h10M7 4H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Instagram</h3>
                      <p className="text-gray-600 text-sm sm:text-base">@penalaranudinus</p>
                      <p className="text-xs text-gray-400 mt-1 group-hover:text-pink-600 transition-colors">Klik untuk copy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEDPART SECTION (REPLACES QUICK LINKS) */}
              <div 
                className={`bg-white/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-1300 transform delay-200 overflow-hidden relative ${
                  isVisible('medpart-section') 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-15 opacity-0 scale-95'
                }`}
                data-animate-id="medpart-section"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-50 -translate-y-10 translate-x-10 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Media Partner</h2>
                  </div>
                  
                  <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                    Ingin bekerjasama dengan UKM Penalaran? Kami terbuka untuk kolaborasi event dan publikasi. Unduh syarat & ketentuannya di bawah ini.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>SOP Publikasi & Kerjasama</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Template MoU (Opsional)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Benefit Media Partner</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleDownloadSOP}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-6 rounded-xl sm:rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg group"
                  >
                    <span className="font-semibold text-sm sm:text-base">Download SOP & Syarat</span>
                    <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div 
                className={`bg-gradient-to-r from-green-500 to-emerald-500 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl text-white transition-all duration-1400 transform delay-300 ${
                  isVisible('whatsapp-card') 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-20 opacity-0 scale-95'
                }`}
                data-animate-id="whatsapp-card"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Butuh Respon Cepat?</h3>
                <p className="text-green-100 mb-4 text-sm sm:text-base">Hubungi kami via WhatsApp untuk mendapat jawaban lebih cepat</p>
                <a 
                  href="https://wa.me/6283107154446"
                  onClick={() => showToast('Membuka WhatsApp... 💬', 'info', 2000)}
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 active:scale-95 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;