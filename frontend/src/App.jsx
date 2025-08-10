import OverviewCards from "./components/OverviewCards";
import AllocationChart from "./components/AllocationChart";
import HoldingsTable from "./components/HoldingsTable";
import PerformanceChart from "./components/PerformanceChart";
import TopPerformers from "./components/TopPerformers";

export default function App() {
  return (
    <div className="animated-bg min-h-screen p-4 md:p-6 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Portfolio Analytics Dashboard</h1>

        {/* Overview cards */}
        <OverviewCards />

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <AllocationChart />
            <PerformanceChart />
          </div>
          <TopPerformers />
        </div>

        {/* Holdings table */}
        <HoldingsTable />
      </div>
    </div>
  );
}
