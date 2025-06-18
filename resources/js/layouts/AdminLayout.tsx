import React, { PropsWithChildren } from 'react';
import AdminSidebar from './partials/AdminSidebar';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <AdminSidebar />
            <main className="flex-grow p-6 md:p-8 flex-1">
                {children}
            </main>
        </div>
    );
}
