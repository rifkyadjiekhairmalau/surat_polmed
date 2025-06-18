import PengajuLayout from '@/layouts/PengajuLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        kategori_surat: '',
        jenis_surat: '',
        perihal_surat: '',
        ditujukan_kepada: '',
        isi_surat: '',
        upload_draf: null as File | null,
        lampiran: null as FileList | null,
        urgensi: 'biasa',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Data form yang akan dikirim:', data);
        alert('Simulasi: Surat berhasil diajukan!');
        // post(route('surat.store'));
    };

    return (
        <PengajuLayout
            header={
                <h1 className="text-3xl font-bold text-violet-900 drop-shadow">Ajukan Surat Baru</h1>
            }
        >
            <Head title="Ajukan Surat Baru" />

            <p className="text-violet-700 mb-8">Isi formulir di bawah ini untuk mengajukan surat.</p>

            <div className="bg-gradient-to-br from-violet-100 via-white to-violet-200 p-6 rounded-xl shadow-2xl border border-violet-200">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="kategori_surat" className="block text-violet-800 text-sm font-medium mb-2">Kategori Surat</label>
                            <select
                                id="kategori_surat"
                                value={data.kategori_surat}
                                onChange={e => setData('kategori_surat', e.target.value)}
                                className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-400 bg-white text-violet-900"
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="resmi">Surat Resmi/Dinas</option>
                                <option value="pribadi">Surat Tidak Resmi/Pribadi</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="jenis_surat" className="block text-violet-800 text-sm font-medium mb-2">Jenis Surat</label>
                            <input
                                type="text"
                                id="jenis_surat"
                                value={data.jenis_surat}
                                onChange={e => setData('jenis_surat', e.target.value)}
                                className="w-full px-4 py-2 border border-violet-300 rounded-lg bg-white text-violet-900"
                                placeholder="Contoh: Surat Izin Penelitian"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="perihal_surat" className="block text-violet-800 text-sm font-medium mb-2">Perihal Surat</label>
                        <input
                            type="text"
                            id="perihal_surat"
                            value={data.perihal_surat}
                            onChange={e => setData('perihal_surat', e.target.value)}
                            className="w-full px-4 py-2 border border-violet-300 rounded-lg bg-white text-violet-900"
                            placeholder="Contoh: Permohonan Izin Kunjungan Industri"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="isi_surat" className="block text-violet-800 text-sm font-medium mb-2">Isi Surat / Draf File</label>
                        <textarea
                            id="isi_surat"
                            rows={6}
                            value={data.isi_surat}
                            onChange={e => setData('isi_surat', e.target.value)}
                            className="w-full px-4 py-2 border border-violet-300 rounded-lg bg-white text-violet-900"
                            placeholder="Tuliskan isi surat Anda di sini..."
                        ></textarea>
                        <p className="text-sm text-violet-500 mt-2">Atau unggah draf file surat (PDF/Docx):</p>
                        <input
                            type="file"
                            onChange={e => setData('upload_draf', e.target.files ? e.target.files[0] : null)}
                            className="mt-2 block w-full text-sm text-violet-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="lampiran" className="block text-violet-800 text-sm font-medium mb-2">Lampiran (Opsional)</label>
                        <input
                            type="file"
                            id="lampiran"
                            multiple
                            onChange={e => setData('lampiran', e.target.files)}
                            className="block w-full text-sm text-violet-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                        <p className="text-sm text-violet-500 mt-2">Unggah dokumen pendukung (misal: proposal, transkrip nilai).</p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-violet-800 text-sm font-medium mb-2">Tingkat Urgensi</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="urgensi"
                                    value="penting"
                                    checked={data.urgensi === 'penting'}
                                    onChange={e => setData('urgensi', e.target.value)}
                                    className="form-radio text-violet-600"
                                />
                                <span className="ml-2 text-violet-800">Penting</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="urgensi"
                                    value="biasa"
                                    checked={data.urgensi === 'biasa'}
                                    onChange={e => setData('urgensi', e.target.value)}
                                    className="form-radio text-violet-600"
                                />
                                <span className="ml-2 text-violet-800">Biasa / Rutin</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-2 border border-violet-300 rounded-lg text-violet-700 font-semibold hover:bg-violet-100"
                            disabled={processing}
                        >
                            Simpan Draft
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-violet-700 text-white rounded-lg font-semibold hover:bg-violet-800 shadow-md"
                            disabled={processing}
                        >
                            {processing ? 'Mengirim...' : 'Submit Pengajuan'}
                        </button>
                    </div>
                </form>
            </div>
        </PengajuLayout>
    );
}