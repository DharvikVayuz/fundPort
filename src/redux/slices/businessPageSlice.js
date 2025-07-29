import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getAllBusiness, getBusinessDropdown, getMoreBusiness } from "../actions/businessPage-action";

// Slice
const businessPageSlice = createSlice({
    name: "business-page",
    initialState: {
        business: null,
        isLoading: false,
        totalCount: null,
        page: 0,
        error: null,
        loadingMore: false,
        businessListing : [], 
        businessDropDown : [],
    },
    reducers: {
        clearState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.business = null;
        },
        // loadMoreBusiness(state,action){
        //     state.page=action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBusiness.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.businessListing = null;
                state.business = null;
                state.totalCount = null;
                // console.log("businessPageSlice : getAllBusiness.pending");
            })
            .addCase(getAllBusiness.fulfilled, (state, action) => {
                // console.log("businessPageSlice : getAllBusiness.fulfilled");
                // console.log("getAllBusiness.fulfilled", action.payload);

                state.loading = false;
                state.isLoading = false;
                state.totalCount = action.payload?.total;
                state.businessListing= action.payload?.data;
                state.business= action.payload?.data;
                state.page =1;
                state.error = null;
            })
            .addCase(getAllBusiness.rejected, (state, action) => {
                // console.log("businessPageSlice :getAllBusiness.rejected");
                state.loading = false;
                state.isLoading = false;
                state.error = action.payload;
                state.businessListing = null;
                state.business = null;
                state.totalCount = null;
            });
        builder
            .addCase(getBusinessDropdown.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.businessDropDown = null;
                state.business = null;
                state.totalCount = null;
                // console.log("businessPageSlice : getAllBusiness.pending");
            })
            .addCase(getBusinessDropdown.fulfilled, (state, action) => {
                // console.log("businessPageSlice : getAllBusiness.fulfilled");
                console.log("getAllBusiness.fulfilled", action.payload);

               
                state.isLoading = false;
                state.totalCount = action.payload?.total;
                state.businessDropDown= action.payload;
                state.business= action.payload?.data;
                state.page =1;
                state.error = null;
            })
            .addCase(getBusinessDropdown.rejected, (state, action) => {
                // console.log("businessPageSlice :getAllBusiness.rejected");
                state.isLoading = false;
                state.error = action.payload;
                state.businessDropDown = null;
                state.business = null;
                state.totalCount = null;
            });


        //For pagination
        builder
            .addCase(getMoreBusiness.pending, (state) => {
                state.loadingMore = true;
                // console.log("businessPageSlice : getAllBusiness.pending");
            })
            .addCase(getMoreBusiness.fulfilled, (state, action) => {
                // console.log("businessPageSlice : getMoreBusiness.fulfilled");
                // console.log("getMoreBusiness.fulfilled", action.payload);
                state.loadingMore=false;
                state.totalCount = action.payload?.total;
                // console.log(state.business,"state.business");
                if (state.business) {
                    state.business = [...state.business, ...action.payload?.data];
                    if (action.payload?.data?.length > 0) {
                        state.page = state.page + 1;
                    }
                }
                state.error = null;
            })
            .addCase(getMoreBusiness.rejected, (state, action) => {
                // console.log("businessPageSlice :getMoreBusiness.rejected");
                state.loadingMore = false;
                // state.error = action.payload;
            });

    },
});

export const { clearState } = businessPageSlice.actions;
export default businessPageSlice.reducer;

