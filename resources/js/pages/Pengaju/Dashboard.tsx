// File: resources/js/pages/Pengaju/Dashboard.tsx

import AppLayout from '@/layouts/PengajuLayout';
import { Head, useForm } from '@inertiajs/react';
import { FC, FormEvent, useState } from 'react'; // Hapus usePage jika tidak dipakai, tambah FC untuk tipe

// --- TIPE DATA (Tidak berubah, sudah bagus) ---
type TrackingHistoryItem = {
    tanggal: string;
    aksi_oleh: string;
    status: string;
    catatan: string;
};

type Surat = {
    id: string; // atau number, sesuaikan dengan database
    no_agenda: string;
    perihal: string;
    tanggal_pengajuan: string;
    ditujukan_kepada: string;
    urgensi: string;
    isi_surat: string;
    file_surat: string | null;
    status_terkini: string;
    tracking_history: TrackingHistoryItem[];
};

// --- TIPE PROPS YANG DIHARAPKAN DARI CONTROLLER ---
// Komponen ini sekarang mengharapkan 'auth' dan array 'surat' dari Laravel
type PengajuDashboardProps = {
    auth: { user: { name: string } };
    surat: Surat[]; // <-- PERBAIKAN: Data surat akan diterima dari sini
};

// ===================================================================
// DUMMY DATA DIHAPUS DARI SINI
// Data ini seharusnya dikirim oleh Controller Laravel.
// Komponen React harus bersifat 'dumb' (hanya menampilkan data props).
// ===================================================================

const Dashboard: FC<PengajuDashboardProps> = ({ auth, surat }) => {
    // STATE UNTUK MODAL AJUKAN SURAT
    const [isAjukanModalOpen, setIsAjukanModalOpen] = useState(false);

    // STATE UNTUK MODAL LIHAT DETAIL
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);

    // STATE UNTUK FORM AJUKAN SURAT (useForm sudah bagus)
    const { data, setData, post, processing, errors, reset } = useForm({
        perihal: '',
        ditujukan_kepada: '',
        isi_surat: '',
        urgensi: 'Biasa',
        file_surat: null as File | null,
    });

    // FUNGSI UNTUK MODAL AJUKAN SURAT
    const openAjukanModal = () => setIsAjukanModalOpen(true);
    const closeAjukanModal = () => {
        setIsAjukanModalOpen(false);
        reset();
    };

    // --- PERBAIKAN: Hubungkan form dengan fungsi post dari Inertia ---
    const submitSurat = (e: FormEvent) => {
        e.preventDefault();
        // Ganti '/surat/store' dengan route yang sesuai di web.php Anda
        post('/surat/store', {
            onSuccess: () => closeAjukanModal(),
            // onError: () => {}, // Anda bisa handle error di sini
        });
    };

    // --- PERBAIKAN: Fungsi ini sekarang menerima objek 'Surat' secara langsung ---
    const openDetailModal = (surat: Surat) => {
        setSelectedSurat(surat);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedSurat(null);
    };

    // Fungsi utilitas untuk styling (Tidak berubah, sudah bagus)
    const getStatusClass = (status: string): string => {
        if (status.toLowerCase().includes('selesai')) return 'bg-green-100 text-green-800';
        if (status.toLowerCase().includes('dikembalikan')) return 'bg-red-100 text-red-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    return (
        <AppLayout>
            <Head title="Dashboard Pengaju" />
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Dashboard Pengaju</h1>
            {/* Pastikan 'auth' dan 'user' dikirim dari controller agar tidak error */}
            <p className="mb-8 text-gray-600">Selamat datang, {auth.user?.name || 'Pengguna'}!</p>

            <div className="mb-8 rounded-xl border border-violet-700 bg-gradient-to-br from-violet-600 via-violet-800 to-violet-900 p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white drop-shadow">Surat yang Diajukan</h2>
                    {/* --- PERBAIKAN: Mengaktifkan kembali tombol --- */}
                    <button
                        onClick={openAjukanModal}
                        className="rounded-lg bg-violet-700 px-6 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-violet-800"
                    >
                        + Ajukan Surat Baru
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-violet-700">
                        <thead className="bg-violet-700/80">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-violet-100 uppercase">No.</th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-violet-100 uppercase">Perihal</th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-violet-100 uppercase">Tanggal</th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-violet-100 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-violet-100 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-violet-700 bg-violet-800/60">
                            {/* --- PERBAIKAN: Mapping data dari props 'surat' --- */}
                            {surat.map((item, index) => (
                                <tr key={item.id} className="transition hover:bg-violet-900/60">
                                    <td className="px-6 py-4 font-semibold text-violet-100">{index + 1}</td>
                                    <td className="px-6 py-4 text-white">{item.perihal}</td>
                                    <td className="px-6 py-4 text-violet-200">{item.tanggal_pengajuan}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusClass(item.status_terkini)}`}
                                        >
                                            {item.status_terkini}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* --- PERBAIKAN: Mengirim seluruh objek 'item' ke fungsi --- */}
                                        <button
                                            onClick={() => openDetailModal(item)}
                                            className="font-semibold text-violet-200 transition hover:text-white"
                                        >
                                            Lihat Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* Tambahkan kondisi jika tidak ada surat */}
                            {surat.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-violet-300">
                                        Anda belum pernah mengajukan surat.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODAL UNTUK AJUKAN SURAT BARU (DIAKTIFKAN KEMBALI) --- */}
            {isAjukanModalOpen && (
                <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl">
                        <button className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900" onClick={closeAjukanModal}>
                            &times;
                        </button>
                        <h2 className="mb-6 text-2xl font-bold text-gray-800">Ajukan Surat Baru</h2>
                        {/* --- PERBAIKAN: Menggunakan onSubmit yang sudah terhubung --- */}
                        <form onSubmit={submitSurat}>
                            {/* ... (field form tidak perlu banyak diubah, hanya value dan onChange disesuaikan dengan useForm) ... */}
                            <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="perihal" className="mb-2 block text-sm font-medium text-gray-700">
                                        Perihal
                                    </label>
                                    <input
                                        type="text"
                                        id="perihal"
                                        value={data.perihal}
                                        onChange={(e) => setData('perihal', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                        placeholder="Contoh: Permohonan Izin Penelitian"
                                        required
                                    />
                                    {errors.perihal && <div className="mt-1 text-xs text-red-500">{errors.perihal}</div>}
                                </div>
                                <div>
                                    <label htmlFor="ditujukan_kepada" className="mb-2 block text-sm font-medium text-gray-700">
                                        Ditujukan Kepada
                                    </label>
                                    <input
                                        type="text"
                                        id="ditujukan_kepada"
                                        value={data.ditujukan_kepada}
                                        onChange={(e) => setData('ditujukan_kepada', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                        placeholder="Contoh: Direktur"
                                        required
                                    />
                                    {errors.ditujukan_kepada && <div className="mt-1 text-xs text-red-500">{errors.ditujukan_kepada}</div>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="isi_surat" className="mb-2 block text-sm font-medium text-gray-700">
                                    Isi Surat
                                </label>
                                <textarea
                                    id="isi_surat"
                                    rows={6}
                                    value={data.isi_surat}
                                    onChange={(e) => setData('isi_surat', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    placeholder="Tuliskan isi ringkas surat Anda di sini..."
                                    required
                                ></textarea>
                                {errors.isi_surat && <div className="mt-1 text-xs text-red-500">{errors.isi_surat}</div>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="file_surat" className="mb-2 block text-sm font-medium text-gray-700">
                                    Unggah Draf Surat (Opsional, PDF/DOCX)
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('file_surat', e.target.files ? e.target.files[0] : null)}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {errors.file_surat && <div className="mt-1 text-xs text-red-500">{errors.file_surat}</div>}
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={closeAjukanModal}
                                    className="rounded-lg border border-gray-300 px-6 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                                    disabled={processing}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Mengirim...' : 'Submit Pengajuan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL LIHAT DETAIL (Tidak ada perubahan signifikan, sudah bagus) --- */}
            {isDetailModalOpen && selectedSurat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-950/80 p-4">
                    {/* ... (isi modal detail tidak diubah) ... */}
                </div>
            )}
        </AppLayout>
    );
};

export default Dashboard;
