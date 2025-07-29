import { createSlice } from "@reduxjs/toolkit";
import { changePassword, deactivateAccount, getSubscriptionHistoryCount, getSubscriptions } from "../actions/settings-actions";
import toast from "react-hot-toast";
// Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isPasswordChanging: false,
    error: null,
    success: null,
    isDeactivate : false, 
    isCountFetching : false,
    activeCount : null, 
    expiredCount : null,
    upcomingCount : null,
    isActiveLoading : false, 
    isExpiredLoading : false, 
    isUpcommingLoading : false,
    subscriptionsData : [], 
    isSubScriptionLoading : false,
    subscriptionTotal : 0, 
    changePasswordError : false
  },
  reducers: {
    clearState: (state) => {
      state.isPasswordChanging = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isPasswordChanging = true;
        state.error = null;
        state.success = null;
        state.changePasswordError = false
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isPasswordChanging = false;
        if(action.payload.code === 404){
          toast.error(action.payload?.message || "Something went wrong");  
          state.isPasswordChanging = false;
          state.changePasswordError = true
        }else{
          state.changePasswordError = false
          // toast.success(action.payload.message);
        }
       
        state.success = action.payload;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        console.log(action.payload, "password change failed");
        state.isPasswordChanging = false;
        toast.error(action.payload.message || "Password change failed");
        state.error = action.payload;
        state.success = null;
        state.changePasswordError = true
      })
      .addCase(deactivateAccount.pending, (state) => {
        state.isDeactivate = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        if(action.payload.code === 400){
          state.isDeactivate = false;
          toast.error(action.payload.message);
          return;
        }else{
          state.isDeactivate = false;
          toast.success(action.payload.message);
          localStorage.removeItem("userInfo")
        }
        state.isDeactivate = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        toast.error(action.payload.message);
        state.isDeactivate = false;
        state.error = action.payload;
        state.success = null;
      })
      .addCase(getSubscriptionHistoryCount.pending, (state, action) => {
        const {type} = action.meta.arg;
        if(type === "active"){
          state.isActiveLoading = true
        }else if(type === "expired"){
          state.isExpiredLoading = true
        }else{
          state.isUpcommingLoading = true
        }
        state.error = null;
        state.success = null;
      })
      .addCase(getSubscriptionHistoryCount.fulfilled, (state, action) => {
        console.log(action.payload, "subscription fullfilled");
        const {type, count} = action.payload;
        if(type === "active"){
          state.isActiveLoading = false
        }else if(type === "expired"){
          state.isExpiredLoading = false
        }else{
          state.isUpcommingLoading = false
        }
        if(type === "active"){
          state.activeCount = count
        }else if(type === "expired"){
          state.expiredCount = count
        }else{
          state.upcomingCount = count
        }
        // toast.success(action.payload.message);
        state.isCountFetching = false;
       
        state.error = null;
      })
      .addCase(getSubscriptionHistoryCount.rejected, (state, action) => {
       
        const {type} = action.meta.arg;
        if(type === "active"){
          state.isActiveLoading = false
        }else if(type === "expired"){
          state.isExpiredLoading = false
        }else{
          state.isUpcommingLoading = false
        }
        state.isCountFetching = false;
        state.error = action.payload;
      
      })
      .addCase(getSubscriptions.pending, (state) => {
        state.isSubScriptionLoading = true;
        state.error = null;
        state.subscriptionsData = null;
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.isSubScriptionLoading = false;
        state.subscriptionsData = action.payload.subscriptionList;
        state.subscriptionTotal = action.payload.subscriptionTotal;
        state.error = null;
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        console.log(action.payload, "get count failed");
        toast.error(action.payload.message || "Failed to fetch subscription list");
        state.isSubScriptionLoading = false;
        state.error = action.payload;
        state.subscriptionsData = null;
      })
      ;
  },
});

export const { clearState } = settingsSlice.actions;
export default settingsSlice.reducer;
