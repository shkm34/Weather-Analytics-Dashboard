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
      const cityExists = state.cities.some(
        // action.payload = { name: , country: , lat: }
        (city) => city.name === action.payload.name
      );

      if (!cityExists) {
        state.cities.push(action.payload);
      }
    },

    // Remove city from favorites
    removeFavorites: (state, action) => {
      // action.payload = city_name
      state.cities.filter((city) => city.name !== action.payload);
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
