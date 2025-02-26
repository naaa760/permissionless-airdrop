import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "../context/WalletContext";
import { useWalletContext } from "../context/WalletContext";

const Navbar: React.FC = () => {
  const { connected } = useWalletContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-3" />
            <span className="text-xl font-bold text-gray-900">
              Permissionless Airdrop
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {connected && (
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                My Airdrops
              </button>
            )}
            <WalletMultiButton className="!bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
