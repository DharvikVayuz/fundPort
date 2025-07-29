import { createSlice } from "@reduxjs/toolkit";
// import { loadMoreFundraise } from "../actions/insight-action";
import { addFundraise, getFundraise, getSingleFundraise, loadMoreFundraise, updateFundraise, uploadVideo } from "../actions/fundraise-actions";
import toast from "react-hot-toast";

// Slice
const fundraiseSlice = createSlice({
  name: "fundraiseSlice",
  initialState: {
    isFundraiseLoading: false,
    error: null,
    fundraiseList: [],
    totalInsights : 0,
    page : 0, 
    loadingMore : false, 
    isFundraiseAdding : false,
    fundDetails : [],
    currentFunding : {},
    pitchDec : {},
    singleFundraiseLoading : false,
    pitchDecLoading : false,
    fundingReason : {}
  },
  reducers: {
    clearState: (state) => {
      state.isFundraiseLoading = false;
      state.error = null;
      state.wishList = null;
      state. fundDetails =  [];
      state.currentFunding = {};
      state.pitchDec = {};
    },
    updateFundDetails : (state, action)=>{
      state.fundDetails = action.payload;
    },
    updateCurrentFundingDetails : (state, action)=>{
      console.log(action.payload, "from action")
      state.currentFunding = action.payload;
    },
    updateFundingReasonDetails : (state, action)=>{
      console.log(action.payload, "from action")
      state.fundingReason = action.payload;
    },
    updatePitchDec : (state, action)=>{
      state.pitchDec = action.payload;
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
      .addCase(getFundraise.pending, (state) => {
        state.isFundraiseLoading = true;
        state.error = null;
      })
      .addCase(getFundraise.fulfilled, (state, action) => {
       
       
        state.isFundraiseLoading = false;
        state.fundraiseList = action.payload.fundraiseList;
        state.totalInsights = action.payload.totalFundraise
        state.error = null;
      })
      .addCase(getFundraise.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.isFundraiseLoading = false;
        state.error = action.payload;
        state.fundraiseList = null;
      })
      
      .addCase(loadMoreFundraise.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
        // console.log("OfferSice : getOffers.pending");
      })
      .addCase(loadMoreFundraise.fulfilled, (state, action) => {
        // console.log("OfferSice : getOffers.fulfilled");
        // console.log("getOffers.fulfilled",action.payload);

        state.loadingMore = false;
        state.totalCount = action.payload?.totalCount;
        
        if (state.fundraiseList) {
          state.offers = [...state.fundraiseList, ...action.payload];
          if (action.payload?.data?.length > 0) {
              state.page = state.page + 1;
          }
      }
       
        state.error = null;
      })
      .addCase(loadMoreFundraise.rejected, (state, action) => {
        // console.log("OfferSice : getOffers.rejected");
        toast.error("error while loading more data")
        state.error = action.payload;
        // console.log("action.payload?.message",action.payload);
        
        state.loadingMore = false;
      })
      
      .addCase(addFundraise.pending, (state)=>{
        state.isFundraiseAdding = true
      })
      .addCase(addFundraise.fulfilled, (state, action)=>{
        state.isFundraiseAdding = false
        console.log(action.payload, "action.payload add fundraise");
        toast.success("Fundinf Details Saved")
        // state.fundDetails = action.payload;
      })
      .addCase(addFundraise.rejected, (state, action)=>{
        state.isFundraiseAdding = false
      })
      .addCase(updateFundraise.pending, (state)=>{
        state.isFundraiseAdding = true
      })
      .addCase(updateFundraise.fulfilled, (state, action)=>{
        state.isFundraiseAdding = false
        console.log(action.payload, "action.payload add fundraise");
        toast.success("Fund Details Updated")
        // state.fundDetails = action.payload;
      })
      .addCase(updateFundraise.rejected, (state, action)=>{
        state.isFundraiseAdding = false
      })
      .addCase(getSingleFundraise.pending , (state)=>{
       state.singleFundraiseLoading = true;
      })
      .addCase(getSingleFundraise.fulfilled , (state, action)=>{
       state.singleFundraiseLoading = false; 
      })
      .addCase(getSingleFundraise.rejected , (state, action)=>{
       state.singleFundraiseLoading = false; 
      })
      .addCase(uploadVideo.pending, (state) => {
        state.pitchDecLoading = true;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.pitchDecLoading = false;
        // state.videoUrl = action.payload.url;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.pitchDecLoading = false;
        // state.error = action.payload;  // Capture any error from rejectWithValue
      });
      ;
  },
});

export const { clearState, updateFundDetails,updateFundingReasonDetails, updateCurrentFundingDetails,updatePitchDec, clearUrl, childLoading } = fundraiseSlice.actions;
export default fundraiseSlice.reducer;

