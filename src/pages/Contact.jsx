import { useState, useEffect, useRef } from 'react';

// IMPORT FIREBASE
import { db } from '../config/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

// Toast Component - Apple macOS/iOS Style
const Toast = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return { iconColor: 'text-[#34c759]', bgColor: 'bg-white/80' };
      case 'info':
        return { iconColor: 'text-[#8b5cf6]', bgColor: 'bg-white/80' }; // Brand Purple
      case 'warning':
        return { iconColor: 'text-[#ff9f0a]', bgColor: 'bg-white/80' };
      case 'error':
        return { iconColor: 'text-[#ff3b30]', bgColor: 'bg-white/80' };
      default:
        return { iconColor: 'text-[#86868b]', bgColor: 'bg-white/80' };
    }
  };

  const config = getToastConfig();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className={`w-6 h-6 ${config.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'info':
        return (
          <svg className={`w-6 h-6 ${config.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
      case 'error':
        return (
          <svg className={`w-6 h-6 ${config.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.684-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-400">
      <div className={`${config.bgColor} backdrop-blur-xl border border-[#d2d2d7]/50 px-5 py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-3 min-w-[300px] max-w-md`}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#1d1d1f] text-[15px] tracking-tight">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-[#86868b] hover:text-[#1d1d1f] hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Custom hook for scroll animations
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
      { threshold: 0.1, rootMargin: '50px 0px -50px 0px' }
    );

    const elementsToObserve = document.querySelectorAll('[data-animate-id]');
    elementsToObserve.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { isVisible: (id) => visibleElements.has(id) };
};

// Custom hook for toast management
const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });

  const showToast = (message, type = 'info', duration = 4000) => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, duration);
  };

  const hideToast = () => setToast(prev => ({ ...prev, isVisible: false }));

  return { toast, showToast, hideToast };
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const { isVisible } = useScrollAnimation();

  // STATE UNTUK MENYIMPAN INFO KONTAK DARI FIREBASE
  const [contactInfo, setContactInfo] = useState({
    cp1Name: 'Salwa',
    cp1Wa: '6283107154446',
    cp2Name: 'Nadya Nissa',
    cp2Wa: '6285602024636',
    medpartLink: ''
  });

  // AMBIL DATA KONTAK DARI FIREBASE SAAT HALAMAN DIBUKA
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const docRef = doc(db, "settings", "contact_info");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContactInfo(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching contact info: ", error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Menyimpan data pesan ke Firestore
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: 'unread' 
      });

      setShowSuccess(true);
      showToast('Pesan berhasil dikirim.', 'success', 5000);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding message: ", error);
      showToast('Gagal mengirim pesan. Coba lagi nanti.', 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${type} disalin.`, 'success', 3000);
    } catch (err) {
      showToast(`Gagal menyalin ${type}.`, 'error', 3000);
    }
  };

  const handleDownloadSOP = () => {
    if (!contactInfo.medpartLink || contactInfo.medpartLink === "LINK_GOOGLE_DRIVE_KAMU_DISINI") {
       showToast('Tautan SOP belum tersedia.', 'warning');
    } else {
       window.open(contactInfo.medpartLink, '_blank');
    }
  };

  return (
    <>
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />

      <section className="min-h-screen bg-[#fbfbfd] font-sans antialiased text-[#1d1d1f] selection:bg-[#8b5cf6] selection:text-white">
        {/* 👇 SPASI ATAS DIPERKETAT: Menggunakan pt-20 di HP dan sm:pt-24 md:pt-32 di layar besar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:py-24">
          
          {/* Header Section */}
          <div 
            className={`text-center mb-12 sm:mb-24 transition-all duration-1000 ease-out transform ${
              isVisible('header') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            data-animate-id="header"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter mb-4 sm:mb-6">
              Hubungi Kami.
            </h1>
            <p className="text-base sm:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed font-medium">
              Punya pertanyaan, saran, atau ingin mengajukan kerja sama Media Partner? Kami siap mendengarkan.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Contact Form */}
            <div 
              className={`lg:col-span-7 bg-white p-6 sm:p-10 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#d2d2d7]/30 transition-all duration-1000 ease-out transform delay-100 ${
                isVisible('contact-form') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              data-animate-id="contact-form"
            >
              <h2 className="text-2xl font-semibold tracking-tight mb-8">Kirim Pesan</h2>
              
              {showSuccess && (
                <div className="mb-8 p-4 bg-[#f2fcf5] border border-[#34c759]/30 text-[#248a3d] rounded-2xl flex items-center gap-3 animate-in fade-in duration-500">
                  <svg className="w-5 h-5 text-[#34c759]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-[15px]">Pesan Anda telah berhasil terkirim.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nama Lengkap"
                      className="w-full px-5 py-4 bg-[#f5f5f7] border border-transparent rounded-2xl focus:bg-white focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/10 transition-all duration-300 outline-none text-[15px] font-medium placeholder-[#86868b]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full px-5 py-4 bg-[#f5f5f7] border border-transparent rounded-2xl focus:bg-white focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/10 transition-all duration-300 outline-none text-[15px] font-medium placeholder-[#86868b]"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subjek"
                    className="w-full px-5 py-4 bg-[#f5f5f7] border border-transparent rounded-2xl focus:bg-white focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/10 transition-all duration-300 outline-none text-[15px] font-medium placeholder-[#86868b]"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Pesan Anda"
                    rows="5"
                    className="w-full px-5 py-4 bg-[#f5f5f7] border border-transparent rounded-2xl focus:bg-white focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/10 transition-all duration-300 outline-none text-[15px] font-medium placeholder-[#86868b] resize-none"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-full font-semibold text-[15px] transition-all duration-300 mt-4 ${
                    isSubmitting
                      ? '!bg-[#e5e5ea] !text-[#86868b] cursor-not-allowed'
                      : '!bg-[#8b5cf6] !text-white hover:!bg-[#7c3aed] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </span>
                  ) : 'Kirim Pesan'}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: Contact Info & Medpart */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Information Card */}
              <div 
                className={`bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#d2d2d7]/30 transition-all duration-1000 ease-out transform delay-200 ${
                  isVisible('info-card') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                data-animate-id="info-card"
              >
                <h3 className="text-xl font-semibold tracking-tight mb-6">Informasi</h3>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[15px] mb-1">Lokasi</h4>
                      <p className="text-[#86868b] text-[15px]">Kampus UDINUS, Semarang</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div 
                    className="flex items-start gap-4 cursor-pointer group"
                    onClick={() => copyToClipboard('penalaranudinus@gmail.com', 'Email')}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8b5cf6] transition-colors duration-300">
                      <svg className="w-5 h-5 text-[#1d1d1f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[15px] mb-1">Email</h4>
                      <p className="text-[#86868b] text-[15px]">penalaranudinus@gmail.com</p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div 
                    className="flex items-start gap-4 cursor-pointer group"
                    onClick={() => copyToClipboard('@penalaranudinus', 'Instagram')}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8b5cf6] transition-colors duration-300">
                      <svg className="w-5 h-5 text-[#1d1d1f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[15px] mb-1">Instagram</h4>
                      <p className="text-[#86868b] text-[15px]">@penalaranudinus</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Partner Card */}
              <div 
                className={`bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#d2d2d7]/30 transition-all duration-1000 ease-out transform delay-300 ${
                  isVisible('medpart-card') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                data-animate-id="medpart-card"
              >
                <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3">Media Partner</h3>
                <p className="text-[#86868b] text-[15px] leading-relaxed mb-6">
                  Terbuka untuk kolaborasi event dan publikasi. Unduh syarat dan ketentuannya di sini.
                </p>
                <button 
                  onClick={handleDownloadSOP}
                  className="w-full !bg-[#1d1d1f] !text-white py-3.5 px-6 rounded-full font-medium text-[15px] hover:!bg-[#333336] transition-colors active:scale-[0.98]"
                >
                  Unduh SOP Kerjasama
                </button>
              </div>

              {/* WhatsApp Card (Dynamic from Firebase) */}
              <div 
                className={`bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#d2d2d7]/30 transition-all duration-1000 ease-out transform delay-400 ${
                  isVisible('whatsapp-card') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                data-animate-id="whatsapp-card"
              >
                <h3 className="text-xl font-semibold tracking-tight mb-2">Butuh Respon Cepat?</h3>
                <p className="text-[#86868b] text-[15px] mb-6">Hubungi via WhatsApp untuk jawaban langsung.</p>
                
                <div className="flex flex-col gap-3">
                  <a 
                    href={`https://wa.me/${contactInfo.cp1Wa}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between !bg-[#f0fdf4] hover:!bg-[#dcfce7] !text-[#166534] border !border-[#22c55e]/30 px-5 py-4 rounded-2xl transition-colors duration-300 group"
                  >
                    <span className="font-medium text-[15px]">CP: {contactInfo.cp1Name}</span>
                    <svg className="w-5 h-5 !text-[#22c55e] group-hover:!text-[#15803d] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                  </a>
                  
                  <a 
                    href={`https://wa.me/${contactInfo.cp2Wa}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between !bg-[#f0fdf4] hover:!bg-[#dcfce7] !text-[#166534] border !border-[#22c55e]/30 px-5 py-4 rounded-2xl transition-colors duration-300 group"
                  >
                    <span className="font-medium text-[15px]">CP: {contactInfo.cp2Name}</span>
                    <svg className="w-5 h-5 !text-[#22c55e] group-hover:!text-[#15803d] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;