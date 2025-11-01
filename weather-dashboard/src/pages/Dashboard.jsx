import React, { useEffect, useState } from 'react'
import WeatherCard from '../components/weather/WeatherCard.jsx'
import SearchBar from '../components/search/SearchBar.jsx'
import WeatherCardSkeleton from '../components/weather/WeatherCardSkeleton.jsx'
import { getCurrentWeather } from '../services/weatherApi.js'
import { useSelector } from 'react-redux'
function Dashboard() {

  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const favorites = useSelector((state) => state.favorites.cities)


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        setError(null)

        const citiesToFetch = favorites.length > 0
          ? favorites.map(city => `${city.lat},${city.lon}`)
          : ['New Delhi', 'Kolkata', 'Mumbai'];

        // fetch weather for default cities
        const promises = citiesToFetch.map(coords =>
          getCurrentWeather(coords)
        )

        const results = await Promise.all(promises)
        setWeatherData(results)

      } catch (error) {
        setError(error.message)
        console.error('Failed to fetch weather:', error);
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [favorites])

  const handleCitySelect = async (city) => {
    try {

      // Check if city is already in weatherData
      // to avoid duplicate cards
      const isCityInWeatherData = weatherData.some(
        (data) => data.location.lat === city.lat && 
        data.location.lon === city.lon
      );

      if (isCityInWeatherData) {
        return;
      }
      // Fetch weather for this city
      const weather = await getCurrentWeather(`${city.lat},${city.lon}`);
      setWeatherData(prev => [weather, ...prev]);
    } catch (err) {
      console.error('Failed to add city:', err);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Cities
      </h2>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onCitySelect={handleCitySelect} />
      </div>

      {/* Weather cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loading skeletons */}
        {loading && [1, 2, 3].map((i) => (
          <WeatherCardSkeleton key={i} />
        ))}

        {/* Error state */}
        {error && (
          <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-semibold mb-2">
              ⚠️ Failed to load weather data
            </p>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}


        {/* Weather cards */}
        {!loading && !error && weatherData.map((data) => (
          <WeatherCard
            key={data.location.name}
            weatherData={data}
            onClick={() => alert(`Clicked ${data.location.name}`)}
          />
        ))}
      </div>
    </div>

  )
}

export default Dashboard
