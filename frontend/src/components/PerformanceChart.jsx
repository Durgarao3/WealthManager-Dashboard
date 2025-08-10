import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PerformanceChart() {
  const data = [
    { month: "Jan", Gold: 3.5, Nifty50: 4.2, Portfolio: 5.1 },
    { month: "Feb", Gold: 4.1, Nifty50: 5.0, Portfolio: 6.0 },
    { month: "Mar", Gold: 5.0, Nifty50: 5.5, Portfolio: 6.3 },
    { month: "Apr", Gold: 6.0, Nifty50: 6.2, Portfolio: 6.7 },
    { month: "May", Gold: 6.3, Nifty50: 6.5, Portfolio: 7.0 }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Performance Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Gold" stroke="#FFBB28" strokeWidth={2} />
          <Line type="monotone" dataKey="Nifty50" stroke="#00C49F" strokeWidth={2} />
          <Line type="monotone" dataKey="Portfolio" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
