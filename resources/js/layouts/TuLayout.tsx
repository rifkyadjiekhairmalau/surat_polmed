import { PropsWithChildren } from 'react';
import TuSidebar from './Partials/TuSidebar';

export default function TuLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
            <TuSidebar />
            <main className="flex-1 flex-grow p-6 md:p-8">{children}</main>
        </div>
    );
}
