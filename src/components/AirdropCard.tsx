import React from "react";
import { Airdrop } from "../types";
import ClaimButton from "./ClaimButton";
import VestingSchedule from "./VestingSchedule";
import { useAirdrop } from "../hooks/useAirdrop";
import LoadingSpinner from "./LoadingSpinner";

interface AirdropCardProps {
  airdrop: Airdrop;
}

const AirdropCard: React.FC<AirdropCardProps> = ({ airdrop }) => {
  const { allocation, loading } = useAirdrop(airdrop.id);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat().format(amount / 10 ** airdrop.tokenDecimals);
  };

  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {airdrop.tokenSymbol} Airdrop
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">ID: {airdrop.id}</p>
            <p className="text-sm">
              <span
                className={`font-medium ${
                  airdrop.type === "INSTANT"
                    ? "text-blue-600"
                    : "text-purple-600"
                }`}
              >
                {airdrop.type} Distribution
              </span>
            </p>
            {allocation && (
              <p className="text-sm">
                <span className="text-gray-600">Your Allocation: </span>
                <span className="font-medium">
                  {formatAmount(allocation.amount)} {airdrop.tokenSymbol}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-sm">
            <span className="text-gray-600">Claimed: </span>
            <span className="font-medium">
              {airdrop.claimedRecipients}/{airdrop.totalRecipients}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Total: </span>
            <span className="font-medium">
              {formatAmount(airdrop.totalAmount)} {airdrop.tokenSymbol}
            </span>
          </p>
          <ClaimButton airdropId={airdrop.id} />
        </div>
      </div>

      {loading ? (
        <div className="mt-4">
          <LoadingSpinner size="small" />
        </div>
      ) : (
        allocation?.vestingSchedule && (
          <VestingSchedule allocation={allocation} />
        )
      )}
    </div>
  );
};

export default AirdropCard;
