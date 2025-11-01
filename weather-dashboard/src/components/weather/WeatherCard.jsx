import React from "react";
import { useSelector } from "react-redux";

function WeatherCard({ weatherData, onClick }) {
  const tempUnit = useSelector((state) => state.settings.tempUnit)
  const { location, current } = weatherData;

  const temperature = tempUnit === "C" ? current.temp_c : current.temp_f;
  const feelsLike =
    tempUnit === "C" ? current.feelslike_c : current.feelslike_f;
  return (
    <div
      onClick={onClick}
      role="button"
      className="
    relative
    overflow-hidden
    rounded-2xl
    p-5 sm:p-6
    cursor-pointer
    transform transition-all duration-300
    hover:scale-[1.02] hover:shadow-2xl
    focus:outline-none focus:ring-4 focus:ring-sky-300/40
    bg-[linear-gradient(135deg,#0ea5e9_0%,#3b82f6_50%,#6366f1_100%)]
    shadow-lg
    text-white
  "
    >
     
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none" />


      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold leading-tight">
            {location.name}
          </h3>
          <p className="text-xs sm:text-sm opacity-90 mt-0.5">
            {location.country}
          </p>
        </div>

 
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium">
          <img
            src={`https:${current.condition.icon}`}
            alt=""
            className="w-6 h-6"
            loading="lazy"
          />
          <span className="capitalize">{current.condition.text}</span>
        </div>
      </div>

      {/* Middle: main temp + icon */}
      <div className="relative z-10 mt-4 flex items-center justify-between">
        <div className="flex items-end gap-3">
          <div className="text-4xl sm:text-6xl font-extrabold leading-none drop-shadow-sm">
            {Math.round(temperature)}
            <span className="text-lg sm:text-2xl font-semibold align-top ml-1">
              °{tempUnit}
            </span>
          </div>
          <div className="hidden sm:flex flex-col text-sm text-white/90">
            <span className="opacity-90">Feels like</span>
            <span className="font-medium">
              {Math.round(feelsLike)}°{tempUnit}
            </span>
          </div>
        </div>

        {/* circular icon badge */}
        <div className="shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
            <img
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              className="w-12 h-12 sm:w-14 sm:h-14"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Condition text (mobile visible) */}
      <p className="relative z-10 mt-3 sm:hidden text-sm opacity-95 capitalize">
        {current.condition.text}
      </p>

      {/* Divider */}
      <div className="relative z-10 mt-4 border-t border-white/20 pt-3">
        {/* responsive details: 2 cols on small, 4 cols on md */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-sm sm:text-sm">
          <div className="flex flex-col">
            <span className="text-xs opacity-80">Feels</span>
            <span className="font-semibold">
              {Math.round(feelsLike)}°{tempUnit}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs opacity-80">Humidity</span>
            <span className="font-semibold">{current.humidity}%</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs opacity-80">Wind</span>
            <span className="font-semibold">{current.wind_kph} km/h</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs opacity-80">Clouds</span>
            <span className="font-semibold">{current.cloud}%</span>
          </div>
        </div>
      </div>

      {/* subtle decorative gradient shapes */}
      <svg
        className="absolute -right-6 -top-6 opacity-20 w-36 h-36"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#g1)" />
      </svg>
    </div>
  );
}

export default WeatherCard;
