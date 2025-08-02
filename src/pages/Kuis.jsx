import React, { useState } from 'react';
import SoalCard from '../components/SoalCard';
import SkorAkhir from '../components/SkorAkhir';
import soalKuis from '../data/soalKuis';

const Kuis = () => {
  const [soalIndex, setSoalIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [selesai, setSelesai] = useState(false);

  const restart = () => {
    setSoalIndex(0);
    setSkor(0);
    setSelesai(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      {selesai ? (
        <SkorAkhir skor={skor} total={soalKuis.length} restart={restart} />
      ) : (
        <SoalCard
          soalIndex={soalIndex}
          setSoalIndex={setSoalIndex}
          setSkor={setSkor}
          setSelesai={setSelesai}
        />
      )}
    </div>
  );
};

export default Kuis;
