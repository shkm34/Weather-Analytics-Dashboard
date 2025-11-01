import React from 'react'
import WeatherCard from '../components/weather/WeatherCard.jsx'
import WeatherCardSkeleton from '../components/weather/WeatherCardSkeleton.jsx'
function Dashboard() {

  const isLoading = false; 

  const mockWeatherData = [
    {
      location: {
        name: "London",
        country: "United Kingdom"
      },
      current: {
        temp_c: 12.0,
        temp_f: 53.6,
        feelslike_c: 10.5,
        feelslike_f: 50.9,
        humidity: 82,
        wind_kph: 13.0,
        cloud: 75,
        condition: {
          text: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
        }
      }
    },
    {
      location: {
        name: "New York",
        country: "United States"
      },
      current: {
        temp_c: 18.0,
        temp_f: 64.4,
        feelslike_c: 16.0,
        feelslike_f: 60.8,
        humidity: 65,
        wind_kph: 20.0,
        cloud: 50,
        condition: {
          text: "Clear",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
        }
      }
    },
    {
      location: {
        name: "Tokyo",
        country: "Japan"
      },
      current: {
        temp_c: 22.0,
        temp_f: 71.6,
        feelslike_c: 21.0,
        feelslike_f: 69.8,
        humidity: 70,
        wind_kph: 15.0,
        cloud: 25,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
        }
      }
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Cities
      </h2>
      
      {/* Weather cards will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
  <>
    <WeatherCardSkeleton />
    <WeatherCardSkeleton />
    <WeatherCardSkeleton />
  </>
) : (
 
        mockWeatherData.map((data) => (
          <WeatherCard 
            key={data.location.name}
            weatherData={data}
            tempUnit="C"
            onClick={() => alert(`Clicked ${data.location.name}`)}
          />
        ))
)}
        
      </div>
    </div>
  )
}

export default Dashboard
