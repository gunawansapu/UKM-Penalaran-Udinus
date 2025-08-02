import React, { useState, useEffect } from 'react';
import soalKuis from '../data/soalKuis';

const SoalCard = ({ soalIndex, setSoalIndex, setSkor, setSelesai }) => {
  const soal = soalKuis[soalIndex];
  const [jawabanDipilih, setJawabanDipilih] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleJawaban = (pilihan) => {
    if (jawabanDipilih) return; // mencegah klik ganda
    
    setJawabanDipilih(pilihan);
    setShowResult(true);
    
    if (pilihan === soal.jawaban) {
      setFeedback('benar');
      setSkor((prev) => prev + 1);
    } else {
      setFeedback('salah');
    }

    setTimeout(() => {
      if (soalIndex + 1 < soalKuis.length) {
        setSoalIndex((prev) => prev + 1);
        setJawabanDipilih(null);
        setFeedback('');
        setShowResult(false);
      } else {
        setSelesai(true);
      }
    }, 1500); // jeda 1.5 detik untuk melihat hasil
  };

  const getButtonStyle = (pilihan) => {
    let baseStyle = 'w-full text-left px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] border-2 font-medium relative overflow-hidden';
    
    if (!showResult) {
      return `${baseStyle} bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 text-gray-700 hover:shadow-md`;
    }
    
    if (pilihan === soal.jawaban) {
      return `${baseStyle} bg-gradient-to-r from-green-100 to-emerald-100 border-green-400 text-green-800 shadow-lg`;
    } else if (pilihan === jawabanDipilih) {
      return `${baseStyle} bg-gradient-to-r from-red-100 to-pink-100 border-red-400 text-red-800 shadow-lg`;
    } else {
      return `${baseStyle} bg-gray-100 border-gray-300 text-gray-500`;
    }
  };

  const getIcon = (pilihan) => {
    if (!showResult) return null;
    
    if (pilihan === soal.jawaban) {
      return (
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl animate-bounce">
          ✓
        </span>
      );
    } else if (pilihan === jawabanDipilih) {
      return (
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 text-xl animate-pulse">
          ✗
        </span>
      );
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
          <div className="flex items-center justify-between text-white">
            <h3 className="text-lg font-medium">
              Soal {soalIndex + 1} dari {soalKuis.length}
            </h3>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {Math.round(((soalIndex + 1) / soalKuis.length) * 100)}%
            </div>
          </div>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${((soalIndex + 1) / soalKuis.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {soal.pertanyaan}
          </h2>
          
          <div className="space-y-4">
            {soal.pilihan.map((pilihan, idx) => (
              <button
                key={idx}
                onClick={() => handleJawaban(pilihan)}
                className={getButtonStyle(pilihan)}
                disabled={!!jawabanDipilih}
              >
                <span className="flex items-center">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{pilihan}</span>
                </span>
                {getIcon(pilihan)}
              </button>
            ))}
          </div>
          
          {/* Feedback Message */}
          {feedback && (
            <div className={`mt-6 p-4 rounded-xl text-center font-semibold text-lg ${
              feedback === 'benar' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {feedback === 'benar' ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <span>Jawaban Benar!</span>
                  <span className="text-2xl">🎉</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">😅</span>
                  <span>Jawaban Kurang Tepat</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoalCard;