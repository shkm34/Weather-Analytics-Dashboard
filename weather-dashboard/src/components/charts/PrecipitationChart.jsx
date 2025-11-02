import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PrecipitationChart({ data }) {
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      setChartHeight(window.innerWidth < 640 ? 250 : 300);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">
            {payload[0].payload.time}
          </p>
          <p className="text-sm text-blue-600">
            Precipitation: {payload[0].value} mm
          </p>
          {payload[1] && (
            <p className="text-sm text-green-600">
              Chance of Rain: {payload[1].value}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Precipitation Forecast
      </h3>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            label={{
              value: `Precipitation (mm)`,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: "14px", fill: "#6b7280" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "14px" }} />

          {/* Precipitation bars */}
          <Bar
            dataKey="precipitation"
            fill="#3b82f6"
            name="Precipitation (mm)"
            radius={[8, 8, 0, 0]}
          />

          {/* Chance of rain bars */}
          <Bar
            dataKey="chanceOfRain"
            fill="#10b981"
            name="Chance of Rain (%)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PrecipitationChart;
