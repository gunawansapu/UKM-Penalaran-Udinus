// src/components/RecruitmentButton.jsx
import React, { useState, useEffect } from 'react';

const RecruitmentButton = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(true); // Registration is now closed

  const openDate = new Date("2025-08-10T00:00:00");
  const closeDate = new Date("2025-08-31T23:59:59"); // Example close date

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = openDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setIsOpen(false);
        setIsClosed(false);
      } else if (now >= openDate && now <= closeDate) {
        setTimeLeft(null);
        setIsOpen(true);
        setIsClosed(false);
      } else {
        // Registration is closed
        setTimeLeft(null);
        setIsOpen(false);
        setIsClosed(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    const now = new Date();
    if (isClosed) {
      // Show closed modal
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl transform">
          <div class="text-6xl mb-4">🚫</div>
          <h3 class="text-2xl font-bold text-red-600 mb-4">Pendaftaran Ditutup</h3>
          <p class="text-gray-600 mb-6">Maaf, periode pendaftaran sudah berakhir.<br>Nantikan periode berikutnya!</p>
          <button onclick="this.parentElement.parentElement.remove()" class="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
            Mengerti
          </button>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, 3000);
    } else if (now < openDate) {
      // Custom modal for not yet open
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl transform animate-pulse">
          <div class="text-6xl mb-4">⏰</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Sabar Ya!</h3>
          <p class="text-gray-600 mb-6">Pendaftaran akan dibuka pada<br><strong>10 Agustus 2025</strong></p>
          <button onclick="this.parentElement.parentElement.remove()" class="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Oke, Siap!
          </button>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, 3000);
    } else {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSeMMFycrPpbOl94W_uS5Vo4V_6E9BE7Wq9xABT1jRhkw7JGEw/viewform", "_blank");
    }
  };

  // If registration is closed
  if (isClosed) {
    return (
      <div className="text-center space-y-6">
        {/* Closed Notice */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
          <div className="text-4xl mb-3">🚫</div>
          <h4 className="text-xl font-bold text-red-600 mb-2">Pendaftaran Ditutup</h4>
          <p className="text-gray-600">Periode pendaftaran telah berakhir. Terima kasih atas minat Anda!</p>
        </div>

        {/* Disabled Button */}
        <button
          onClick={handleClick}
          className="relative bg-gradient-to-r from-red-400 to-red-500 text-white px-10 py-4 rounded-2xl font-bold text-lg cursor-pointer hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
        >
          <span className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
            <span>Pendaftaran Ditutup</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>
    );
  }

  // If not yet open, show countdown
  if (!isOpen && timeLeft) {
    return (
      <div className="text-center space-y-6">
        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border-2 border-orange-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Pendaftaran Segera Dibuka!</h4>
          <div className="flex justify-center space-x-4">
            <div className="bg-white rounded-xl p-3 shadow-md min-w-[60px]">
              <div className="text-2xl font-bold text-orange-600">{timeLeft.days}</div>
              <div className="text-xs text-gray-500">Hari</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-md min-w-[60px]">
              <div className="text-2xl font-bold text-orange-600">{timeLeft.hours}</div>
              <div className="text-xs text-gray-500">Jam</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-md min-w-[60px]">
              <div className="text-2xl font-bold text-orange-600">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-500">Menit</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-md min-w-[60px]">
              <div className="text-2xl font-bold text-orange-600">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-500">Detik</div>
            </div>
          </div>
        </div>

        {/* Disabled Button with Notification */}
        <button
          onClick={handleClick}
          className="relative bg-gradient-to-r from-gray-400 to-gray-500 text-white px-10 py-4 rounded-2xl font-bold text-lg cursor-pointer hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
        >
          <span className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Ingatkan Saya</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>
    );
  }

  // If registration is open
  return (
    <button
      onClick={handleClick}
      className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden group bg-size-200 hover:bg-pos-100 animate-gradient"
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradient 3s ease infinite'
      }}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      {/* Button Content */}
      <span className="relative flex items-center justify-center space-x-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span>Daftar Sekarang</span>
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>

      {/* Pulse Ring */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/50 animate-ping"></div>
    </button>
  );
};

export default RecruitmentButton;