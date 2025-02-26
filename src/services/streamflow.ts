import { WalletContextState } from "@solana/wallet-adapter-react";
import { UserAllocation } from "../types";
import { connection } from "../context/WalletContext";

export class StreamflowService {
  // Mock stream data
  private static mockStreams: Record<string, any> = {
    airdrop1: {
      id: "airdrop1",
      amount: 1000000000,
      claimed: 0,
      startTime: Date.now(),
      endTime: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      status: "active",
    },
  };

  static async claimTokens(
    wallet: WalletContextState,
    allocation: UserAllocation
  ): Promise<boolean> {
    try {
      if (!wallet.publicKey) {
        throw new Error("Wallet not connected");
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(
        `Mock claiming ${
          allocation.amount
        } tokens for ${wallet.publicKey.toBase58()}`
      );
      return true;
    } catch (error) {
      console.error("Error claiming tokens:", error);
      return false;
    }
  }

  static async getStreamInfo(streamId: string): Promise<any> {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return this.mockStreams[streamId] || null;
    } catch (error) {
      console.error("Error fetching stream:", error);
      return null;
    }
  }
}
