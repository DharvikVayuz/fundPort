import { createSlice } from "@reduxjs/toolkit";
import { getOffers, loadMoreOffers } from "../actions/offer-action";
import toast from "react-hot-toast";

// Slice
const offerSlice = createSlice({
  name: "offers",
  initialState: {
    loading: false,
    error: null,
    offers: null,
    page:0,
    isDeactivate: false,
    isLoading: false,
    totalCount: null,
    loadingMore:false
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.offers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffers.pending, (state) => {
        state.loading = true;
        state.isLoading = true;
        state.error= null;
        state.offers= null;
        state.totalCount=null;
        // console.log("OfferSice : getOffers.pending");
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        // console.log("OfferSice : getOffers.fulfilled");
        // console.log("getOffers.fulfilled",action.payload);

        state.loading = false;
        state.isLoading = false;
        state.totalCount=action.payload?.totalCount;
        state.offers = action.payload?.offers;
        state.page =1;
        state.error = null;
      })
      .addCase(getOffers.rejected, (state, action) => {
        // console.log("OfferSice : getOffers.rejected");
        state.loading = false;
        state.isLoading = false;
        state.error = action.payload;
        state.offers = null;
        state.totalCount=null;
      });


      builder
      .addCase(loadMoreOffers.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
        // console.log("OfferSice : getOffers.pending");
      })
      .addCase(loadMoreOffers.fulfilled, (state, action) => {
        // console.log("OfferSice : getOffers.fulfilled");
        // console.log("getOffers.fulfilled",action.payload);

        state.loadingMore = false;
        state.totalCount = action.payload?.totalCount;
        
        if (state.offers) {
          state.offers = [...state.offers, ...action.payload?.offers];
          if (action.payload?.data?.length > 0) {
              state.page = state.page + 1;
          }
      }
       
        state.error = null;
      })
      .addCase(loadMoreOffers.rejected, (state, action) => {
        // console.log("OfferSice : getOffers.rejected");
        toast.error("error while loading more data")
        state.error = action.payload;
        // console.log("action.payload?.message",action.payload);
        
        state.loadingMore = false;
      });


  },
});

export const { clearState } = offerSlice.actions;
export default offerSlice.reducer;

