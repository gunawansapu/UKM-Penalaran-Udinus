import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { activityList } from '../data/aktifitasDetail';

// --- IMPORT FOTO TUTORIAL ---
import foto1 from '../assets/images/tutor1.png';
import foto2 from '../assets/images/tutor2.png';
import foto3 from '../assets/images/tutor3.png';
import foto4 from '../assets/images/tutor4.png';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  
  // State untuk toggle tutorial (default tertutup)
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    const found = activityList.find(e => e.id === parseInt(id));
    setEvent(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-sm w-full mx-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Kegiatan tidak ditemukan</h3>
          <Link to="/kegiatan" className="text-blue-600 font-semibold mt-4 block hover:underline">
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    );
  }

  const isRegistrationOpen = event.status === 'upcoming' || event.status === 'ongoing';

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-emerald-500 text-white shadow-emerald-200';
      case 'ongoing': return 'bg-blue-600 text-white shadow-blue-200';
      case 'closed': return 'bg-rose-500 text-white shadow-rose-200';
      case 'completed': return 'bg-slate-500 text-white shadow-slate-200';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return '🎯 Akan Datang';
      case 'ongoing': return '⚡ Berlangsung';
      case 'closed': return '🔒 Ditutup';
      case 'completed': return '✅ Selesai';
      default: return 'Status';
    }
  };

  const getButtonStyle = (type) => {
    const baseStyle = "w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-sm";
    
    switch (type) {
      case 'primary':
        return `${baseStyle} bg-blue-600 hover:bg-blue-700 !text-white shadow-blue-200 hover:shadow-md border border-transparent`;
      case 'secondary':
        return `${baseStyle} bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50`;
      case 'outline':
        return `${baseStyle} bg-transparent border-2 border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-800`;
      case 'whatsapp':
        return `${baseStyle} bg-[#25D366] hover:bg-[#20bd5a] !text-white shadow-green-200 hover:shadow-md border border-transparent`;
      default:
        return `${baseStyle} bg-slate-800 !text-white`;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">
      
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>
      
      <div className="relative py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <Link 
            to="/kegiatan" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 hover:text-blue-600 rounded-xl transition-all font-semibold shadow-sm hover:shadow-md border border-slate-200 mb-8 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
            
            {/* Header Gambar */}
            <div className="relative h-64 sm:h-[26rem] overflow-hidden group">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute top-6 left-6 right-6 flex flex-wrap justify-between items-start gap-3">
                <span className="bg-white/95 backdrop-blur-sm text-slate-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {event.category}
                </span>
                <span className={`${getStatusColor(event.status)} px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide`}>
                  {getStatusText(event.status)}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-sm">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/90">
                  {event.date && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="font-medium text-sm sm:text-base">{event.date}</span>
                    </div>
                  )}
                  {event.price !== undefined && (
                    <div className="flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg shadow-emerald-900/20">
                      <span className="font-bold text-sm sm:text-base">
                        {event.price === 0 || event.price === "-" ? 'GRATIS' : `Rp ${event.price.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* KONTEN UTAMA (Kiri) */}
              <div className="lg:col-span-2 p-6 sm:p-10">
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </span>
                    Deskripsi
                  </h2>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {event.description}
                  </div>
                </div>

                {event.requirements && (
                  <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
                    <h3 className="font-bold text-lg text-amber-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      Syarat & Ketentuan
                    </h3>
                    <ul className="space-y-3">
                      {event.requirements.map((req, i) => (
                        <li key={i} className="flex gap-3 text-amber-800 text-sm sm:text-base">
                          <span className="flex-shrink-0 w-6 h-6 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* SIDEBAR (Kanan) */}
              <div className="bg-slate-50/50 p-6 sm:p-8 flex flex-col h-full">
                
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 space-y-5">
                  <h3 className="font-bold text-slate-900 mb-4">Detail Pelaksanaan</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">📅</div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Tanggal</div>
                      <div className="font-semibold text-slate-800">{event.date}</div>
                    </div>
                  </div>
                  {event.time && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">⏰</div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Waktu</div>
                        <div className="font-semibold text-slate-800">{event.time}</div>
                      </div>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">📍</div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Lokasi</div>
                        <div className="font-semibold text-slate-800 leading-snug">{event.location}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mt-auto">
                  {isRegistrationOpen ? (
                    <>
                      {event.customButtons?.map((btn, idx) => (
                        <a 
                          key={idx} 
                          href={btn.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className={getButtonStyle(btn.type)}
                        >
                          {btn.type === 'primary' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                          {btn.type === 'secondary' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                          
                          <span className={btn.type === 'primary' ? '!text-white' : ''}>{btn.text}</span>
                          
                          {(btn.type === 'secondary' || btn.type === 'outline') && (
                             <svg className="w-4 h-4 ml-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          )}
                        </a>
                      ))}

                      {/* --- TOMBOL TOGGLE PANDUAN --- */}
                      <div className="pt-2">
                        <button 
                          onClick={() => setIsTutorialOpen(!isTutorialOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-yellow-50 text-yellow-700 rounded-xl text-sm font-semibold border border-yellow-200 hover:bg-yellow-100 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Bingung Cara Akses Link?
                          </span>
                          <svg className={`w-4 h-4 transition-transform duration-200 ${isTutorialOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>

                        {/* --- KONTEN PANDUAN DROP DOWN (DENGAN FOTO) --- */}
                        {isTutorialOpen && (
                          <div className="mt-3 p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 animate-fadeIn">
                            <p className="mb-3 font-medium">Link akan dialihkan ke halaman perantara. Ikuti langkah ini:</p>
                            
                            <div className="space-y-4">
                              {/* Langkah 1 */}
                              <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xs">1</div>
                                <div className="space-y-2 w-full">
                                  <p>Tunggu semua tercentang.</p>
                                  {/* --- FOTO 1 (TIMER) --- */}
                                  <img 
                                    src={foto1} 
                                    alt="Panduan Timer" 
                                    className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                                  />
                                </div>
                              </div>
                              {/* Langkah 2*/}
                              <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                                <div className="space-y-2 w-full">
                                  <p>atau setelah tercentang 1 bisa langsung klik tombol skip verification</p>
                                  {/* --- FOTO 2 (TIMER) --- */}
                                  <img 
                                    src={foto4} 
                                    alt="Panduan Timer" 
                                    className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                                  />
                                </div>
                              </div>

                              {/* Langkah 3 */}
                              <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                                <div className="space-y-2 w-full">
                                  <p>setelah tercentang semua <span className="font-bold text-blue-600">"maka akan menuju ke halaman website tujuan"</span></p>
                                  {/* --- FOTO 3 (TOMBOL) --- */}
                                  <img 
                                    src={foto2} 
                                    alt="Panduan Tombol" 
                                    className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                                  />
                                </div>
                              </div>
                              {/* Langkah 4 */}
                              <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xs">4</div>
                                <div className="space-y-2 w-full">
                                  <p>Berhasil</p>
                                  {/* --- FOTO 4 (TOMBOL) --- */}
                                  <img 
                                    src={foto3} 
                                    alt="Panduan Tombol" 
                                    className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <p className="mt-3 text-xs text-slate-400 italic text-center">
                              *berlaku untuk semua link.
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="w-full py-4 px-6 bg-slate-100 text-slate-500 rounded-xl text-center font-bold border-2 border-slate-200 cursor-not-allowed">
                      🔒 Pendaftaran Ditutup
                    </div>
                  )}
                </div>

                {event.contacts && event.contacts.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 text-center text-sm uppercase tracking-wider">Contact Person</h4>
                    <div className="space-y-3">
                      {event.contacts.map((contact, idx) => (
                        <a 
                          key={idx}
                          href={contact.url}
                          target="_blank" 
                          rel="noreferrer" 
                          className={getButtonStyle('whatsapp')}
                        >
                           <svg className="w-5 h-5 flex-shrink-0 !text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 18c-1.55 0-3.07-.39-4.44-1.12l-.32-.17-3.3.87.88-3.21-.19-.31c-.8-1.28-1.22-2.77-1.22-4.29 0-4.47 3.63-8.1 8.1-8.1s8.1 3.63 8.1 8.1-3.63 8.1-7.61 8.23z"/>
                            <path d="M15.54 13.91c-.19-.1-1.14-.56-1.31-.63-.18-.06-.31-.1-.44.1-.13.19-.5.63-.61.76-.11.12-.23.14-.42.04-.19-.1-.81-.3-1.54-.95-.57-.51-.95-1.14-1.06-1.34-.11-.19-.01-.29.08-.38.09-.09.19-.23.29-.35.09-.11.12-.19.18-.32.06-.13.03-.24-.01-.34-.05-.1-.44-1.05-.6-1.44-.16-.38-.32-.33-.44-.33h-.38c-.13 0-.34.05-.52.24-.18.19-.69.67-.69 1.64s.71 1.91.81 2.05c.09.13 1.39 2.13 3.37 2.99.47.2.84.32 1.13.41.48.15.91.13 1.25.08.38-.06 1.14-.47 1.3-0.92.16-.45.16-.84.11-.92-.05-.07-.18-.11-.38-.21z"/>
                          </svg>
                          <span className="!text-white">Hubungi {contact.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;