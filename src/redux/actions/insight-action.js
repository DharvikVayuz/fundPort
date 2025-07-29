import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getInsights = createAsyncThunk(
  "insights/getInsights",
  async ({ page = 1, query, categoryMetaUrl  = '' }, { rejectWithValue }) => {
    console.log("Action : getOffers");

    try {

      let params = new URLSearchParams();
      if (page) params.append('page', page);
      if(categoryMetaUrl) params.append('categoryMetaUrl', categoryMetaUrl )
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      // console.log(token, "token")

      if (!token) {
        return rejectWithValue("No token found");
      }

      console.log("token", token)
      const response = await client.get("/user/blog", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        params: params
      });
      console.log("getOffers",response.data.data);
      return {
        insights: response?.data?.data,
        totalInsights: response?.data?.total
      }
    } catch (error) {
      console.log(error, "get offer list error");
      return rejectWithValue(error.response?.data || "Something went wrong Insights");
    }
  }
);


export const getSidePannelInsights = createAsyncThunk(
  "insights/getSidePannelInsights",
  async ({ page = 1, query, categoryMetaUrl  = '' }, { rejectWithValue }) => {
    // console.log("Action : getOffers");

    try {

      let params = new URLSearchParams();
      if (page) params.append('page', page);
      if (query) params.append('search', query);
      if(categoryMetaUrl) params.append('categoryMetaUrl', categoryMetaUrl )
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      // console.log(token, "token")

      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await client.get("/user/blog", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        params: params
      });
      // console.log("getOffers",response.data.data);
      return {
        insights: response?.data?.data,
        totalInsights: response?.data?.total
      }
    } catch (error) {
      console.log(error, "get blog list error");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const getCategories= createAsyncThunk(
  "insights/getCategories",
  async (_, { rejectWithValue }) => {
    console.log("local storage",JSON.parse(localStorage.getItem('userInfo'))?.token);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const response = await client.get("/user/blog-category", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        
      });

      console.log(response, "user folders");
      if (response.status === 200 ) {
        return response?.data?.data?.data
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Return a meaningful error message to the rejected action
      console.log(error, "error");
      
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);



export const loadMoreInsights = createAsyncThunk(
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

      const response = await client.get("/user/blog", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        params: params
      });
      // console.log("loadMoreOffers",response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error, "get offer list error");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);