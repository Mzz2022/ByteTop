import ReactECharts from "echarts-for-react";
import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { useCallback, useEffect, useMemo } from "react";
import { create } from "zustand";

import CustomContainer from "@/components/variants/CustomContainer";

type TimeSeriesData = {
  time: string[];
  page_views: number[];
  visits: number[];
  visitors: number[];
  ip_count: number[];
  bounce_rate: number[];
};

type MetricKey = Exclude<keyof TimeSeriesData, "time">;

interface Metric {
  key: MetricKey;
  label: string;
}

// 指标定义
export const metrics: Metric[] = [
  { key: "page_views", label: "浏览量 (PV)" },
  { key: "visits", label: "访问次数" },
  { key: "visitors", label: "访客数" },
  { key: "ip_count", label: "独立 IP 数" },
  { key: "bounce_rate", label: "跳出率" },
];

// 快速查询映射表
const metricMap = metrics.reduce(
  (acc, metric) => {
    acc[metric.key] = metric.label;

    return acc;
  },
  {} as Record<MetricKey, string>,
);

// 模拟数据
const simulatedData: TimeSeriesData = {
  time: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"],
  page_views: [120, 132, 101, 134, 90, 230],
  visits: [220, 182, 191, 234, 290, 330],
  visitors: [150, 232, 201, 154, 190, 330],
  ip_count: [320, 332, 301, 334, 390, 330],
  bounce_rate: [7.5, 8.2, 7.8, 6.9, 7.1, 7.4],
};

// Zustand 状态管理 store
interface ChartStore {
  selectedMetrics: MetricKey[];
  chartData: TimeSeriesData;
  setSelectedMetrics: (metrics: MetricKey[]) => void;
  setChartData: (data: TimeSeriesData) => void;
}

const useChartStore = create<ChartStore>((set) => ({
  selectedMetrics: [metrics[0].key],
  chartData: simulatedData,
  setSelectedMetrics: (selectedMetrics) => set({ selectedMetrics }),
  setChartData: (chartData) => set({ chartData }),
}));

// 根据选中指标和数据生成 ECharts 配置
const generateChartOption = (
  selectedMetrics: MetricKey[],
  data: TimeSeriesData,
) => {
  // 根据是否包含 bounce_rate 动态设置 yAxis 配置
  const yAxis = selectedMetrics.includes("bounce_rate")
    ? [
        {
          type: "value",
          axisLabel: {
            formatter: (value: number) => value.toLocaleString(),
          },
        },
        {
          type: "value",
          axisLabel: {
            formatter: (value: number) => `${value}%`,
          },
        },
      ]
    : [
        {
          type: "value",
          axisLabel: {
            formatter: (value: number) => value.toLocaleString(),
          },
        },
      ];

  return {
    title: { text: "网站数据趋势" },
    tooltip: { trigger: "axis" },
    legend: {
      data: selectedMetrics.map((key) => metricMap[key]),
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    toolbox: { feature: { saveAsImage: {} } },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.time,
    },
    yAxis,
    series: selectedMetrics.map((key) => ({
      name: metricMap[key],
      type: "line",
      data: data[key],
      showSymbol: false,
      emphasis: { focus: "series" },
      // bounce_rate 使用第二个 yAxis
      yAxisIndex: key === "bounce_rate" ? 1 : 0,
    })),
  };
};

export default function DataLineview() {
  // 从 Zustand store 获取状态与更新函数
  const { selectedMetrics, chartData, setSelectedMetrics, setChartData } =
    useChartStore();

  // 缓存图表配置，只有选中指标或数据变化时重新生成
  const chartOption = useMemo(
    () => generateChartOption(selectedMetrics, chartData),
    [selectedMetrics, chartData],
  );

  // 模拟数据加载（实际可替换为 API 请求）
  useEffect(() => {
    const loadData = async () => {
      try {
        // 示例：const data = await fetchChartData();
        // setChartData(data);
      } catch (error) {
        console.error("获取数据失败，使用模拟数据", error);
      }
    };

    loadData();
  }, [setChartData]);

  // 多选指标变更处理Set<React.Key>
  const handleSelectionChange = useCallback(
    (keys: SharedSelection) => {
      const newSelection = Array.from(keys) as MetricKey[];

      setSelectedMetrics(
        newSelection.length > 0 ? newSelection : [metrics[0].key],
      );
    },
    [setSelectedMetrics],
  );

  return (
    <CustomContainer className="col-span-6 h-96">
      <h1>趋势分析</h1>
      <div className="p-4 h-full">
        <div className="mb-4 max-w-sm h-[10%]">
          <Select
            label="查询指标"
            labelPlacement="outside"
            placeholder="请选择指标"
            selectedKeys={new Set(selectedMetrics)}
            selectionMode="multiple"
            onSelectionChange={handleSelectionChange}
            size="sm"
          >
            {metrics.map((metric) => (
              <SelectItem key={metric.key}>{metric.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="h-full">
        <ReactECharts
          notMerge={true}
          option={chartOption}
          opts={{ renderer: "svg" }}
          style={{ height: "75%" }}
        />
        </div>
      </div>
    </CustomContainer>
  );
}
