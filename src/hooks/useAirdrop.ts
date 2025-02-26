import { useState, useEffect } from "react";
import { useWalletContext } from "../context/WalletContext";
import { AirdropAPI } from "../services/api";
import { StreamflowService } from "../services/streamflow";
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
    if (!connected || !publicKey || !allocation) return false;

    try {
      // In production, this would call your Solana program
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate transaction
      showNotification("success", "Tokens claimed successfully!");
      setAllocation({ ...allocation, claimed: true });
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
