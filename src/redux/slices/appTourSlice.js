// src/features/tour/tourSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTourOpen: true,
  currentStep: 0,
  steps: [],
  isProfileModalOpen: false,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTourOpen: (state, action) => {
      state.isTourOpen = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setTourSteps: (state, action) => {
      state.steps = action.payload;
      console.log(action.payload, "from steps");
    },
    setProfileCardOpen: (state, action) => {
      state.isProfileModalOpen = action.payload
    },
  },
});

export const { setTourOpen, setCurrentStep, setTourSteps, setProfileCardOpen } = tourSlice.actions;
export default tourSlice.reducer;
