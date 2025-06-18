import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { PageProps } from '@/types';

// Definisikan tipe dan data
interface User {
    id: number;
    name: string;
    nim_nip: string;
    email: string;
    role: string;
    status: 'Aktif' | 'Nonaktif';
}
const dummyUsers: User[] = [
    { id: 1, name: 'Budi Santoso', nim_nip: '123456789', email: 'budi.santoso@polmed.ac.id', role: 'Pengaju', status: 'Aktif' },
    { id: 2, name: 'Dewi Lestari', nim_nip: 'NIP001', email: 'dewi.lestari@polmed.ac.id', role: 'ULT', status: 'Aktif' },
    { id: 3, name: 'Admin Utama', nim_nip: 'ADM001', email: 'admin@polmed.ac.id', role: 'Administrator', status: 'Aktif' },
    { id: 4, name: 'Citra Kirana', nim_nip: 'NIP002', email: 'citra.kirana@polmed.ac.id', role: 'Kepala Bagian', status: 'Aktif' },
    { id: 5, name: 'Eko Prasetyo', nim_nip: 'NIP003', email: 'eko.prasetyo@polmed.ac.id', role: 'Kepala Sub Bagian', status: 'Nonaktif' },
];
const ROLE_OPTIONS = ['Semua Role', 'Administrator', 'Pengaju', 'ULT', 'Kepala Bagian', 'Kepala Sub Bagian'];

// Komponen Modal untuk Tambah/Edit Pengguna
const UserFormModal = ({ user, onClose, onSave }: { user: Partial<User> | null; onClose: () => void; onSave: (user: User) => void; }) => {
    const [formData, setFormData] = useState<Partial<User>>(user || { name: '', nim_nip: '', email: '', role: 'Pengaju', status: 'Aktif' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userToSave = { ...formData, id: formData.id || Date.now() } as User;
        onSave(userToSave);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative border-2 border-violet-200">
                <button type="button" className="absolute top-4 right-4 text-violet-400 hover:text-violet-700 text-2xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold text-violet-800 mb-6">{user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-violet-700 font-medium mb-1">Nama Lengkap</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-400" required />
                    </div>
                    <div>
                        <label className="block text-violet-700 font-medium mb-1">NIM / NIP</label>
                        <input type="text" name="nim_nip" value={formData.nim_nip} onChange={handleChange} className="w-full border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-400" required />
                    </div>
                    <div>
                        <label className="block text-violet-700 font-medium mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-400" required />
                    </div>
                    <div>
                        <label className="block text-violet-700 font-medium mb-1">Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-400">
                            {ROLE_OPTIONS.slice(1).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-violet-700 font-medium mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-400">
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-violet-300 rounded-lg text-violet-700 font-semibold hover:bg-violet-50 transition">Batal</button>
                    <button type="submit" className="px-6 py-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-violet-600 transition">Simpan</button>
                </div>
            </form>
        </div>
    );
};

// Komponen Modal Konfirmasi Hapus
const DeleteConfirmModal = ({ user, onClose, onConfirm }: { user: User; onClose: () => void; onConfirm: () => void; }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border-2 border-violet-200">
            <h2 className="text-xl font-bold text-violet-800 mb-4">Konfirmasi Hapus</h2>
            <p>Anda yakin ingin menghapus pengguna <strong className="font-semibold">{user.name}</strong>?</p>
            <div className="flex justify-end gap-4 mt-8">
                <button onClick={onClose} className="px-6 py-2 border border-violet-300 rounded-lg text-violet-700 font-semibold hover:bg-violet-50 transition">Batal</button>
                <button onClick={onConfirm} className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-600 transition">Hapus</button>
            </div>
        </div>
    </div>
);

export default function Index({ auth }: PageProps) {
    const [users, setUsers] = useState<User[]>(dummyUsers);
    const [modalState, setModalState] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('Semua Role');

    const filteredUsers = useMemo(() => {
        return users
            .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter(user => roleFilter === 'Semua Role' || user.role === roleFilter);
    }, [users, searchQuery, roleFilter]);

    const handleOpenModal = (type: 'add' | 'edit' | 'delete', user: User | null = null) => {
        setSelectedUser(user);
        setModalState(type);
    };
    const handleCloseModal = () => setModalState(null);

    const handleSaveUser = (userToSave: User) => {
        if (modalState === 'add') {
            setUsers(prev => [userToSave, ...prev]);
        } else {
            setUsers(prev => prev.map(u => u.id === userToSave.id ? userToSave : u));
        }
        handleCloseModal();
    };

    const handleDeleteUser = () => {
        if (!selectedUser) return;
        setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
        handleCloseModal();
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Pengguna" />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-violet-800">Manajemen Pengguna</h1>
                    <p className="text-violet-500">Tambah, edit, atau hapus data pengguna sistem.</p>
                </div>
                <button
                    onClick={() => handleOpenModal('add')}
                    className="px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-violet-600 transition"
                >
                    Tambah Pengguna Baru
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-violet-100">
                <div className="mb-4 flex gap-4">
                    <input
                        type="text"
                        placeholder="Cari Nama Pengguna..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="flex-grow border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-400 text-violet-900"
                    />
                    <select
                        value={roleFilter}
                        onChange={e => setRoleFilter(e.target.value)}
                        className="border border-violet-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-400 text-violet-900"
                    >
                        {ROLE_OPTIONS.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-violet-200">
                        <thead className="bg-gradient-to-r from-violet-50 to-violet-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase">NIM/NIP</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-violet-100">
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 text-violet-900">{user.name}</td>
                                    <td className="px-6 py-4 text-violet-900">{user.nim_nip}</td>
                                    <td className="px-6 py-4 text-violet-900">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-4">
                                        <button
                                            onClick={() => handleOpenModal('edit', user)}
                                            className="text-violet-700 font-semibold hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal('delete', user)}
                                            className="text-red-600 font-semibold hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-violet-400">Tidak ada pengguna ditemukan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {modalState === 'add' && <UserFormModal onClose={handleCloseModal} onSave={handleSaveUser} user={null} />}
            {modalState === 'edit' && selectedUser && <UserFormModal onClose={handleCloseModal} onSave={handleSaveUser} user={selectedUser} />}
            {modalState === 'delete' && selectedUser && <DeleteConfirmModal onClose={handleCloseModal} onConfirm={handleDeleteUser} user={selectedUser} />}
        </AdminLayout>
    );
}