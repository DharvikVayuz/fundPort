import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";

export const getWishList = createAsyncThunk(
    "wishlist/getWishList",
    async (params, { rejectWithValue }) => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("/user/service-wishlist", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:params
        });
        //console.log(response.data.data[0]?.service, "wishlist response");
        return response.data;
      } catch (error) {
        console.log(error, "wishlist error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
export const getMoreWishList = createAsyncThunk(
    "wishlist/getMoreWishList",
    async (params, { rejectWithValue }) => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("/user/service-wishlist", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:params
        });
        //console.log(response.data.data[0]?.service, "wishlist response");
        return response.data;
      } catch (error) {
        console.log(error, "wishlist error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );


  export const removeServiceWishlistData1 = createAsyncThunk("removeServiceWishlistData1", async (wishListData, { rejectWithValue }) => {
    console.log("API CALLING removeServiceWishlistData", wishListData)
    try {
        console.log("API CALLING removeServiceWishlistData")
        const response = await client.delete(`/user/service-wishlist`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
            data:wishListData
          });
        //  console.log("API CALLING removeServiceWishlistData")
        if(response?.data?.code==200||response?.data?.code==201){
            wishListData.message=response?.data?.message;
            toast.success(wishListData.message)
            return wishListData;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
      console.log(error, "error")
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});