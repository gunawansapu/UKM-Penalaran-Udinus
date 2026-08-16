// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Activities from '../pages/Activities';
import News from '../pages/News';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Kuis from '../pages/Kuis';
import ScrollToTop from '../components/ScrollOnTop';
import DetailNews from '../pages/NewsDetail';
import AllNews from '../pages/Allnews';
import EventDetail from '../pages/EventDetail';

// === IMPORT KOMPONEN KEAMANAN & ADMIN ===
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import Login from '../pages/admin/Login';

// === IMPORT HALAMAN ANALITIK (BARU) ===
import Analytics from '../pages/admin/Analytics';

import AddNews from '../pages/admin/AddNews';
import AddEvent from '../pages/admin/AddEvent';
import ManageNews from '../pages/admin/ManageNews'; 
import ManageEvents from '../pages/admin/ManageEvents';
import AddGallery from '../pages/admin/AddGallery';
import ManageGallery from '../pages/admin/ManageGallery';
import ManageContact from '../pages/admin/ManageContact';

// === IMPORT HALAMAN EDIT BERITA, EVENT, & GALERI ===
import EditNews from '../pages/admin/EditNews';
import EditEvent from '../pages/admin/EditEvent'; 
import EditGallery from '../pages/admin/EditGallery'; 

// === IMPORT HALAMAN KELOLA TIM & DIVISI ===
import AddTeam from '../pages/admin/AddTeam';
import ManageTeam from '../pages/admin/ManageTeam';
import EditTeam from '../pages/admin/EditTeam';
import ManageDivisions from '../pages/admin/ManageDivisions';
import EditDivision from '../pages/admin/EditDivision'; 

// === IMPORT HALAMAN KELOLA PENDAFTARAN & BARCODE ===
import ManageRecruitment from '../pages/admin/ManageRecruitment';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* === RUTE PUBLIK (WEB UTAMA) === */}
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/kegiatan" element={<Activities />} />
        <Route path="/kegiatan/:id" element={<EventDetail />} />
        <Route path="/berita" element={<News />} />
        <Route path="/galeri" element={<Gallery />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/kuis" element={<Kuis />} />
        <Route path="/news/:id" element={<DetailNews />} />
        <Route path="/berita/:id" element={<DetailNews />} />
        <Route path="/semua-berita" element={<AllNews />} />

        {/* === RUTE ADMIN CMS === */}
        <Route path="/admin/login" element={<Login />} />

        {/* === RUTE ANALITIK (BARU) === */}
        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/add-news" 
          element={
            <ProtectedRoute>
              <AddNews />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/add-event" 
          element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/manage-news" 
          element={
            <ProtectedRoute>
              <ManageNews />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/edit-news/:id" 
          element={
            <ProtectedRoute>
              <EditNews />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/manage-events" 
          element={
            <ProtectedRoute>
              <ManageEvents />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/edit-event/:id" 
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/add-gallery" 
          element={
            <ProtectedRoute>
              <AddGallery />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/manage-gallery" 
          element={
            <ProtectedRoute>
              <ManageGallery />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/edit-gallery/:id" 
          element={
            <ProtectedRoute>
              <EditGallery />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/manage-contact" 
          element={
            <ProtectedRoute>
              <ManageContact />
            </ProtectedRoute>
          } 
        />

        {/* === RUTE TIM / ANGGOTA === */}
        <Route 
          path="/admin/add-team" 
          element={
            <ProtectedRoute>
              <AddTeam />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/manage-team" 
          element={
            <ProtectedRoute>
              <ManageTeam />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/edit-team/:id" 
          element={
            <ProtectedRoute>
              <EditTeam />
            </ProtectedRoute>
          } 
        />

        {/* === RUTE PENGATURAN DIVISI & FOTO GRUP === */}
        <Route 
          path="/admin/manage-divisions" 
          element={
            <ProtectedRoute>
              <ManageDivisions />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/edit-division/:id" 
          element={
            <ProtectedRoute>
              <EditDivision />
            </ProtectedRoute>
          } 
        />

        {/* === RUTE KELOLA PENDAFTARAN & BARCODE === */}
        <Route 
          path="/admin/manage-recruitment" 
          element={
            <ProtectedRoute>
              <ManageRecruitment />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;