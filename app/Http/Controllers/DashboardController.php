<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Dashboard untuk Admin (level_user_id = 1)
     */
    public function showAdmin(): Response
    {
        return Inertia::render('Admin/Index');
    }

    /**
     * Dashboard untuk Mahasiswa (2) & Pegawai (3)
     */
    public function showMahasiswaOrPegawai(): Response
    {
        return Inertia::render('User/Dashboard');
    }

    /**
     * Dashboard untuk Tata Usaha (4)
     */
    public function showTU(): Response
    {
        return Inertia::render('Tu/Dashboard');
    }

    /**
     * Dashboard untuk Direktur (5) & Wakil Direktur (6)
     */
    public function showDirekturWadir(): Response
    {
        return Inertia::render('Pimpinan/Dashboard');
    }

    /**
     * Dashboard untuk Kabag (7)
     */
    public function showKabag(): Response
    {
        return Inertia::render('Kabag/Dashboard');
    }

    /**
     * Dashboard untuk Kasubbag (8)
     */
    public function showKasubbag(): Response
    {
        return Inertia::render('Kasubbag/Dashboard');
    }

    /**
     * Fallback jika tidak ada role yang cocok (opsional)
     */
    public function fallback(): Response
    {
        return Inertia::render('Dashboard');
    }
}