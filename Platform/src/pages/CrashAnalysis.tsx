import React from "react";
import ReactECharts from "echarts-for-react";

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

      // 生成设备分布
      const deviceDistribution = devices.reduce(
        (devAcc, device) => ({
          ...devAcc,
          [device]:
            Math.floor(Math.random() * (crashCount / devices.length)) + 1,
        }),
        {}
      );

      // 生成浏览器分布
      const browserDistribution = browsers.reduce(
        (browAcc, browser) => ({
          ...browAcc,
          [browser]:
            Math.floor(Math.random() * (crashCount / browsers.length)) + 1,
        }),
        {}
      );

      // 生成受影响页面
      const topPages = [...pages]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2);

      // 生成错误信息
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

const mockData = generateMockData();

const CrashAnalysis = () => {
  // 获取当前小时的数据
  const currentHourData = mockData.crash_analysis["00:00"];

  // 处理设备分布数据
  const deviceData = Object.entries(
    mockData.crash_analysis["00:00"].device_distribution || {}
  );
  const browserData = Object.entries(
    mockData.crash_analysis["00:00"].browser_distribution || {}
  );

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {/* 添加统计卡片 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">流量概览</h3>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <div className="text-sm text-gray-600">崩溃次数</div>
            <div className="text-xl font-semibold text-gray-500">
              {currentHourData.crash_count}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="text-sm text-gray-600">崩溃触发次数</div>
            <div className="text-xl font-semibold text-gray-500">--</div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="text-sm text-gray-600">崩溃率</div>
            <div className="text-xl font-semibold text-gray-500">
              {currentHourData.crash_rate
                ? `${(currentHourData.crash_rate * 100).toFixed(2)}%`
                : "--"}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="text-sm text-gray-600">访问用户数</div>
            <div className="text-xl font-semibold text-gray-500">--</div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="text-sm text-gray-600">崩溃触发用户数</div>
            <div className="text-xl font-semibold text-gray-500">
              {currentHourData.affected_users || "--"}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="text-sm text-gray-600">崩溃触发用户数占比</div>
            <div className="text-xl font-semibold text-gray-500">--</div>
          </div>
        </div>
      </div>

      {/* 崩溃趋势图表 - 添加卡片样式 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <ReactECharts
          option={{
            title: { text: "每小时崩溃趋势" },
            tooltip: {
              trigger: "axis",
              formatter: function (
                params: {
                  name: string;
                  value: number;
                  axisDim: string;
                  axisIndex: number;
                  seriesIndex: number;
                }[]
              ) {
                const data = mockData.crash_analysis[params[0].name];

                return `
                  <div class="font-sans">
                    <div class="font-medium">${params[0].name}</div>
                    <div>崩溃次数: ${data.crash_count}</div>
                    <div>影响用户数: ${data.affected_users ?? "--"}</div>
                    <div>崩溃率: ${data.crash_rate ? (data.crash_rate * 100).toFixed(2) : "--"}%</div>
                  </div>
                `;
              },
            },
            xAxis: {
              type: "category",
              data: Object.keys(mockData.crash_analysis),
            },
            yAxis: { type: "value" },
            series: [
              {
                data: Object.values(mockData.crash_analysis).map(
                  (v) => v.crash_count
                ),
                type: "line",
                smooth: true,
              },
            ],
          }}
          style={{ height: 400 }}
        />
      </div>

      {/* 饼图容器 - 调整尺寸 */}
      <div className="flex flex-row gap-4 h-[300px]">
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <ReactECharts
            option={{
              title: { text: "设备分布" },
              tooltip: { trigger: "item" },
              series: [
                {
                  type: "pie",
                  radius: "45%",
                  data: deviceData.map(([name, value]) => ({ value, name })),
                },
              ],
            }}
            style={{ height: "100%" }}
          />
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <ReactECharts
            option={{
              title: { text: "浏览器分布" },
              tooltip: { trigger: "item" },
              series: [
                {
                  type: "pie",
                  radius: "45%",
                  data: browserData.map(([name, value]) => ({ value, name })),
                },
              ],
            }}
            style={{ height: "100%" }}
          />
        </div>
      </div>

      {/* 错误信息卡片 - 保持现有样式 */}
      <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          错误信息汇总
        </h3>
        <div className="space-y-2">
          {mockData.crash_analysis["00:00"].error_messages?.map((msg, i) => (
            <div
              key={i}
              className="flex items-center p-3 bg-red-50 border-l-4 border-red-400 rounded-sm hover:bg-red-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-red-500 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-gray-700 font-mono text-sm">{msg}</span>
            </div>
          )) ?? (
            <div className="text-center text-gray-400 py-4 text-sm">
              当前时段无错误信息
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrashAnalysis;
