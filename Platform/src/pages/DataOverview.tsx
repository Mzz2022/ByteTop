import DataLine from "@/components/DataLine";
import DataTable from "@/components/DataTable";
import Gauge from "@/components/Gauge";

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
