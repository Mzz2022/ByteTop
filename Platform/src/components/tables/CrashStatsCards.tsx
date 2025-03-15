import React from "react";

interface CrashStatsCardsProps {
  currentHourData: {
    crash_count: number;
    affected_users?: number;
    crash_rate?: number;
  };
}

const CrashStatsCards: React.FC<CrashStatsCardsProps> = ({
  currentHourData,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
    <h3 className="text-sm font-semibold text-gray-700 mb-4">流量概览</h3>
    <div className="flex gap-4">
      <div className="flex-1 flex flex-col">
        <div className="text-sm text-gray-600">崩溃次数</div>
        <div className="text-xl font-semibold text-gray-500">
          {currentHourData.crash_count}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-sm text-gray-600">崩溃触发用户数</div>
        <div className="text-xl font-semibold text-gray-500">
          {currentHourData.affected_users || "--"}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-sm text-gray-600">崩溃率</div>
        <div className="text-xl font-semibold text-gray-500">
          {currentHourData.crash_rate
            ? `${(currentHourData.crash_rate * 100).toFixed(2)}%`
            : "--"}
        </div>
      </div>
    </div>
  </div>
);

export default CrashStatsCards;
