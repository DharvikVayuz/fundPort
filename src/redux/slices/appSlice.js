import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pin: false,
  servicesMainTab: 0,
  redirectedTo: "",
  isSignedIn : false,
  zIndexSidebar : 40,
};
//
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPin: (state, action) => {
      state.pin = action.payload;
    },
    setServicesMainTab: (state, action) => {
      state.servicesMainTab = action.payload;
    },
    setRedirectTo: (state, action) => {
      console.log(action, "redirect slice");
      state.redirectedTo = action.payload;
    },
    setIsSignedIn: (state, action) =>{
      state.isSignedIn = action.payload
      console.log(action.payload , 'asd');
    },
    setSidebarZIndex: (state, action) =>{
      state.zIndexSidebar = action.payload
      
    }
  },
});

export const { setPin, setServicesMainTab, setRedirectTo, setIsSignedIn, setSidebarZIndex } = appSlice.actions;

export default appSlice.reducer;
