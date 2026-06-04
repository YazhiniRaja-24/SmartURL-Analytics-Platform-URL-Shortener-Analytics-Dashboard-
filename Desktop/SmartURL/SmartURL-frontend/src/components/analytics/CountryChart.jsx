import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  function CountryChart({ data }) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Country Distribution
        </h3>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
  
              <Bar
                dataKey="value"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default CountryChart;