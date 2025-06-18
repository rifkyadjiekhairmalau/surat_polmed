// resources/js/layouts/Partials/Sidebar.tsx (Kode Final yang Benar)

import { Link, usePage } from '@inertiajs/react';

type User = {
    name: string;
};

type PageProps = {
    auth: {
        user: User;
    };
};

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

export default function Sidebar() {
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
            <p className="text-sm text-violet-200 font-medium">{auth.user ? auth.user.name : 'Guest'}</p>
        </div>
        <nav>
            <SidebarLink href={route('pengaju.dashboard')} active={route().current('pengaju.dashboard')}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <span className="font-bold text-white group-hover:text-gray-900 transition">Dashboard</span>
            </SidebarLink>

            <SidebarLink href={route('dashboard')} active={route().current('dashboard')}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM10 9a3 3 0 00-3 3v2h6v-2a3 3 0 00-3-3z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    ></path>
                </svg>
                <span className="font-bold text-gray-900 group-hover:text-gray-900 transition">Manajemen Pengguna</span>
            </SidebarLink>

            <SidebarLink href="#" active={false}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM11 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM13 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1z"></path>
                    <path d="M4 12a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2H4zm.5 2h11a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v1a.5.5 0 00.5.5z"></path>
                </svg>
                <span className="font-bold text-white group-hover:text-gray-900 transition">Data Master</span>
            </SidebarLink>

            <SidebarLink href="#" active={false}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12a1 1 0 100-2 1 1 0 000 2z"></path>
                    <path
                        fillRule="evenodd"
                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm6 10a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <span className="font-bold text-white group-hover:text-gray-900 transition">Laporan</span>
            </SidebarLink>

            <SidebarLink href="#" active={false}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm-5 8a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <span className="font-bold text-white group-hover:text-gray-900 transition">Log Aktivitas</span>
            </SidebarLink>

            <SidebarLink href="#" active={false}>
                <svg className="w-5 h-5 mr-3 text-violet-300 group-hover:text-gray-900 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm-5 8a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <span className="font-bold text-white group-hover:text-gray-900 transition">Log Aktivitas</span>
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
