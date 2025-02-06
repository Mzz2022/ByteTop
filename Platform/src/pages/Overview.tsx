import ReactECharts from "echarts-for-react";

import DataOverview from "@/components/DataOverview";

function Overview() {
  const demoOptions = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-full">
        <h1>Overview</h1>
        <DataOverview />
        <ReactECharts option={demoOptions} />
      </div>
    </>
  );
}

export default Overview;
