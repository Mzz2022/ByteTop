import DistributionPieChart from "@/components/charts/DistributionPieChart";
import TrendChart from "@/components/charts/TrendChart";
import CrashDistributionTable from "@/components/tables/CrashDistributionTable";
import CrashStatsCards from "@/components/tables/CrashStatsCards";

// 数据类型接口
export interface CrashAnalysisData {
  crash_analysis: {
    [hour: string]: {
      crash_count: number;
      affected_users?: number;
      crash_rate?: number;
      top_affected_pages?: string[];
      error_messages?: string[];
      device_distribution?: Record<string, number>;
      browser_distribution?: Record<string, number>;
    };
  };
}

export interface CrashDistributionItem {
  version: string;
  os: string;
  device: string;
  visitCount: number;
  crashCount: number;
  crashRate: number;
  userCount: number;
  crashUserCount: number;
  crashUserRate: number;
  crashShare: number;
}

// 模拟数据生成函数
const generateMockData = (): CrashAnalysisData => {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );
  const devices = ["iOS", "Android", "Windows Phone", "Other"];
  const browsers = ["Chrome", "Safari", "Firefox", "Edge", "Opera"];
  const errorMessages = [
    "OutOfMemoryError",
    "NullPointerException",
    "TypeError",
    "NetworkError",
    "SyntaxError",
    "RangeError",
  ];
  const pages = [
    "/home",
    "/checkout",
    "/product/123",
    "/cart",
    "/profile",
    "/search",
  ];

  return {
    crash_analysis: hours.reduce((acc, hour) => {
      const crashCount =
        Math.floor(Math.random() * (hour.startsWith("0") ? 15 : 50)) + 5;
      const affectedUsers = Math.floor(
        crashCount * (0.2 + Math.random() * 0.3)
      );
      const crashRate = parseFloat((crashCount / 10000).toFixed(4));

      const deviceDistribution = devices.reduce(
        (devAcc, device) => ({
          ...devAcc,
          [device]:
            Math.floor(Math.random() * (crashCount / devices.length)) + 1,
        }),
        {}
      );

      const browserDistribution = browsers.reduce(
        (browAcc, browser) => ({
          ...browAcc,
          [browser]:
            Math.floor(Math.random() * (crashCount / browsers.length)) + 1,
        }),
        {}
      );

      const topPages = [...pages]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2);

      const errors = [...errorMessages]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);

      return {
        ...acc,
        [hour]: {
          crash_count: crashCount,
          affected_users: affectedUsers,
          crash_rate: crashRate,
          top_affected_pages: topPages,
          error_messages: errors,
          device_distribution: deviceDistribution,
          browser_distribution: browserDistribution,
        },
      };
    }, {}),
  };
};

const generateMockDistributionData = (): CrashDistributionItem[] => {
  const versions = ["1.0.0", "1.0.1", "1.1.0", "1.1.1", "1.2.0"];
  const osTypes = ["iOS 16", "iOS 17", "Android 13", "Android 14"];
  const devices = [
    "iPhone 14",
    "iPhone 15",
    "Pixel 7",
    "Galaxy S23",
    "Xiaomi 13",
  ];

  return Array.from({ length: 10 }, () => {
    const visitCount = Math.floor(Math.random() * 10000) + 1000;
    const crashCount = Math.floor(Math.random() * 100) + 10;
    const userCount = Math.floor(visitCount * 0.7);
    const crashUserCount = Math.floor(crashCount * 0.8);

    return {
      version: versions[Math.floor(Math.random() * versions.length)],
      os: osTypes[Math.floor(Math.random() * osTypes.length)],
      device: devices[Math.floor(Math.random() * devices.length)],
      visitCount,
      crashCount,
      crashRate: Number(((crashCount / visitCount) * 100).toFixed(2)),
      userCount,
      crashUserCount,
      crashUserRate: Number(((crashUserCount / userCount) * 100).toFixed(2)),
      crashShare: Number(((crashCount / 1000) * 100).toFixed(2)),
    };
  });
};

const CrashAnalysis = () => {
  const mockData = generateMockData();
  const currentHourData = mockData.crash_analysis["00:00"];
  const deviceData = Object.entries(currentHourData.device_distribution || {});
  const browserData = Object.entries(
    currentHourData.browser_distribution || {}
  );
  const distributionData = generateMockDistributionData();

  return (
    <div className="w-full px-2 py-8 sm:px-0 col-span-12">
      <CrashStatsCards currentHourData={currentHourData} />
      <TrendChart data={mockData} />

      <div className="flex gap-4 mb-6">
        <DistributionPieChart title="设备分布" data={deviceData} />
        <DistributionPieChart title="浏览器分布" data={browserData} />
      </div>

      <CrashDistributionTable data={distributionData} />
    </div>
  );
};

export default CrashAnalysis;
