// src/pages/admin/ManageDivisions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { Edit, Layout } from 'lucide-react';

export default function ManageDivisions() {
  const divisions = [
    { id: 'ketua', name: 'Ketua Umum' }, { id: 'wakil', name: 'Wakil Ketua' },
    { id: 'sekretaris', name: 'Sekretaris' }, { id: 'bendahara', name: 'Bendahara' },
    { id: 'humas', name: 'Divisi Humas' }, { id: 'ristek', name: 'Divisi Ristek' },
    { id: 'pengmas', name: 'Divisi Pengmas' }, { id: 'medkref', name: 'Divisi Medkref' }
  ];

  return (
    <SidebarAdmin>
      <div className="max-w-5xl mx-auto pb-12">
        <h1 className="text-3xl font-black mb-8 text-slate-900">Kelola Pengaturan Divisi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((div) => (
            <div key={div.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                    <Layout className="!w-6 !h-6 !text-indigo-600 !bg-transparent" style={{ fill: 'none', stroke: 'currentColor' }} />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{div.name}</h3>
              </div>
              <Link to={`/admin/edit-division/${div.id}`} className="bg-slate-100 hover:bg-amber-500 text-slate-600 hover:text-white p-3 rounded-xl transition-colors">
                <Edit size={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SidebarAdmin>
  );
}