import React from 'react';
import { Link } from '@inertiajs/react';

// Ikon-ikon untuk navigasi
const UserGroupIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
    </svg>
);
const LogoutIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
    </svg>
);

export default function AdminSidebar() {
    // Violet modern style
    const activeClass = "flex items-center p-3 text-violet-900 bg-white rounded-xl font-bold shadow transition duration-200 mb-2";
    const inactiveClass = "flex items-center p-3 text-violet-100 hover:text-white hover:bg-violet-400 rounded-xl font-medium transition duration-200 mb-2";

    return (
        <aside className="sidebar min-h-screen bg-gradient-to-b from-violet-400 via-violet-500 to-violet-800 p-6 flex flex-col justify-between rounded-[22px] w-[260px]">
            <div>
                <div className="text-center mb-10">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-violet-200 flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-b from-violet-300 to-violet-500 shadow-inner select-none">
                        A
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Sistem Surat</h3>
                    <p className="text-sm text-violet-200">Administrator</p>
                </div>
                <nav>
                    <Link href={'#'} className={activeClass}>
                        <UserGroupIcon />
                        Manajemen Pengguna
                    </Link>
                </nav>
            </div>
            <div className="mt-8">
                <Link href={route('logout')} method="post" as="button" className={`${inactiveClass} w-full`}>
                    <LogoutIcon />
                    Logout
                </Link>
            </div>
        </aside>
    );
}