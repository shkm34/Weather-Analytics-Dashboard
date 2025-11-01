import React, { useEffect, useState } from 'react'
import WeatherCard from '../components/weather/WeatherCard.jsx'
import WeatherCardSkeleton from '../components/weather/WeatherCardSkeleton.jsx'
import { getCurrentWeather } from '../services/weatherApi.js'
function Dashboard() {

  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const defaultCities = ['New Delhi', 'Kolkata', 'Mumbai']

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        setError(null)

        // fetch weather for default cities
        const promises = defaultCities.map(city =>
          getCurrentWeather(city)
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
  }, [])

  return (
    <div>
  <h2 className="text-3xl font-bold text-gray-800 mb-6">
    My Cities
  </h2>

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
        tempUnit="C"
        onClick={() => alert(`Clicked ${data.location.name}`)}
      />
    ))}
  </div>
</div>

  )
}

export default Dashboard
