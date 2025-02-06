// 流量概览表格
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";

const data = {
  code: 200,
  message: "success",
  data: {
    current: {
      page_views: 19413,
      visits: 1305,
      visitors: 1030,
      ip_count: 970,
      average_page_views: 15,
      average_duration: "00:05:56",
      bounce_rate: "7.59%",
    },
    previous: {
      page_views: 41925,
      visits: 2901,
      visitors: 2481,
      ip_count: 2328,
      average_page_views: 15,
      average_duration: "00:05:10",
      bounce_rate: "10.38%",
    },
    comparison: {
      page_views_change: "-53.70%",
      visits_change: "-55.02%",
      visitors_change: "-58.48%",
      ip_count_change: "-58.33%",
      average_page_views_change: "2.93%",
      average_duration_change: "14.89%",
      bounce_rate_change: "-26.88%",
    },
    year_comparison: {
      page_views_change: "--",
      visits_change: "--",
      visitors_change: "--",
      ip_count_change: "--",
      average_page_views_change: "--",
      average_duration_change: "--",
      bounce_rate_change: "--",
    },
  },
};

export default function DataOverview() {
  const rows = [
    {
      key: "3",
      rowName: "本周",
      pageViews: 19413,
      visits: 1305,
      visitors: 1030,
      ipCount: 970,
      avgPageViews: 15,
      avgDuration: "00:05:56",
    },
    {
      key: "4",
      rowName: "上周",
      pageViews: 41925,
      visits: 2901,
      visitors: 2481,
      ipCount: 2328,
      avgPageViews: 15,
      avgDuration: "00:05:10",
    },
    {
      key: "5",
      rowName: "环比",
      pageViews: "-53.70%",
      visits: "-55.02%",
      visitors: "-58.48%",
      ipCount: "-58.33%",
      avgPageViews: "2.93%",
      avgDuration: "14.89%",
    },
    {
      key: "6",
      rowName: "同比",
      pageViews: "--",
      visits: "--",
      visitors: "--",
      ipCount: "--",
      avgPageViews: "--",
      avgDuration: "--",
    },
  ];

  const columns = [
    {
      key: "rowName",
      label: "--",
    },
    {
      key: "pageViews",
      label: "浏览量",
    },
    {
      key: "visits",
      label: "访问次数",
    },
    {
      key: "visitors",
      label: "访问数",
    },
    {
      key: "ipCount",
      label: "IP 数",
    },
    {
      key: "avgPageViews",
      label: "平均访问数",
    },
    {
      key: "avgDuration",
      label: "平均访问时长",
    },
  ];

  return (
    <>
      <Table
        aria-label="data overview table"
        layout="fixed"
        radius="sm"
        shadow="sm"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        {/* <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> */}
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
