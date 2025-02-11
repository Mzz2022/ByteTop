import DataOverview from "@/components/DataOverview";
import DataLineview from "@/components/DataLineview";
import Gaugeview from "@/components/Gaugeview";

function Overview() {
  return (
    <>
      <DataOverview className="col-span-12 h-96"/>
      <DataLineview className="col-span-6 h-96"/>
      <Gaugeview className="col-span-3 h-96"/>
      <Gaugeview className="col-span-3 h-96"/>
    </>
  );
}

export default Overview;
