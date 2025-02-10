import DataOverview from "@/components/DataOverview";
import DataLineview from "@/components/DataLineview";
import Gaugeview from "@/components/Gaugeview";

function Overview() {
  return (
    <>
      <div className="px-4 grid gap-3 grid-cols-12 mb-4">
        <DataOverview />
        <DataLineview />
        <Gaugeview />
        <Gaugeview />
      </div>
    </>
  );
}

export default Overview;
