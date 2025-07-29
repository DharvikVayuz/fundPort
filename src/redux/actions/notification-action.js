import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getAllNotification = createAsyncThunk(
    "getAllNotification",
    async ({ page,notificationType }, { rejectWithValue }) => {
      console.log(notificationType,"notificationTypenotificationType");
      try {
        let params = new URLSearchParams();
        if (page) params.append("page", page);
        if (notificationType) params.append("notificationType", notificationType);

  
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get(`/user/push-notification${(params) && `?${params}`}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong notification");
      }
    }
  );
  

  export const getMoreNotification = createAsyncThunk("getMoreNotification ", async ( {page,notificationType}, { rejectWithValue }) => {

    try {
      let params = new URLSearchParams();
     if (page) params.append('page', page);
     if (notificationType) params.append("notificationType", notificationType);
      // if (sort_by) params.append('sort_by', sort_by);
      // if (query) params.append('query', query);
      const response = await client.get(`/user/push-notification${(params) && `?${params}`}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
        },
      });
  
      
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  });


  export const getNotificationCount = createAsyncThunk(
    "getNotificationCount",
    async (_, { rejectWithValue }) => {  
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        
        const response = await client.get("/user/unread-push-notification-count", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        return {
          data: response?.data?.totalUnread
          ,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );


  export const updateNotification = createAsyncThunk(
    "updateMessage",
    async ({notificationId}, { rejectWithValue }) => {
      try {

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.put("/user/push-notification",{notificationId:notificationId}, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          
        });
        return {
            data : response?.data?.data,
           
        }
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );


  export const updateAllNotification = createAsyncThunk(
    "updateAllNotification",
    async (_, { rejectWithValue }) => {
      try {

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.put("/user/read-all-push-notification",{} ,{
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          
        });
        return {
            data : response?.data?.data,
           
        }
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );