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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kenali para pengurus yang berdedikasi untuk memajukan UKM Penalaran
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Position Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {positions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setSelectedPosition(pos.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  border: selectedPosition === pos.id ? 'none' : '1px solid #e5e7eb',
                  background: selectedPosition === pos.id 
                    ? 'linear-gradient(to right, #3b82f6, #4f46e5)' 
                    : '#ffffff',
                  color: selectedPosition === pos.id ? '#ffffff' : '#374151',
                  boxShadow: selectedPosition === pos.id 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                    : 'none',
                  transform: selectedPosition === pos.id ? 'scale(1.05)' : 'scale(1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (selectedPosition !== pos.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPosition !== pos.id) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.boxShadow = 'none';
                  }
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
            style={{
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '48px',
              maxWidth: '900px',
              width: '100%',
              border: '1px solid #f3f4f6',
              animation: 'fadeIn 0.5s ease-out'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
              {/* Photo */}
              <div className="relative group">
                <div 
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                    borderRadius: '20px',
                    filter: 'blur(10px)',
                    opacity: 0.25,
                    transition: 'opacity 0.3s'
                  }}
                ></div>
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  style={{
                    position: 'relative',
                    width: '280px',
                    height: '350px',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    border: '5px solid white',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '28px',
                    height: '28px',
                    backgroundColor: '#4ade80',
                    borderRadius: '50%',
                    border: '5px solid white'
                  }}
                ></div>
              </div>

              {/* Info */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <h3 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                  {currentMember.name}
                </h3>
                <p style={{ fontSize: '18px', color: '#2563eb', fontWeight: '500', marginBottom: '16px' }}>
                  {currentMember.position}
                </p>
                <p style={{ color: '#4b5563', lineHeight: '1.75', marginBottom: '24px' }}>
                  {currentMember.description}
                </p>

                {/* Social Links */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
                  {/* Facebook */}
                  <a 
                    href="#"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#1877f2',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }}
                  >
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  {/* Twitter/X */}
                  <a 
                    href="#"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#000000',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }}
                  >
                    <svg width="16" height="16" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a 
                    href="#"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundImage: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }}
                  >
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Members List */}
            {hasMembers && (
              <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '2px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: '32px' }}>
                  Anggota Divisi
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px' }}>
                  {currentMember.members.map((member, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{
                            width: '120px',
                            height: '150px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: '3px solid white',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                      <p style={{ marginTop: '12px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-8">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedPosition === pos.id ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default OurTeam;