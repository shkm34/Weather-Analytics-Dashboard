import { getCurrentWeather, getForecast, searchCities } from "./weatherApi";
import store from "../store/store";
import {
  setCacheData,
  selectCacheData,
} from "../store/slices/weatherCacheSlice";

/**
 * Fetch current weather with caching
 * @param {string} city - City name or coordinates
 * @returns {Promise} Weather data
 */
export const getCachedCurrentWeather = async (city) => {
  const cacheKey = `current_${city}`;

  // check cache first
  const state = store.getState();
  const cacheData = selectCacheData(state, cacheKey);

  if (cacheData) {
    console.log(`✅ Using cached data for ${city}`);
    return cacheData;
  }

  // cache miss - fetch API
  console.log(`Fetching fresh data for ${city}`);
  const data = await getCurrentWeather(city);

  // store cache with 60
  store.dispatch(
    setCacheData({
      key: cacheKey,
      data,
      ttl: 60000,
    })
  );

  return data;
};

/**
 * Fetch forecast with caching
 * @param {string} city - City name or coordinates
 * @param {number} days - Number of days
 * @returns {Promise} Forecast data
 */
export const getCachedForecast = async (city, days = 7) => {
  const cacheKey = `forecast_${city}_${days}days`;

  const state = store.getState();
  const cachedData = selectCacheData(state, cacheKey);

  if (cachedData) {
    console.log(`Using cached data for ${city}`);
    return cachedData;
  }

  // cache missed - fetch
  console.log(`Fetching fresh forecast for ${city}`);
  const data = await getForecast(city);

  // store in cache
  store.dispatch(
    setCacheData({
      key: cacheKey,
      data,
      ttl: 60000,
    })
  );

  return data;
};

/**
 * Force refresh data (bypass cache)
 * @param {string} city - City name
 * @returns {Promise} Fresh weather data
 */
export const forceRefreshWeather = async (city) => {
  console.log(`Force refreshing data for ${city}`);
  const data = await getCurrentWeather(city);

  store.dispatch(
    setCacheData({
      key: `current_${city}`,
      data,
      ttl: 60000,
    })
  );

  return data;
};
