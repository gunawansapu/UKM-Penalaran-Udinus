import React from 'react';

const SkorAkhir = ({ skor, total, restart }) => {
  const presentase = (skor / total) * 100;

  return (
    <div className="p-6 text-center bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Skor Akhir Kamu</h2>
      <p className="text-xl mb-2">Jawaban Benar: {skor} dari {total}</p>
      <p className="mb-4 text-green-600 font-semibold">Nilai: {presentase.toFixed(1)}%</p>
      <button
        onClick={restart}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Ulangi Kuis
      </button>
    </div>
  );
};

export default SkorAkhir;
