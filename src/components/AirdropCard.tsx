import React, { useEffect, useState } from "react";
import { Airdrop } from "../types";
import ClaimButton from "./ClaimButton";
import VestingSchedule from "./VestingSchedule";
import { useAirdrop } from "../hooks/useAirdrop";
import LoadingSpinner from "./LoadingSpinner";
import { PriceService } from "../services/price";
import { StreamflowService } from "../services/streamflow";

interface AirdropCardProps {
  airdrop: Airdrop;
}

const AirdropCard: React.FC<AirdropCardProps> = ({ airdrop }) => {
  const { allocation, loading } = useAirdrop(airdrop.id);
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [streamInfo, setStreamInfo] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      // Get token price
      const price = await PriceService.getTokenPrice(airdrop.tokenSymbol);
      if (price) setUsdPrice(price.usd);

      // Get stream info
      const info = await StreamflowService.getStreamInfo(airdrop.id);
      if (info) setStreamInfo(info);
    };

    loadData();
  }, [airdrop.id, airdrop.tokenSymbol]);

  const formatAmount = (amount: number, includeUsd = true) => {
    const tokenAmount = amount / 10 ** airdrop.tokenDecimals;
    const formatted = new Intl.NumberFormat().format(tokenAmount);

    if (includeUsd && usdPrice) {
      const usdAmount = tokenAmount * usdPrice;
      return `${formatted} ${airdrop.tokenSymbol} ($${usdAmount.toFixed(2)})`;
    }

    return `${formatted} ${airdrop.tokenSymbol}`;
  };

  return (
    <div className="relative overflow-hidden backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
      {/* Decorative Images */}
      <div className="absolute -top-8 -left-8 w-32 h-32 animate-float-slow opacity-50">
        <img
          src="/img.jpg"
          alt=""
          className="w-full h-full object-cover rounded-full blur-sm"
        />
      </div>
      <div className="absolute -bottom-8 -right-8 w-28 h-28 animate-float-delayed opacity-50">
        <img
          src="/img2.jpg"
          alt=""
          className="w-full h-full object-cover rounded-full blur-sm"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />

      {/* Content */}
      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {airdrop.tokenSymbol} Airdrop
            </h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white">
              {airdrop.type}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">ID: {airdrop.id}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Total Amount</p>
              <p className="text-lg font-semibold text-white">
                {formatAmount(airdrop.totalAmount)} {airdrop.tokenSymbol}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Recipients</p>
              <p className="text-lg font-semibold text-white">
                {airdrop.totalRecipients}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Claimed Amount</p>
              <p className="text-lg font-semibold text-white">
                {formatAmount(airdrop.claimedAmount)} {airdrop.tokenSymbol}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Claimed</p>
              <p className="text-lg font-semibold text-white">
                {airdrop.claimedRecipients}/{airdrop.totalRecipients}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progress</span>
            <span>
              {((airdrop.claimedAmount / airdrop.totalAmount) * 100).toFixed(1)}
              %
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
              style={{
                width: `${
                  (airdrop.claimedAmount / airdrop.totalAmount) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* User Allocation */}
        {allocation && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-gray-400 mb-2">Your Allocation</p>
            <p className="text-xl font-semibold text-white">
              {formatAmount(allocation.amount)} {airdrop.tokenSymbol}
            </p>
          </div>
        )}

        {/* Claim Button */}
        <div className="pt-2">
          <ClaimButton airdropId={airdrop.id} />
        </div>
      </div>
    </div>
  );
};

export default AirdropCard;
