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
            state.tempUnit = action.payload;
        },

        // action to change theme
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

// export actions
export const { toggleTempUnit, setTempUnit, setTheme } = settingSlice;

//export reducer
export default settingSlice.reducer;
