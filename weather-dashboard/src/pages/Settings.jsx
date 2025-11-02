import { useSelector, useDispatch } from "react-redux";
import {
  toggleTempUnit,
  setTempUnit,
  setTheme,
  // resetSettings,
} from "../store/slices/settingsSlice";
import FavoritesManager from "../components/settings/FavoritesManager";
import {
  clearAllCache,
  selectCacheAge,
} from "../store/slices/weatherCacheSlice";

function Settings() {
  const dispatch = useDispatch();
  const { tempUnit, theme } = useSelector((state) => state.settings);

  const cacheState = useSelector((state) => state.weatherCache.cache);
  const cacheKeys = Object.keys(cacheState);

  const handleClearCache = () => {
    if (window.confirm("Clear all cached weather data?")) {
      dispatch(clearAllCache());
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Settings</h2>

      {/* Temperature Unit Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Temperature Unit
            </h3>
            <p className="text-sm text-gray-600">
              Choose how temperatures are displayed throughout the app
            </p>
          </div>
          <div className="text-4xl">🌡️</div>
        </div>

        {/* Radio Button Group */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50">
            <input
              type="radio"
              name="tempUnit"
              value="C"
              checked={tempUnit === "C"}
              onChange={(e) => dispatch(setTempUnit(e.target.value))}
              className="w-5 h-5 text-blue-600"
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-800">Celsius (°C)</p>
              <p className="text-sm text-gray-500">Metric system</p>
            </div>
            {tempUnit === "C" && (
              <span className="text-green-600 font-semibold">✓ Active</span>
            )}
          </label>

          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50">
            <input
              type="radio"
              name="tempUnit"
              value="F"
              checked={tempUnit === "F"}
              onChange={(e) => dispatch(setTempUnit(e.target.value))}
              className="w-5 h-5 text-blue-600"
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-800">Fahrenheit (°F)</p>
              <p className="text-sm text-gray-500">Imperial system</p>
            </div>
            {tempUnit === "F" && (
              <span className="text-green-600 font-semibold">✓ Active</span>
            )}
          </label>
        </div>

        {/* Quick Toggle Button */}
        <button
          onClick={() => dispatch(toggleTempUnit())}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Switch to {tempUnit === "C" ? "Fahrenheit (°F)" : "Celsius (°C)"}
        </button>
      </div>

      {/* Favorites Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Favorites
            </h3>
            <p className="text-sm text-gray-600">Manage your saved cities</p>
          </div>
          <div className="text-4xl">⭐</div>
        </div>

        <FavoritesManager />
      </div>

      {/* Theme Section (Bonus - for future implementation) */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Theme</h3>
            <p className="text-sm text-gray-600">
              Customize the appearance of your dashboard
            </p>
          </div>
          <div className="text-4xl">🎨</div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={(e) => dispatch(setTheme(e.target.value))}
              className="w-5 h-5 text-blue-600"
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-800">Light Mode</p>
              <p className="text-sm text-gray-500">Default bright theme</p>
            </div>
            {theme === "light" && (
              <span className="text-green-600 font-semibold">✓ Active</span>
            )}
          </label>

          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50 opacity-50">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => dispatch(setTheme(e.target.value))}
              className="w-5 h-5 text-blue-600"
              disabled
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-800">Dark Mode</p>
              <p className="text-sm text-gray-500">Coming soon...</p>
            </div>
          </label>
        </div>
      </div>

      {/* Cache Management Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Cache Management
            </h3>
            <p className="text-sm text-gray-600">Manage cached weather data</p>
          </div>
          <div className="text-4xl">💾</div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Cached Items:</strong> {cacheKeys.length}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Weather data is cached for 60 seconds to reduce API calls and
            improve performance.
          </p>

          {cacheKeys.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {cacheKeys.map((key) => {
                return (
                  <span
                    key={key}
                    className="px-3 py-1 border border-red-300 bg-red-100 rounded-full text-xs font-medium text-red-800"
                  >
                    {key}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
