import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Activities from '../pages/Activities';
import News from '../pages/News';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Kuis from '../pages/Kuis';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tentang" element={<About />} />
      <Route path="/kegiatan" element={<Activities />} />
      <Route path="/berita" element={<News />} />
      <Route path="/galeri" element={<Gallery />} />
      <Route path="/kontak" element={<Contact />} />
      <Route path="/kuis" element={<Kuis />} />
    </Routes>
  );
};

export default AppRoutes;
