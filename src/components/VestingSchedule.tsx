import React from "react";
import { UserAllocation } from "../types";

interface VestingScheduleProps {
  allocation: UserAllocation;
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({ allocation }) => {
  if (!allocation.vestingSchedule) return null;

  const { startTime, endTime, interval } = allocation.vestingSchedule;
  const now = Date.now();
  const progress = Math.min(
    100,
    Math.max(0, ((now - startTime) / (endTime - startTime)) * 100)
  );

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium mb-2">Vesting Schedule</h4>
      <div className="space-y-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Start: {new Date(startTime).toLocaleDateString()}</span>
          <span>End: {new Date(endTime).toLocaleDateString()}</span>
        </div>
        <p className="text-xs text-gray-500">
          Interval: {interval / (24 * 60 * 60 * 1000)} days
        </p>
      </div>
    </div>
  );
};

export default VestingSchedule;
