// src/components/RecruitmentButton.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const RecruitmentButton = () => {
  const [settings, setSettings] = useState({ isOpen: false, registrationUrl: '', barcodeImage: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'recruitment');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching recruitment settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleClick = () => {
    if (!settings.isOpen) {
      // Modal Pendaftaran Ditutup
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl transform">
          <div class="text-6xl mb-4">🚫</div>
          <h3 class="text-2xl font-bold text-rose-600 mb-4">Pendaftaran Ditutup</h3>
          <p class="text-slate-600 mb-6">Maaf, periode pendaftaran sudah berakhir.<br>Nantikan periode berikutnya!</p>
          <button onclick="this.parentElement.parentElement.remove()" class="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors font-bold">
            Mengerti
          </button>
        </div>
      `;
      document.body.appendChild(modal);
      
      setTimeout(() => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, 3000);
    } else if (settings.registrationUrl) {
      window.open(settings.registrationUrl, "_blank");
    } else {
      alert("Link pendaftaran belum tersedia.");
    }
  };

  if (loading) {
    return <div className="text-slate-400 text-sm animate-pulse">Memuat tombol...</div>;
  }

  // Jika Pendaftaran Ditutup (isOpen === false)
  if (!settings.isOpen) {
    return (
      <div className="text-center space-y-6 w-full">
        <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl p-6 border-2 border-rose-200">
          <div className="text-4xl mb-3">🚫</div>
          <h4 className="text-xl font-bold text-rose-600 mb-2">Pendaftaran Ditutup</h4>
          <p className="text-slate-600 font-medium">Periode pendaftaran telah berakhir. Terima kasih atas minat Anda!</p>
        </div>

        <button
          onClick={handleClick}
          className="w-full relative bg-gradient-to-r from-rose-400 to-rose-500 text-white px-10 py-4 rounded-2xl font-bold text-lg cursor-pointer hover:from-rose-500 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group border-0"
        >
          <span className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
            <span>Pendaftaran Ditutup</span>
          </span>
        </button>
      </div>
    );
  }

  // Jika Pendaftaran Buka (isOpen === true)
  return (
    <div className="w-full flex flex-col items-center">
      {/* Tombol Daftar */}
      <button
        onClick={handleClick}
        className="w-full relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden group cursor-pointer border-0"
        style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <span className="relative flex items-center justify-center space-x-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Daftar Sekarang</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>

      {/* Jika ada Barcode Image dari database, tampilkan otomatis di bawah tombol atau di section card samping */}
      {settings.barcodeImage && (
        <div className="mt-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
          <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Scan Barcode Pendaftaran</p>
          <img src={settings.barcodeImage} alt="QR Barcode" className="w-32 h-32 object-contain rounded-xl border border-slate-100 p-1" />
        </div>
      )}
    </div>
  );
};

export default RecruitmentButton;