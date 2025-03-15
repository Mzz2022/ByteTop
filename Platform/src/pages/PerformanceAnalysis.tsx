import { useState, useEffect } from "react";
import { TimeRangeFilter } from "@/components/buttons/TimeRangeFilter";
import { PerformanceChart } from "@/components/charts/PerformanceChart";
import { PerformanceTable } from "@/components/tables/PerformanceTable";
import { MetricCard } from "@/components/tables/MetricCard";

export interface PerformanceData {
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

export interface MetricOption {
  id: string;
  name: string;
  color: string;
  group: string;
}

// 添加新的接口定义
export interface PerformanceDistributionItem {
  page: string;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
  tti: number;
  onloadTime: number;
  jsExecutionTime: number;
  resourceLoadTime: number;
  pageViews: number;
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

// 生成模拟分布数据
const generateDistributionData = (): PerformanceDistributionItem[] => {
  const pages = [
    "/home",
    "/product-list",
    "/product-detail",
    "/cart",
    "/checkout",
    "/user-profile",
    "/settings",
    "/search",
  ];

  return pages.map((page) => ({
    page,
    fcp: Number((Math.random() * 2 + 0.5).toFixed(2)),
    lcp: Number((Math.random() * 4 + 1).toFixed(2)),
    cls: Number((Math.random() * 0.1).toFixed(3)),
    fid: Math.floor(Math.random() * 100 + 20),
    ttfb: Math.floor(Math.random() * 200 + 50),
    tti: Number((Math.random() * 5 + 2).toFixed(2)),
    onloadTime: Number((Math.random() * 6 + 3).toFixed(2)),
    jsExecutionTime: Math.floor(Math.random() * 3000 + 1000),
    resourceLoadTime: Number((Math.random() * 3 + 1).toFixed(2)),
    pageViews: Math.floor(Math.random() * 10000 + 1000),
  }));
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
  const [distributionData] = useState<PerformanceDistributionItem[]>(
    generateDistributionData()
  );

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

  const handleMetricChange = (keys: any) => {
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

  const currentData = performanceData["00:00"];

  return (
    <div className="w-full px-2 py-8 sm:px-0 col-span-12">
      <TimeRangeFilter timeRange={timeRange} setTimeRange={setTimeRange} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 加载时间指标卡片 */}
        <MetricCard
          title="页面加载性能"
          subtitle1="首屏时间 (FCP)"
          subtitle2="最大内容绘制 (LCP)"
          data1={currentData.fcp}
          data2={currentData.lcp}
          unit1="s"
          unit2="s"
        />
        <MetricCard
          title="交互响应性能"
          subtitle1="首次输入延迟 (FID)"
          subtitle2="累计布局偏移 (CLS)"
          data1={currentData.fid}
          data2={currentData.cls}
          unit1="ms"
          unit2=""
        />
        <MetricCard
          title="资源加载性能"
          subtitle1="白屏时间 (TTFB)"
          subtitle2="资源加载时间"
          data1={currentData.ttfb}
          data2={currentData.resource_load_time}
          unit1="ms"
          unit2="s"
        />
      </div>

      {/* 性能趋势图表 */}
      <PerformanceChart
        performanceData={performanceData}
        selectedMetrics={selectedMetrics}
        metricOptions={metricOptions}
        onMetricChange={handleMetricChange}
      />

      {/* 性能数据表格 */}
      <PerformanceTable data={distributionData} />
    </div>
  );
};

export default PerformanceAnalysis;
