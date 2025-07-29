import { createSlice } from "@reduxjs/toolkit";
import { getAllMessage, getMessagesCount, getMoreMessage, getSingleMessage, updateMessage } from "../actions/message.action";

// Slice
const messageSlice= createSlice({
  name: "messageSlice",
  initialState: {
    isMessageLoading: false,
    loadingMore: false,
    isSingleMessageLoading: false,
    error: null,
    messageData: [],
    singleNotificationId:[],
    singleMessageData: [],
    updateMessageData:[],
    totalUnreads:0,
    totalMessageCount:0,
    totalMessage : 0,
    page: 0,
    isMessageCountLoading:false,
    messageCount:0,
  },
  reducers: {
    clearState: (state) => {
      state.isMessageLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessage.pending, (state) => {
        state.isMessageLoading = true;
        state.error = null;
      })
      .addCase(getAllMessage.fulfilled, (state, action) => {
       
       
        state.isMessageLoading = false;
        state.messageData= action.payload.data;
        state.totalMessage = action.payload.total;
        state.totalMessageCount = action.payload.total
        state.totalUnreads = action.payload.totalUnreads
        state.page =1;
        state.error = null;
      })
      .addCase(getAllMessage.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong message";
       // toast.error(errorMessage);
        state.isMessageLoading = false;
        state.error = action.payload;
        state.data = null;
      })

      .addCase(getMessagesCount.pending, (state) => {
        state.isMessageCountLoading = true;
      })
      .addCase(getMessagesCount.fulfilled, (state, action) => {
        state.isMessageCountLoading = false;
        state.messageCount=action.payload?.data?.totalUnread;
   
      })
      .addCase(getMessagesCount.rejected, (state, action) => {
        state.isMessageCountLoading = false;

      })
      

      .addCase(getSingleMessage.pending, (state) => {
        state.isSingleMessageLoading = true;
        state.error = null;
      })
      // .addCase(getSingleMessage.fulfilled, (state, action) => {
      //   state.isSingleMessageLoading = false;
      //   state.singleMessageData = action.payload?.data[0];
      //   state.singleNotificationId = action.payload?.data?.[0]?._id;        
      //   state.messageData = state.messageData.map((mssg) => {
  
      //     if (mssg._id === state.singleNotificationId) {
      //       return {
      //         ...mssg,
      //         isRead: true, 
      //       };
      //     }
      //     return mssg;
      //   });
      //  state.error = null;
      // })
      .addCase(getSingleMessage.fulfilled, (state, action) => {
        state.isSingleMessageLoading = false;
        const message = action.payload?.data?.[0];
        state.singleMessageData = message;
        state.singleNotificationId = message?._id;
      
        const originalMessage = state.messageData.find((mssg) => mssg?._id === message?._id);
      
        state.messageData = state.messageData.map((mssg) => {
          if (mssg._id === message?._id) {
            return {
              ...mssg,
              isRead: true,
            };
          }
          return mssg;
        });
      
        if (originalMessage && !originalMessage?.isRead) {
          state.messageCount = Math.max(0, state.messageCount - 1); 
        }
      
        state.error = null;
      })
      
      
      .addCase(getSingleMessage.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong message";
       // toast.error(errorMessage);
        state.isSingleMessageLoading = false;
        state.error = action.payload;
        state.data = null;
      })
      

      .addCase(updateMessage.pending, (state) => {
    
        state.error = null;
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
       
        state.updateMessageData= action.payload?.data[0];
       
        state.error = null;
      })
      .addCase(updateMessage.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong message";
       // toast.error(errorMessage);
       
        state.error = action.payload;
        state.data = null;
      })
      

      //pagination
      .addCase(getMoreMessage.pending, (state) => {
        state.loadingMore = true;
    })
    .addCase(getMoreMessage.fulfilled, (state, action) => {
       
        state.loadingMore=false;
        state.totalMessageCount = action.payload?.total;
        if (state.messageData) {
            state.messageData = [...state.messageData, ...action.payload?.data];
            if (action.payload?.data?.length > 0) {
                state.page = state.page + 1;
            }
        }
        state.error = null;
    })
    .addCase(getMoreMessage.rejected, (state, action) => {
        state.loadingMore = false;
    });
  },
});

export const { clearState, clearUrl, childLoading } = messageSlice.actions;
export default messageSlice.reducer;

