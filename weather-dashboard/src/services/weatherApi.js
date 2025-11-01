const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'c62540a5fc7b45ed9a3154334253110';
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'http://api.weatherapi.com/v1';
import axios from "axios";

// create axios instance
const weatherApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    key: API_KEY,
  },
});

console.log('BASE_URL', BASE_URL);
console.log('axios baseURL', weatherApiClient.defaults.baseURL);

// response interceptor for logging and error
weatherApiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log("API Success:", response.config.url);
    }
    return response;
  },

  (error) => {
    if (import.meta.env.DEV) {
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

// fetch current weather for a city
export const getCurrentWeather = async (city) => {
  try {
    const response = await weatherApiClient.get("/current.json", {
      params: { q: city },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Failed to fetch weather data"
    );
  }
};

// fetch weather forecast for a city
export const getForecast = async (city, days = 7) => {
  try {
    const response = await weatherApiClient.get("/forecast.json", {
      params: {
        q: city,
        days: days,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Failed to fetch weather forecast"
    );
  }
};

// search for cities- autocomplete
export const searchCities = async (query) => {
  try {
    const response = await weatherApiClient.get("/search.json", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Failed to search cities"
    );
  }
};
