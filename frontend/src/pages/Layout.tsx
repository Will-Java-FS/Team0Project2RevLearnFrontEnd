import React from 'react';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main role="main" className="flex-grow">
                {children}
            </main>
            <footer className="text-center p-4 bg-gray-200 dark:bg-gray-800">
                <p className="text-primary">
                    &copy; 2024 My App
                </p>
            </footer>
        </div>
    );
};

export default Layout;