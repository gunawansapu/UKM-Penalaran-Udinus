import { useState } from 'react';

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

  const teamMembers = {
    ketua: {
      name: 'Kayla Assifa Rizqi Utami',
      position: 'Ketua UKM Penalaran',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Ketua.JPG',
      description: 'Memimpin dan mengkoordinasi seluruh kegiatan UKM'
    },
    wakil: {
      name: 'Diah Apriesa Maimuna Sari',
      position: 'Wakil Ketua UKM Penalaran',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/DSC00574.JPG',
      description: 'Mendampingi ketua dalam menjalankan organisasi'
    },
    sekretaris: {
      name: 'Arianti Oltya Setiawan',
      position: 'Sekretaris',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/sekretaris.JPG',
      description: 'Mengelola administrasi organisasi'
    },
    bendahara: {
      name: 'Rikha Maharani',
      position: 'Bendahara',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Bendahara.JPG',
      description: 'Mengelola keuangan dan aset organisasi'
    },
    humas: {
      name: 'Salwa Devita Sari',
      position: 'Kepala Divisi Hubungan Masyarakat',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Humas.JPG',
      description: 'Membangun relasi dan komunikasi eksternal'
    },
    ristek: {
      name: 'Gunawan Cholis Saputra',
      position: 'Kepala Divisi Riset & Teknologi',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Rkadiv%20ristek.JPG',
      description: 'Mengembangkan riset dan inovasi teknologi',
      members: [
        { name: 'Arfizan Rabbani', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Ristek%201.JPG' },
        { name: 'Muhammad Fuad Aqila', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCX5TOKkOk3MBt8V-f8PbmGrdLHCi4BoUOs_yuZ1pekOp8U_yWcf40t66JZ4_e_JYpRTOVCl0m8ozEpLrs9Ip2Cm7kQz4fUnUFh8Jcv8fMFfPbfbyWEEKne0S9e_U6fWEmcz0oihuJM6sP1cGFqdJZbLjaEQnGdgJvcxctqhMbNw632OKuAMBMwL86/s414/pp%20kosong%20wa%20default.jpg' },
        { name: 'Amelia Calista', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/DSC00506.JPG' },
        { name: 'Isra Shahzada A', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/ristek%203.JPG' },
        { name: 'Ady Rayyan', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCX5TOKkOk3MBt8V-f8PbmGrdLHCi4BoUOs_yuZ1pekOp8U_yWcf40t66JZ4_e_JYpRTOVCl0m8ozEpLrs9Ip2Cm7kQz4fUnUFh8Jcv8fMFfPbfbyWEEKne0S9e_U6fWEmcz0oihuJM6sP1cGFqdJZbLjaEQnGdgJvcxctqhMbNw632OKuAMBMwL86/s414/pp%20kosong%20wa%20default.jpg' }
      ]
    },
    pengmas: {
      name: 'Ivianka Reva Amanda',
      position: 'Kepala Divisi Pengabdian Masyarakat',
      image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/Kadiv%20Pengmas.JPG',
      description: 'Mengelola program pengabdian kepada masyarakat',
      members: [
        { name: 'Halima Arinnisa', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/pengmas%201.JPG' },
        { name: 'Najwa Melantin', image: 'https://i.pinimg.com/originals/aa/b7/bb/aab7bb35594509ee23540559a8a4b044.jpg' },
        { name: 'Rindiyani Naimah', image: 'https://i.pinimg.com/originals/aa/b7/bb/aab7bb35594509ee23540559a8a4b044.jpg' },
        { name: 'Alfiyyatus saadah', image: 'https://i.pinimg.com/originals/aa/b7/bb/aab7bb35594509ee23540559a8a4b044.jpg' }
      ]
    },
    medkref: {
      name: 'Dwi Maulyda Anggraeni',
      position: 'Kepala Divisi Media & Kreatif',
      image: 'https://i.pinimg.com/originals/aa/b7/bb/aab7bb35594509ee23540559a8a4b044.jpg',
      description: 'Mengelola konten media dan desain kreatif',
      members: [
        { name: 'Miftahul Huda', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCX5TOKkOk3MBt8V-f8PbmGrdLHCi4BoUOs_yuZ1pekOp8U_yWcf40t66JZ4_e_JYpRTOVCl0m8ozEpLrs9Ip2Cm7kQz4fUnUFh8Jcv8fMFfPbfbyWEEKne0S9e_U6fWEmcz0oihuJM6sP1cGFqdJZbLjaEQnGdgJvcxctqhMbNw632OKuAMBMwL86/s414/pp%20kosong%20wa%20default.jpg' },
        { name: 'Dwiky Adi Mahendra', image: 'https://raw.githubusercontent.com/gunawansapu/dokumentasi-penalaran/main/medkref%201.JPG' }
      ]
    }
  };

  const currentMember = teamMembers[selectedPosition];
  const hasMembers = currentMember.members && currentMember.members.length > 0;

  return (
    <section className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite'
    }}>
      {/* Animated Geometric Shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 opacity-20">
        <div className="w-full h-full border-4 border-white rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>
      <div className="absolute top-40 right-20 w-48 h-48 opacity-20">
        <div className="w-full h-full border-4 border-white rounded-lg animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>
      <div className="absolute bottom-20 left-1/4 w-56 h-56 opacity-20">
        <div className="w-full h-full border-4 border-white transform rotate-45 animate-pulse"></div>
      </div>
      
      {/* Floating Bubbles */}
      <div className="absolute top-20 left-1/4 w-20 h-20 bg-white/30 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute top-60 right-1/3 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-white/25 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      {/* Light Rays */}
      <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-white/40 via-transparent to-transparent transform -translate-x-1/2 rotate-12"></div>
      <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -translate-x-1/2 -rotate-12"></div>
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform translate-x-1/2 rotate-12"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-white/30 backdrop-blur-md rounded-full border-2 border-white/50 shadow-lg">
            <span className="text-sm font-bold text-white">✨ Meet Our Amazing Team ✨</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl" style={{
            textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)'
          }}>
            Our Team
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            Kenali para pengurus yang berdedikasi untuk memajukan UKM Penalaran
          </p>
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-24 h-1.5 bg-white rounded-full animate-pulse shadow-lg"></div>
            <div className="w-16 h-1.5 bg-white/80 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-10 h-1.5 bg-white/60 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Position Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {positions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setSelectedPosition(pos.id)}
                className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105"
                style={{
                  background: selectedPosition === pos.id 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)' 
                    : 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  border: selectedPosition === pos.id ? '3px solid rgba(255,255,255,0.8)' : '2px solid rgba(255,255,255,0.4)',
                  color: selectedPosition === pos.id ? '#667eea' : '#ffffff',
                  boxShadow: selectedPosition === pos.id 
                    ? '0 10px 30px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.5)' 
                    : '0 4px 15px rgba(0,0,0,0.2)',
                }}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        {/* Member Card */}
        <div className="flex justify-center">
          <div 
            key={selectedPosition}
            className="w-full max-w-4xl p-12 rounded-3xl backdrop-blur-xl border-2 border-white/40 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              animation: 'cardFadeIn 0.6s ease-out'
            }}
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Photo */}
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse"></div>
                <div className="relative">
                  <img
                    src={currentMember.image}
                    alt={currentMember.name}
                    className="relative w-72 h-96 rounded-2xl object-cover border-8 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-6 border-white shadow-xl flex items-center justify-center animate-pulse">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Featured Member</span>
                </div>
                <h3 className="text-4xl font-black mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {currentMember.name}
                </h3>
                <p className="text-xl font-bold text-purple-600 mb-4">
                  {currentMember.position}
                </p>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {currentMember.description}
                </p>

                {/* Social Links */}
                <div className="flex justify-center md:justify-start gap-4">
                  <a 
                    href="#"
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
                  >
                    <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="#"
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
                  >
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="#"
                    className="w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                    }}
                  >
                    <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Members List */}
            {hasMembers && (
              <div className="mt-16 pt-12 border-t-4 border-purple-200">
                <h4 className="text-3xl font-black text-center mb-10 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Anggota Divisi
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  {currentMember.members.map((member, index) => (
                    <div key={index} className="text-center group">
                      <div className="relative mb-3">
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity"></div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="relative w-32 h-40 rounded-2xl object-cover border-4 border-white shadow-xl transform group-hover:scale-110 transition-transform duration-300 mx-auto"
                        />
                      </div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className="rounded-full transition-all duration-300 shadow-lg"
              style={{
                height: '12px',
                width: selectedPosition === pos.id ? '48px' : '12px',
                background: selectedPosition === pos.id 
                  ? 'linear-gradient(90deg, #667eea, #764ba2)' 
                  : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default OurTeam;