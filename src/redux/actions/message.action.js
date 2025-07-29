import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getAllMessage = createAsyncThunk(
    "getAllMessage",
    async ({page,search,filter,startDate,endDate}, { rejectWithValue }) => {
        
      try {
        let params = new URLSearchParams();
        if (page) params.append('page', page);
        if (search) params.append('query', search);

        if (filter) params.append('filter', filter);
        if(startDate && endDate) {
          params.append('startDate',startDate);
          params.append('endDate',endDate);
        }
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }
        const response = await client.get(`/user/notification${(params) && `?${params}`}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          
        });
        
        return {
            data : response?.data?.data,
            totalUnreads : response?.data?.totalUnread,
            total :response?.data?.total
        }
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

  export const getSingleMessage = createAsyncThunk(
    "getSingleMessage",
    async ({ notificationId }, { rejectWithValue }) => {  
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        
        const response = await client.get("/user/notification", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params: {
            notificationId, 
          },
        });
  
        return {
          data: response?.data?.data,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong message");
      }
    }
  );
  

  export const updateMessage = createAsyncThunk(
    "updateMessage",
    async ({data}, { rejectWithValue }) => {
      console.log("ActionMessage");
      try {

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.put("/user/notification-read",data, {
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


  export const getMoreMessage = createAsyncThunk("getMoreMessage ", async ( {page}, { rejectWithValue }) => {

    try {
      let params = new URLSearchParams();
     if (page) params.append('page', page);
      // if (sort_by) params.append('sort_by', sort_by);
      // if (query) params.append('query', query);
      const response = await client.get(`/user/notification${(params) && `?${params}`}`, {
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

  export const getMessagesCount = createAsyncThunk(
    "getMessagesCount",
    async (_, { rejectWithValue }) => {  
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        
        const response = await client.get("/user/unread-notification-count", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        return {
          data: response?.data,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

  