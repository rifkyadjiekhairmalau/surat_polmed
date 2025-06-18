// File: resources/js/pages/KepalaBagian/Dashboard.tsx

import KepalaBagianLayout from '@/layouts/KepalaBagianLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, FormEvent, useMemo, ChangeEvent } from 'react';

// --- 1. Tipe Data (Blueprint untuk Data Kita) ---
type TrackingHistoryItem = { tanggal: string; aksi_oleh: string; status: string; catatan: string };
type Surat = { no_agenda: string; tgl_pengajuan: string; perihal: string; pengaju: string; ditujukan_awal: string; urgensi: string; isi_surat: string; file_surat: string | null; status_terkini: string; tracking_history: TrackingHistoryItem[] };
type PageProps = { auth: { user: { name: string; } } };

// --- 2. Data Palsu (Database Sementara di Frontend) ---
const lettersData: Record<string, Surat> = {
    'S/2025/011': { no_agenda: 'S/2025/011', tgl_pengajuan: '2025-06-05', perihal: 'Permohonan Pengadaan Barang Laboratorium', pengaju: 'Dosen Siti', ditujukan_awal: 'Direktur', urgensi: 'Penting', isi_surat: 'Mengajukan permohonan pengadaan peralatan laboratorium untuk praktikum semester depan.', file_surat: '#', status_terkini: 'Menunggu Disposisi Kabag Umum', tracking_history: [ { tanggal: '2025-06-05 09:00', aksi_oleh: 'Dosen Siti', status: 'Diajukan ke Direktur (Verifikasi Softcopy)', catatan: 'Surat berhasil diajukan.' }, { tanggal: '2025-06-05 10:00', aksi_oleh: 'TU (Penerimaan Hardcopy)', status: 'Menunggu Disposisi Direktur', catatan: 'Hardcopy diterima.' }, { tanggal: '2025-06-05 11:00', aksi_oleh: 'Direktur', status: 'Didisposisikan ke Wadir PKU', catatan: 'Mohon ditindaklanjuti.' }, { tanggal: '2025-06-05 14:00', aksi_oleh: 'Wadir PKU', status: 'Didisposisikan ke Kabag Umum', catatan: 'Untuk diproses.' }, ] },
    'S/2025/012': { no_agenda: 'S/2025/012', tgl_pengajuan: '2025-06-04', perihal: 'Permohonan Cuti Tahunan', pengaju: 'Tendik Budi', ditujukan_awal: 'Direktur', urgensi: 'Biasa', isi_surat: 'Mengajukan permohonan cuti tahunan selama 5 hari kerja.', file_surat: '#', status_terkini: 'Menunggu Disposisi Kabag Umum', tracking_history: [ { tanggal: '2025-06-04 11:00', aksi_oleh: 'Wadir PKU', status: 'Didisposisikan ke Kabag Umum', catatan: 'Untuk diproses sesuai ketentuan cuti.' } ] },
    'S/2025/003': { no_agenda: 'S/2025/003', tgl_pengajuan: '2025-05-20', perihal: 'Pengajuan Peminjaman Tempat', pengaju: 'Ormawa XYZ', ditujukan_awal: 'Wadir KM', urgensi: 'Penting', isi_surat: 'Mengajukan izin fasilitas untuk kegiatan Dies Natalis.', file_surat: '#', status_terkini: 'Selesai', tracking_history: [ { tanggal: '2025-05-21 14:00', aksi_oleh: 'Kabag Umum', status: 'Didisposisikan ke Kasubag Perlengkapan', catatan: 'Untuk ditindaklanjuti.' }, { tanggal: '2025-05-22 14:00', aksi_oleh: 'Kasubag Perlengkapan', status: 'Selesai', catatan: 'Tempat disiapkan.' }] },
};

// --- 3. Komponen Utama Halaman ---
export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    const [dispositionModalOpen, setDispositionModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState<Surat | null>(null);

    const { data: formData, setData: setFormData, reset, processing } = useForm({
        disposisi_kepada: '',
        instruksi_disposisi: '',
        tindak_lanjut: {} as Record<string, boolean>,
    });

    const awaitingDispositionLetters = useMemo(() => Object.values(lettersData).filter(l => l.status_terkini === 'Menunggu Disposisi Kabag Umum'), []);
    const disposedLetters = useMemo(() => Object.values(lettersData).filter(l => l.tracking_history.some(e => e.aksi_oleh === 'Kabag Umum')), []);

    const openDispositionModal = (letter: Surat) => { setSelectedLetter(letter); setDispositionModalOpen(true); };
    const closeDispositionModal = () => { setDispositionModalOpen(false); setSelectedLetter(null); reset(); };
    const openDetailModal = (letter: Surat) => { setSelectedLetter(letter); setDetailModalOpen(true); };
    const closeDetailModal = () => { setDetailModalOpen(false); setSelectedLetter(null); };

    const handleDispositionSubmit = (e: FormEvent) => {
        e.preventDefault();
        const tindakLanjutTerpilih = Object.keys(formData.tindak_lanjut).filter(k => formData.tindak_lanjut[k]);
        alert(`Simulasi: Surat ${selectedLetter?.no_agenda} berhasil didisposisikan!`);
        closeDispositionModal();
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData('tindak_lanjut', { ...formData.tindak_lanjut, [value]: checked });
    };

    const getStatusClass = (status: string) => {
        if (status.includes('Disposisi')) return 'bg-yellow-100 text-yellow-800';
        if (status.includes('Selesai')) return 'bg-green-100 text-green-800';
        return 'bg-purple-100 text-purple-800';
    };
    const tindakLanjutOptions = [ 'Mohon Pertimbangan', 'Mohon Pendapat', 'Mohon Keputusan', 'Mohon Petunjuk', 'Mohon Saran', 'Bicarakan', 'Teliti/Ikuti Perkembangan', 'Untuk Perhatian', 'Siapkan Laporan', 'Untuk Diproses', 'Selesaikan sesuai Pembicaraan', 'Edaran', 'Tik/Gandakan', 'File', 'Siapkan Konsep' ];

    return (
        <KepalaBagianLayout>
            <Head title="Dashboard Kabag" />
            <main className="flex-1 p-6 md:p-8 bg-white">
                <h1 className="text-3xl font-bold text-purple-800 mb-6">Dashboard Kepala Bagian</h1>
                <p className="text-purple-600 mb-8">Selamat datang, {auth.user.name}!</p>
                
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-purple-100">
                    <h2 className="text-xl font-semibold text-purple-800 mb-4">Surat Menunggu Disposisi Saya</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">No. Agenda</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Perihal</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Pengaju</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Urgensi</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-purple-100">
                                {awaitingDispositionLetters.map(letter => (
                                    <tr key={letter.no_agenda}>
                                        <td className="px-6 py-4 text-purple-900">{letter.no_agenda}</td>
                                        <td className="px-6 py-4 text-purple-900">{letter.perihal}</td>
                                        <td className="px-6 py-4 text-purple-900">{letter.pengaju}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">{letter.urgensi}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => openDispositionModal(letter)} className="text-purple-700 hover:text-purple-900 font-medium">Lihat & Disposisi</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                    <h2 className="text-xl font-semibold text-purple-800 mb-4">Surat Yang Telah Saya Disposisi</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">No. Agenda</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Perihal</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Pengaju</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-purple-100">
                                {disposedLetters.map(letter => (
                                    <tr key={letter.no_agenda}>
                                        <td className="px-6 py-4 text-purple-900">{letter.no_agenda}</td>
                                        <td className="px-6 py-4 text-purple-900">{letter.perihal}</td>
                                        <td className="px-6 py-4 text-purple-900">{letter.pengaju}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(letter.status_terkini)}`}>{letter.status_terkini}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => openDetailModal(letter)} className="text-purple-700 hover:text-purple-900 font-medium">Lihat Detail</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Modal Disposisi --- */}
                {dispositionModalOpen && selectedLetter && (
                     <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-purple-200">
                             <button onClick={closeDispositionModal} className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 text-2xl">&times;</button>
                             <h2 className="text-2xl font-bold text-purple-800 mb-6">Detail Surat & Lakukan Disposisi : <span className="font-normal">{selectedLetter.perihal}</span></h2>
                             <div className="mb-6">
                                <h3 className="text-xl font-semibold text-purple-700 mb-3">Informasi Surat</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-purple-900">
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">No. Agenda:</strong> {selectedLetter.no_agenda}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Pengaju:</strong> {selectedLetter.pengaju}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Tgl. Pengajuan:</strong> {selectedLetter.tgl_pengajuan}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Ditujukan Awal:</strong> {selectedLetter.ditujukan_awal}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Perihal:</strong> {selectedLetter.perihal}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Urgensi:</strong> {selectedLetter.urgensi}</p>
                                </div>
                                <p className="mt-2"><strong className="font-medium text-purple-500 w-32 inline-block">Status Terkini:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(selectedLetter.status_terkini)}`}>{selectedLetter.status_terkini}</span></p>
                                <div className="mt-4">
                                    <h4 className="font-medium text-purple-700 mb-2">Isi Surat:</h4>
                                    <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 text-purple-900 max-h-32 overflow-y-auto">
                                        <p>{selectedLetter.isi_surat}</p>
                                    </div>
                                    {selectedLetter.file_surat && <a href={selectedLetter.file_surat} target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center mt-4"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.536a4 4 0 005.656-5.656l-4-4a4 4 0 00-5.656 0l-1.464 1.464"></path></svg>Lihat File Surat</a>}
                                </div>
                             </div>
                             <div className="mb-6">
                                <h3 className="text-xl font-semibold text-purple-700 mb-3">Riwayat Tracking</h3>
                                <div className="border border-purple-200 rounded-lg max-h-48 overflow-y-auto">
                                    <table className="min-w-full divide-y divide-purple-200">
                                        <thead className="bg-gradient-to-r from-purple-50 to-purple-100 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Tanggal</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi Oleh</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Catatan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-purple-100">
                                            {selectedLetter.tracking_history.map((entry, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 text-purple-900">{entry.tanggal}</td>
                                                    <td className="px-6 py-4 text-purple-900">{entry.aksi_oleh}</td>
                                                    <td className="px-6 py-4 text-purple-900">{entry.status}</td>
                                                    <td className="px-6 py-4 text-purple-900">{entry.catatan}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                             </div>
                             <form onSubmit={handleDispositionSubmit}>
                                <div className="border-t pt-6">
                                    <h3 className="text-xl font-semibold text-purple-700 mb-3">Lakukan Disposisi</h3>
                                    <div className="mb-4">
                                        <label htmlFor="disposisi_kepada" className="block text-purple-700 text-sm font-medium mb-2">Disposisikan Kepada</label>
                                        <select id="disposisi_kepada" value={formData.disposisi_kepada} onChange={e => setFormData('disposisi_kepada', e.target.value)} className="w-full px-4 py-2 border border-purple-300 rounded-lg">
                                            <option value="">Pilih Pejabat/Unit</option>
                                            <option value="kasubag_perlengkapan">Kasubag Perlengkapan</option>
                                            <option value="kasubag_keuangan">Kasubag Keuangan</option>
                                            <option value="kasubag_umum">Kasubag Umum</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-purple-700 text-sm font-medium mb-2">Pilihan Tindak Lanjut Cepat</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm text-purple-900">
                                            {tindakLanjutOptions.map(option => {
                                                const value = option.toLowerCase().replace(/[^a-z]+/g, '');
                                                return (
                                                    <label key={value} className="inline-flex items-center">
                                                        <input type="checkbox" value={value} checked={!!formData.tindak_lanjut[value]} onChange={handleCheckboxChange} className="form-checkbox text-purple-600 rounded" />
                                                        <span className="ml-2">{option}</span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="instruksi_disposisi" className="block text-purple-700 text-sm font-medium mb-2">Instruksi/Catatan Tambahan</label>
                                        <textarea id="instruksi_disposisi" rows={4} value={formData.instruksi_disposisi} onChange={e => setFormData('instruksi_disposisi', e.target.value)} className="w-full px-4 py-2 border border-purple-300 rounded-lg"></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button type="button" onClick={closeDispositionModal} className="px-6 py-2 border border-purple-300 rounded-lg text-purple-700 font-semibold hover:bg-purple-50 transition" disabled={processing}>Batal</button>
                                    <button type="submit" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-600 transition" disabled={processing}>{processing ? 'Memproses...' : 'Disposisi'}</button>
                                </div>
                             </form>
                         </div>
                     </div>
                )}
                 {/* --- Modal Detail View Only --- */}
                {detailModalOpen && selectedLetter && (
                     <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border-2 border-purple-200">
                            <button onClick={closeDetailModal} className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 text-2xl">&times;</button>
                            <h2 className="text-2xl font-bold text-purple-800 mb-6">Detail Surat : <span className="font-normal">{selectedLetter.perihal}</span></h2>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-purple-700 mb-3">Informasi Surat</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-purple-900">
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">No. Agenda:</strong> {selectedLetter.no_agenda}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Pengaju:</strong> {selectedLetter.pengaju}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Tgl. Pengajuan:</strong> {selectedLetter.tgl_pengajuan}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Ditujukan Awal:</strong> {selectedLetter.ditujukan_awal}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Perihal:</strong> {selectedLetter.perihal}</p>
                                    <p><strong className="font-medium text-purple-500 w-32 inline-block">Urgensi:</strong> {selectedLetter.urgensi}</p>
                                </div>
                                <p className="mt-2"><strong className="font-medium text-purple-500 w-32 inline-block">Status Terkini:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(selectedLetter.status_terkini)}`}>{selectedLetter.status_terkini}</span></p>
                                <div className="mt-4">
                                    <h4 className="font-medium text-purple-700 mb-2">Isi Surat:</h4>
                                    <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 text-purple-900 max-h-32 overflow-y-auto">
                                        <p>{selectedLetter.isi_surat}</p>
                                    </div>
                                    {selectedLetter.file_surat && <a href={selectedLetter.file_surat} target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline flex items-center mt-4"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.536a4 4 0 005.656-5.656l-4-4a4 4 0 00-5.656 0l-1.464 1.464"></path></svg>Lihat File Surat</a>}
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-purple-700 mb-3">Riwayat Tracking</h3>
                                <div className="border border-purple-200 rounded-lg max-h-48 overflow-y-auto">
                                    <table className="min-w-full divide-y divide-purple-200">
                                        <thead className="bg-gradient-to-r from-purple-50 to-purple-100 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Tanggal</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Aksi Oleh</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase">Catatan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-purple-100">
                                            {selectedLetter.tracking_history.map((entry, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 text-purple-900">{entry.tanggal}</td>
                                                    <td className="px-6 py-4 text-purple-900">{entry.aksi_oleh}</td>
                                                    <td className="px-6 py-4 text-purple-900">{entry.status}</td>
                                                    <td className="px-6 py-4 text-purple-900">{entry.catatan}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                         </div>
                     </div>
                )}
            </main>
        </KepalaBagianLayout>
    );
}