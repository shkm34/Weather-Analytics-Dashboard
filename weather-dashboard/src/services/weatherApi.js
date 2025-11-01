const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
import axios from "axios";

// create axios instance
const weatherApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    key: API_KEY,
  },
});

// response interceptor for logging and error
weatherApiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      //console.log("API Success:", response.config.url);
    }
    return response;
  },

  (error) => {
    if (import.meta.env.DEV) {
      //console.error("API Error:", error.response?.data || error.message);
    }
    else if (error.response?.status === 404) {
      throw new Error("City not found");
    } else if (error.response?.status === 403) {
      throw new Error("API quota exceeded");
    } else {
      throw new Error("Something went wrong");
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
