import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setThemeInStore: "",
};

const appSlice = createSlice({
  name: "setThemeInStore",
  initialState,
  reducers: {
    setThemeInStore: (state, action) => {
      state.setThemeInStore = action.payload;
    },
  },
});

export const { setThemeInStore } = appSlice.actions;

export default appSlice.reducer;
