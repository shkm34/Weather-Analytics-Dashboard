import { useEffect, useState, useCallback } from "react";
import WeatherCard from "../components/weather/WeatherCard.jsx";
import SearchBar from "../components/search/SearchBar.jsx";
import WeatherCardSkeleton from "../components/weather/WeatherCardSkeleton.jsx";
import { useSelector } from "react-redux";
import { getCachedCurrentWeather } from "../services/cachedWeatherApi";

function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const favorites = useSelector((state) => state.favorites.cities);

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const citiesToFetch =
        favorites.length > 0
          ? favorites.map((city) => `${city.lat},${city.lon}`)
          : [
              "New Delhi",
              "Bangalore",
              "Hyderabad",
              "London",
              "Tokyo",
              "New York",
            ];

      // fetch weather for default cities
      const promises = citiesToFetch.map((coords) =>
        getCachedCurrentWeather(coords)
      );

      const results = await Promise.all(promises);
      setWeatherData(results);
      setLastUpdated(new Date());
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch weather:", error);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  // useEffect for auto-refresh 60 seconds
  useEffect(() => {
    fetchWeatherData();

    const refreshInterval = setInterval(() => {
      console.log("🔄 Auto-refreshing weather data...");
      fetchWeatherData();
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, [fetchWeatherData]);

  const handleCitySelect = async (city) => {
    try {
      // Check if city is already in weatherData
      // to avoid duplicate cards

      const isDuplicate = (objA, objB) => {
        // Helper function to clean the strings
        const normalize = (str) => str.toLowerCase().trim();

        return (
          normalize(objA.name) === normalize(objB.name) &&
          normalize(objA.region) === normalize(objB.region) &&
          normalize(objA.country) === normalize(objB.country)
        );
      };

      const isCityInWeatherData = weatherData.some((data) =>
        isDuplicate(data.location, city)
      );

      if (isCityInWeatherData) {
        return;
      }
      // Fetch weather for this city
      const weather = await getCachedCurrentWeather(`${city.lat},${city.lon}`);
      setWeatherData((prev) => [weather, ...prev]);
    } catch (err) {
      console.error("Failed to add city:", err);
    }
  };

  // Manual refresh button
  const handleRefresh = () => {
    fetchWeatherData();
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Cities
        </h2>

        {/* Controls & Status Group */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Last Updated Status */}
          {lastUpdated && (
            <div className="text-left">
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
              <p className="text-xs text-gray-500">
                (Auto-refreshes every 60s)
              </p>
            </div>
          )}

          {/* Refresh Button*/}
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2 font-medium whitespace-nowrap"
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onCitySelect={handleCitySelect} />
      </div>

      {/* Weather cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loading skeletons */}
        {loading && [1, 2, 3].map((i) => <WeatherCardSkeleton key={i} />)}

        {/* Error state */}
        {error && (
          <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-semibold mb-2">
              ⚠️ Failed to load weather data
            </p>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Weather cards */}
        {!loading &&
          !error &&
          weatherData.length > 0 &&
          weatherData.map((data) => (
            <WeatherCard key={data.location.name} weatherData={data} />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
