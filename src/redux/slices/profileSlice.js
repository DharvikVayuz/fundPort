import { createSlice } from "@reduxjs/toolkit";
import { submitEditProfile, updateProfilePicture } from "../actions/profile-actions";
import toast from "react-hot-toast";
// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    isloading: false,
    isUpdatingImage: false,
    error: null,
    success: null,
    upload: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.isloading = false;
      state.error = null;
      state.success = null;
      state.upload=null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEditProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitEditProfile.fulfilled, (state, action) => {
        //console.log(action.payload, "data from slice")
        //toast.success(action.payload.message)
        //console.log(action.payload,"action.payload12");
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(submitEditProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.success = null;

      })

      .addCase(updateProfilePicture.pending, (state) => {  
        state.error = null;
        //state.isloading = true;
        state.isUpdatingImage = true;
        state.upload  = null;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.upload = action.payload?.data?.url;
        //state.isloading = false;
        state.isUpdatingImage = false;
        //console.log(action.payload?.data?.url,"upload");
        state.error = null;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.error = action.payload;
        //state.isloading = false;
        state.isUpdatingImage = false;
        state.upload = null;
      
      })
  },
});

export const { clearState } = profileSlice.actions;
export default profileSlice.reducer;
