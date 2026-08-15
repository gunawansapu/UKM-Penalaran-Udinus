// src/pages/OurTeam.jsx
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Check } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Import hanya asset default untuk fallback foto profil kosong
import defaultProfileImg from '../assets/images/default_profile.png';

const OurTeam = () => {
  const [activeTab, setActiveTab] = useState('ketua'); 
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [photoMode, setPhotoMode] = useState(0); 
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // State untuk data tim & pengaturan divisi dari Firebase
  const [teamMembers, setTeamMembers] = useState([]);
  const [divisionSettings, setDivisionSettings] = useState({});
  const [loading, setLoading] = useState(true);

  // Ref untuk Story Card
  const storyCardRef = useRef(null);

  // Ambil data anggota dan pengaturan divisi dari Firestore secara paralel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamSnap, divSnap] = await Promise.all([
          getDocs(collection(db, "team")),
          getDocs(collection(db, "division_settings"))
        ]);

        const membersList = teamSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeamMembers(membersList);

        const divMap = {};
        divSnap.forEach(doc => {
          divMap[doc.id] = doc.data();
        });
        setDivisionSettings(divMap);

      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setActiveMemberIndex(0);
    setPhotoMode(0);
  }, [activeTab]);

  const photoModes = [
    { id: 0, label: 'Official', key: 'image1' },    
    { id: 1, label: 'Executive', key: 'image2' },   
    { id: 2, label: 'Signature', key: 'image3' },   
    { id: 3, label: 'Freestyle', key: 'image4' },   
  ];

  const navTabs = [
    { id: 'ketua', label: '𝓚𝓮𝓽𝓾𝓪' },
    { id: 'wakil', label: '𝓦𝓪𝓴𝓲𝓵 𝓚𝓮𝓽𝓾𝓪' },
    { id: 'sekretaris', label: '𝓢𝓮𝓴𝓻𝓮𝓽𝓪𝓻𝓲𝓼' },
    { id: 'bendahara', label: '𝓑𝓮𝓷𝓭𝓪𝓱𝓪𝓻𝓪' },
    { id: 'humas', label: '𝓗𝓾𝓶𝓪𝓼' },
    { id: 'ristek', label: '𝓡𝓲𝓼𝓽𝓮𝓴' },
    { id: 'pengmas', label: '𝓟𝓮𝓷𝓰𝓶𝓪𝓼' },
    { id: 'medkref', label: '𝓜𝓮𝓭𝓴𝓻𝓮𝓯' }
  ];

  const divisionLabels = {
    ketua: 'Ketua Umum', wakil: 'Wakil Ketua', sekretaris: 'Sekretaris',
    bendahara: 'Bendahara', humas: 'Divisi Humas', ristek: 'Divisi Ristek',
    pengmas: 'Divisi Pengmas', medkref: 'Divisi Medkref'
  };

  // Filter anggota berdasarkan divisi aktif
  const currentGroup = teamMembers.filter(member => member.division === activeTab);
  const currentMember = currentGroup[activeMemberIndex] || currentGroup[0];
  const showThumbnails = currentGroup.length > 1;

  // Ambil foto grup dan deskripsi dari database (dengan fallback jika belum diatur)
  const currentDivSetting = divisionSettings[activeTab] || {};
  const groupImage = currentDivSetting.groupImage || defaultProfileImg;
  const groupDesc = currentDivSetting.groupDesc || 'Kebersamaan dan kekompakan tim kami.';

  // FUNGSI SHARE IG STORY
  const handleShareToIG = async () => {
    if (!storyCardRef.current || isGeneratingStory || !currentMember) return;
    setIsGeneratingStory(true);
    setDownloadSuccess(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); 
      const canvas = await html2canvas(storyCardRef.current, {
        scale: 2, backgroundColor: '#ffffff', useCORS: true, allowTaint: true, logging: false, 
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `Story-${(currentMember.name || 'Anggota').replace(/\s+/g, '-')}.png`;
      link.click();
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Error creating story:", err);
      alert("Gagal membuat story. Coba lagi.");
    } finally {
      setIsGeneratingStory(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center text-slate-500 font-bold animate-pulse">Memuat data tim...</div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden font-sans bg-[#f8fafc]">
      
      {/* Ambient Background Blur */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/50 rounded-full blur-[100px] mix-blend-multiply opacity-80 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-blue-300/50 rounded-full blur-[100px] mix-blend-multiply opacity-80 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[120px] mix-blend-multiply opacity-80 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              𝒪𝓊𝓇 𝒯𝑒𝒶𝓂
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Sinergi tanpa batas untuk memajukan UKM Penalaran.
          </p>
        </div>

        {/* 1. NAV TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
            {navTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border overflow-hidden group ${
                        activeTab === tab.id
                        ? '!bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !border-transparent shadow-lg scale-105'
                        : '!bg-white !text-slate-600 !border-slate-200 hover:!bg-slate-50 hover:!text-indigo-600'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Jika belum ada data anggota pada divisi tersebut */}
        {currentGroup.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-3xl p-16 text-center shadow-sm mb-16">
            <p className="text-slate-500 font-bold text-lg">Belum ada data kepengurusan baru untuk divisi ini.</p>
          </div>
        ) : (
          /* === MAIN CARD === */
          <div className="relative !bg-white/60 backdrop-blur-xl border border-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[550px] flex flex-col lg:flex-row mb-16">
              
              {/* KIRI: FOTO BESAR */}
              <div className="lg:w-1/2 relative bg-slate-100 group min-h-[400px] lg:h-auto overflow-hidden">
                  
                  {/* SHARE BUTTON */}
                  <button 
                    onClick={handleShareToIG}
                    disabled={isGeneratingStory}
                    style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'rgba(0,0,0,0.1)', color: '#4f46e5' }}
                    className="absolute top-4 right-4 z-50 p-3 rounded-full border transition-all duration-300 shadow-sm cursor-pointer hover:bg-white hover:scale-105 flex items-center justify-center gap-2"
                    title="Bagikan"
                  >
                     {isGeneratingStory ? (
                       <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" style={{ color: '#4f46e5' }}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     ) : downloadSuccess ? (
                       <Check className="w-5 h-5" />
                     ) : (
                       <Share2 className="w-5 h-5" />
                     )}
                     <span className="hidden sm:inline font-bold text-sm">
                       {downloadSuccess ? 'Tersimpan!' : 'Bagikan'}
                     </span>
                  </button>

                  {/* LOOPING 4 FOTO (Diperbaiki agar merespons state photoMode dan ketersediaan data dengan benar) */}
                  {photoModes.map((mode) => {
                    const imgUrl = currentMember[mode.key];
                    const fallbackUrl = currentMember.image1 || defaultProfileImg;
                    const displayImage = (imgUrl && imgUrl.trim() !== "") ? imgUrl : fallbackUrl;

                    return (
                      <img 
                          key={mode.id}
                          src={displayImage} 
                          alt={`${currentMember.name} ${mode.label}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                            photoMode === mode.id ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                          }`}
                      />
                    );
                  })}
                  
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none"></div>

                  {/* 2. TOMBOL 4 MODE */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-full px-4 flex justify-center">
                      <div className="flex flex-wrap justify-center gap-2 !bg-white/90 backdrop-blur-md rounded-2xl p-2 border border-slate-200 shadow-sm">
                          {photoModes.map((mode) => (
                              <button 
                                  key={mode.id}
                                  type="button"
                                  onClick={() => setPhotoMode(mode.id)}
                                  className={`px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all duration-300 ${
                                      photoMode === mode.id 
                                      ? '!bg-gradient-to-r !from-indigo-600 !to-purple-500 !text-white shadow-md' 
                                      : '!bg-transparent !text-slate-500 hover:!bg-slate-100 hover:!text-slate-900'
                                  }`}
                              >
                                  {mode.label}
                              </button>
                          ))}
                      </div>
                  </div>
              </div>

              {/* KANAN: INFO */}
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative !bg-white/40">
                  <div key={currentMember.name} className="animate-fadeInRight space-y-6">
                      <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full !bg-indigo-50 border border-indigo-100 mb-4 shadow-sm">
                              <span className="w-2 h-2 rounded-full !bg-indigo-500 animate-pulse"></span>
                              <span className="text-indigo-700 text-xs font-bold tracking-wider uppercase">
                                  {divisionLabels[activeTab]}
                              </span>
                          </div>
                          <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                              {currentMember.name}
                          </h3>
                          <p className="text-lg text-indigo-600 mt-2 font-bold">
                              {currentMember.role}
                          </p>
                      </div>

                      <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>

                      <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 !border-indigo-300 pl-4 font-medium">
                          "{currentMember.desc || 'Berkomitmen untuk kemajuan organisasi.'}"
                      </p>
                  </div>
              </div>
          </div>
        )}

        {/* 3. THUMBNAILS */}
        {showThumbnails && (
            <div className="animate-fadeInUp mb-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-12 !bg-slate-300"></div>
                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                        Anggota Tim {divisionLabels[activeTab]}
                    </h4>
                    <div className="h-px w-12 !bg-slate-300"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {currentGroup.map((member, index) => (
                        <button 
                            key={member.id || index}
                            onClick={() => setActiveMemberIndex(index)}
                            type="button"
                            className={`group relative transition-all duration-300 outline-none !bg-transparent ${
                                activeMemberIndex === index 
                                ? 'scale-110 -translate-y-2 z-10' 
                                : 'opacity-100 hover:-translate-y-1'
                            }`}
                        >
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden transition-all duration-300 !bg-white shadow-sm ${
                                activeMemberIndex === index 
                                ? 'ring-4 !ring-indigo-500 shadow-[0_10px_20px_rgba(99,102,241,0.3)]' 
                                : 'ring-2 !ring-slate-200 group-hover:!ring-indigo-300'
                            }`}>
                                <img 
                                    src={member.image1 || defaultProfileImg} 
                                    alt={member.name} 
                                    className={`w-full h-full object-cover transform transition-transform duration-500 ${
                                        activeMemberIndex === index ? 'scale-110' : 'scale-100 group-hover:scale-110'
                                    }`}
                                />
                                {activeMemberIndex !== index && (
                                    <div className="absolute inset-0 !bg-slate-900/10 group-hover:!bg-transparent transition-colors"></div>
                                )}
                            </div>
                            
                            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                                activeMemberIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                            }`}>
                                <span className="block text-[10px] font-bold !text-slate-700 !bg-white border !border-slate-200 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                                    {(member.name || '').split(' ')[0]}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* 4. FOTO BARENG DIVISI (DINAMIS DARI DATABASE) */}
        <div className="animate-fadeInUp relative z-10 mt-12 bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xl">
            <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Keluarga Besar <span className="text-indigo-600">{divisionLabels[activeTab]}</span>
                </h3>
                <p className="text-slate-600 text-sm md:text-base font-medium">
                    {groupDesc}
                </p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm max-h-[600px] flex items-center justify-center p-2">
                <img 
                    src={groupImage} 
                    alt="Foto Bersama Divisi"
                    className="max-w-full max-h-[580px] object-cover rounded-[1.5rem] hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = defaultProfileImg; }}
                />
            </div>
        </div>

      </div>

      {/* =================================================================
          HIDDEN STORY CARD (UNTUK DOWNLOAD INSTAGRAM STORY)
      ================================================================= */}
      {currentMember && (
        <div 
          ref={storyCardRef}
          style={{
              position: 'fixed', top: 0, left: 0, width: '1080px', height: '1920px', zIndex: -10, 
              background: '#ffffff', backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              fontFamily: 'sans-serif', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: '#0f172a'
          }}
        >
          <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '1200px', height: '1200px', background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', opacity: 0.15, filter: 'blur(80px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', right: '-20%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', opacity: 0.15, filter: 'blur(80px)' }}></div>

          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '80px', boxSizing: 'border-box' }}>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
                  <div style={{ 
                      padding: '16px 40px', borderRadius: '50px', background: '#ffffff', border: '2px solid #e2e8f0',
                      color: '#4f46e5', fontSize: '32px', fontWeight: '900', letterSpacing: '2px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                      UKM PENALARAN
                  </div>
              </div>

              <div style={{ 
                  flex: 1, position: 'relative', borderRadius: '80px', overflow: 'hidden', 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)', border: '12px solid #ffffff', backgroundColor: '#e2e8f0'
              }}>
                  <img 
                      src={currentMember[photoModes[photoMode].key] || currentMember.image1 || defaultProfileImg}
                      alt="Story"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%' }}
                  />
                  
                  <div style={{ 
                      position: 'absolute', bottom: 0, left: 0, right: 0, 
                      background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 100%)', 
                      padding: '60px', paddingTop: '150px'
                  }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                          <span style={{ height: '6px', width: '60px', background: '#A855F7', borderRadius: '10px' }}></span>
                          <span style={{ color: '#D8B4FE', fontSize: '32px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
                              {divisionLabels[activeTab]}
                          </span>
                      </div>
                      
                      <h1 style={{ color: '#ffffff', fontSize: '80px', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                          {currentMember.name}
                      </h1>
                      
                      <p style={{ color: '#94A3B8', fontSize: '40px', fontWeight: '500' }}>
                          {currentMember.role}
                      </p>
                  </div>
              </div>

              <div style={{ marginTop: '60px', padding: '50px', background: '#ffffff', borderRadius: '50px', border: '2px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                  <p style={{ color: '#475569', fontSize: '36px', fontStyle: 'italic', lineHeight: '1.5', fontWeight: '500' }}>
                      "{currentMember.desc || 'Berkomitmen untuk kemajuan organisasi.'}"
                  </p>
              </div>

              <div style={{ marginTop: '60px', textAlign: 'center', color: '#64748b', fontSize: '28px', fontWeight: '700', letterSpacing: '2px' }}>
                  <span style={{ color: '#6366f1' }}>@</span>penalaranudinus
              </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default OurTeam;