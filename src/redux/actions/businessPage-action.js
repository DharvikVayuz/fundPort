import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getAllBusiness = createAsyncThunk("getAllBusiness", async ({ page=1, sort_by = 'date_asc', query }, { rejectWithValue }) => {

    try {
        // console.log("business-page action:getAllBusiness");
      let params = new URLSearchParams();
      if (page) params.append('page', page);
      if (sort_by) params.append('sort_by', sort_by);
      if (query) params.append('query', query);
      const response = await client.get(`/business/user-business-card${(params) && `?${params}`}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
        },
      });

      // console.log("response.data",response.data);
      
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  });
export const getBusinessDropdown = createAsyncThunk("getBusinessDropdown", async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    const response = await client.get("/business/user-business-card", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const formattedOptions = response.data?.data?.map((business) => ({
      label: business.businessName, // The display text
      value: business._id, // The unique identifier
    }));
    return formattedOptions
    // setAllBusiness(formattedOptions);
  } catch (err) {
    // console.log(err, "get business list error");
    setError(err);
  } finally {
  }
});
export const getMoreBusiness = createAsyncThunk("getMoreBusiness", async ({ page, sort_by = 'date_asc', query }, { rejectWithValue }) => {

    try {
        // console.log("business-page action:getMoreBusiness , page",page);
      let params = new URLSearchParams();
      if (page) params.append('page', page);
      if (sort_by) params.append('sort_by', sort_by);
      if (query) params.append('query', query);
      const response = await client.get(`/business/user-business-card${(params) && `?${params}`}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
        },
      });

      // console.log("response.data",response.data);
      
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  });