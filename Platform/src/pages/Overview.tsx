import DataOverview from "@/components/DataOverview";
import DataLineview from "@/components/DataLineview";
import CustomContainer from "@/components/variants/CustomContainer";
import Gaugeview from "@/components/Gaugeview";

function Overview() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 h-full mb-4">

        <CustomContainer className="col-span-4 h-[500px]">
          <h1>数据总览</h1>
          <DataOverview />
        </CustomContainer>

        <CustomContainer className="col-span-2 h-[500px]">
          <h1>趋势分析</h1>
          <DataLineview />
        </CustomContainer>

        <CustomContainer className="col-span-1 h-[500px]">
          <h1>UV</h1>
          <Gaugeview />
        </CustomContainer>

        <CustomContainer className="col-span-1 h-[500px]">
          <h1>PV</h1>
          <Gaugeview />
        </CustomContainer>
      </div>
    </>
  );
}

export default Overview;
