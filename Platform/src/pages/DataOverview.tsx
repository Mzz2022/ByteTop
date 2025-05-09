import DataLine from "@/components/charts/DataLine";
import Gauge from "@/components/charts/Gauge";
import MapChart from "@/components/charts/MapChart";
import DataTable from "@/components/tables/DataTable";

function DataOverview() {
  return (
    <>
      <main className="w-full px-2 py-8 grid gap-8 grid-cols-12 mb-4 sm:px-0">
        <DataTable className="col-span-12" />
        <DataLine className="col-span-12 lg:col-span-6" />
        <Gauge className="col-span-6 lg:col-span-3" />
        <Gauge className="col-span-6 lg:col-span-3" />
        <MapChart className="col-span-12 lg:col-span-6" />
      </main>
    </>
  );
}

export default DataOverview;
