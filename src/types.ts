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

export interface VestingSchedule {
  startTime: number;
  endTime: number;
  interval: number;
  releaseFrequency: "ONE_TIME" | "DAILY" | "WEEKLY" | "MONTHLY";
  releasedAmount: number;
  totalAmount: number;
}

export interface UserAllocation {
  airdropId: string;
  amount: number;
  claimed: boolean;
  vestingSchedule?: VestingSchedule;
}
