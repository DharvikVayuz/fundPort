import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import apiClient from "../../services/apiClient";
import toast from "react-hot-toast";

export const changePassword = createAsyncThunk(
    "settings/changePassword",
    async ({ passwordData, navigate }, { rejectWithValue }) => {
      try {
        const response = await apiClient.put("/user/change-password", passwordData, "application/json");
        if (response.code === 200) {
          localStorage.removeItem("userInfo"); // Remove user info on successful password change
        }else if(response.code === 400){
            toast.error(response?.data?.message || "Something went wrong")
        }
  
        return response;
      } catch (error) {
        console.log(error, "password error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
  

export const deactivateAccount = createAsyncThunk(
    "settings/deactivateAccount",
    async (formData, { rejectWithValue }) => {
        console.log(formData, "formdata fropmm actions")
        try {
            const response = await client.put("/user/deactivate-account", formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                },
            });
            console.log(response, "change password response")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const getSubscriptionHistoryCount = createAsyncThunk(
    "settings/getSubscriptionHistoryCount",
    async ({type}, { rejectWithValue }) => {
        console.log(type, "formdata fropmm actions")
        try {
            const response = await client.get(`/application/subscription-count?type=${type}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                },
            });
            
            return {
                type : type, 
                count : response?.data?.data
            };
        } catch (error) {
            console.log(error, "subscriptipon failed")
            return rejectWithValue( {
                type:type, 
                error : error.response?.data
            });
        }
    }
);
export const getSubscriptions = createAsyncThunk(
    "settings/getSubscriptions",
    async ({page, type}, { rejectWithValue }) => {

        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (type) params.append("type", type);
        try {
            const response = await client.get(`/application/subscriptions?${params.toString()}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                },
            });
            console.log(response, "subscription response")
            
            return {
                subscriptionList : response?.data?.data, 
                subscriptionTotal : response?.data?.total
            }
        } catch (error) {
            console.log(error, "netwroek error")
            if(error.code == 'ERR_NETWORK'){
                return rejectWithValue(error.message)
            }else{
                console.log(error, "netwroek error")
                return rejectWithValue(error.response?.data || "Something went wrong");
            }
        }
    }
);



