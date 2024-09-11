import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar should be inside header and positioned sticky */}
      <header className="sticky top-0 z-50 bg-white dark:bg-neutral shadow-md">
        <Navbar />
      </header>
      {/* Main content area */}
      <main role="main" className="flex-grow">
        {children}
      </main>
      {/* Footer and other components */}
      <Footer />
<<<<<<< HEAD
      <ThemeToggle className="fixed bottom-4 right-4 z-50" />
=======
      <ThemeToggle />
>>>>>>> Drew
    </div>
  );
};

export default Layout;