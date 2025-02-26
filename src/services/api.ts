import { connection } from "../context/WalletContext";
import { Airdrop, UserAllocation } from "../types";
import { PublicKey } from "@solana/web3.js";

// Mock data for testing
const mockAirdrops: Airdrop[] = [
  {
    id: "airdrop1",
    type: "INSTANT",
    totalRecipients: 1000,
    claimedRecipients: 500,
    totalAmount: 1000000000000,
    claimedAmount: 500000000000,
    tokenSymbol: "SOL",
    tokenDecimals: 9,
  },
  {
    id: "airdrop2",
    type: "VESTED",
    totalRecipients: 2000,
    claimedRecipients: 750,
    totalAmount: 5000000000,
    claimedAmount: 1500000000,
    tokenSymbol: "USDC",
    tokenDecimals: 6,
  },
];

export class AirdropAPI {
  static async getAirdrops(): Promise<Airdrop[]> {
    try {
      // In production, fetch from actual Solana network
      return mockAirdrops;
    } catch (error) {
      console.error("Error fetching airdrops:", error);
      throw error;
    }
  }

  static async getAirdropById(id: string): Promise<Airdrop | null> {
    try {
      return mockAirdrops.find((airdrop) => airdrop.id === id) || null;
    } catch (error) {
      console.error("Error fetching airdrop:", error);
      throw error;
    }
  }

  static async getUserAllocation(
    airdropId: string,
    walletAddress: string
  ): Promise<UserAllocation | null> {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balance = await connection.getBalance(publicKey);

      // In production, check actual allocation from Solana program
      return {
        airdropId,
        amount: balance,
        claimed: false,
        vestingSchedule:
          airdropId === "airdrop2"
            ? {
                startTime: Date.now(),
                endTime: Date.now() + 90 * 24 * 60 * 60 * 1000,
                interval: 30 * 24 * 60 * 60 * 1000,
              }
            : undefined,
      };
    } catch (error) {
      console.error("Error fetching allocation:", error);
      throw error;
    }
  }
}
