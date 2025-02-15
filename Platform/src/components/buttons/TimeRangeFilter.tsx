interface TimeRangeFilterProps {
  timeRange: string;
  setTimeRange: (range: "24h" | "7d" | "30d") => void;
}

export const TimeRangeFilter = ({
  timeRange,
  setTimeRange,
}: TimeRangeFilterProps) => (
  <div className="mb-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">过滤器</h2>
    <div className="flex gap-4">
      {["24h", "7d", "30d"].map((range) => (
        <button
          key={range}
          onClick={() => setTimeRange(range as "24h" | "7d" | "30d")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            timeRange === range
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {range.replace("h", " 小时").replace("d", " 天")}
        </button>
      ))}
    </div>
  </div>
);
