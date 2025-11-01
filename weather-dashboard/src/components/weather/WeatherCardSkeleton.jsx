function WeatherCardSkeleton() {
  return (
    <div className="
      bg-white
      rounded-xl 
      shadow-lg 
      p-6 
      animate-pulse
    ">
      {/* City name placeholder */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      {/* Temperature placeholder */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-16 bg-gray-300 rounded w-24"></div>
        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
      </div>

      {/* Condition placeholder */}
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>

      {/* Details grid placeholder */}
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherCardSkeleton;