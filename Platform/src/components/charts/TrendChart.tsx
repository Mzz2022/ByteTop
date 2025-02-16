import ReactECharts from "echarts-for-react";
import { CrashAnalysisData } from "./CrashAnalysis";

interface TrendChartProps {
  data: CrashAnalysisData;
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => (
  <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
    <ReactECharts
      option={{
        title: { text: "每小时崩溃趋势" },
        tooltip: {
          trigger: "axis",
          formatter: (params: any) => {
            const hourData = data.crash_analysis[params[0].name];
            return `
              <div class="font-sans">
                <div class="font-medium">${params[0].name}</div>
                <div>崩溃次数: ${hourData.crash_count}</div>
                <div>影响用户数: ${hourData.affected_users ?? "--"}</div>
                <div>崩溃率: ${hourData.crash_rate ? (hourData.crash_rate * 100).toFixed(2) : "--"}%</div>
              </div>
            `;
          },
        },
        xAxis: {
          type: "category",
          data: Object.keys(data.crash_analysis),
        },
        yAxis: { type: "value" },
        series: [
          {
            data: Object.values(data.crash_analysis).map((v) => v.crash_count),
            type: "line",
            smooth: true,
          },
        ],
      }}
      style={{ height: 400 }}
    />
  </div>
);

export default TrendChart;
