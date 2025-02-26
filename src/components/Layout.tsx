import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Images with Motion */}
      <div className="fixed inset-0 z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 animate-float-slow">
          <img
            src="/img.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-30 rounded-full blur-2xl"
          />
        </div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 animate-float-delayed">
          <img
            src="/img2.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-30 rounded-full blur-2xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
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
