import React from "react";
import { useWalletContext } from "../context/WalletContext";

const Header: React.FC = () => {
  const { connected } = useWalletContext();

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 transform -skew-y-6" />
      </div>

      <div className="relative">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Claim Your Airdrops
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            {connected
              ? "Discover and claim your token airdrops on Solana with ease"
              : "Connect your wallet to explore available airdrops on Solana"}
          </p>

          <div className="mt-10 flex justify-center space-x-4">
            {!connected && (
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                Get Started
              </button>
            )}
            <a
              href="https://docs.solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
