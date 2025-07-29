import { createSlice } from "@reduxjs/toolkit";
import {
  getAllMessage,
  getMessagesCount,
  getMoreMessage,
  getSingleMessage,
  updateMessage,
} from "../actions/message.action";
import {
  getAllNotification,
  getMoreNotification,
  getNotificationCount,
  updateAllNotification,
  updateNotification,
} from "../actions/notification-action";

// Slice
const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    isNotificationLoading: false,
    loadingMore: false,
    isSingleMessageLoading: false,
    error: null,
    isNotificationData: [],
    updateNotificationData: [],
    updateAllNotificationData: [],
    singleNotificationId: [],
    singleMessageData: [],
    updateMessageData: [],
    totalUnreads: 0,
    totalNotificationCount: 0,
    totalMessage: 0,
    totalCount: 0,
    page: 0,
    isNotificationCountLoading: false,
    notificationCount: 0,
  },
  reducers: {
    clearState: (state) => {
      state.isNotificationLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotification.pending, (state) => {
        state.isNotificationLoading = true;
        state.error = null;
      })
      .addCase(getAllNotification.fulfilled, (state, action) => {
        state.totalCount = action.payload?.data?.total;
        console.log(state.totalCount, "totalCount");
        state.isNotificationLoading = false;
        state.isNotificationData = action.payload?.data;
        state.page = 1;
        state.error = null;
      })
      .addCase(getAllNotification.rejected, (state, action) => {
        const errorMessage = action.payload?.message || "Something went wrong notification";
        // toast.error(errorMessage);
        state.isNotificationLoading = false;
        state.error = action.payload;
        state.data = null;
      })

      .addCase(getNotificationCount.pending, (state) => {
        state.isNotificationCountLoading = true;
      })
      .addCase(getNotificationCount.fulfilled, (state, action) => {
        state.isNotificationCountLoading = false;
        state.notificationCount = action.payload?.data;
      })
      .addCase(getNotificationCount.rejected, (state, action) => {
        state.isNotificationCountLoading = false;
      })

      .addCase(updateNotification.pending, (state) => {
        state.error = null;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.updateNotificationData = action.payload?.data[0];
        if (state.notificationCount > 0) {
          state.notificationCount -= 1;
        }

        state.error = null;
      })
      .addCase(updateNotification.rejected, (state, action) => {
        const errorMessage = action.payload?.message || "Something went wrong notification";
        // toast.error(errorMessage);

        state.error = action.payload;
        state.data = null;
      })

      .addCase(updateAllNotification.pending, (state) => {
        state.error = null;
      })
      .addCase(updateAllNotification.fulfilled, (state, action) => {
        state.updateAllNotificationData = action.payload?.data[0];
        if (state.notificationCount > 0) {
          state.notificationCount = 0;
        }

        state.error = null;
      })
      .addCase(updateAllNotification.rejected, (state, action) => {
        const errorMessage = action.payload?.message || "Something went wrong";
        // toast.error(errorMessage);

        state.error = action.payload;
        state.data = null;
      })
      //pagination
      .addCase(getMoreNotification.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(getMoreNotification.fulfilled, (state, action) => {
        state.loadingMore = false;

        state.totalNotificationCount =
          action.payload?.total ?? state.totalNotificationCount;
        const newNotifications = action.payload?.data ?? [];

        if (Array.isArray(state.isNotificationData.data)) {
          state.isNotificationData.data = [
            ...state.isNotificationData.data,
            ...newNotifications,
          ];

          if (newNotifications.length > 0) {
            state.page += 1;
          }
        } else {
          // If for some reason it's not an array, reset it
          state.isNotificationData.data = [
            ...state.isNotificationData.data,
            ...newNotifications,
          ];
          state.page =
            newNotifications.length > 0 ? state.page + 1 : state.page;
        }
        // console.log(state.isNotificationData , 'isnotificationdata');
        state.error = null;
      })

      .addCase(getMoreNotification.rejected, (state, action) => {
        state.loadingMore = false;
      });
  },

  
});

export const { clearState, clearUrl, childLoading } = notificationSlice.actions;
export default notificationSlice.reducer;
