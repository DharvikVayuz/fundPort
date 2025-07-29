import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { updateFundDetails } from "../slices/fundraiseSlice";

export const getFundraise = createAsyncThunk(
    "fundraise/getFundraise",
    async ({page=1,query}, { rejectWithValue }) => {
        // console.log("Action : getOffers");
        
      try {

        let params = new URLSearchParams();
        if (page) params.append('page', page);
        if (query) params.append('search', query);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        // console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("user/funding-requirements", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:params
        });
        // console.log("getOffers",response.data.data);
        return {
            fundraiseList : response?.data?.data,
            totalFundraise : response?.data?.total
        }
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

export const getSingleFundraise = createAsyncThunk(
    "fundraise/getSingleFundraise",
    async ({fundingRequirementId}, { rejectWithValue, dispatch }) => {
        // console.log("Action : getOffers");
        
      try {

        let params = new URLSearchParams();
        if (fundingRequirementId) params.append('fundingRequirementId', fundingRequirementId);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        // console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("user/funding-requirements", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:params
        });
        // console.log("getOffers",response.data.data);
        return response?.data?.data;
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );


  
export const loadMoreFundraise = createAsyncThunk(
    "insights/loadMoreInsights",
    async ({ page, sort_by = 'date_asc', query }, { rejectWithValue }) => {
        // console.log("Action : loadMoreOffers");
        // let params = new URLSearchParams(new URL(window.location.href).search);
        // console.log("params",params.get("search"));
        
      let params = new URLSearchParams();
      if (page) params.append('page', page);
      if (query) params.append('search', query);
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        // console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("/user/funding-requirements", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:params
        });
        // console.log("loadMoreOffers",response.data.data);
        return response.data.data;
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

  export const addFundraise = createAsyncThunk(
    "fundraise/addFundraise",
    async (data, { rejectWithValue, dispatch }) => {
        // console.log("Action : getOffers");
        
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        // console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.post("user/funding-requirements", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response, "add fundraise response")
        // console.log("getOffers",response.data.data);
        if(response?.data?.code === 200 ||response?.data?.code === 201){
          // dispatch(updateFundDetails(data))
          return  response?.data
        }
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
  
  export const updateFundraise = createAsyncThunk(
    "fundraise/updateFundraise",
    async (data, { rejectWithValue, dispatch }) => {
        // console.log("Action : getOffers");
        
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        // console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.put("user/funding-requirements", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response, "add fundraise response")
        // console.log("getOffers",response.data.data);
        if(response?.data?.code === 200){
          // dispatch(updateFundDetails(data))
          return  response?.data
        }
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
  
  export const uploadVideo = createAsyncThunk(
    'fundraise/uploadVideo',  // The action type
    async ({ formData }, { dispatch, rejectWithValue }) => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        // console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.put(`user/auth/upload-file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          console.log(response, "response from upload video");
          return response?.data
        }
        
      } catch (error) {
        console.error('Error uploading video:', error);
        // Optionally, handle any error that might happen and send it to the reducer
        return rejectWithValue(error.response?.data?.error || 'An error occurred');
        
      }
    }
  );