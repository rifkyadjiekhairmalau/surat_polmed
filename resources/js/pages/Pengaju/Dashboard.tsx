// File: resources/js/pages/Pengaju/Dashboard.tsx

import AppLayout from '@/layouts/PengajuLayout'; // Pastikan path ini sesuai dengan struktur folder Anda
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, FormEvent } from 'react';

// --- TIPE DATA LENGKAP ---
type TrackingHistoryItem = {
    tanggal: string;
    aksi_oleh: string;
    status: string;
    catatan: string;
};

type Surat = {
    id: string;
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

// --- DATA DUMMY LENGKAP UNTUK SEMUA SURAT ---
const dummySuratData: Record<string, Surat> = {
    'surat-1': {
        id: 'surat-1', no_agenda: 'S/2025/001', perihal: 'Permohonan Izin Penelitian', tanggal_pengajuan: '2025-06-08', ditujukan_kepada: 'Direktur', urgensi: 'Penting',
        isi_surat: 'Dengan hormat, saya mengajukan permohonan izin untuk melakukan penelitian dengan judul "Pengembangan Sistem Informasi Perpustakaan Berbasis Web" di lingkungan Politeknik Negeri Medan.',
        file_surat: null, status_terkini: 'Didisposisikan ke Wadir PKU',
        tracking_history: [
            { tanggal: '2025-06-08 10:00', aksi_oleh: 'Mahasiswa Budi Santoso', status: 'Diajukan ke Direktur', catatan: 'Surat berhasil diajukan.' },
            { tanggal: '2025-06-08 11:00', aksi_oleh: 'Direktur', status: 'Didisposisikan ke Wadir PKU', catatan: 'Mohon pertimbangan dan tindak lanjut.' },
        ]
    },
    'surat-2': {
        id: 'surat-2', no_agenda: 'S/2025/002', perihal: 'Surat Keterangan Aktif Kuliah', tanggal_pengajuan: '2025-06-05', ditujukan_kepada: 'Wadir PKU', urgensi: 'Biasa',
        isi_surat: 'Dengan ini saya memohon surat keterangan aktif kuliah untuk keperluan beasiswa.',
        file_surat: '#', status_terkini: 'Selesai (Ambil Surat di TU)',
        tracking_history: [
            { tanggal: '2025-06-05 09:00', aksi_oleh: 'Mahasiswa Budi Santoso', status: 'Diajukan', catatan: 'Surat diajukan.' },
            { tanggal: '2025-06-06 14:00', aksi_oleh: 'Wadir PKU', status: 'Selesai', catatan: 'Surat telah selesai. Silakan ambil di Bagian Umum (TU).' },
        ]
    },
};

const suratArray = Object.values(dummySuratData);

type PengajuDashboardProps = {
    auth: { user: { name: string; } }
};

export default function Dashboard({ auth }: PengajuDashboardProps) {
    // STATE UNTUK MODAL AJUKAN SURAT
    const [isAjukanModalOpen, setIsAjukanModalOpen] = useState(false);
    
    // STATE UNTUK MODAL LIHAT DETAIL
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);

    // STATE UNTUK FORM AJUKAN SURAT
    const { data, setData, post, processing, errors, reset } = useForm({
        kategori_surat: '', jenis_surat: '', perihal_surat: '', ditujukan_kepada: '', isi_surat: '',
        upload_draf: null as File | null, lampiran: null as File[] | null, urgensi: 'biasa',
    });

    // FUNGSI-FUNGSI UNTUK MODAL AJUKAN SURAT
    const openAjukanModal = () => setIsAjukanModalOpen(true);
    const closeAjukanModal = () => { setIsAjukanModalOpen(false); reset(); };
    const submitSurat = (e: FormEvent) => {
        e.preventDefault();
        console.log('Data yang akan dikirim (simulasi):', data);
        alert('Surat berhasil diajukan! (Ini hanya simulasi frontend)');
        closeAjukanModal();
    };

    // FUNGSI-FUNGSI UNTUK MODAL LIHAT DETAIL
    const openDetailModal = (suratId: string) => {
        const suratToShow = dummySuratData[suratId];
        if (suratToShow) {
            setSelectedSurat(suratToShow);
            setIsDetailModalOpen(true);
        }
    };
    const closeDetailModal = () => { setIsDetailModalOpen(false); setSelectedSurat(null); };

    const getStatusClass = (status: string): string => {
        if (status.toLowerCase().includes('selesai')) return 'bg-green-100 text-green-800';
        if (status.toLowerCase().includes('dikembalikan')) return 'bg-red-100 text-red-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    return (
        <AppLayout>
            <Head title="Dashboard Pengaju" />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Pengaju</h1>
            <p className="text-gray-600 mb-8">Selamat datang, {auth.user.name}!</p>

            <div className="bg-gradient-to-br from-violet-600 via-violet-800 to-violet-900 p-6 rounded-xl shadow-2xl mb-8 border border-violet-700">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white drop-shadow">Surat yang Diajukan</h2>
        {/* <button onClick={openAjukanModal} className="px-6 py-2 bg-violet-700 text-white rounded-lg font-semibold hover:bg-violet-800 transition duration-200 shadow-md">
            + Ajukan Surat Baru
        </button> */}
    </div>
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-violet-700">
            <thead className="bg-violet-700/80">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-violet-100 uppercase tracking-wider">No.</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-violet-100 uppercase tracking-wider">Perihal</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-violet-100 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-violet-100 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-violet-100 uppercase tracking-wider">Aksi</th>
                </tr>
            </thead>
            <tbody className="bg-violet-800/60 divide-y divide-violet-700">
                {suratArray.map((item, index) => (
                    <tr key={item.id} className="hover:bg-violet-900/60 transition">
                        <td className="px-6 py-4 text-violet-100 font-semibold">{index + 1}</td>
                        <td className="px-6 py-4 text-white">{item.perihal}</td>
                        <td className="px-6 py-4 text-violet-200">{item.tanggal_pengajuan}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status_terkini)}`}>
                                {item.status_terkini}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                onClick={() => openDetailModal(item.id)}
                                className="text-violet-200 hover:text-white font-semibold transition"
                            >
                                Lihat Detail
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

            {/* --- MODAL UNTUK AJUKAN SURAT BARU --- */}
            {/* {isAjukanModalOpen && (
                <div className="fixed inset-0 bg-white-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
                         <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl" onClick={closeAjukanModal}>&times;</button>
                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajukan Surat Baru</h2>
                         <form onSubmit={submitSurat}>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="kategori_surat" className="block text-gray-700 text-sm font-medium mb-2">Kategori Surat</label>
                                    <select id="kategori_surat" value={data.kategori_surat} onChange={e => setData('kategori_surat', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <option value="">Pilih Kategori</option>
                                        <option value="resmi">Surat Resmi/Dinas</option>
                                        <option value="pribadi">Surat Tidak Resmi/Pribadi</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="jenis_surat" className="block text-gray-700 text-sm font-medium mb-2">Jenis Surat</label>
                                    <input type="text" id="jenis_surat" value={data.jenis_surat} onChange={e => setData('jenis_surat', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Contoh: Surat Izin Penelitian" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="isi_surat" className="block text-gray-700 text-sm font-medium mb-2">Isi Surat / Draf File</label>
                                <textarea id="isi_surat" rows={6} value={data.isi_surat} onChange={e => setData('isi_surat', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Tuliskan isi surat Anda di sini..."></textarea>
                                <p className="text-sm text-gray-500 mt-2">Atau unggah draf file surat (PDF/Docx):</p>
                                <input type="file" onChange={e => setData('upload_draf', e.target.files ? e.target.files[0] : null)} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={closeAjukanModal} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100" disabled={processing}>Simpan Draft</button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md" disabled={processing}>{processing ? 'Mengirim...' : 'Submit Pengajuan'}</button>
                            </div>
                         </form>
                    </div>
                </div>
            )} */}

            {/* --- MODAL UNTUK LIHAT DETAIL SURAT --- */}
            {isDetailModalOpen && selectedSurat && (
                <div className="fixed inset-0 bg-violet-950/80 flex items-center justify-center p-4 z-50">
    <div className="bg-gradient-to-br from-white via-violet-100 to-violet-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-violet-700">
        <button
            className="absolute top-4 right-4 text-violet-700 hover:text-white hover:bg-violet-700 transition rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow"
            onClick={closeDetailModal}
            aria-label="Tutup"
        >
            &times;
        </button>
        <h2 className="text-2xl font-bold text-violet-900 mb-1 drop-shadow">Detail Surat</h2>
        <p className="text-violet-700 mb-6 font-semibold">Perihal: <span className="font-normal">{selectedSurat.perihal}</span></p>
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-violet-800 mb-3">Informasi Surat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-violet-900">
                <div>
                    <p><strong className="font-medium">No. Agenda:</strong> {selectedSurat.no_agenda}</p>
                    <p><strong className="font-medium">Tgl. Pengajuan:</strong> {selectedSurat.tanggal_pengajuan}</p>
                </div>
                <div>
                    <p><strong className="font-medium">Ditujukan Kepada:</strong> {selectedSurat.ditujukan_kepada}</p>
                    <p><strong className="font-medium">Urgensi:</strong> {selectedSurat.urgensi}</p>
                </div>
            </div>
        </div>
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-violet-800 mb-3">Riwayat Tracking</h3>
            <div className="overflow-x-auto border border-violet-200 rounded-lg bg-white/80">
                <table className="min-w-full divide-y divide-violet-200">
                    <thead className="bg-violet-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Tanggal & Waktu</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Aksi Oleh</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Catatan/Instruksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/80 divide-y divide-violet-100">
                        {selectedSurat.tracking_history.map((entry, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 text-violet-900">{entry.tanggal}</td>
                                <td className="px-6 py-4 text-violet-900">{entry.aksi_oleh}</td>
                                <td className="px-6 py-4 text-violet-800 font-semibold">{entry.status}</td>
                                <td className="px-6 py-4 text-violet-700">{entry.catatan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
            )}
        </AppLayout>
    );
}