import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import TuLayout from '@/layouts/TuLayout';
import { PageProps } from '@/types';

// =======================================================================
// 1. SETUP TIPE DATA & DUMMY DATA YANG LEBIH LENGKAP
// =======================================================================
interface TrackingHistory {
    tanggal: string;
    aksi_oleh: string;
    status: string;
    catatan: string;
}

interface Surat {
    no_agenda: string;
    tgl_pengajuan: string;
    perihal: string;
    pengaju: string;
    status_terkini: string;
    ditujukan_kepada: string;
    urgensi: 'Biasa' | 'Penting' | 'Segera';
    isi_surat: string;
    file_surat: string;
    tracking_history: TrackingHistory[];
}

const dummyData: Surat[] = [
    { no_agenda: 'S/2025/005', tgl_pengajuan: '2025-06-15', perihal: 'Permohonan Izin Kunjungan Industri', pengaju: 'Mahasiswa Cici', status_terkini: 'Diajukan ke Direktur (Menunggu Verifikasi TU)', ditujukan_kepada: 'Direktur', urgensi: 'Penting', isi_surat: 'Dengan hormat, saya mengajukan permohonan izin untuk melakukan kunjungan industri ke PT. XYZ pada tanggal 15 Juni 2025.', file_surat: '#', tracking_history: [ { tanggal: '2025-06-15 09:00', aksi_oleh: 'Mahasiswa Cici', status: 'Diajukan ke Direktur', catatan: 'Surat berhasil diajukan. Status menunggu verifikasi oleh Bagian Umum (TU). Mohon segera serahkan hardcopy surat.' }] },
    { no_agenda: 'S/2025/006', tgl_pengajuan: '2025-06-14', perihal: 'Surat Undangan Rapat Kerja', pengaju: 'Dosen Doni', status_terkini: 'Diajukan ke Wadir PKU (Menunggu Verifikasi TU)', ditujukan_kepada: 'Wadir PKU', urgensi: 'Biasa', isi_surat: 'Mengundang Bapak/Ibu untuk hadir dalam rapat kerja persiapan akreditasi.', file_surat: '#', tracking_history: [{ tanggal: '2025-06-14 10:00', aksi_oleh: 'Dosen Doni', status: 'Diajukan', catatan: 'Surat berhasil diajukan.' }] },
    { no_agenda: 'S/2025/001', tgl_pengajuan: '2025-06-12', perihal: 'Permohonan Izin Penelitian', pengaju: 'Mahasiswa Budi', status_terkini: 'Didisposisikan ke Wadir PKU', ditujukan_kepada: 'Direktur', urgensi: 'Penting', isi_surat: 'Mengajukan permohonan izin penelitian.', file_surat: '#', tracking_history: [
        { tanggal: '2025-06-12 10:00', aksi_oleh: 'Mahasiswa Budi', status: 'Diajukan', catatan: 'Surat diajukan.' },
        { tanggal: '2025-06-12 11:00', aksi_oleh: 'TU (Verifikasi)', status: 'Menunggu Disposisi Direktur', catatan: 'Surat valid dan diteruskan.' },
        { tanggal: '2025-06-12 11:30', aksi_oleh: 'Direktur', status: 'Didisposisikan', catatan: 'Mohon pertimbangan dan tindak lanjut.' }
    ] },
    { no_agenda: 'S/2025/002', tgl_pengajuan: '2025-06-10', perihal: 'Surat Keterangan Aktif Kuliah', pengaju: 'Mahasiswa Ani', status_terkini: 'Selesai (Ambil Surat di TU)', ditujukan_kepada: 'Wadir PKU', urgensi: 'Biasa', isi_surat: 'Memohon surat keterangan aktif kuliah.', file_surat: '#', tracking_history: [
        { tanggal: '2025-06-11 09:30', aksi_oleh: 'Kasubag Akademik', status: 'Selesai', catatan: 'Surat keterangan telah selesai. Dapat diambil di TU.' }
    ] },
    { no_agenda: 'S/2025/004', tgl_pengajuan: '2025-06-09', perihal: 'Penggunaan Ruang Lab', pengaju: 'Dosen Eko', status_terkini: 'Dikembalikan (Hardcopy Tidak Sesuai)', ditujukan_kepada: 'Direktur', urgensi: 'Biasa', isi_surat: 'Memohon izin penggunaan Lab Komputer 2.', file_surat: '#', tracking_history: [
        { tanggal: '2025-06-09 10:30', aksi_oleh: 'TU (Verifikasi)', status: 'Dikembalikan', catatan: 'Hardcopy surat tidak sesuai dengan softcopy.' }
    ] },
    { no_agenda: 'S/2025/008', tgl_pengajuan: '2025-06-08', perihal: 'Surat Keterangan Magang', pengaju: 'Mahasiswa Fajar', status_terkini: 'Dikembalikan (Softcopy Bermasalah)', ditujukan_kepada: 'Wadir PKU', urgensi: 'Segera', isi_surat: 'Mengajukan permohonan surat keterangan magang.', file_surat: '#', tracking_history: [{ tanggal: '2025-06-08 08:30', aksi_oleh: 'TU (Verifikasi)', status: 'Dikembalikan', catatan: 'Softcopy surat tidak lengkap/kosong.' }] },
];

const STATUS_OPTIONS = [ 'Semua Status', 'Menunggu Verifikasi TU', 'Menunggu Disposisi', 'Didisposisikan', 'Selesai', 'Dikembalikan' ];

// =======================================================================
// 2. KOMPONEN-KOMPONEN MODAL
// =======================================================================

const VerifikasiModal = ({ surat, onClose, onVerifikasi, onKembalikan }: { surat: Surat; onClose: () => void; onVerifikasi: (catatan: string) => void; onKembalikan: (catatan: string) => void; }) => {
    const [catatan, setCatatan] = useState('');
    const handleKembalikanClick = () => { if (!catatan.trim()) { alert('Alasan pengembalian harus diisi!'); return; } onKembalikan(catatan); }
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-purple-200">
                <button className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 text-2xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Verifikasi Surat : {surat.perihal}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-purple-900 mb-6 text-sm">
                    <p><strong className="font-medium text-purple-500">No. Agenda Sistem:</strong> {surat.no_agenda}</p>
                    <p><strong className="font-medium text-purple-500">Tanggal Pengajuan:</strong> {surat.tgl_pengajuan}</p>
                    <p><strong className="font-medium text-purple-500">Pengaju:</strong> {surat.pengaju}</p>
                    <p><strong className="font-medium text-purple-500">Urgensi (Pengaju):</strong> {surat.urgensi}</p>
                    <p className="md:col-span-2"><strong className="font-medium text-purple-500">Perihal:</strong> {surat.perihal}</p>
                    <p className="md:col-span-2"><strong className="font-medium text-purple-500">Ditujukan (Pengaju):</strong> {surat.ditujukan_kepada}</p>
                </div>

                <div className="mb-6">
                    <h4 className="font-medium text-purple-700 mb-2 text-sm">Isi Surat (Softcopy):</h4>
                    <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 text-purple-900 overflow-y-auto max-h-32 text-sm">
                        <p>{surat.isi_surat}</p>
                    </div>
                    <a href={surat.file_surat} target="_blank" rel="noopener noreferrer" className="mt-3 text-purple-700 hover:underline flex items-center text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L14.414 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                        Lihat File Surat
                    </a>
                </div>

                <div className="mb-4">
                    <label htmlFor="tu_verification_notes" className="block text-purple-700 text-sm font-medium mb-2">Catatan Verifikasi (Opsional)</label>
                    <textarea id="tu_verification_notes" rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)} className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 text-sm" placeholder="Catatan untuk verifikasi softcopy/hardcopy, atau alasan pengembalian..."></textarea>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" className="px-6 py-2 border border-purple-300 rounded-lg text-purple-700 font-semibold hover:bg-purple-50 transition duration-200 text-sm" onClick={onClose}>Batal</button>
                    <button type="button" className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-200 shadow-sm text-sm" onClick={handleKembalikanClick}>Kembalikan ke Pengaju</button>
                    <button type="button" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-600 transition duration-200 shadow-sm text-sm" onClick={() => onVerifikasi(catatan)}>Verifikasi & Teruskan</button>
                </div>
            </div>
        </div>
    );
};

const DetailModal = ({ surat, onClose }: { surat: Surat, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-purple-200">
            <button className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 text-2xl" onClick={onClose}>&times;</button>
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Detail Surat : {surat.perihal}</h2>
            <div className="mb-6">
                <h3 className="text-lg font-bold text-purple-700 mb-3">Informasi Surat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-purple-900 mb-4 text-sm">
                    <p><strong className="font-medium text-purple-500">No. Agenda Sistem:</strong> {surat.no_agenda}</p>
                    <p><strong className="font-medium text-purple-500">Pengaju:</strong> {surat.pengaju}</p>
                    <p><strong className="font-medium text-purple-500">Tgl. Pengajuan:</strong> {surat.tgl_pengajuan}</p>
                    <p><strong className="font-medium text-purple-500">Ditujukan Kepada:</strong> {surat.ditujukan_kepada}</p>
                    <p className="md:col-span-2"><strong className="font-medium text-purple-500">Perihal:</strong> {surat.perihal}</p>
                    <p><strong className="font-medium text-purple-500">Urgensi:</strong> {surat.urgensi}</p>
                </div>
                <h4 className="font-medium text-purple-700 mb-2 mt-4 text-sm">Isi Surat:</h4>
                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 text-purple-900 max-h-32 text-sm overflow-y-auto">
                    <p>{surat.isi_surat}</p>
                </div>
                <a href={surat.file_surat} target="_blank" rel="noopener noreferrer" className="mt-3 text-purple-700 hover:underline flex items-center text-sm font-medium">Lihat File Surat</a>
            </div>
            <div>
                <h3 className="text-lg font-bold text-purple-700 mb-3">Riwayat Tracking (Real-time)</h3>
                <div className="overflow-x-auto border border-purple-200 rounded-lg">
                    <table className="min-w-full divide-y divide-purple-200">
                        <thead className="bg-gradient-to-r from-purple-100 to-purple-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-bold text-purple-700 uppercase">Tanggal & Waktu</th>
                                <th className="px-4 py-2 text-left text-xs font-bold text-purple-700 uppercase">Aksi Oleh</th>
                                <th className="px-4 py-2 text-left text-xs font-bold text-purple-700 uppercase">Status</th>
                                <th className="px-4 py-2 text-left text-xs font-bold text-purple-700 uppercase">Catatan/Instruksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-purple-100 text-sm">
                            {surat.tracking_history.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 whitespace-nowrap">{item.tanggal}</td>
                                    <td className="px-4 py-3">{item.aksi_oleh}</td>
                                    <td className="px-4 py-3">{item.status}</td>
                                    <td className="px-4 py-3">{item.catatan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

const KembalikanModal = ({ surat, onClose, onConfirm }: { surat: Surat; onClose: () => void; onConfirm: (alasan: string) => void; }) => {
    const [alasan, setAlasan] = useState('');
    const handleConfirm = () => {
        if(!alasan.trim()){
            alert("Alasan pengembalian harus diisi!");
            return;
        }
        onConfirm(alasan);
    }
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative border-2 border-purple-200">
                <button className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 text-2xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold text-purple-800 mb-4">Kembalikan Surat</h2>
                <p className="text-purple-600 mb-6 text-sm">Anda akan mengembalikan surat <strong className="font-semibold">"{surat.perihal}"</strong>.</p>
                <div>
                    <label htmlFor="alasan_pengembalian" className="block text-purple-700 text-sm font-medium mb-2">Alasan Pengembalian</label>
                    <textarea id="alasan_pengembalian" rows={4} value={alasan} onChange={e => setAlasan(e.target.value)} className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 text-sm" placeholder="Jelaskan alasan pengembalian surat ini..."></textarea>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" className="px-6 py-2 border border-purple-300 rounded-lg text-purple-700 font-semibold hover:bg-purple-50 transition" onClick={onClose}>Batal</button>
                    <button type="button" className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition" onClick={handleConfirm}>Konfirmasi Pengembalian</button>
                </div>
            </div>
        </div>
    )
};

// =======================================================================
// 3. KOMPONEN UTAMA DASHBOARD
// =======================================================================
export default function Dashboard({ auth }: PageProps) {
    const [semuaSurat, setSemuaSurat] = useState<Surat[]>(dummyData);
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [modalState, setModalState] = useState<'verifikasi' | 'detail' | 'kembalikan' | null>(null);

    const filteredSuratMonitoring = useMemo(() => {
        return semuaSurat
            .filter(surat => surat.perihal.toLowerCase().includes(searchQuery.toLowerCase()) || surat.no_agenda.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter(surat => statusFilter === 'Semua Status' || surat.status_terkini.includes(statusFilter));
    }, [semuaSurat, searchQuery, statusFilter]);

    const suratMenungguVerifikasi = useMemo(() => semuaSurat.filter(s => s.status_terkini.includes('Menunggu Verifikasi TU')), [semuaSurat]);

    const handleOpenModal = (surat: Surat, type: 'verifikasi' | 'detail' | 'kembalikan') => {
        setSelectedSurat(surat);
        setModalState(type);
    };
    const handleCloseModal = () => setModalState(null);

    const handleAksiSurat = (no_agenda: string, new_status: string, log_catatan: string, aksi_oleh = 'TU (Verifikasi)') => {
        setSemuaSurat(current => current.map(s => s.no_agenda === no_agenda ? { ...s, status_terkini: new_status, tracking_history: [...s.tracking_history, { tanggal: new Date().toLocaleString('id-ID'), aksi_oleh, status: new_status, catatan: log_catatan }] } : s));
        handleCloseModal();
    };

    const getStatusBadgeClass = (status: string) => {
        if (status.includes('Menunggu')) return 'bg-yellow-100 text-yellow-800';
        if (status.includes('Selesai')) return 'bg-green-100 text-green-800';
        if (status.includes('Didisposisikan')) return 'bg-blue-100 text-blue-800';
        if (status.includes('Dikembalikan')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <TuLayout>
            <Head title="Dashboard Verifikator (TU)" />

            <main className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#ffffff] to-[#ffffff] p-0 md:p-8">
                <div className="max-w-6xl mx-auto py-8">
                    <h1 className="text-4xl font-extrabold text-black mb-2 drop-shadow">Dashboard Verifikator (TU)</h1>
                    <p className="text-purple-900 mb-8 text-lg">Kelola surat masuk dan pantau alur disposisi.</p>

                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8 border border-purple-200">
                        <h2 className="text-xl font-bold text-purple-800 mb-2">Surat Baru Menunggu Verifikasi</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-purple-200">
                                <thead className="bg-gradient-to-r from-purple-100 to-purple-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">No. Agenda</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Perihal</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-purple-100 text-sm">
                                    {suratMenungguVerifikasi.length > 0 ? (
                                        suratMenungguVerifikasi.map(surat => (
                                            <tr key={surat.no_agenda}>
                                                <td className="px-6 py-4">{surat.no_agenda}</td>
                                                <td className="px-6 py-4">{surat.perihal}</td>
                                                <td className="px-6 py-4">
                                                    <button className="text-purple-700 hover:text-purple-900 font-semibold transition" onClick={() => handleOpenModal(surat, 'verifikasi')}>Verifikasi</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="text-center py-8 text-purple-400">Tidak ada surat yang perlu diverifikasi.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-purple-200">
                        <h2 className="text-xl font-bold text-purple-800 mb-2">Semua Surat Masuk</h2>
                        <div className="mb-4 flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Cari Perihal / No. Surat..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 border border-purple-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                            />
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-purple-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                            >
                                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-purple-200">
                                <thead className="bg-gradient-to-r from-purple-100 to-purple-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">No. Agenda</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Perihal</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Pengaju</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-purple-100 text-sm">
                                    {filteredSuratMonitoring.map((surat) => (
                                        <tr key={surat.no_agenda}>
                                            <td className="px-6 py-4">{surat.no_agenda}</td>
                                            <td className="px-6 py-4">{surat.perihal}</td>
                                            <td className="px-6 py-4">{surat.pengaju}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 inline-flex text-xs rounded-full ${getStatusBadgeClass(surat.status_terkini)}`}>
                                                    {surat.status_terkini}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 space-x-4">
                                                <button className="text-purple-700 hover:text-purple-900 font-semibold transition" onClick={() => handleOpenModal(surat, 'detail')}>Detail</button>
                                                <button className="text-red-600 hover:text-red-800 font-semibold transition" onClick={() => handleOpenModal(surat, 'kembalikan')}>Kembalikan</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredSuratMonitoring.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-8 text-purple-400">Tidak ada surat yang cocok.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedSurat && modalState === 'verifikasi' && (
                        <VerifikasiModal
                            surat={selectedSurat}
                            onClose={handleCloseModal}
                            onVerifikasi={(c) => handleAksiSurat(selectedSurat.no_agenda, `Menunggu Disposisi ${selectedSurat.ditujukan_kepada}`, c)}
                            onKembalikan={(c) => handleAksiSurat(selectedSurat.no_agenda, `Dikembalikan (TU)`, c, 'TU (Monitoring)')}
                        />
                    )}
                    {selectedSurat && modalState === 'detail' && (
                        <DetailModal surat={selectedSurat} onClose={handleCloseModal} />
                    )}
                    {selectedSurat && modalState === 'kembalikan' && (
                        <KembalikanModal
                            surat={selectedSurat}
                            onClose={handleCloseModal}
                            onConfirm={(alasan) => handleAksiSurat(selectedSurat.no_agenda, 'Dikembalikan (TU)', alasan, 'TU (Monitoring)')}
                        />
                    )}
                </div>
            </main>
        </TuLayout>
    );
}