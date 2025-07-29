import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import client from "../axios-baseurl";

// Async thunk for fetching logos
export const getLogo = createAsyncThunk(
  "logos/getLogo",
  async (type, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;
    try {
      const response = await client.get(`/user/auth/signup-basic-module?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response, "get Logo API");

      if (response.status === 200) {
        return {
          type,
          logo: response.data.data[0] || {},
          url: response.data.data[0]?.url || "",
        };
      }
    } catch (error) {
      console.error("Error fetching logos:", error);
      return rejectWithValue(error.response?.data || "Error fetching logos");
    }
  }
);
