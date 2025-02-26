import React from "react";
import { useWalletContext, WalletMultiButton } from "../context/WalletContext";

const ConnectWallet: React.FC = () => {
  const { connected, connecting, publicKey } = useWalletContext();

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold mb-2">Wallet Connection</h2>
          <p className="text-gray-600 mb-4">
            {connecting
              ? "Connecting to Phantom..."
              : connected
              ? "Your wallet is connected"
              : "Connect your Phantom wallet to continue"}
          </p>
          {connected && publicKey && (
            <p className="text-sm text-gray-600">
              Address: <span className="font-mono">{publicKey.toBase58()}</span>
            </p>
          )}
        </div>
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
      </div>
    </div>
  );
};

export default ConnectWallet;
