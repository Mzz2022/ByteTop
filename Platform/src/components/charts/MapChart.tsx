import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import chinaGeoMap from "@/data/chinaGeoMap.json";
import CustomContainer from "../variants/CustomContainer";

interface AreaData {
  country: string;
  province: string;
  pv: number;
  visitCount: number;
  uv: number;
  pvRate: number;
  visitCountRate: number;
  uvRate: number;
  trafficComparison: number;
  visitGrowth: number;
  visitorCount: number;
  averagePageViews: number;
  averageVisitDuration: number;
}

interface MapChartProps {
  className?: string;
  data?: AreaData[];
}

// 注册中国地图
echarts.registerMap("china", {
  type: "FeatureCollection",
  features: chinaGeoMap.features as any[],
});

// 模拟数据
const mockAreaData: AreaData[] = [
  {
    country: "China",
    province: "广东省",
    pv: 2173,
    visitCount: 121,
    uv: 86,
    pvRate: 0.21,
    visitCountRate: 0.25,
    uvRate: 0.2,
    trafficComparison: 0.15,
    visitGrowth: 10,
    visitorCount: 50,
    averagePageViews: 3.5,
    averageVisitDuration: 120,
  },
  {
    country: "China",
    province: "北京市",
    pv: 990,
    visitCount: 67,
    uv: 52,
    pvRate: 0.0957,
    visitCountRate: 0.15,
    uvRate: 0.12,
    trafficComparison: 0.1,
    visitGrowth: 5,
    visitorCount: 30,
    averagePageViews: 2.5,
    averageVisitDuration: 90,
  },
  {
    country: "China",
    province: "上海市",
    pv: 1500,
    visitCount: 89,
    uv: 70,
    pvRate: 0.15,
    visitCountRate: 0.18,
    uvRate: 0.16,
    trafficComparison: 0.12,
    visitGrowth: 8,
    visitorCount: 40,
    averagePageViews: 3.0,
    averageVisitDuration: 100,
  },
];

const MapChart: React.FC<MapChartProps> = ({
  className,
  data = mockAreaData,
}) => {
  const [areaData] = useState<AreaData[]>(data);

  // 初始化省份列表
  const provinceList = [
    { name: "上海市", value: 0 },
    { name: "广东省", value: 0 },
    { name: "北京市", value: 0 },
    { name: "天津市", value: 0 },
    { name: "重庆市", value: 0 },
    { name: "河北省", value: 0 },
    { name: "河南省", value: 0 },
    { name: "云南省", value: 0 },
    { name: "辽宁省", value: 0 },
    { name: "黑龙江省", value: 0 },
    { name: "湖南省", value: 0 },
    { name: "安徽省", value: 0 },
    { name: "山东省", value: 0 },
    { name: "新疆维吾尔自治区", value: 0 },
    { name: "江苏省", value: 0 },
    { name: "浙江省", value: 0 },
    { name: "江西省", value: 0 },
    { name: "湖北省", value: 0 },
    { name: "广西壮族自治区", value: 0 },
    { name: "甘肃省", value: 0 },
    { name: "山西省", value: 0 },
    { name: "内蒙古自治区", value: 0 },
    { name: "陕西省", value: 0 },
    { name: "吉林省", value: 0 },
    { name: "福建省", value: 0 },
    { name: "贵州省", value: 0 },
    { name: "青海省", value: 0 },
    { name: "西藏自治区", value: 0 },
    { name: "四川省", value: 0 },
    { name: "宁夏回族自治区", value: 0 },
    { name: "海南省", value: 0 },
    { name: "台湾省", value: 0 },
    { name: "香港特别行政区", value: 0 },
    { name: "澳门特别行政区", value: 0 },
  ];

  // 处理数据
  const processData = React.useMemo(() => {
    const newProvinceList = [...provinceList];
    newProvinceList.forEach((province) => {
      const matchedData = areaData.find(
        (item) => item.province === province.name
      );
      if (matchedData) {
        province.value = matchedData.visitCount;
        (province as any).visitCountRate =
          (matchedData.visitCountRate * 100).toFixed(2) + "%";
        (province as any).uv = matchedData.uv;
        (province as any).uvRate = (matchedData.uvRate * 100).toFixed(2) + "%";
      }
    });
    return newProvinceList;
  }, [areaData]);

  const option = React.useMemo(
    () => ({
      geo: {
        map: "china",
        aspectScale: 0.75,
        zoom: 1.1,
      },
      tooltip: {
        formatter: (params: any) => {
          const visitCountRate = params.data?.visitCountRate || "0%";
          const uv = params.data?.uv || 0;
          const uvRate = params.data?.uvRate || "0%";

          return `
            <div class="p-2.5">
              <div class="text-sm font-medium">${params.name}</div>
              <div class="mt-2.5 text-left space-y-1">
                <div>访问次数：${params.value || 0}(占比：${visitCountRate})</div>
                <div>访客数：${uv}(占比：${uvRate})</div>
              </div>
            </div>
          `;
        },
      },
      visualMap: {
        min: 0,
        max: Math.max(...areaData.map((item) => item.visitCount), 200),
        left: "10%",
        top: "bottom",
        text: ["高", "低"],
        calculable: true,
        color: ["#3b82f6", "#ffffff"],
      },
      series: [
        {
          zoom: 1.1,
          map: "china",
          type: "map",
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: true,
            },
          },
          data: processData,
        },
      ],
    }),
    [areaData, processData]
  );

  return (
    <CustomContainer className={className}>
      <div className="h-[32rem] w-full">
        <h1>地域分析</h1>
        <ReactECharts
          option={option}
          style={{ height: "90%", width: "100%" }}
        />
      </div>
    </CustomContainer>
  );
};

export default MapChart;
