import { createSlice } from "@reduxjs/toolkit";
import { getAllMessage, getSingleMessage, updateMessage } from "../actions/message.action";
import { loginTokenFlow } from "../actions/logintokenflow-action";

// Slice
const logintokenSlice= createSlice({
  name: "logintokenSlice",
  initialState: {
    error: null,
    loginTokenData:[],
    loginFlowLoading:false,
    
  },
  reducers: {
    clearState: (state) => {
      state.loginFlowLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginTokenFlow.pending, (state) => {
        state.loginFlowLoading=true;
        state.error = null;
      })

      .addCase(loginTokenFlow.fulfilled, (state, action) => {
        state.loginFlowLoading=false;
        state.loginTokenData= action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.data[0]));
        state.error = null;
      })

      .addCase(loginTokenFlow.rejected, (state, action) => {
        state.loginFlowLoading=false;
        const errorMessage = action.payload?.message || "Something went wrong token flow";
        toast.error(errorMessage);
        state.error = action.payload;
        state.data = null;

      })
      
  },
});

export const { clearState } = logintokenSlice.actions;
export default logintokenSlice.reducer;

