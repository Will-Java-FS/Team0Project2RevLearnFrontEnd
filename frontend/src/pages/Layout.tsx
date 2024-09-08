// Layout.tsx
import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle"; // Adjust path as needed

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-content dark:bg-neutral">
      <header>
        <Navbar />
      </header>
      <main role="main" className="flex-grow">
        {children}
      </main>
      <Footer />
      <ThemeToggle className="z-50" /> {/* Ensure it's on top */}
    </div>
  );
};

export default Layout;
