import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AllocationChart() {
  const COLORS = [
    "#FF6384", "#36A2EB", "#FFCE56", "#FF8042",
    "#9966FF", "#4BC0C0", "#F7464A", "#46BFBD"
  ];

  const sectorData = [
    { name: "Automotive", value: 10 },
    { name: "Banking", value: 15 },
    { name: "Consumer Goods", value: 20 },
    { name: "Energy", value: 5 },
    { name: "Healthcare", value: 8 },
    { name: "Technology", value: 19 },
    { name: "Telecommunications", value: 7 }
  ];

  const renderLabel = ({ name, percent }) =>
    percent > 0.05 ? `${name} ${(percent * 100).toFixed(1)}%` : "";

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-4">Sector Allocation</h2>
      <div style={{ width: 360, height: 360 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={sectorData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={renderLabel}
              labelLine={false}
            >
              {sectorData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "10px",
                paddingTop: "8px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
