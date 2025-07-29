import { createSlice } from "@reduxjs/toolkit";
import { getLogo } from "../actions/logo-actions";

const logoSlice = createSlice({
    name: "logos",
    initialState: {
      corpzoXLogo: { logo: {}, url: "" },
      corpzoLogo: { logo: {}, url: "" },
      isLoading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getLogo.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getLogo.fulfilled, (state, action) => {
          state.isLoading = false;
          if (action.payload.type === "CORPZOX_LOGO") {
            state.corpzoXLogo = {
              logo: action.payload.logo,
              url: action.payload.url,
            };
          } else {
            state.corpzoLogo = {
              logo: action.payload.logo,
              url: action.payload.url,
            };
          }
        })
        .addCase(getLogo.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default logoSlice.reducer;
  