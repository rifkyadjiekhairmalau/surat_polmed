// resources/js/layouts/Partials/PengajuSidebar.tsx

import { Link, usePage } from '@inertiajs/react';

// Tipe data untuk User
type User = {
    name: string;
};

// Tipe data untuk Page Props
type PageProps = {
    auth: {
        user: User;
    };
};

// Komponen untuk satu link di sidebar
const SidebarLink = ({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) => (
    <Link
        href={href}
        className={`mb-2 flex items-center rounded-lg p-3 font-medium transition duration-200 ${
            active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
        {children}
    </Link>
);

export default function PengajuSidebar() {
    const { auth } = usePage<PageProps>().props;

    return (
        <aside className="sidebar bg-gradient-to-b from-violet-500 via-violet-800 to-violet-900 w-64 p-6 shadow-2xl flex flex-col justify-between rounded-xl border border-violet-600">
    <div>
        <div className="mb-8 text-center">
            <img
                src="https://placehold.co/80x80/7C3AED/ffffff?text=POLMED"
                alt="Logo Polmed"
                className="mx-auto mb-3 rounded-full border-4 border-violet-400 shadow-lg"
            />
            <h3 className="text-2xl font-bold text-white tracking-wide drop-shadow">Sistem Surat</h3>
            <p className="text-sm text-violet-200 font-medium">{auth.user ? auth.user.name : 'Pengaju'}</p>
        </div>

        <nav>
            <SidebarLink href={route('pengaju.dashboard')} active={route().current('pengaju.dashboard')}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <span className="font-bold text-gray-900 group-hover:text-gray-900 transition">Dashboard</span>
            </SidebarLink>

            <SidebarLink href={route('surat.create')} active={route().current('surat.create')}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM11 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM13 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1z"></path>
                    <path d="M4 12a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2H4zm.5 2h11a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v1a.5.5 0 00.5.5z"></path>
                </svg>
                <span className="font-bold text-white group-hover:text-gray-900 transition">Ajukan Surat Baru</span>
            </SidebarLink>

            <SidebarLink href={route('notifications.index')} active={route().current('notifications.index')}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                <span className="font-bold text-white group-hover:text-gray-900 transition">Notifikasi</span>
            </SidebarLink>
        </nav>
    </div>
    <div className="mt-8">
        <Link
            href={route('logout')}
            method="post"
            as="button"
            className="w-full flex items-center p-3 text-violet-100 rounded-lg font-semibold hover:bg-violet-800 hover:text-white transition duration-200 border border-violet-700 shadow group"
        >
            <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <span className="font-bold text-white group-hover:text-gray-900 transition">Logout</span>
        </Link>
    </div>
</aside>
    );
}
