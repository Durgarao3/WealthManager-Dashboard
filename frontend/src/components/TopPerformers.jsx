import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

export default function TopPerformers() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummary().then(res => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading top performers...</p>;

  return (
    <div className="bg-white p-4 rounded shadow mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Top Performer */}
      <div className="p-4 border rounded bg-green-50">
        <h3 className="text-lg font-semibold text-green-700">Top Performer</h3>
        <p className="text-xl font-bold mt-2">{summary.topPerformer.symbol}</p>
        <p className="text-gray-600">{summary.topPerformer.name}</p>
        <p className="mt-2 text-green-700 font-semibold">
          {summary.topPerformer.gainPercent}% Gain
        </p>
      </div>

      {/* Worst Performer */}
      <div className="p-4 border rounded bg-red-50">
        <h3 className="text-lg font-semibold text-red-700">Worst Performer</h3>
        <p className="text-xl font-bold mt-2">{summary.worstPerformer.symbol}</p>
        <p className="text-gray-600">{summary.worstPerformer.name}</p>
        <p className="mt-2 text-red-700 font-semibold">
          {summary.worstPerformer.gainPercent}% Loss
        </p>
      </div>

      {/* Diversification & Risk */}
      <div className="p-4 border rounded bg-blue-50">
        <h3 className="text-lg font-semibold text-blue-700">Portfolio Insights</h3>
        <p className="mt-2">
          <strong>Diversification Score:</strong> {summary.diversificationScore}/10
        </p>
        <p>
          <strong>Risk Level:</strong> {summary.riskLevel}
        </p>
      </div>
    </div>
  );
}
