<?php

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Di sinilah Anda bisa mendaftarkan route untuk aplikasi Anda.
|
*/

// RUTE HALAMAN UTAMA (HOMEPAGE)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


// --- PENAMBAHAN ROUTE BARU UNTUK DASHBOARD ADMIN (TANPA AUTH) ---
Route::get('dashboard-admin', function () {
    // Route ini khusus untuk menampilkan halaman admin secara langsung.
    // Data dikelola di frontend (Admin/Index.tsx), jadi hanya render halaman.
    return Inertia::render('Admin/Index');
})->name('admin.dashboard');
// --- AKHIR PENAMBAHAN ---


// GROUP UNTUK SEMUA ROUTE YANG MEMBUTUHKAN LOGIN
Route::middleware(['auth', 'verified'])->group(function () {
    
    // ROUTE DASHBOARD ADMIN (MANAJEMEN PENGGUNA) - TIDAK DIUBAH
    Route::get('dashboard', function () {
        $dummyUsers = [
            ['id' => 1, 'name' => 'Budi Santoso', 'nim_nip' => '123456789', 'email' => 'budi.santoso@polmed.ac.id', 'role' => 'Pengaju', 'status' => 'Aktif'],
            ['id' => 2, 'name' => 'Dewi Lestari', 'nim_nip' => 'NIP001', 'email' => 'dewi.lestari@polmed.ac.id', 'role' => 'ULT', 'status' => 'Aktif'],
            ['id' => 3, 'name' => 'Admin Utama', 'nim_nip' => 'ADM001', 'email' => 'admin@polmed.ac.id', 'role' => 'Administrator', 'status' => 'Aktif'],
        ];
        return Inertia::render('Users/Index', [
            'users' => $dummyUsers
        ]);
    })->name('dashboard');


    // ROUTE BARU UNTUK TESTING DASHBOARD PENGAJU - TIDAK DIUBAH
    Route::get('dashboard-pengaju', function () {
        $dummySurat = [
            ['id' => 1, 'perihal' => 'Permohonan Izin Penelitian', 'tanggal_pengajuan' => '2025-06-08', 'status_terkini' => 'Didisposisikan ke Wadir PKU'],
            ['id' => 2, 'perihal' => 'Surat Keterangan Aktif Kuliah', 'tanggal_pengajuan' => '2025-06-05', 'status_terkini' => 'Selesai (Ambil Surat di TU)'],
        ];
        return Inertia::render('Pengaju/Dashboard', [
            'surat' => $dummySurat
        ]);
    })->name('pengaju.dashboard');

    
    // ROUTE BARU UNTUK SIDEBAR PENGAJU - TIDAK DIUBAH
    Route::get('surat/ajukan', function () {
        return Inertia::render('Surat/Create');
    })->name('surat.create');
    Route::get('notifikasi', function () {
        return Inertia::render('Pengaju/Dashboard');
    })->name('notifications.index');
    

    // ROUTE BARU UNTUK KEPALA BAGIAN - TIDAK DIUBAH
    Route::get('dashboard-kabag', function () {
        return Inertia::render('KepalaBagian/Dashboard');
    })->name('kabag.dashboard');
    Route::get('notifikasi-kabag', function () {
        return Inertia::render('KepalaBagian/Dashboard');
    })->name('kabag.notifications');


    // ROUTE BARU UNTUK DIREKTUR - TIDAK DIUBAH
    Route::get('dashboard-direktur', function () {
        return Inertia::render('Direktur/Dashboard');
    })->name('direktur.dashboard');
    Route::get('notifikasi-direktur', function () {
        return Inertia::render('Direktur/Dashboard');
    })->name('direktur.notifications');


    // --- PENAMBAHAN ROUTE BARU UNTUK VERIFIKATOR (TU) ---

    // ==========================================================
    // --- MULAI PERUBAHAN ---
    // ==========================================================
    Route::get('dashboard-tu', function () {
        // Data dummy yang sama dari file HTML sebelumnya, sekarang dalam format PHP
        $dummySuratData = [
            'S/2025/005' => [
                'no_agenda' => 'S/2025/005', 'tgl_pengajuan' => '2025-06-02', 'perihal' => 'Permohonan Izin Kunjungan Industri',
                'pengaju' => 'Mahasiswa Cici', 'status_terkini' => 'Diajukan ke Direktur (Menunggu Verifikasi TU)'
            ],
            'S/2025/006' => [
                'no_agenda' => 'S/2025/006', 'tgl_pengajuan' => '2025-06-01', 'perihal' => 'Surat Undangan Rapat Kerja',
                'pengaju' => 'Dosen Doni', 'status_terkini' => 'Diajukan ke Wadir PKU (Menunggu Verifikasi TU)'
            ],
            'S/2025/001' => [
                'no_agenda' => 'S/2025/001', 'tgl_pengajuan' => '2025-05-28', 'perihal' => 'Permohonan Izin Penelitian',
                'pengaju' => 'Mahasiswa Budi', 'status_terkini' => 'Didisposisikan ke Wadir PKU'
            ],
            'S/2025/002' => [
                'no_agenda' => 'S/2025/002', 'tgl_pengajuan' => '2025-05-25', 'perihal' => 'Permohonan Surat Keterangan Aktif Kuliah',
                'pengaju' => 'Mahasiswa Ani', 'status_terkini' => 'Selesai (Ambil Surat di TU)'
            ],
            'S/2025/004' => [
                'no_agenda' => 'S/2025/004', 'tgl_pengajuan' => '2025-05-15', 'perihal' => 'Permohonan Penggunaan Ruang Laboratorium',
                'pengaju' => 'Dosen Eko', 'status_terkini' => 'Dikembalikan (Hardcopy Tidak Sesuai)'
            ],
            'S/2025/008' => [
                'no_agenda' => 'S/2025/008', 'tgl_pengajuan' => '2025-06-03', 'perihal' => 'Surat Keterangan Magang',
                'pengaju' => 'Mahasiswa Fajar', 'status_terkini' => 'Dikembalikan (Softcopy Bermasalah)'
            ],
        ];

        // Filter data untuk mendapatkan surat yang menunggu verifikasi TU
        $suratMenungguVerifikasi = array_filter($dummySuratData, function($surat) {
            return str_contains($surat['status_terkini'], 'Menunggu Verifikasi TU');
        });

        // Kirim data yang dibutuhkan sebagai props ke komponen React
        return Inertia::render('TU/Dashboard', [
            'suratMenungguVerifikasi' => array_values($suratMenungguVerifikasi),
            'semuaSurat' => array_values($dummySuratData)
        ]);

    })->name('tu.dashboard');
    // ==========================================================
    // --- AKHIR PERUBAHAN ---
    // ==========================================================
    
    Route::get('surat-masuk', function () {
        // Anda bisa menambahkan logika yang sama di sini jika halaman ini berbeda
        return Inertia::render('TU/SuratMasuk'); // Contoh jika Anda punya halaman terpisah
    })->name('tu.surat-masuk');
    
    Route::get('surat-keluar', function () {
        return Inertia::render('TU/SuratKeluar');
    })->name('tu.surat-keluar');

    Route::get('notifikasi-tu', function () {
        return Inertia::render('TU/Notifikasi');
    })->name('tu.notifications');
    // --- AKHIR PENAMBAHAN ---

    // Tambahkan ini di dalam group middleware auth Anda
Route::get('dashboard-kasubag', function () {
    // Untuk saat ini kita tidak mengirim data karena sudah ada di frontend
    return Inertia::render('Kasubag/Dashboard'); 
})->name('kasubag.dashboard');



});


// FILE ROUTE TAMBAHAN
require __DIR__.'/auth.php';
// require __DIR__.'/settings.php';
