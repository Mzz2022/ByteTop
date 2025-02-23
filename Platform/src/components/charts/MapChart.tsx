import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import chinaGeoMap from "../../data/chinaGeoMap.json";
import CustomContainer from "../variants/CustomContainer";

// 定义数据类型
interface VisitData {
  country: string;
  province: string;
  pv: number;
  visitCount: number;
  uv: number;
  pvRate?: number;
  visitCountRate?: number;
  uvRate?: number;
  trafficComparison?: number;
  visitGrowth?: number;
  visitorCount?: number;
  averagePageViews?: number;
  averageVisitDuration?: number;
}

interface ChinaMapChartProps {
  projectName: string;
  startTime: string;
  endTime: string;
  timeType: string;
}

// 注册中国地图
echarts.registerMap("china", {
  type: "FeatureCollection",
  features: chinaGeoMap.features as any[],
});

const ChinaMapChart: React.FC<ChinaMapChartProps> = ({
  projectName,
  startTime,
  endTime,
  timeType,
}) => {
  const [data, setData] = useState<VisitData[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/visit-data?projectName=${projectName}&startTime=${startTime}&endTime=${endTime}&timeType=${timeType}`
        );
        const result: VisitData[] = await response.json();
        setData(result);
      } catch (error) {
        console.error("获取数据失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectName, startTime, endTime, timeType]);

  // 转换数据格式为 ECharts 需要的格式
  const convertData = useMemo(() => {
    return data.map((item) => ({
      name: item.province,
      value: item.pv,
    }));
  }, [data]);

  const option = useMemo(
    () => ({
      title: {
        text: "中国各省访问数据统计",
        subtext: "数据来源：后端 API",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const item = data.find((d) => d.province === params.name);
          if (!item) return `${params.name}<br/>暂无数据`;

          return `
            <strong>${params.name}</strong><br/>
            页面浏览量: ${item.pv}<br/>
            访问次数: ${item.visitCount}<br/>
            独立访客: ${item.uv}<br/>
            平均停留时长: ${item.averageVisitDuration}s
          `;
        },
      },
      visualMap: {
        min: 0,
        max: 2500,
        left: "right",
        top: "center",
        text: ["高", "低"],
        calculable: true,
        inRange: {
          color: ["#e0f3f8", "#4575b4", "#313695"],
        },
      },
      series: [
        {
          name: "访问数据",
          type: "map",
          map: "china",
          roam: true,
          emphasis: {
            label: {
              show: true,
            },
          },
          data: convertData,
        },
      ],
    }),
    [data, convertData]
  );

  return (
    <div className="w-full h-[600px]">
      {loading ? (
        <p className="text-center text-gray-500">加载中...</p>
      ) : (
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </div>
  );
};

interface MapChartProps {
  className?: string;
}

// 包装组件，允许传入查询参数
const MapChart: React.FC<MapChartProps> = ({ className }) => {
  return (
    <CustomContainer className={`${className}`}>
      <div className="h-96 w-full">
        <ChinaMapChart
          projectName="hqq"
          startTime="2025-02-04"
          endTime="2025-02-04"
          timeType="day"
        />
      </div>
    </CustomContainer>
  );
};

export default MapChart;
