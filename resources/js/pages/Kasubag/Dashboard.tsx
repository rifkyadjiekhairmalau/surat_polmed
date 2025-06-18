import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import KasubagLayout from '@/layouts/KasubagLayout';
import { PageProps } from '@/types';

// Definisikan tipe data yang relevan
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
    ditujukan_awal: string;
    urgensi: 'Biasa' | 'Penting' | 'Segera';
    isi_surat: string;
    file_surat: string;
    tracking_history: TrackingHistory[];
}

// --- (1) Dummy data diperbarui dengan riwayat tracking yang lebih lengkap ---
const dummyData: Surat[] = [
    { 
        no_agenda: 'S/2025/013', 
        tgl_pengajuan: '2025-06-06', 
        perihal: 'Permohonan Penggunaan Ruang Serbaguna', 
        pengaju: 'Ormawa XYZ', 
        ditujukan_awal: 'Wadir KM', 
        urgensi: 'Penting', 
        isi_surat: 'Mengajukan permohonan penggunaan ruang serbaguna untuk acara Dies Natalis.', 
        file_surat: '#', 
        status_terkini: 'Menunggu Disposisi Kasubag Perlengkapan', 
        tracking_history: [ 
            { tanggal: '2025-06-06 09:00', aksi_oleh: 'Ormawa XYZ', status: 'Diajukan ke Wadir KM', catatan: 'Surat berhasil diajukan.' },
            { tanggal: '2025-06-06 09:30', aksi_oleh: 'TU (Verifikasi Softcopy)', status: 'Menunggu Penyerahan Hardcopy', catatan: 'Softcopy valid.' },
            { tanggal: '2025-06-06 10:00', aksi_oleh: 'TU (Penerimaan Hardcopy)', status: 'Menunggu Disposisi Wadir KM', catatan: 'Hardcopy diterima dan valid.' },
            { tanggal: '2025-06-06 10:30', aksi_oleh: 'Wadir KM', status: 'Didisposisikan ke Kabag Umum', catatan: 'Mohon koordinasi fasilitas.' },
            { tanggal: '2025-06-06 14:00', aksi_oleh: 'Kabag Umum', status: 'Didisposisikan ke Kasubag Perlengkapan', catatan: 'Untuk ditindaklanjuti.' } 
        ] 
    },
    { no_agenda: 'S/2025/014', tgl_pengajuan: '2025-06-05', perihal: 'Permohonan Transkrip Nilai', pengaju: 'Mahasiswa Jaka', ditujukan_awal: 'Wadir PKU', urgensi: 'Segera', isi_surat: 'Mengajukan permohonan transkrip nilai untuk keperluan beasiswa.', file_surat: '#', status_terkini: 'Menunggu Disposisi Kasubag Akademik', tracking_history: [ { tanggal: '2025-06-05 11:00', aksi_oleh: 'Kabag Akademik', status: 'Didisposisikan ke Kasubag Akademik', catatan: 'Untuk penerbitan transkrip.' } ] },
    { 
        no_agenda: 'S/2025/003', 
        tgl_pengajuan: '2025-05-20', 
        perihal: 'Pengajuan Peminjaman Tempat Kegiatan Ormawa', 
        pengaju: 'Ormawa XYZ', 
        ditujukan_awal: 'Wadir KM', 
        urgensi: 'Penting', 
        isi_surat: 'Mengajukan izin dan permohonan fasilitas untuk kegiatan Dies Natalis Ormawa ABC.', 
        file_surat: '#', 
        status_terkini: 'Selesai (Tempat Disiapkan, Ambil Surat Izin di TU)', 
        tracking_history: [ 
            { tanggal: '2025-05-20 09:00', aksi_oleh: 'Ormawa XYZ', status: 'Diajukan ke Wadir KM (Menunggu Verifikasi Softcopy TU)', catatan: 'Surat berhasil diajukan.' },
            { tanggal: '2025-05-20 09:30', aksi_oleh: 'TU (Verifikasi Softcopy)', status: 'Menunggu Penyerahan Hardcopy (No. Agenda: S/2025/003)', catatan: 'Softcopy valid.' },
            { tanggal: '2025-05-20 10:00', aksi_oleh: 'TU (Penerimaan Hardcopy)', status: 'Menunggu Disposisi Wadir KM', catatan: 'Hardcopy diterima dan valid.' },
            { tanggal: '2025-05-20 10:30', aksi_oleh: 'Wadir KM', status: 'Didisposisikan ke Direktur', catatan: 'Mohon pertimbangan.' },
            { tanggal: '2025-05-20 15:00', aksi_oleh: 'Direktur', status: 'Didisposisikan ke Wadir PKU', catatan: 'Mohon pertimbangan fasilitas.' },
            { tanggal: '2025-05-21 10:00', aksi_oleh: 'Wadir PKU', status: 'Didisposisikan ke Kabag Umum', catatan: 'Koordinasi dengan bagian umum.' },
            { tanggal: '2025-05-21 14:00', aksi_oleh: 'Kabag Umum', status: 'Didisposisikan ke Kasubag Perlengkapan', catatan: 'Untuk ditindaklanjuti.' },
            { tanggal: '2025-05-22 14:00', aksi_oleh: 'Kasubag Perlengkapan', status: 'Selesai', catatan: 'Penggunaan tempat telah disetujui. Silakan ambil surat izin di TU.' }
        ] 
    },
     { 
        no_agenda: 'S/2025/015', 
        tgl_pengajuan: '2025-06-01', 
        perihal: 'Permohonan Cuti Akademik', 
        pengaju: 'Mahasiswa Rina', 
        ditujukan_awal: 'Wadir PKU', 
        urgensi: 'Biasa', 
        isi_surat: 'Mengajukan cuti akademik untuk semester ganjil 2025/2026.', 
        file_surat: '#', 
        status_terkini: 'Dikembalikan (Lampiran Kurang)', 
        tracking_history: [ { tanggal: '2025-06-02 15:00', aksi_oleh: 'Kasubag Akademik', status: 'Dikembalikan', catatan: 'Lampiran surat keterangan dari orang tua tidak ada.' } ] 
    },
];

const PROCESSED_STATUS_OPTIONS = ['Semua Status', 'Selesai', 'Dikembalikan'];

// --- (2) Komponen-komponen Modal ---

const ActionModal = ({ surat, onClose, onConfirm }: { surat: Surat; onClose: () => void; onConfirm: () => void; }) => {
    const getStatusBadgeClass = (status: string) => {
        if (status.includes('Menunggu')) return 'bg-yellow-100 text-yellow-800';
        if (status.includes('Selesai')) return 'bg-green-100 text-green-800';
        if (status.includes('Didisposisikan')) return 'bg-blue-100 text-blue-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-purple-200">
                <button className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 text-2xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Detail Surat : {surat.perihal}</h2>
                
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-purple-700 mb-3">Informasi Surat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-purple-900 mb-4 text-sm">
                        <p><strong className="font-medium text-purple-500">No. Agenda Sistem:</strong> {surat.no_agenda}</p>
                        <p><strong className="font-medium text-purple-500">Pengaju:</strong> {surat.pengaju}</p>
                        <p><strong className="font-medium text-purple-500">Tgl. Pengajuan:</strong> {surat.tgl_pengajuan}</p>
                        <p><strong className="font-medium text-purple-500">Ditujukan Awal:</strong> {surat.ditujukan_awal}</p>
                        <p className="md:col-span-2"><strong className="font-medium text-purple-500">Perihal:</strong> {surat.perihal}</p>
                        <p><strong className="font-medium text-purple-500">Urgensi:</strong> {surat.urgensi}</p>
                        <p><strong className="font-medium text-purple-500">Status Terkini:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(surat.status_terkini)}`}>{surat.status_terkini}</span></p>
                    </div>
                    <h4 className="font-medium text-purple-700 mb-2 mt-4 text-sm">Isi Surat:</h4>
                    <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 text-purple-900 max-h-32 text-sm overflow-y-auto">
                        <p>{surat.isi_surat}</p>
                    </div>
                    <a href={surat.file_surat} target="_blank" rel="noopener noreferrer" className="mt-3 text-purple-700 hover:underline flex items-center text-sm font-medium">Lihat File Surat</a>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-purple-700 mb-3">Riwayat Tracking (Real-time)</h3>
                    <div className="overflow-x-auto border border-purple-200 rounded-lg">
                        <table className="min-w-full divide-y divide-purple-200">
                            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
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
                
                <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
                    <button type="button" className="px-6 py-2 border border-purple-300 rounded-lg text-purple-700 font-semibold hover:bg-purple-50 transition" onClick={onClose}>Batal</button>
                    <button type="button" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-600 transition" onClick={onConfirm}>Tindak Lanjut Surat Ini</button>
                </div>
            </div>
        </div>
    );
};

const DetailOnlyModal = ({ surat, onClose }: { surat: Surat; onClose: () => void; }) => {
    const getStatusBadgeClass = (status: string) => {
        if (status.includes('Menunggu')) return 'bg-yellow-100 text-yellow-800';
        if (status.includes('Selesai')) return 'bg-green-100 text-green-800';
        if (status.includes('Didisposisikan')) return 'bg-blue-100 text-blue-800';
        if (status.includes('Dikembalikan')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };
    return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-purple-200">
            <button className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 text-2xl" onClick={onClose}>&times;</button>
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Detail Surat : {surat.perihal}</h2>
             <div className="mb-6">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">Informasi Surat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-purple-900 mb-4 text-sm">
                    <p><strong className="font-medium text-purple-500">No. Agenda Sistem:</strong> {surat.no_agenda}</p>
                    <p><strong className="font-medium text-purple-500">Pengaju:</strong> {surat.pengaju}</p>
                    <p><strong className="font-medium text-purple-500">Tgl. Pengajuan:</strong> {surat.tgl_pengajuan}</p>
                    <p><strong className="font-medium text-purple-500">Ditujukan Awal:</strong> {surat.ditujukan_awal}</p>
                    <p className="md:col-span-2"><strong className="font-medium text-purple-500">Perihal:</strong> {surat.perihal}</p>
                    <p><strong className="font-medium text-purple-500">Urgensi:</strong> {surat.urgensi}</p>
                    <p><strong className="font-medium text-purple-500">Status Terkini:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(surat.status_terkini)}`}>{surat.status_terkini}</span></p>
                </div>
                <h4 className="font-medium text-purple-700 mb-2 mt-4 text-sm">Isi Surat:</h4>
                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 text-purple-900 max-h-32 text-sm overflow-y-auto">
                    <p>{surat.isi_surat}</p>
                </div>
                <a href={surat.file_surat} target="_blank" rel="noopener noreferrer" className="mt-3 text-purple-700 hover:underline flex items-center text-sm font-medium">Lihat File Surat</a>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">Riwayat Tracking (Real-time)</h3>
                <div className="overflow-x-auto border border-purple-200 rounded-lg">
                    <table className="min-w-full divide-y divide-purple-200">
                         <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
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
             <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
                <button type="button" className="px-6 py-2 border border-purple-300 rounded-lg text-purple-700 font-semibold hover:bg-purple-50 transition" onClick={onClose}>Tutup</button>
            </div>
        </div>
    </div>
)};


// --- (3) Komponen Utama Dashboard ---
export default function Dashboard({ auth }: PageProps) {
    const [suratList, setSuratList] = useState<Surat[]>(dummyData);
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);
    const [modalState, setModalState] = useState<'tindak_lanjut' | 'detail' | null>(null);
    
    const [processedSearch, setProcessedSearch] = useState('');
    const [processedStatus, setProcessedStatus] = useState('Semua Status');

    const suratMenunggu = useMemo(() => suratList.filter(s => s.status_terkini.includes('Menunggu Disposisi Kasubag')), [suratList]);
    
    const suratDiproses = useMemo(() => {
        return suratList
            .filter(s => s.tracking_history.some(h => h.aksi_oleh.includes('Kasubag')))
            .filter(s => { 
                const query = processedSearch.toLowerCase();
                return s.perihal.toLowerCase().includes(query) || s.no_agenda.toLowerCase().includes(query);
            })
            .filter(s => {
                if (processedStatus === 'Semua Status') return true;
                return s.status_terkini.includes(processedStatus);
            });
    }, [suratList, processedSearch, processedStatus]);
    
    const handleOpenModal = (surat: Surat, type: 'tindak_lanjut' | 'detail') => {
        setSelectedSurat(surat);
        setModalState(type);
    };
    const handleCloseModal = () => { setSelectedSurat(null); setModalState(null); };

    const handleTindakLanjut = () => {
        if (!selectedSurat) return;
        setSuratList(currentList =>
            currentList.map(s => {
                if (s.no_agenda === selectedSurat.no_agenda) {
                    const newStatus = `Selesai (Kasubag)`;
                    return { ...s, status_terkini: newStatus, tracking_history: [ ...s.tracking_history, { tanggal: new Date().toLocaleString('id-ID'), aksi_oleh: 'Kasubag', status: 'Selesai', catatan: 'Surat telah ditindaklanjuti.' }] };
                }
                return s;
            })
        );
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
        <KasubagLayout>
            <Head title="Dashboard Kasubag" />
            <main className="flex-1 p-6 md:p-8 bg-white">
                <h1 className="text-3xl font-bold text-purple-800 mb-6">Dashboard Kepala Sub Bagian</h1>
                <p className="text-purple-600 mb-8">Selamat datang! Kelola disposisi surat yang ditujukan kepada Anda.</p>

                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-purple-100">
                    <h2 className="text-xl font-semibold text-purple-800 mb-4">Surat Menunggu Disposisi Saya</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">No. Agenda</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Perihal</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-purple-100 text-sm">
                                {suratMenunggu.map(surat => (
                                    <tr key={surat.no_agenda}>
                                        <td className="px-6 py-4 text-purple-900">{surat.no_agenda}</td>
                                        <td className="px-6 py-4 text-purple-900">{surat.perihal}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleOpenModal(surat, 'tindak_lanjut')} className="text-purple-700 hover:text-purple-900 font-medium">Detail & Tindak Lanjut</button>
                                        </td>
                                    </tr>
                                ))}
                                {suratMenunggu.length === 0 && <tr><td colSpan={3} className="text-center py-8 text-purple-400">Tidak ada surat yang menunggu disposisi.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                    <h2 className="text-xl font-semibold text-purple-800 mb-4">Surat Yang Telah Saya Tindak Lanjuti</h2>
                    <div className="mb-4 flex flex-col md:flex-row gap-4">
                        <input type="text" placeholder="Cari Perihal / No. Surat..." value={processedSearch} onChange={e => setProcessedSearch(e.target.value)} className="flex-1 px-4 py-2 border border-purple-300 rounded-lg text-sm text-purple-900" />
                        <select value={processedStatus} onChange={e => setProcessedStatus(e.target.value)} className="px-4 py-2 border border-purple-300 rounded-lg text-sm text-purple-900">
                            {PROCESSED_STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">No. Agenda</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Perihal</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Status Terkini</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-purple-100 text-sm">
                                {suratDiproses.map(surat => (
                                    <tr key={surat.no_agenda}>
                                        <td className="px-6 py-4 text-purple-900">{surat.no_agenda}</td>
                                        <td className="px-6 py-4 text-purple-900">{surat.perihal}</td>
                                        <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(surat.status_terkini)}`}>{surat.status_terkini}</span></td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleOpenModal(surat, 'detail')} className="text-purple-700 hover:text-purple-900 font-medium">Lihat Detail</button>
                                        </td>
                                    </tr>
                                ))}
                                {suratDiproses.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-purple-400">Tidak ada surat yang cocok dengan filter.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedSurat && modalState === 'tindak_lanjut' && (
                    <ActionModal 
                        surat={selectedSurat}
                        onClose={handleCloseModal}
                        onConfirm={handleTindakLanjut}
                    />
                )}
                {selectedSurat && modalState === 'detail' && (
                    <DetailOnlyModal 
                        surat={selectedSurat}
                        onClose={handleCloseModal}
                    />
                )}
            </main>
        </KasubagLayout>
    );
}