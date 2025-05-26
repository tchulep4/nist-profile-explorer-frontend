
import DemoHeader from "@/components/demo/DemoHeader";
import DemoBanner from "@/components/demo/DemoBanner";
import DemoMetricsCards from "@/components/demo/DemoMetricsCards";
import DemoMaturityChart from "@/components/demo/DemoMaturityChart";
import DemoRecentGaps from "@/components/demo/DemoRecentGaps";

const DemoOverview = () => {
  return (
    <div className="space-y-6">
      <DemoHeader />
      <DemoBanner />
      <DemoMetricsCards />
      
      <div className="grid gap-6 md:grid-cols-2">
        <DemoMaturityChart />
        <DemoRecentGaps />
      </div>
    </div>
  );
};

export default DemoOverview;
