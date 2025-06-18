// resources/js/layouts/PengajuLayout.tsx

import PengajuSidebar from '@/layouts/Partials/PengajuSidebar'; // <-- Import sidebar Pengaju

type PengajuLayoutProps = {
    header?: React.ReactNode;
    children: React.ReactNode;
};

export default function PengajuLayout({ header, children }: PengajuLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <PengajuSidebar />
            <main className="flex-1 p-6 md:p-8">
                {header && (
                     <header className="bg-white shadow mb-6 rounded-lg">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                {children}
            </main>
        </div>
    );
}