// src/pages/EventDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// 👇 FUNGSI PENGUBAH LINK YOUTUBE (Otomatis deteksi ID video)
const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;
  // Regex untuk menangkap ID dari link youtube.com atau youtu.be
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  // Kalau ID ketemu (panjangnya 11 karakter), ubah jadi format embed
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}` 
    : url; // Jika gagal/bukan link YouTube, kembalikan URL aslinya
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching event: ", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchEventDetail();
  }, [id]);

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center bg-slate-50 animate-pulse text-lg text-slate-500">Memuat detail kegiatan...</div>;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-sm w-full mx-4">
          <h3 className="text-lg font-bold text-slate-900">Kegiatan tidak ditemukan</h3>
          <Link to="/kegiatan" className="text-blue-600 font-semibold mt-4 block hover:underline">Kembali ke Daftar</Link>
        </div>
      </div>
    );
  }

  // --- LOGIKA UTAMA ---
  // Pendaftaran HANYA BUKA jika statusnya benar-benar 'upcoming' (Akan Datang)
  const isRegistrationOpen = event.status === 'upcoming';

  const getStatusColor = (status) => {
    if (status === 'closed' || status === 'Ditutup') return 'bg-rose-500 text-white';
    return 'bg-emerald-500 text-white'; // Untuk ongoing atau upcoming
  };

  const getStatusText = (status) => {
    if (status === 'closed' || status === 'Ditutup') return '🔒 Ditutup';
    if (status === 'ongoing' || status === 'Sedang Berlangsung') return '🟢 Sedang Berlangsung';
    return '🎯 Akan Datang';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">
      <div className="relative py-8 sm:py-12 px-4 sm:px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          
          <Link to="/kegiatan" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 hover:text-blue-600 rounded-xl transition-all font-semibold shadow-sm border border-slate-200 mb-8">
            Kembali
          </Link>

          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            {/* Header Gambar */}
            <div className="relative h-64 sm:h-[26rem] overflow-hidden group">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute top-6 left-6 right-6 flex flex-wrap justify-between items-start gap-3">
                <span className="bg-white/95 text-slate-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase">{event.category}</span>
                <span className={`${getStatusColor(event.status)} px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-md`}>{getStatusText(event.status)}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">{event.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="font-medium text-sm sm:text-base">{event.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* KONTEN UTAMA */}
              <div className="lg:col-span-2 p-6 sm:p-10 space-y-10">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Deskripsi Kegiatan</h2>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {event.description}
                  </div>
                </div>
                
                {/* TUTORIAL PENDAFTARAN */}
                {(event.tutorialText || event.tutorialImage || event.tutorialVideo) && (
                  <div className="bg-indigo-50/60 rounded-3xl p-6 sm:p-8 border border-indigo-100 space-y-6">
                    <h3 className="text-xl font-bold text-indigo-950 flex items-center gap-2">
                      📖 Panduan & Tutorial Pendaftaran
                    </h3>
                    {event.tutorialText && (
                      <div className="text-slate-700 whitespace-pre-line leading-relaxed bg-white p-5 rounded-2xl shadow-sm border border-indigo-50 font-medium">
                        {event.tutorialText}
                      </div>
                    )}
                    {event.tutorialImage && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Infografis Alur Pendaftaran:</p>
                        <img src={event.tutorialImage} alt="Tutorial Pendaftaran" className="rounded-2xl max-h-[400px] w-full object-contain bg-white p-2 border border-indigo-100 shadow-sm" />
                      </div>
                    )}
                    {event.tutorialVideo && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Video Panduan:</p>
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm border border-indigo-100 bg-black">
                          {/* 👇 PERBAIKAN: Gunakan fungsi getYoutubeEmbedUrl di bagian src */}
                          <iframe 
                            src={getYoutubeEmbedUrl(event.tutorialVideo)} 
                            title="Video Tutorial" 
                            className="w-full h-full" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Syarat & Ketentuan */}
                {event.requirements && event.requirements.length > 0 && (
                  <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-100">
                    <h3 className="font-bold text-lg text-amber-900 mb-4">Syarat & Ketentuan</h3>
                    <ul className="space-y-3">
                      {event.requirements.map((req, i) => (
                        <li key={i} className="flex gap-3 text-amber-800 text-sm sm:text-base">
                          <span className="flex-shrink-0 w-6 h-6 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">{i + 1}</span>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* SIDEBAR */}
              <div className="bg-slate-50/50 p-6 sm:p-8 flex flex-col h-full">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 space-y-5">
                  <h3 className="font-bold text-slate-900 mb-4">Detail Pelaksanaan</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">📅</div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase mb-0.5">Tanggal</div>
                      <div className="font-semibold text-slate-800">{event.date}</div>
                    </div>
                  </div>
                  {event.time && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">⏰</div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase mb-0.5">Waktu</div>
                        <div className="font-semibold text-slate-800">{event.time}</div>
                      </div>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">📍</div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase mb-0.5">Lokasi</div>
                        <div className="font-semibold text-slate-800">{event.location}</div>
                      </div>
                    </div>
                  )}
                  {event.price && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">💰</div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase mb-0.5">Harga Tiket</div>
                        <div className="font-semibold text-emerald-600">{event.price}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mt-auto">
                  {isRegistrationOpen ? (
                    event.registrationUrl ? (
                      <a 
                        href={event.registrationUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full flex justify-center py-3.5 px-6 rounded-xl !font-bold !bg-blue-600 hover:!bg-blue-700 !text-white shadow-sm border-0"
                      >
                        Daftar Sekarang
                      </a>
                    ) : (
                      <div className="w-full py-4 px-6 bg-slate-100 text-slate-500 rounded-xl text-center font-bold border-2 border-slate-200">
                        Link Belum Tersedia
                      </div>
                    )
                  ) : (
                    <div className="w-full py-4 px-6 bg-slate-100 text-slate-500 rounded-xl text-center font-bold border-2 border-slate-200 cursor-not-allowed">
                      🔒 Pendaftaran Ditutup
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;