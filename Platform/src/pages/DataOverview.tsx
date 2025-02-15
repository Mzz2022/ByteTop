import DataLine from "@/components/charts/DataLine";
import Gauge from "@/components/charts/Gauge";
import DataTable from "@/components/tables/DataTable";

function DataOverview() {
  return (
    <>
      <DataTable className="col-span-12 h-96" />
      <DataLine className="col-span-6 h-96" />
      <Gauge className="col-span-3 h-96" />
      <Gauge className="col-span-3 h-96" />
    </>
  );
}

export default DataOverview;
