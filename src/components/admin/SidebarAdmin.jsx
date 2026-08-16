// src/components/admin/SidebarAdmin.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  CalendarDays, 
  Settings, 
  LogOut, 
  Phone,
  PlusSquare,
  Image as ImageIcon, 
  Camera,
  Users,          
  UserPlus,
  Layout,
  QrCode,          
  BarChart3 // ⬅️ Ikon untuk Analitik
} from 'lucide-react';

export default function SidebarAdmin({ children }) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error("Gagal logout", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex fixed inset-0 z-50 h-screen w-full !bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* TOMBOL MENU (MORPHING HAMBURGER -> X) */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-5 left-5 z-[70] flex items-center justify-center !w-12 !h-12 !p-0 !min-w-0 !min-h-0 border-0 !bg-white hover:!bg-indigo-50 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:!scale-90 transition-all duration-300 focus:outline-none"
      >
        <div className="relative !w-5 !h-4">
          <span className={`absolute left-0 !w-5 !h-0.5 !bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'top-1.5 rotate-45' : 'top-0 rotate-0'}`}></span>
          <span className={`absolute left-0 top-1.5 !w-5 !h-0.5 !bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></span>
          <span className={`absolute left-0 !w-5 !h-0.5 !bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'top-1.5 -rotate-45' : 'top-3 rotate-0'}`}></span>
        </div>
      </button>

      {/* OVERLAY BACKGROUND */}
      <div 
        className={`md:hidden fixed inset-0 !bg-slate-900/60 backdrop-blur-sm z-[45] transition-opacity duration-300 ease-in-out ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* --- Sidebar Kiri --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-72 !bg-slate-900 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        md:relative md:translate-x-0 flex-shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="flex flex-col h-full pt-4 md:pt-0 overflow-hidden">
          {/* Header & Brand */}
          <div className="p-6 pb-4 mt-12 md:mt-0 flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 !bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <LayoutDashboard className="w-6 h-6 !text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold !text-white tracking-tight leading-none">CMS Portal</h1>
                <span className="text-xs font-medium !text-slate-400">UKM Penalaran</span>
              </div>
            </div>

            {/* Profile Section */}
            <div className="!bg-slate-800/50 rounded-2xl p-4 border !border-slate-700/50 mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden !bg-white flex-shrink-0 border-2 !border-slate-600 p-0.5">
                <img 
                  src="https://raw.githubusercontent.com/gunawansapu/avatar/main/penalaran.png" 
                  alt="Admin Penalaran"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs !text-slate-400 font-medium">Logged in as</p>
                <p className="text-sm !text-white font-bold truncate" title={currentUser?.email}>
                  {currentUser?.email || 'admin@udinus.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide pb-6">
            
            {/* Group 0: Dashboard (BARU) */}
            <div>
              <p className="px-3 text-xs font-bold !text-slate-500 uppercase tracking-wider mb-3">Dashboard</p>
              <div className="space-y-1">
                <Link 
                  to="/admin/analytics" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/analytics') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  Analitik & Statistik
                </Link>
              </div>
            </div>

            {/* Group 1: Buat Baru */}
            <div>
              <p className="px-3 text-xs font-bold !text-slate-500 uppercase tracking-wider mb-3">Buat Baru</p>
              <div className="space-y-1">
                <Link 
                  to="/admin/add-news" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/add-news') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <PlusSquare className="w-5 h-5" />
                  Tambah Berita
                </Link>
                <Link 
                  to="/admin/add-event" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/add-event') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <CalendarDays className="w-5 h-5" />
                  Tambah Event
                </Link>
                <Link 
                  to="/admin/add-gallery" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/add-gallery') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <Camera className="w-5 h-5" />
                  Tambah Galeri
                </Link>
                <Link 
                  to="/admin/add-team" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/add-team') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <UserPlus className="!w-5 !h-5 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Tambah Tim
                </Link>
              </div>
            </div>

            {/* Group 2: Manajemen Konten */}
            <div>
              <p className="px-3 text-xs font-bold !text-slate-500 uppercase tracking-wider mb-3">Manajemen Konten</p>
              <div className="space-y-1">
                <Link 
                  to="/admin/manage-news" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/manage-news') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Kelola Berita
                </Link>
                <Link 
                  to="/admin/manage-events" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/manage-events') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Kelola Event
                </Link>
                <Link 
                  to="/admin/manage-gallery" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/manage-gallery') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <ImageIcon className="w-5 h-5" />
                  Kelola Galeri
                </Link>
                <Link 
                  to="/admin/manage-team" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/manage-team') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <Users className="!w-5 !h-5 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Kelola Tim
                </Link>
                <Link 
                  to="/admin/manage-divisions" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/manage-divisions') || location.pathname.includes('/admin/edit-division')
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <Layout className="!w-5 !h-5 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Kelola Divisi
                </Link>
              </div>
            </div>

            {/* Group 3: Pengaturan Sistem */}
            <div>
              <p className="px-3 text-xs font-bold !text-slate-500 uppercase tracking-wider mb-3">Sistem</p>
              <div className="space-y-1">
                <Link 
                  to="/admin/manage-contact" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/manage-contact') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  Kontak Info
                </Link>

                <Link 
                  to="/admin/manage-recruitment" 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium border-0 ${
                    isActive('/admin/manage-recruitment') 
                      ? '!bg-indigo-600 !text-white shadow-md shadow-indigo-500/20' 
                      : '!text-slate-300 hover:!bg-slate-800 hover:!text-white'
                  }`}
                >
                  <QrCode className="!w-5 !h-5 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                  Kelola Pendaftaran
                </Link>
              </div>
            </div>

          </nav>
        </div>
        
        {/* Tombol Logout di Bawah */}
        <div className="p-4 border-t !border-slate-800 flex-shrink-0">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 p-3 border-0 !bg-slate-800 hover:!bg-red-600 !text-slate-300 hover:!text-white rounded-xl transition-all duration-300 font-bold group shadow-none"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Keluar Sesi
          </button>
        </div>
      </aside>

      {/* --- Konten Kanan --- */}
      <main className="flex-1 overflow-y-auto !bg-slate-50 relative w-full pt-20 md:pt-0 scroll-smooth"> 
        <div className="absolute top-0 right-0 w-[500px] h-[500px] !bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="p-4 md:p-8 relative z-10 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}