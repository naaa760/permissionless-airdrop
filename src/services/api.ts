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

const mockAllocations: Record<string, UserAllocation> = {
  airdrop1: {
    airdropId: "airdrop1",
    amount: 1000000000, // 1 SOL
    claimed: false,
  },
  airdrop2: {
    airdropId: "airdrop2",
    amount: 1000000, // 1 USDC
    claimed: false,
  },
};

export class AirdropAPI {
  static async getAirdrops(): Promise<Airdrop[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAirdrops;
  }

  static async getAirdropById(id: string): Promise<Airdrop | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAirdrops.find((airdrop) => airdrop.id === id) || null;
  }

  static async getUserAllocation(
    airdropId: string,
    walletAddress: string
  ): Promise<UserAllocation | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAllocations[airdropId] || null;
  }

  static async claimAirdrop(
    airdropId: string,
    walletAddress: string
  ): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const allocation = mockAllocations[airdropId];
    if (!allocation || allocation.claimed) {
      return false;
    }

    // Update mock data
    allocation.claimed = true;
    return true;
  }
}
