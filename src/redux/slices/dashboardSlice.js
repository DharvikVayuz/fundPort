import { createSlice } from "@reduxjs/toolkit";
import { requestChangeManager, getRatingReviews, requestCallBack, getbannerAdvertisement, updateBannerAdvertisement, getUser, getUserBusiness, updateServiveProgress, getMoreServiceUpdate } from "../actions/dashboard-action";
import { ratingReview } from "../actions/servicesDetails-actions";
// import { updateServiveProgress } from "../actions/dashboard-action";
import toast from "react-hot-toast";
import { getUserServices } from "../actions/servicesListing-action";

// Slice
const dashBoardSlice = createSlice({
  name: "dashBoardSlice",
  initialState: {
    isChangeManagerLoading: false,
    error: null,
    isRequestBackLoading: false,
    isRatingLoading: false,
    ratingReviewList: [],
    bannerAdvertisementList: [],
    updatebannerAdvertisementList: [],
    isupdatebannerLoading: false,
    isbannerAdvertisementLoading: false,
    isChangeManagerOpen: false,

    loading: false,
    userLoading: false,
    user: null,
    dataUpdate: [],
    holdServices: [],
    completedServices: [],
    inProgress:[],
    allServices:[],
    manager: null,
    totalCount: 0,
    holdServiceTotal: 0,
    completedServiceTotal: 0,
    morePage: 1,
    error: null,
    loadingMore: false,

    business: {
      list: [],
      totalPage: 0,
      page: 1,

      limit: 10,
    },
    businessLoading: false,
    businessError: null,
    service: {
      list: [],
      totalPage: 0,
      totalCount: 0,
      page: 1,
      limit: 10,
    },
    serviceLoading: false,
    servicesError: null,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.isChangeManagerLoading = false;
      state.error = null;
    },
    handleModalOpen: (state, action) => {
      state.isChangeManagerOpen = action.payload;
    }, 
     setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.morePage = 0;
    },
    setBusinessPage(state, action) {
      state.business.page = action.payload;
    },
    handleRequestCallBackOpen : (state, action)=>{
      state.isChangeRequestOpen = action.payload;
    },
    handleCallBackRequestModalOpen: (state, action) => {
      state.isChangeRequestOpen = action.payload;
    },
    removeBannerAdvertisement: (state, action) => {
      state.bannerAdvertisementList = state.bannerAdvertisementList.filter(
        (banner) => banner._id !== action.payload
      );
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestChangeManager.pending, (state) => {
        state.isChangeManagerLoading = true;
        state.error = null;
      })
      .addCase(requestChangeManager.fulfilled, (state, action) => {
        //console.log("wishList wishlist", action.payload);

        toast.success(action.payload.message || "Requested to change manager.");
        state.isChangeManagerLoading = false;

        state.error = null;
      })
      .addCase(requestChangeManager.rejected, (state, action) => {

        const errorMessage = action.payload?.message || "Something went wrong change manager";
        toast.error(errorMessage);
        state.isChangeManagerLoading = false;
      })
      .addCase(requestCallBack.pending, (state) => {
        state.isRequestBackLoading = true;
        state.error = null;
      })
      .addCase(requestCallBack.fulfilled, (state, action) => {
        //console.log("wishList wishlist", action.payload);

        toast.success(action.payload.message || "Call Back requested.");
        state.isRequestBackLoading = false;

        state.error = null;
      })
      .addCase(requestCallBack.rejected, (state, action) => {

        const errorMessage = action.payload?.message || "Something went wrong call back";
        toast.error(errorMessage);
        state.isChangeManagerLoading = false;
      })

      .addCase(getRatingReviews.pending, (state) => {
        state.isRatingLoading = true
      })
      .addCase(getRatingReviews.fulfilled, (state) => {
        state.isRatingLoading = false
      })
      .addCase(getRatingReviews.rejected, (state, action) => {
        state.isRatingLoading = false
        toast.error(action?.payload)
      })


      .addCase(getbannerAdvertisement.pending, (state) => {
        state.isbannerAdvertisementLoading = true;
        state.error = null;
      })
      .addCase(getbannerAdvertisement.fulfilled, (state, action) => {

        state.isbannerAdvertisementLoading = false;
        state.bannerAdvertisementList = action.payload
        state.error = null;

      })
      .addCase(getbannerAdvertisement.rejected, (state, action) => {

        const errorMessage = action.payload?.message || "Something went wrong banner advertisement";
        toast.error(errorMessage);
        state.isbannerAdvertisementLoading = false;
      })

      .addCase(updateBannerAdvertisement.pending, (state) => {
        state.isupdatebannerLoading = true;
        state.error = null;
      })
      .addCase(updateBannerAdvertisement.fulfilled, (state, action) => {

        state.isupdatebannerLoading = false;
        state.updatebannerAdvertisementList = action.payload
        state.error = null;

      })
      .addCase(updateBannerAdvertisement.rejected, (state, action) => {

        const errorMessage = action.payload?.message || "Something went wrong advertisement";
        toast.error(errorMessage);
        state.isupdatebannerLoading = false;
      })

      
    builder
    .addCase(updateServiveProgress.pending, (state, action) => {
      state.fetching = true;
    })
      .addCase(updateServiveProgress.fulfilled, (state, action) => {
        state.fetching = false;
        state.totalCount = action.payload?.total;
        state.error = action.payload.message;
        // console.log(action.payload,"action.payload22");
        // console.log(action.payload,"service progress updates");
        if(action.payload.status === "hold"){
          state.holdServices = action.payload.serviceProgressList
          state.holdServiceTotal = action.payload.total
        }else if(action.payload.status === "closed"){
          state.completedServices = action.payload.serviceProgressList
          state.completedServiceTotal = action.payload.total
        }else if(action.payload.status === "inProgress"){
          state.inProgress = action.payload.serviceProgressList
          state.totalCount = action.payload.total
        }else{
          state.allServices = action.payload.serviceProgressList
          state.totalCount = action.payload.total
        }
        // state.serviceProgressDataUpdate = action.payload?.data;
        state.morePage = 1
        //state.manager=action.payload?.agent_data?.[0]?.manager_data?.[0];
      })
      .addCase(updateServiveProgress.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })

      builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.userLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userLoading = false;
        state.error = action.payload?.message;
        // console.log(action.payload,"User Slice Dash1");
        state.user = action.payload;
        // console.log(state.user, "User Slice Dash2");
        state.manager = action.payload?.agent_data?.[0];
        // console.log(state.manager,"state.manager");

      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.userLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserBusiness.pending, (state, action) => {
        state.businessLoading = true;
      })
      .addCase(getUserBusiness.fulfilled, (state, action) => {
        state.businessLoading = false;
        state.businessError = action.payload.message;
        state.business.list = action.payload.data;
        state.business.totalPage = action.payload?.total;
      })
      .addCase(getUserBusiness.rejected, (state, action) => {
        state.businessLoading = false;
        state.businessError = action.payload;
      });
    builder
      .addCase(getUserServices.pending, (state, action) => {
        state.serviceLoading = true;
      })
      .addCase(getUserServices.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.servicesError = action.payload.message;
        state.service.list = action.payload.data;
        state.service.totalPage = action.payload?.total;
        state.service.totalCount = action.payload?.total;
      })
      .addCase(getUserServices.rejected, (state, action) => {
        state.serviceLoading = false;
        state.servicesError = action.payload;
      })
      .addCase(ratingReview.pending, (state) => {

      })
      .addCase(ratingReview.fulfilled, (state, action) => {
        state.fetching = false;
        const applicationId = action.payload.responseData?.data?.applicationId;
        if (state.dataUpdate?.data) {
          state.dataUpdate.data = state.dataUpdate.data.map((item) => {
            if (item._id === applicationId) {
              return {
                ...item,
                ratingreviewsSize: 1,
              };
            }
            return item;
          });
        }


      })


      .addCase(ratingReview.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        //console.log(action.dataUpdate.data, "payload data");
      })

      .addCase(getMoreServiceUpdate.pending, (state) => {
        state.loadingMore = true;
        // console.log("businessPageSlice : getAllService.pending");
      })

      .addCase(getMoreServiceUpdate.fulfilled, (state, action) => {

        state.totalCount = action.payload?.total;
        state.loadingMore = false;
        // state.totalCount = action.payload?.total;
        // console.log(state.totalCount, "totalCount12345");
        if (action.payload.status === "hold") {
          state.holdServices.data = [...state.holdServices.data, ...action.payload?.serviceProgressList.data];
          state.holdServiceTotal = action.payload.totalCount
          if (action.payload?.serviceProgressList.data?.length > 0) {
            state.morePage = state.morePage + 1;
          }
        } else if (action.payload.status === "inprogress") {
          state.dataUpdate.data = [...state.dataUpdate.data, ...action.payload?.serviceProgressList.data];
          state.totalCount = action.payload.totalCount
          if (action.payload?.serviceProgressList.data?.length > 0) {
            state.morePage = state.morePage + 1;
          }
        } else if (action.payload.status === "completed") {
          state.completedServices.data = [...state.completedServices.data, ...action.payload?.serviceProgressList.data];
          state.completedServiceTotal = action.payload.totalCount
          if (action.payload?.serviceProgressList.data?.length > 0) {
            state.morePage = state.morePage + 1;
          }
        }
        if (state.dataUpdate) {

          state.dataUpdate.data = [...state.dataUpdate.data, ...action.payload?.data];
          if (action.payload?.data?.length > 0) {
            state.morePage = state.morePage + 1;
          }
        }

        // console.log(state.morePage, "getMoreServices5");
        state.error = null;
      })
      .addCase(getMoreServiceUpdate.rejected, (state, action) => {
        state.loadingMore = false;
      });


  },
})

export const { clearState, handleModalOpen, removeBannerAdvertisement,handleRequestCallBackOpen,setUser, handleCallBackRequestModalOpen,clearUser, setBusinessPage } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;

