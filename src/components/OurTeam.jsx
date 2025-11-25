import { useState } from 'react';

// =========================================
// BAGIAN IMPORT GAMBAR (LOCAL ASSETS)
// =========================================
import defaultProfileImg from '../assets/images/default_profile.png';

// Pengurus Inti
import ketuaImg from '../assets/images/Ketua.jpg';
import wakilImg from '../assets/images/wakil.jpg';
import sekretarisImg from '../assets/images/sekretaris.jpg';
import bendaharaImg from '../assets/images/bendahara.jpg';
import humasImg from '../assets/images/humas.jpg';

// Anggota Sekretaris & Humas & Bendahara
import alifImg from '../assets/images/alif.jpg';
import nadiaHumasImg from '../assets/images/nadia_humas.jpg';

// Divisi Ristek (Kadiv & Anggota)
import ristekKadivImg from '../assets/images/kadiv_ristek.jpg';
import arfizanImg from '../assets/images/arfi.jpg';
import ameliaImg from '../assets/images/amelia.jpg';

// Divisi Pengmas (Kadiv & Anggota)
import pengmasKadivImg from '../assets/images/kadiv_pengmas.jpg';
import halimaImg from '../assets/images/halima.jpg';

// Divisi Medkref (Kadiv & Anggota)
import medkrefKadivImg from '../assets/images/kadiv_medkref.jpg'; 
import miftahulImg from '../assets/images/miftah.jpg';
import israImg from '../assets/images/isra.jpg';
import dwikyImg from '../assets/images/dwiky.jpg';

const OurTeam = () => {
  const [selectedPosition, setSelectedPosition] = useState('ketua');

  const positions = [
    { id: 'ketua', label: 'Ketua' },
    { id: 'wakil', label: 'Wakil Ketua' },
    { id: 'sekretaris', label: 'Sekretaris' },
    { id: 'bendahara', label: 'Bendahara' },
    { id: 'humas', label: 'Humas' },
    { id: 'ristek', label: 'Kadiv Ristek' },
    { id: 'pengmas', label: 'Kadiv Pengmas' },
    { id: 'medkref', label: 'Kadiv Medkref' }
  ];

  // Data member dengan perbaikan posisi foto (imgPos)
  const teamMembers = {
    ketua: {
      name: 'Kayla Assifa Rizqi Utami',
      position: 'Ketua UKM Penalaran',
      image: ketuaImg, 
      description: 'Memimpin dan mengkoordinasi seluruh kegiatan UKM'
    },
    wakil: {
      name: 'Diah Apriesa Maimuna Sari',
      position: 'Wakil Ketua UKM Penalaran',
      image: wakilImg,
      description: 'Mendampingi ketua dalam menjalankan organisasi'
    },
    sekretaris: {
      name: 'Arianti Oltya Setiawan',
      position: 'Sekretaris',
      image: sekretarisImg,
      description: 'Mengelola administrasi organisasi',
      members: [
        { name: 'Auliya Urrosyidah Al Husaini', image: defaultProfileImg }
      ]
    },
    bendahara: {
      name: 'Rikha Maharani',
      position: 'Bendahara',
      image: bendaharaImg,
      description: 'Mengelola keuangan dan aset organisasi',
      members: [
        { name: 'Alif Canda Ramadani', image: alifImg }
      ]
    },
    humas: {
      name: 'Salwa Devita Sari',
      position: 'Kepala Divisi Hubungan Masyarakat',
      image: humasImg,
      description: 'Membangun relasi dan komunikasi eksternal',
      members: [
        // FIX: Posisi Nadia diatur manual (50% horizontal, 20% dari atas) agar wajah terlihat
        { 
          name: 'Nadia Nyssa Icasia Ramadhani', 
          image: nadiaHumasImg, 
          imgPos: 'object-[50%_20%]' 
        }
      ]
    },
    ristek: {
      name: 'Gunawan Cholis Saputra',
      position: 'Kepala Divisi Riset & Teknologi',
      image: ristekKadivImg,
      description: 'Mengembangkan riset dan inovasi teknologi',
      members: [
        { name: 'Ady Rayyan', image: defaultProfileImg },
        { name: 'Muhammad Fuad Aqila', image: defaultProfileImg},
        // FIX: Posisi Arfizan diatur ke Top agar kepala tidak terpotong
        { 
            name: 'Arfizan Rabbani', 
            image: arfizanImg,
            imgPos: 'object-top' 
        },
        { name: 'Amelia Calista', image: ameliaImg },
        { name: 'Ibnu Hanafi Assalam', image: defaultProfileImg },
        { name: 'Nauva Cahayaning Setyawan', image: defaultProfileImg },
        { name: 'Tri Febiana', image: defaultProfileImg },
        { name: 'Hanifa Mutmainah', image: defaultProfileImg }
      ]
    },
    pengmas: {
      name: 'Ivianka Reva Amanda',
      position: 'Kepala Divisi Pengabdian Masyarakat',
      image: pengmasKadivImg,
      description: 'Mengelola program pengabdian kepada masyarakat',
      members: [
        { name: 'Najwa Melantin', image: defaultProfileImg},
        { name: 'Halima Arinnisa', image: halimaImg },
        { name: 'Rindiyani Naimah', image: defaultProfileImg },
        { name: 'Alfiyyatus Sa\'adah', image: defaultProfileImg },
        { name: 'Wafiq Azizah', image: defaultProfileImg },
        { name: 'Nadia Raisa Saharani', image: defaultProfileImg },
        { name: 'Kharida Fahma Syarifa', image: defaultProfileImg },
        { name: 'Jennifer Aulia Malika Salsabila', image: defaultProfileImg },
        { name: 'Chaterine Varisha Utary', image: defaultProfileImg}
      ]
    },
    medkref: {
      name: 'Dwi Maulyda Anggraeni',
      position: 'Kepala Divisi Media & Kreatif',
      image: medkrefKadivImg,
      description: 'Mengelola konten media dan desain kreatif',
      members: [
        { name: 'Miftahul Huda', image: miftahulImg },
        // FIX: Posisi Isra diatur ke Top agar kepala tidak terpotong
        { 
            name: 'Isra Shahzada A', 
            image: israImg,
            imgPos: 'object-top'
        },
        { name: 'Dwiky Adi Mahendra', image: dwikyImg },
        { name: 'Ghaitsa Zahira Shofa', image: defaultProfileImg },
        { name: 'Adinda Kumalasari', image: defaultProfileImg},
        { name: 'Nova Ardhiansyah Lavidha', image: defaultProfileImg },
        { name: 'Farid Fadlian', image: defaultProfileImg }
      ]
    }
  };

  const currentMember = teamMembers[selectedPosition];
  const hasMembers = currentMember.members && currentMember.members.length > 0;

  return (
    <section className="min-h-screen py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-purple-300 text-sm font-semibold border border-purple-500/30">
              Meet Our Amazing Team
            </span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black mb-6 relative">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Our Team
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-20"></div>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Kenali para pengurus yang berdedikasi untuk memajukan UKM Penalaran
          </p>
          
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Position Navigation */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {positions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setSelectedPosition(pos.id)}
                className={`group relative px-8 py-4 rounded-2xl font-bold text-base transition-all duration-500 overflow-hidden ${
                  selectedPosition === pos.id
                    ? 'text-white scale-105 shadow-2xl'
                    : 'text-gray-300 hover:text-white hover:scale-105'
                }`}
              >
                {/* Button Background */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  selectedPosition === pos.id
                    ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 opacity-100'
                    : 'bg-slate-800/50 opacity-100 group-hover:from-purple-600/50 group-hover:to-pink-600/50 group-hover:opacity-100'
                }`}></div>
                
                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                  selectedPosition === pos.id
                    ? 'border-2 border-purple-400/60 shadow-lg shadow-purple-500/30'
                    : 'border border-purple-500/30 group-hover:border-purple-400/50'
                }`}></div>
                
                {/* Glow Effect */}
                {selectedPosition === pos.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 blur-xl opacity-60 animate-pulse"></div>
                )}
                
                {/* Shimmer Effect */}
                {selectedPosition === pos.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                )}
                
                <span className="relative z-10">{pos.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Member Card */}
        <div className="flex justify-center">
          <div 
            key={selectedPosition}
            className="relative max-w-5xl w-full"
            style={{animation: 'fadeInUp 0.6s ease-out'}}
          >
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-30"></div>
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Enhanced Photo Section */}
                <div className="relative group">
                  {/* Photo Glow Ring */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  
                  {/* Photo Frame */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                    <img
                      src={currentMember.image}
                      alt={currentMember.name}
                      className="relative w-80 h-96 object-cover rounded-2xl border-4 border-white/10 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-semibold">Active</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Info Section */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-purple-300 text-sm font-semibold border border-purple-500/30">
                      {currentMember.position}
                    </span>
                  </div>
                  
                  <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    {currentMember.name}
                  </h3>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                    {currentMember.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center lg:justify-start gap-4 mb-8">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="group relative w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-110"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </a>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center lg:justify-start gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50+</div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100+</div>
                      <div className="text-sm text-gray-400">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">3+</div>
                      <div className="text-sm text-gray-400">Years</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Members List */}
              {hasMembers && (
                <div className="mt-16 pt-12 border-t border-purple-500/20">
                  <div className="text-center mb-10">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent inline-block mb-2">
                      Anggota Divisi
                    </h4>
                    <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {currentMember.members.map((member, index) => (
                      <div key={index} className="group text-center">
                        <div className="relative mb-4">
                          {/* Member Photo Glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                          
                          {/* Member Photo dengan Fix Posisi */}
                          <img
                            src={member.image}
                            alt={member.name}
                            className={`relative w-full h-40 object-cover ${member.imgPos || 'object-center'} rounded-2xl border-2 border-purple-500/30 shadow-lg transform group-hover:scale-105 transition-all duration-300`}
                          />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                            <span className="text-white text-xs font-semibold">View Profile</span>
                          </div>
                        </div>
                        
                        <p className="font-semibold text-gray-200 group-hover:text-purple-400 transition-colors duration-300">
                          {member.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className={`rounded-full transition-all duration-500 ${
                selectedPosition === pos.id
                  ? 'w-12 h-3 bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default OurTeam;