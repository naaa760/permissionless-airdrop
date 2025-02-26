import React, { useState } from "react";
import { useWalletContext } from "../context/WalletContext";
import { useAirdrop } from "../hooks/useAirdrop";
import { useNotification } from "../context/NotificationContext";
import LoadingSpinner from "./LoadingSpinner";

interface ClaimButtonProps {
  airdropId: string;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ airdropId }) => {
  const { connected, publicKey, signTransaction } = useWalletContext();
  const { allocation, loading, error, claimTokens } = useAirdrop(airdropId);
  const { showNotification } = useNotification();
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    if (!connected || !publicKey || !allocation || claiming) return;

    try {
      setClaiming(true);
      showNotification("info", "Claiming tokens...");

      const success = await claimTokens();

      if (success) {
        showNotification("success", "Tokens claimed successfully!");
      } else {
        showNotification("error", "Failed to claim tokens");
      }
    } catch (error) {
      console.error("Claim error:", error);
      showNotification("error", "Error claiming tokens");
    } finally {
      setClaiming(false);
    }
  };

  if (!connected) {
    return <p className="text-sm text-gray-500">Connect wallet to claim</p>;
  }

  if (loading) {
    return <LoadingSpinner size="small" />;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!allocation) {
    return <p className="text-sm text-gray-500">Not eligible</p>;
  }

  if (allocation.claimed) {
    return <p className="text-sm text-green-500">Already claimed</p>;
  }

  return (
    <button
      onClick={handleClaim}
      disabled={claiming}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
    >
      {claiming ? <LoadingSpinner size="small" /> : "Claim Tokens"}
    </button>
  );
};

export default ClaimButton;
