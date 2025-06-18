import AppLayout from '@/layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, FormEvent } from 'react';


type User = {
    id: number;
    name: string;
    email: string;
    nim_nip: string;
    role: string;
    status: string;
};

type IndexProps = {
    users: User[];
};

export default function Index({ users }: IndexProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nim_nip: '',
        email: '',
        no_telepon: '',
        role: '',
        password: '',
        status_aktif: true,
    });

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AppLayout header={<h1 className="text-3xl font-bold text-violet-900 drop-shadow mb-4">Manajemen Akun Pengguna</h1>}>
            <Head title="Manajemen Pengguna" />

            <div className="bg-gradient-to-br from-violet-100 via-white to-violet-200 p-6 rounded-xl shadow-2xl border border-violet-200 mb-8">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={openModal}
                        className="w-full md:w-auto px-6 py-2 bg-violet-700 text-white rounded-lg font-semibold hover:bg-violet-800 transition duration-200 shadow-md flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path>
                        </svg>
                        Tambah Pengguna Baru
                    </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-violet-200 bg-white/80">
                    <table className="min-w-full divide-y divide-violet-200">
                        <thead className="bg-violet-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider rounded-tl-lg">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">NIM / NIP</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider rounded-tr-lg">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white/80 divide-y divide-violet-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-violet-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-violet-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-violet-800">{user.nim_nip}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-violet-800">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-violet-700">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-violet-700 hover:text-violet-900 mr-3 font-semibold">Edit</button>
                                        <button className={user.status === 'Aktif' ? 'text-red-600 hover:text-red-900 font-semibold' : 'text-green-600 hover:text-green-900 font-semibold'}>
                                            {user.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-violet-950/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-gradient-to-br from-white via-violet-100 to-violet-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-violet-700">
                        <button className="absolute top-4 right-4 text-violet-700 hover:text-white hover:bg-violet-700 transition rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow" onClick={closeModal}>
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-violet-900 mb-6 drop-shadow">Tambah Pengguna Baru</h2>

                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="name" className="block text-violet-800 text-sm font-medium mb-2">Nama Lengkap</label>
                                    <input id="name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 bg-white text-violet-900" required />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="nim_nip" className="block text-violet-800 text-sm font-medium mb-2">NIM / NIP</label>
                                    <input id="nim_nip" type="text" value={data.nim_nip} onChange={e => setData('nim_nip', e.target.value)} className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 bg-white text-violet-900" required />
                                    {errors.nim_nip && <div className="text-red-500 text-sm mt-1">{errors.nim_nip}</div>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-violet-800 text-sm font-medium mb-2">Email</label>
                                <input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 bg-white text-violet-900" required />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="no_telepon" className="block text-violet-800 text-sm font-medium mb-2">No. Telepon (Opsional)</label>
                                <input type="tel" id="no_telepon" value={data.no_telepon} onChange={e => setData('no_telepon', e.target.value)} className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 bg-white text-violet-900" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-violet-800 text-sm font-medium mb-2">Pilih Role</label>
                                <select id="role" value={data.role} onChange={e => setData('role', e.target.value)} className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 bg-white text-violet-900" required>
                                    <option value="">Pilih Role</option>
                                    <option value="pengaju">Pengaju</option>
                                    <option value="ult">ULT</option>
                                    <option value="wadir">Wadir</option>
                                    <option value="admin">Administrator</option>
                                </select>
                                {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-violet-800 text-sm font-medium mb-2">Password</label>
                                <input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 bg-white text-violet-900" placeholder="Minimal 8 karakter" required />
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-violet-800 text-sm font-medium mb-2">Status Akun</label>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" checked={data.status_aktif} onChange={e => setData('status_aktif', e.target.checked)} className="form-checkbox h-5 w-5 text-violet-700 rounded" />
                                    <span className="ml-2 text-violet-800">Aktif</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={closeModal} className="px-6 py-2 border border-violet-300 rounded-lg text-violet-700 font-semibold hover:bg-violet-100 transition duration-200" disabled={processing}>
                                    Batal
                                </button>
                                <button type="submit" className="px-6 py-2 bg-violet-700 text-white rounded-lg font-semibold hover:bg-violet-800 transition duration-200 shadow-md" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Pengguna'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>

    );
}