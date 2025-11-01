import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import favoritesReducer from "./slices/favoritesSlice";
import { loadState, saveState } from '../utils/localStorage';

// Load persisted state
const persistedFavorites = loadState('favorites');
const persistedSettings = loadState('settings');

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        favorites: favoritesReducer,
    },

    preloadedState: {
        settings: persistedSettings || undefined,
        favorites: persistedFavorites || undefined,
    },
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
    const state = store.getState();
    saveState('favorites', state.favorites);
    saveState('settings', state.settings);
});


export default store;
