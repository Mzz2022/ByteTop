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
      label: "",
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
        removeWrapper
        align="center"
        aria-label="data overview table"
        classNames={{
          base: "h-full text-lg",
          table: "h-full",
          th: "bg-transparent text-md", // Remove background and bold font
          thead: "[&>tr]:first:shadow-none [&>tr]:first:rounded-none", // Remove shadow and rounded corners
          td: "h-4", // Reduce font size
        }}
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
