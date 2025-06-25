import { Link } from '@inertiajs/react';

// Ikon tetap sama
const DashboardIcon = () => (
    <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    </svg>
);
const SuratMasukIcon = () => (
    <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
        <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2V1a1 1 0 012 0v2h2V1a1 1 0 112 0v2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h6a1 1 0 100-2H7zm-3 4a1 1 0 100 2h6a1 1 0 100-2H4z"
            clipRule="evenodd"
        ></path>
    </svg>
);
const NotifikasiIcon = () => (
    <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
    </svg>
);
const LogoutIcon = () => (
    <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clipRule="evenodd"
        ></path>
    </svg>
);

export default function TuSidebar() {
    const activeClass = 'flex items-center p-3 text-purple-900 bg-white rounded-xl font-bold shadow transition duration-200 mb-2';
    const inactiveClass =
        'flex items-center p-3 text-purple-100 hover:text-white hover:bg-purple-400 rounded-xl font-medium transition duration-200 mb-2';

    return (
        <aside className="sidebar flex min-h-screen w-[260px] flex-col justify-between rounded-[22px] bg-gradient-to-b from-purple-800 via-purple-500 to-purple-800 p-6">
            <div>
                <div className="mb-8 text-center">
                    {/* Lingkaran logo */}
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-200 bg-gradient-to-b from-purple-300 to-purple-500 text-lg font-bold text-white shadow-inner select-none">
                        POLMED
                    </div>
                    <h3 className="mb-1 text-2xl font-bold text-white">Sistem Surat</h3>
                    <p className="mb-2 text-sm text-purple-200">karna raandy</p>
                </div>
                <nav>
                    <Link href={route('tu.dashboard')} className={route().current('tu.dashboard') ? activeClass : inactiveClass}>
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
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex w-full items-center justify-center rounded-xl border border-purple-300 px-4 py-3 font-semibold text-purple-100 transition hover:bg-purple-600 hover:text-white"
                >
                    <LogoutIcon />
                    Logout
                </Link>
            </div>
        </aside>
    );
}
