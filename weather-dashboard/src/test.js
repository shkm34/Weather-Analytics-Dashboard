const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
import axios from 'axios';

// Use in requests
const request = async () => await axios.get(`${BASE_URL}/current.json`, {
  params: {
    key: API_KEY,
    q: 'Patna'
  }
})



console.log(await request());
