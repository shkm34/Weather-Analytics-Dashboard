import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

function TemperatureChart({ data, tempUnit }) {
    // custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">
                        {payload[0].payload.date}
                    </p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            className="text-sm"
                            style={{ color: entry.color }}
                        >
                            {entry.name}: {entry.value}°{tempUnit}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Temperature Trends
            </h3>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="date"
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                        label={{
                            value: `Temperature (°${tempUnit})`,
                            angle: -90,
                            position: 'insideLeft',
                            style: { fontSize: '14px', fill: '#6b7280' }
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: '14px' }}
                        iconType="line"
                    />
                    {/* Low temperature line */}
                    <Line
                        type="monotone"
                        dataKey="high"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="High"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />

                    {/* Low temperature line */}
                    <Line
                        type="monotone"
                        dataKey="low"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Low"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />

                    {/* Average temperature line */}
                    <Line
                        type="monotone"
                        dataKey="avg"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Average"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        strokeDasharray="5 5"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TemperatureChart
