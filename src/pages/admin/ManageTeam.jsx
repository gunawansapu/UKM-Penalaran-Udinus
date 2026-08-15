// src/pages/admin/ManageTeam.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Link } from 'react-router-dom';
import { Trash2, Edit, ExternalLink, Plus, Loader2, UserCircle, Users } from 'lucide-react';

export default function ManageTeam() {
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "team"));
      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dataList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTeamList(dataList);
    } catch (error) {
      console.error("Error fetching team: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus anggota ini?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "team", id));
      alert("Anggota berhasil dihapus!");
      setTeamList(teamList.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting member: ", error);
      alert("Gagal menghapus anggota.");
    }
  };

  return (
    <SidebarAdmin>
      <div className="max-w-7xl mx-auto pb-12 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 mt-4 md:mt-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Kelola Tim</h1>
            <p className="text-slate-500 font-medium mt-1 text-base">Manajemen data anggota dan pengurus UKM Penalaran.</p>
          </div>
          <Link
            to="/admin/add-team"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold !text-white !bg-indigo-600 hover:!bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/30 active:scale-95 border-0"
          >
            <Plus className="!w-5 !h-5 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} strokeWidth={3} />
            <span>Tambah Anggota</span>
          </Link>
        </div>

        {/* Konten Utama */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50/30">
              <Loader2 className="!w-10 !h-10 !text-indigo-600 animate-spin mb-4 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
              <p className="text-slate-500 font-medium">Memuat data tim...</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-5">Foto</th>
                    <th className="px-6 py-5 w-1/3">Nama Lengkap</th>
                    <th className="px-6 py-5">Jabatan & Divisi</th>
                    <th className="px-6 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {teamList.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                            <Users className="!w-8 !h-8 !text-slate-400 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                          </div>
                          <h3 className="text-slate-800 font-bold text-lg mb-1">Belum ada data anggota</h3>
                          <p className="text-slate-500 text-sm font-medium">Klik tombol "Tambah Anggota" di atas untuk mulai mendata.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    teamList.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/80 transition-colors group">
                        
                        {/* Kolom Foto Utama */}
                        <td className="px-6 py-4">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm bg-white relative flex-shrink-0">
                            <img 
                              src={member.image1} 
                              alt={member.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden absolute inset-0 bg-slate-50 items-center justify-center">
                              <UserCircle className="!w-6 !h-6 !text-slate-300 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                            </div>
                          </div>
                        </td>

                        {/* Kolom Nama */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 text-base max-w-xs truncate" title={member.name}>
                            {member.name}
                          </div>
                        </td>

                        {/* Kolom Jabatan & Divisi */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5">
                            <span className="font-bold text-slate-700">{member.role}</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider w-fit">
                              {member.division}
                            </span>
                          </div>
                        </td>

                        {/* Kolom Aksi */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2.5">
                            
                            {/* Tombol Lihat */}
                            <Link 
                              to="/tentang" 
                              target="_blank"
                              className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                              title="Lihat Halaman Tim"
                            >
                              <ExternalLink className="!w-[18px] !h-[18px] !bg-transparent group-hover/btn:!text-white" style={{ fill: 'none', stroke: 'currentColor' }} strokeWidth={2.5} />
                            </Link>

                            {/* Tombol Edit */}
                            <Link 
                              to={`/admin/edit-team/${member.id}`}
                              className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-amber-500 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm group/btn"
                              title="Edit Anggota"
                            >
                              <Edit className="!w-[18px] !h-[18px] !bg-transparent group-hover/btn:!text-white" style={{ fill: 'none', stroke: 'currentColor' }} strokeWidth={2.5} />
                            </Link>

                            {/* Tombol Hapus */}
                            <button 
                              onClick={() => handleDelete(member.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                minWidth: '40px',
                                minHeight: '40px',
                                backgroundColor: '#dc2626',
                                color: '#ffffff',
                                borderRadius: '0.75rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                                transition: 'background-color 0.2s',
                                padding: 0
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                              title="Hapus Anggota"
                            >
                              <Trash2 style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', fill: 'none', stroke: '#ffffff' }} strokeWidth={2.5} />
                            </button>
                            
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </SidebarAdmin>
  );
}