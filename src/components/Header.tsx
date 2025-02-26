import React from "react";
import { useWalletContext } from "../context/WalletContext";

const Header: React.FC = () => {
  const { connected } = useWalletContext();

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const style = {
        "--duration": `${Math.random() * 3 + 2}s`,
        "--delay": `${Math.random() * 2}s`,
        "--opacity": Math.random() * 0.7 + 0.3,
        "--rotate": `${Math.random() * 360}deg`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      } as React.CSSProperties;

      stars.push(<div key={i} className="star" style={style} />);
    }
    return stars;
  };

  return (
    <div className="relative min-h-[70vh] bg-black overflow-hidden">
      {/* Star Field Background */}
      <div className="star-field">{createStars()}</div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-black to-black" />
        <div className="absolute top-0 -left-4 w-3/4 h-3/4 bg-green-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 -right-4 w-3/4 h-3/4 bg-emerald-500/10 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Editor's Choice Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-green-400 text-sm">№1</span>
            <span className="text-gray-400 text-sm">
              Solana Airdrop Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            Claim Your Airdrops
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            {connected
              ? "Discover and claim your token airdrops on Solana with ease"
              : "Connect your wallet to explore available airdrops on Solana"}
          </p>

          <div className="mt-10 flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Enter Airdrop ID"
              className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:opacity-90 transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
