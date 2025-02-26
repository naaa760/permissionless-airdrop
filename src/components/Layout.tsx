import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        <Navbar />
        <main className="pt-24">{children}</main>
        <footer className="mt-20 py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Permissionless Airdrop. Built on
              Solana.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
