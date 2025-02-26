import { useState, useEffect } from "react";
import { useWalletContext } from "../context/WalletContext";
import { AirdropAPI } from "../services/api";
import { Airdrop, UserAllocation } from "../types";
import { useNotification } from "../context/NotificationContext";

export const useAirdrop = (airdropId: string) => {
  const { connected, publicKey } = useWalletContext();
  const { showNotification } = useNotification();
  const [airdrop, setAirdrop] = useState<Airdrop | null>(null);
  const [allocation, setAllocation] = useState<UserAllocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllocation = async () => {
      if (!connected || !publicKey) return;

      try {
        setLoading(true);
        setError(null);
        const data = await AirdropAPI.getUserAllocation(
          airdropId,
          publicKey.toBase58()
        );
        setAllocation(data);
      } catch (err) {
        setError("Failed to fetch allocation");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllocation();
  }, [airdropId, connected, publicKey]);

  const claimTokens = async () => {
    if (!connected || !publicKey || !allocation) {
      showNotification("error", "Please connect your wallet first");
      return false;
    }

    if (allocation.claimed) {
      showNotification("error", "Tokens already claimed");
      return false;
    }

    try {
      // In production, this would call your Solana program
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update local state
      setAllocation({ ...allocation, claimed: true });

      showNotification("success", "Tokens claimed successfully!");
      return true;
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to claim tokens");
      return false;
    }
  };

  return {
    airdrop,
    allocation,
    loading,
    error,
    claimTokens,
  };
};
