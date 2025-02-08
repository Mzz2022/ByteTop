import ReactECharts from "echarts-for-react";

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
          width: 18,
          itemStyle: {
            width: 18,
          },
        },
        axisLine: {
          lineStyle: {
            width: 18,
            color: [[1, "#67e0e3"]],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 4,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 25,
          color: "#999",
          fontSize: 25,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 50,
          offsetCenter: [0, "60%"],
          formatter: "{value}",
        },
        data: [
          {
            value: 10,
          },
        ],
      },
    ],
  };

  return (
    <>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </>
  );
}

export default Gaugeview;
