import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const COLORS = [
    "#ec4899",
    "#3b82f6",
    "#22c55e",
  ];
  
  function DeviceChart({ data }) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Device Statistics
        </h3>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default DeviceChart;