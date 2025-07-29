import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getOffers = createAsyncThunk(
    "offer/getOffers",
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
  
        const response = await client.get("/admin/offer", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:params
        });
        // console.log("getOffers",response.data.data);
        return response.data.data;
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );


  
export const loadMoreOffers = createAsyncThunk(
    "offer/loadMoreOffers",
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
  
        const response = await client.get("/admin/offer", {
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