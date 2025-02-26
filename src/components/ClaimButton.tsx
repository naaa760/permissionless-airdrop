import React, { useState } from "react";
import { useWalletContext } from "../context/WalletContext";
import { useNotification } from "../context/NotificationContext";
import LoadingSpinner from "./LoadingSpinner";

interface ClaimButtonProps {
  airdropId: string;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ airdropId }) => {
  const { connected, publicKey } = useWalletContext();
  const { showNotification } = useNotification();
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    if (!connected || !publicKey) {
      showNotification("error", "Please connect your wallet first");
      return;
    }

    try {
      setClaiming(true);
      showNotification("info", "Processing claim...");

      // Simulate claim transaction (replace with actual claim logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showNotification("success", "Tokens claimed successfully!");
    } catch (error) {
      console.error("Claim error:", error);
      showNotification("error", "Failed to claim tokens");
    } finally {
      setClaiming(false);
    }
  };

  if (!connected) {
    return (
      <button
        className="w-full px-6 py-3 bg-gray-600 text-white font-medium rounded-lg opacity-50 cursor-not-allowed"
        disabled
      >
        Connect Wallet to Claim
      </button>
    );
  }

  return (
    <button
      onClick={handleClaim}
      disabled={claiming}
      className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
      text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 
      disabled:opacity-50 disabled:cursor-not-allowed
      group-hover:shadow-lg group-hover:shadow-green-500/25"
    >
      {claiming ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner size="small" />
          <span>Claiming...</span>
        </div>
      ) : (
        "Claim Tokens"
      )}
    </button>
  );
};

export default ClaimButton;
