import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Select, SelectItem } from "@heroui/react";

interface PerformanceData {
  [hour: string]: {
    fcp: number;
    lcp: number;
    cls?: number;
    fid?: number;
    ttfb?: number;
    tti?: number;
    onload_time?: number;
    js_execution_time?: number;
    long_tasks_count?: number;
    resource_load_time?: number;
  };
}

interface MetricOption {
  id: string;
  name: string;
  color: string;
  group: string;
}

// 模拟数据生成函数
const generateMockData = (): PerformanceData => {
  const data: PerformanceData = {};
  for (let hour = 0; hour < 24; hour++) {
    const timeStr = `${hour.toString().padStart(2, "0")}:00`;
    data[timeStr] = {
      fcp: Number((Math.random() * 2 + 0.5).toFixed(2)),
      lcp: Number((Math.random() * 4 + 1).toFixed(2)),
      cls: Number((Math.random() * 0.1).toFixed(3)),
      fid: Math.floor(Math.random() * 100 + 20),
      ttfb: Math.floor(Math.random() * 200 + 50),
      tti: Number((Math.random() * 5 + 2).toFixed(2)),
      onload_time: Number((Math.random() * 6 + 3).toFixed(2)),
      js_execution_time: Math.floor(Math.random() * 3000 + 1000),
      long_tasks_count: Math.floor(Math.random() * 30),
      resource_load_time: Number((Math.random() * 3 + 1).toFixed(2)),
    };
  }
  return data;
};

const PerformanceAnalysis = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("24h"); // '24h', '7d', '30d'
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "fcp",
    "ttfb",
    "resource_load_time",
  ]);

  const metricOptions: MetricOption[] = [
    // 加载时间指标组
    { id: "fcp", name: "首屏时间", color: "#5470c6", group: "loading" },
    { id: "lcp", name: "最大内容绘制", color: "#ee6666", group: "loading" },
    { id: "tti", name: "可交互时间", color: "#fc8452", group: "loading" },
    {
      id: "onload_time",
      name: "页面加载完成时间",
      color: "#9a60b4",
      group: "loading",
    },
    // 交互性能指标组
    { id: "fid", name: "首次输入延迟", color: "#3ba272", group: "interaction" },
    { id: "cls", name: "累计布局偏移", color: "#73c0de", group: "interaction" },
    {
      id: "long_tasks_count",
      name: "长任务数",
      color: "#9c27b0",
      group: "interaction",
    },
    // 资源指标组
    { id: "ttfb", name: "白屏时间", color: "#91cc75", group: "resource" },
    {
      id: "resource_load_time",
      name: "资源加载时间",
      color: "#fac858",
      group: "resource",
    },
    {
      id: "js_execution_time",
      name: "JS执行时间",
      color: "#ff9800",
      group: "resource",
    },
  ];

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setPerformanceData(generateMockData());
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleMetricChange = (keys: SharedSelection) => {
    const newSelection = Array.from(keys) as string[];
    setSelectedMetrics(
      newSelection.length > 0 ? newSelection : [metricOptions[0].id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="text-lg text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 py-8 sm:px-0">
      {/* 过滤器 */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">过滤器</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setTimeRange("24h")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === "24h"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            24 小时
          </button>
          <button
            onClick={() => setTimeRange("7d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === "7d"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            7 天
          </button>
          <button
            onClick={() => setTimeRange("30d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === "30d"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            30 天
          </button>
        </div>
      </div>

      {/* 性能指标卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 加载时间指标卡片 */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            页面加载性能
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">
                首屏时间 (FCP)
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {(performanceData["00:00"]?.fcp || 0).toFixed(2)}s
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">
                最大内容绘制 (LCP)
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {(performanceData["00:00"]?.lcp || 0).toFixed(2)}s
              </div>
            </div>
          </div>
        </div>

        {/* 交互性能指标卡片 */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            交互响应性能
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">
                首次输入延迟 (FID)
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {performanceData["00:00"]?.fid || 0}ms
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">
                累计布局偏移 (CLS)
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {(performanceData["00:00"]?.cls || 0).toFixed(3)}
              </div>
            </div>
          </div>
        </div>

        {/* 资源加载指标卡片 */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            资源加载性能
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">
                白屏时间 (TTFB)
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {performanceData["00:00"]?.ttfb || 0}ms
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">
                资源加载时间
              </div>
              <div className="text-xl font-semibold text-gray-900">
                {(performanceData["00:00"]?.resource_load_time || 0).toFixed(2)}
                s
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 趋势图表 */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">性能趋势</h3>

          {/* 替换 Listbox 为 Select */}
          <div className="w-72">
            <Select
              label="查询指标"
              labelPlacement="outside"
              placeholder="请选择指标"
              selectedKeys={new Set(selectedMetrics)}
              selectionMode="multiple"
              size="sm"
              onSelectionChange={handleMetricChange}
            >
              {metricOptions.map((metric) => (
                <SelectItem key={metric.id}>{metric.name}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <ReactECharts
          key={selectedMetrics.join(",")}
          option={{
            tooltip: {
              trigger: "axis",
              formatter: function (params: any) {
                let result = params[0].name + "<br/>";
                params.forEach((param: any) => {
                  result += `${param.seriesName}: ${param.value}s<br/>`;
                });
                return result;
              },
            },
            legend: {
              data: selectedMetrics.map(
                (id) => metricOptions.find((m) => m.id === id)?.name || id
              ),
              bottom: 0,
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "10%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: Object.keys(performanceData),
              axisLabel: {
                rotate: 45,
              },
            },
            yAxis: {
              type: "value",
              name: "时间(s)",
            },
            series: selectedMetrics.map((metricId) => {
              const metric = metricOptions.find((m) => m.id === metricId);
              return {
                name: metric?.name || metricId,
                type: "line",
                smooth: true,
                data: Object.values(performanceData).map((d) => {
                  const value = d[metricId as keyof typeof d];
                  // 对某些需要转换的指标进行处理
                  return metricId === "ttfb" ? Number(value) / 1000 : value;
                }),
                areaStyle: {
                  opacity: 0.1,
                },
                itemStyle: {
                  color: metric?.color,
                },
              };
            }),
          }}
          style={{ height: "400px" }}
        />
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
