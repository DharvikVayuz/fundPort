import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getInsights, getSidePannelInsights, loadMoreInsights } from "../actions/insight-action";
import toast from "react-hot-toast";

// Slice
const insightSlice = createSlice({
  name: "insightSlice",
  initialState: {
    isInsightLoading: false,
    isSidePanelInsightLoading: false,
    isTransactionDownloading : false,
    error: null,
    insights: [],
    sidePannelInsights : [],
    totalInsights : 0,
    page : 0, 
    loadingMore : false, 
    categories : [],
    categoryLoading : false,
  },
  reducers: {
    clearState: (state) => {
      state.isInsightLoading = false;
      state.error = null;
      state.wishList = null;
    },
    clearUrl : (state)=>{
      state.downloadTransactionUrl = ""
    },
    childLoading: (state, action) => {
      const { transactionId, loading } = action.payload;
      console.log(transactionId , 'from childloading category')
      state.childLoading = {
        ...state.childLoading,
        [transactionId]: loading
      };
    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInsights.pending, (state) => {
        state.isInsightLoading = true;
        state.error = null;
      })
      .addCase(getInsights.fulfilled, (state, action) => {
       
       
        state.isInsightLoading = false;
        state.insights = action.payload.insights;
        state.totalInsights = action.payload.totalInsights
        state.error = null;
      })
      .addCase(getInsights.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.isInsightLoading = false;
        state.error = action.payload;
        state.insights = null;
      })
      
      builder
      .addCase(getSidePannelInsights.pending, (state) => {
        state.isSidePanelInsightLoading = true;
        state.error = null;
      })
      .addCase(getSidePannelInsights.fulfilled, (state, action) => {
       
       
        state.isSidePanelInsightLoading = false;
        state.sidePannelInsights = action.payload.insights;
        state.totalInsights = action.payload.totalInsights
        state.error = null;
      })
      .addCase(getSidePannelInsights.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong";
      //  toast.error(errorMessage);
        state.isSidePanelInsightLoading = false;
        state.error = action.payload;
        state.sidePannelInsights = null;
      })
      
      .addCase(loadMoreInsights.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
        // console.log("OfferSice : getOffers.pending");
      })
      .addCase(loadMoreInsights.fulfilled, (state, action) => {
        // console.log("OfferSice : getOffers.fulfilled");
        // console.log("getOffers.fulfilled",action.payload);

        state.loadingMore = false;
        state.totalCount = action.payload?.totalCount;
        
        if (state.insights) {
          state.offers = [...state.insights, ...action.payload];
          if (action.payload?.data?.length > 0) {
              state.page = state.page + 1;
          }
      }
       
        state.error = null;
      })
      .addCase(loadMoreInsights.rejected, (state, action) => {
        // console.log("OfferSice : getOffers.rejected");
        toast.error("error while loading more data")
        state.error = action.payload;
        // console.log("action.payload?.message",action.payload);
        
        state.loadingMore = false;
      })
      .addCase(getCategories.pending, (state)=>{
        state.categoryLoading = true  
      })
      .addCase(getCategories.fulfilled, (state, action)=>{
        state.categoryLoading = false  
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state)=>{
        state.categoryLoading = false  
      })
      ;
  },
});

export const { clearState, clearUrl, childLoading } = insightSlice.actions;
export default insightSlice.reducer;

