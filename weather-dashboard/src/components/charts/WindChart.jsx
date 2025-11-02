import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

function WindChart({ data }) {
     const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">
            {payload[0].payload.time}
          </p>
          {payload.map((entry, index) => (
            <p 
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value} km/h
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
        Wind Speed Forecast
      </h3>

       <ResponsiveContainer width="100%" height={300}>
         <AreaChart data={data}>
         <defs>
            <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorGust" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

           <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />

          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ 
              value: 'Wind Speed (km/h)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: '14px', fill: '#6b7280' }
            }}
          />

           <Tooltip content={<CustomTooltip />} />
           <Legend wrapperStyle={{ fontSize: '14px' }} />

           {/* Wind speed area */}
          <Area 
            type="monotone" 
            dataKey="windSpeed" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorWind)"
            name="Wind Speed"
          />

          {/* Gust speed area */}
          <Area 
            type="monotone" 
            dataKey="gustSpeed" 
            stroke="#ec4899" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorGust)"
            name="Gust Speed"
          />
         </AreaChart>
       </ResponsiveContainer>
    </div>
  )
}

export default WindChart
