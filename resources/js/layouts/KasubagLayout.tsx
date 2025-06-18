import React, { PropsWithChildren } from 'react';
import KasubagSidebar from './partials/KasubagSidebar'; // Import sidebar yang baru dibuat

export default function KasubagLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <KasubagSidebar />
            <main className="flex-grow p-6 md:p-8 flex-1">
                {children}
            </main>
        </div>
    );
}
