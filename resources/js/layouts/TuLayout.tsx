import React, { PropsWithChildren } from 'react';
import TuSidebar from './partials/TuSidebar';

export default function TuLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <TuSidebar />
            <main className="flex-grow p-6 md:p-8 flex-1">
                {children}
            </main>
        </div>
    );
}