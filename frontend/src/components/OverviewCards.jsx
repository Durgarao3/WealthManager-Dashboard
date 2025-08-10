import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

export default function OverviewCards() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummary().then(res => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-gray-600">Total Value</h2>
        <p className="text-2xl font-bold">₹{summary.totalValue.toLocaleString()}</p>
      </div>
      <div className={`p-4 rounded shadow ${summary.totalGainLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
        <h2 className="text-gray-600">Total Gain/Loss</h2>
        <p className="text-2xl font-bold">
          ₹{summary.totalGainLoss.toLocaleString()} ({summary.totalGainLossPercent}%)
        </p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-gray-600">Top Performer</h2>
        <p className="font-bold">{summary.topPerformer.name}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-gray-600">Worst Performer</h2>
        <p className="font-bold">{summary.worstPerformer.name}</p>
      </div>
    </div>
  );
}
