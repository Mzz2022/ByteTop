import ReactECharts from "echarts-for-react";
import { Select, SelectItem } from "@heroui/react";
import { PerformanceData, MetricOption } from "@/types/performance";

interface PerformanceChartProps {
  performanceData: PerformanceData;
  selectedMetrics: string[];
  metricOptions: MetricOption[];
  onMetricChange: (keys: Set<string>) => void;
}

export const PerformanceChart = ({
  performanceData,
  selectedMetrics,
  metricOptions,
  onMetricChange,
}: PerformanceChartProps) => {
  const generateSeries = () =>
    selectedMetrics.map((metricId) => {
      const metric = metricOptions.find((m) => m.id === metricId);
      return {
        name: metric?.name || metricId,
        type: "line",
        smooth: true,
        data: Object.values(performanceData).map((d) => {
          const value = d[metricId as keyof typeof d] ?? 0;
          return metricId === "ttfb" ? Number(value) / 1000 : value;
        }),
        areaStyle: { opacity: 0.1 },
        itemStyle: { color: metric?.color },
      };
    });

  const chartData = {
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
    series: generateSeries(),
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">性能趋势</h3>
        <div className="w-72">
          <Select
            label="查询指标"
            labelPlacement="outside"
            placeholder="请选择指标"
            selectedKeys={new Set(selectedMetrics)}
            selectionMode="multiple"
            size="sm"
            onSelectionChange={(keys) =>
              onMetricChange(new Set(keys) as Set<string>)
            }
          >
            {metricOptions.map((metric) => (
              <SelectItem key={metric.id}>{metric.name}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <ReactECharts
        key={selectedMetrics.join(",")}
        option={chartData}
        style={{ height: "400px" }}
      />
    </div>
  );
};
