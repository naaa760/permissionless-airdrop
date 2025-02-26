export type AirdropType = "INSTANT" | "VESTED";

export interface Airdrop {
  id: string;
  type: AirdropType;
  totalRecipients: number;
  claimedRecipients: number;
  totalAmount: number;
  claimedAmount: number;
  tokenSymbol: string;
  tokenDecimals: number;
}

export interface UserAllocation {
  airdropId: string;
  amount: number;
  claimed: boolean;
  vestingSchedule?: {
    startTime: number;
    endTime: number;
    interval: number;
  };
}
