import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [], // for favorites cities
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // add cities to favorites
    addFavorite: (state, action) => {
      // check if city already exists
      const cityExists = state.cities.some(
        // action.payload = { name: , country: , lat: }
        (city) => city.lat === action.payload.lat && 
        city.lon === action.payload.lon
      );

      if (!cityExists) {
        state.cities.push(action.payload);
      }
    },

    // Remove city from favorites
    removeFavorites: (state, action) => {
      // action.payload = city_name
      console.log('removing', action.payload);
      state.cities = state.cities.filter((city) => city.name !== action.payload);
    },

    // Clear all favorites
    clearFavorites: (state) => {
      state.cities = [];
    },

    // Load favorites from localStorage on app start
    loadFavorites: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { addFavorite, removeFavorites, clearFavorites, loadFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
