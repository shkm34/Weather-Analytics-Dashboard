import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getForecast } from "../services/weatherApi";

function DetailedView() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const tempUnit = useSelector((state) => state.settings.tempUnit);

  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchForecast = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!cityName) throw new Error("No city specified");

      const decodedCity = decodeURIComponent(cityName);
      const data = await getForecast(decodedCity, 7);

      setForecastData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch forecast");
    } finally {
      setIsLoading(false);
    }
  };

  fetchForecast();
}, [cityName]);


  if (isLoading && !forecastData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading forecast data...</p>
        </div>
      </div>
    );
  }

  // Show error if present
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-semibold mb-2">⚠️ Failed to load forecast</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const location = forecastData?.location ?? {};
  const current = forecastData?.current ?? {};
  const forecast = forecastData?.forecast ?? { forecastday: [] };
  const temperature = tempUnit === "C" ? current.temp_c : current.temp_f;

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <span className="text-xl">←</span>
          <span>Back to Dashboard</span>
        </button>

        {/* City Header */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {location.name}, {location.country}
          </h1>
          <p className="text-lg opacity-90">{location.region}</p>

          {/* Current Weather */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-end gap-2">
              <span className="text-7xl font-bold">{Math.round(temperature)}</span>
              <span className="text-4xl mb-2">°{tempUnit}</span>
            </div>
            <img src={`https:${current.condition?.icon ?? ""}`} alt={current.condition?.text ?? ""} className="w-24 h-24" />
          </div>
          <p className="text-2xl mt-4 capitalize">{current.condition?.text}</p>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">Feels Like</p>
            <p className="text-2xl font-bold text-gray-800">
              {Math.round(tempUnit === "C" ? current.feelslike_c ?? 0 : current.feelslike_f ?? 0)}°{tempUnit}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">Humidity</p>
            <p className="text-2xl font-bold text-gray-800">{current.humidity ?? "—"}%</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">Wind Speed</p>
            <p className="text-2xl font-bold text-gray-800">{current.wind_kph ?? "—"} km/h</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">UV Index</p>
            <p className="text-2xl font-bold text-gray-800">{current.uv ?? "—"}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">Pressure</p>
            <p className="text-2xl font-bold text-gray-800">{current.pressure_mb ?? "—"} mb</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">Visibility</p>
            <p className="text-2xl font-bold text-gray-800">{current.vis_km ?? "—"} km</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">Cloud Cover</p>
            <p className="text-2xl font-bold text-gray-800">{current.cloud ?? "—"}%</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 mb-1">Precipitation</p>
            <p className="text-2xl font-bold text-gray-800">{current.precip_mm ?? "—"} mm</p>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
          <div className="space-y-4">
            {forecast.forecastday.map((day) => {
              const maxTemp = tempUnit === "C" ? day.day.maxtemp_c : day.day.maxtemp_f;
              const minTemp = tempUnit === "C" ? day.day.mintemp_c : day.day.mintemp_f;

              const date = new Date(day.date);
              const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
              const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

              return (
                <div key={day.date} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-20">
                      <p className="font-semibold text-gray-800">{dayName}</p>
                      <p className="text-sm text-gray-500">{dateStr}</p>
                    </div>
                    <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="w-12 h-12" />
                    <p className="text-gray-700 flex-1">{day.day.condition.text}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">💧 {day.day.daily_chance_of_rain}%</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-800">{Math.round(maxTemp)}°</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-gray-500">{Math.round(minTemp)}°</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hourly Forecast (Today) */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hourly Forecast (Today)</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {forecast.forecastday[0].hour.map((hour) => {
                const hourTemp = tempUnit === "C" ? hour.temp_c : hour.temp_f;
                const time = new Date(hour.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });

                return (
                  <div key={hour.time} className="flex flex-col items-center min-w-20 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">{time}</p>
                    <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} className="w-10 h-10 mb-2" />
                    <p className="font-bold text-gray-800">{Math.round(hourTemp)}°</p>
                    <p className="text-xs text-gray-500 mt-1">💧 {hour.chance_of_rain}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailedView;
