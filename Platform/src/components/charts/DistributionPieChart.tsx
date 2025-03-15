import ReactECharts from "echarts-for-react";

interface DistributionPieChartProps {
  title: string;
  data: [string, number][];
}

const DistributionPieChart: React.FC<DistributionPieChartProps> = ({
  title,
  data,
}) => (
  <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
    <ReactECharts
      option={{
        title: { text: title },
        tooltip: { trigger: "item" },
        series: [
          {
            type: "pie",
            radius: "45%",
            data: data.map(([name, value]) => ({ value, name })),
          },
        ],
      }}
      style={{ height: "300px" }}
    />
  </div>
);

export default DistributionPieChart;
