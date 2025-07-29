import { createSlice } from "@reduxjs/toolkit";
// import { getWishList } from "../actions/wishlist-actions";
import { getMoreWishList, getWishList, removeServiceWishlistData1 } from "../actions/wishlist-actions";
import toast from "react-hot-toast";


// Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    heartloading: false,
    childLoading: {},
    error: null,
    wishList: null,
    page:1,
    isDeactivate: false,
    isLoading: false,
    totalCount: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.wishList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
        state.isLoading = true;
        state.error = null;
        state.wishList = null;
        //console.log("pending wishlist");
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        console.log("getWishList.fulfilled", action.payload);
       // toast.success(action.payload.message || "Wishlist fetched wishListfully");
        state.loading = false;
        state.isLoading = false;
        state.totalCount = action.payload?.total
        state.wishList = action.payload?.data;
        state.page = 1;
        state.error = null;
      })
      .addCase(getWishList.rejected, (state, action) => {
      //  console.log("rejected");
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.loading = false;
        state.isLoading = false;
        state.error = action.payload;
        state.wishList = null;
      })
      .addCase(getMoreWishList.pending, (state) => {
        state.error = null;
      })
      .addCase(getMoreWishList.fulfilled, (state, action) => {
        state.totalCount = action.payload?.total
        console.log("getMoreWishList.fulfilled",action.payload);
        
        // state.wishList = action.payload;
        if (state.wishList) {
          if (action.payload?.data?.length > 0) {
            state.wishList = [...state.wishList, ...action.payload?.data];
            state.page = state.page + 1;
          }
        }
        state.error = null;
      })
      .addCase(getMoreWishList.rejected, (state, action) => {
      //  console.log("rejected");
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
      })
      .addCase(removeServiceWishlistData1.pending, (state, action) => {
        state.heartloading = true;
       state.childLoading[action.meta.arg.serviceId] = true
       console.log(action.meta.arg.serviceId, "SERVICE DATA");
      })
      .addCase(removeServiceWishlistData1.fulfilled, (state, action) => {
        state.heartloading = false;
        //console.log(action.payload.serviceId, "SERVICE DATA");
       // console.log(state.childLoading[action.payload.serviceId] , 'chiloaing')
        state.childLoading[action.payload.serviceId]=false;
        let newList = state.wishList.filter((service) => {
          if (service?.serviceId != action.payload?.serviceId)
            return service
        });
        state.wishList = newList
        state.totalCount = newList?.length;
        state.error = action.payload?.message;
      })
      .addCase(removeServiceWishlistData1.rejected, (state, action) => {
        state.heartloading = false;
        state.childLoading[action.meta.arg.serviceId] = false
        state.error = action.payload;
      })
      


  },
});

export const { clearState } = wishlistSlice.actions;
export default wishlistSlice.reducer;

