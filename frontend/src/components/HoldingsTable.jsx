import { useEffect, useState } from "react";
import { getHoldings } from "../services/api";

export default function HoldingsTable() {
  const [holdings, setHoldings] = useState([]);
  const [sortKey, setSortKey] = useState("symbol");
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getHoldings().then(res => setHoldings(res.data));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filtered = holdings
    .filter(h => h.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });

  return (
    <div className="bg-white p-4 rounded shadow mt-6 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Holdings</h3>
      <input
        type="text"
        placeholder="Search by symbol..."
        className="border p-2 mb-3 w-full sm:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            {["symbol", "name", "quantity", "avgPrice", "currentPrice", "value", "gainLoss", "gainLossPercent"].map(key => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="p-2 cursor-pointer text-left border-b"
              >
                {key} {sortKey === key ? (sortAsc ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((h, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{h.symbol}</td>
              <td className="p-2">{h.name}</td>
              <td className="p-2">{h.quantity}</td>
              <td className="p-2">₹{h.avgPrice}</td>
              <td className="p-2">₹{h.currentPrice}</td>
              <td className="p-2">₹{h.value}</td>
              <td
                className={`p-2 ${h.gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                ₹{h.gainLoss}
              </td>
              <td
                className={`p-2 ${h.gainLossPercent >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {h.gainLossPercent}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
