import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  tempUnit: "C",
  theme: "light",
};

// create slice for settings
const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // action to toggle temp unit
    toggleTempUnit: (state) => {
      state.tempUnit = state.tempUnit === "C" ? "F" : "C";
    },

    // action to set specific unit
    setTempUnit: (state, action) => {
      if (action.payload === "C" || action.payload === "F") {
        state.tempUnit = action.payload;
      } else {
        console.warn(`Invalid temperature unit: ${action.payload}`);
      }
    },

    // action to change theme
    setTheme: (state, action) => {
      if (action.payload === "light" || action.payload === "dark") {
        state.theme = action.payload;
      } else {
        console.warn(`Invalid theme: ${action.payload}`);
      }
    },

    // Reset all settings to defaults
    resetSettings: () => initialState,
  },
});

// export actions
export const { toggleTempUnit, setTempUnit, setTheme, resetSettings } = settingSlice.actions;

//export reducer
export default settingSlice.reducer;
