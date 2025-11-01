import React from "react";

function WeatherCard({ weatherData, tempUnit = "C", onClick }) {
  const { location, current } = weatherData;

  const temperature = tempUnit === "C" ? current.temp_c : current.temp_f;
  const feelsLike =
    tempUnit === "C" ? current.feelslike_c : current.feelslike_f;
  return (
    <div
      onClick={onClick}
      className="
        bg-linear-to-br from-blue-400 to-blue-600
        rounded-xl 
        shadow-lg 
        p-6 
        text-white
        hover:shadow-2xl
        hover:scale-105
        transition-all duration-300
        cursor-pointer
      "
    >
      <div
        className="
      bg-linear-to-br from-blue-400 to-blue-600
      rounded-xl 
      shadow-lg 
      p-6 
      text-white
      hover:shadow-2xl
      hover:scale-105
      transition-all duration-300
      cursor-pointer
    "
      >
        {/* Header: City and Country */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold">{location.name}</h3>
          <p className="text-sm opacity-80">{location.country}</p>
        </div>

        {/* Main Temperature Display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-end gap-1">
            <span className="text-5xl sm:text-6xl font-bold">
              {Math.round(temperature)}
            </span>
            <span className="text-2xl sm:text-3xl mb-2">°{tempUnit}</span>
          </div>

          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* Weather Condition */}
        <p className="text-lg font-medium mb-4 capitalize">
          {current.condition.text}
        </p>

        <div className="border-t border-white/20 pt-4">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* Feels Like */}
            <div>
              <p className="opacity-75 mb-1">Feels Like</p>
              <p className="font-semibold text-lg">
                {Math.round(feelsLike)}°{tempUnit}
              </p>
            </div>

            {/* Humidity */}
            <div>
              <p className="opacity-75 mb-1">Humidity</p>
              <p className="font-semibold text-lg">{current.humidity}%</p>
            </div>

            {/* Wind Speed */}
            <div>
              <p className="opacity-75 mb-1">Wind</p>
              <p className="font-semibold text-lg">{current.wind_kph} km/h</p>
            </div>

            {/* Cloud Coverage*/}
            <div>
              <p className="opacity-75 mb-1">Clouds</p>
              <p className="font-semibold text-lg">{current.cloud}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
