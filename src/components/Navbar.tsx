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
      className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl shadow-2xl"
          : "bg-transparent"
      } rounded-2xl border border-white/10`}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Permissionless Airdrop
              </span>
            </div>

            {/* Navigation Links */}
            {connected && (
              <div className="hidden md:flex items-center space-x-6">
                <button className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">
                  My Airdrops
                </button>
                <button className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">
                  History
                </button>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu (for small screens) */}
            {connected && (
              <div className="md:hidden">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Connect Wallet Button */}
            <WalletMultiButton
              className={`
                !px-6 !py-3 
                !bg-gradient-to-r !from-green-500 !to-emerald-600 
                !rounded-xl !border !border-white/10
                hover:!opacity-90 hover:!scale-105
                !transition-all !duration-200
                !shadow-lg hover:!shadow-green-500/20
                !text-sm !font-medium
              `}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (can be toggled) */}
      {connected && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-3 space-y-2">
            <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              My Airdrops
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              History
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
