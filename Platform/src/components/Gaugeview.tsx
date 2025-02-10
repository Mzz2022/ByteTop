import ReactECharts from "echarts-for-react";

import CustomContainer from "./variants/CustomContainer";

function Gaugeview() {
  const option = {
    series: [
      {
        title: {
          name: "UV",
          show: true,
        },
        type: "gauge",
        progress: {
          show: true,
          width: 10,
          itemStyle: {
            width: 18,
          },
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, "#67e0e3"]],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 4,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 16,
          color: "#999",
          fontSize: 8,
        },
        anchor: {
          show: false,
          showAbove: false,
          size: 15,
          itemStyle: {
            borderWidth: 5,
          },
        },
        detail: {
          valueAnimation: true,
          fontSize: 24,
          offsetCenter: [0, "60%"],
          formatter: "{value}",
        },
        data: [
          {
            value: 80,
          },
        ],
      },
    ],
  };

  return (
    <>
      <CustomContainer className="col-span-2 h-96">
        <h1>UV</h1>
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />
      </CustomContainer>
    </>
  );
}

export default Gaugeview;
