import React from 'react';
import { Link } from '@inertiajs/react';

// Ikon tetap sama
const DashboardIcon = () => <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>;
const SuratMasukIcon = () => <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2V1a1 1 0 012 0v2h2V1a1 1 0 112 0v2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h6a1 1 0 100-2H7zm-3 4a1 1 0 100 2h6a1 1 0 100-2H4z" clipRule="evenodd"></path></svg>;
const NotifikasiIcon = () => <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>;
const LogoutIcon = () => <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>;

export default function TuSidebar() {
    const activeClass = "flex items-center p-3 text-purple-900 bg-white rounded-xl font-bold shadow transition duration-200 mb-2";
    const inactiveClass = "flex items-center p-3 text-purple-100 hover:text-white hover:bg-purple-400 rounded-xl font-medium transition duration-200 mb-2";

    return (
        <aside className="sidebar min-h-screen bg-gradient-to-b from-purple-800 via-purple-500 to-purple-800 p-6 flex flex-col justify-between rounded-[22px] w-[260px]">
            <div>
                <div className="text-center mb-8">
                    {/* Lingkaran logo */}
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-purple-200 flex items-center justify-center text-white text-lg font-bold bg-gradient-to-b from-purple-300 to-purple-500 shadow-inner select-none">
                        POLMED
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Sistem Surat</h3>
                    <p className="text-sm text-purple-200 mb-2">karna raandy</p>
                </div>
                <nav>
                    <Link href={route('dashboard')} className={route().current('dashboard') ? activeClass : inactiveClass}>
                        <DashboardIcon />
                        Dashboard
                    </Link>
                    <Link href={route('tu.surat-masuk')} className={route().current('tu.surat-masuk') ? activeClass : inactiveClass}>
                        <SuratMasukIcon />
                        Semua Surat Masuk
                    </Link>
                    <Link href={route('tu.surat-keluar')} className={route().current('tu.surat-keluar') ? activeClass : inactiveClass}>
                        <SuratMasukIcon />
                        Surat Keluar
                    </Link>
                    <Link href={route('tu.notifications')} className={route().current('tu.notifications') ? activeClass : inactiveClass}>
                        <NotifikasiIcon />
                        Notifikasi
                    </Link>
                </nav>
            </div>
            <div className="mt-8">
                <Link href={route('logout')} method="post" as="button" className="flex items-center justify-center w-full px-4 py-3 border border-purple-300 rounded-xl text-purple-100 hover:bg-purple-600 hover:text-white transition font-semibold">
                    <LogoutIcon />
                    Logout
                </Link>
            </div>
        </aside>
    );
}