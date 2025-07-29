import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";
import apiClient from "../../services/apiClient";

export const submitEditProfile = createAsyncThunk(
  "profile/submitEditProfile",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/user/user-details", formData, "application/json");

      if (response?.code === 200 ) {
        navigate("/profile");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);


//Update Profile Picture

export const updateProfilePicture = createAsyncThunk(
  "profile/updateProfilePicture",
  async ({ formData }, { rejectWithValue }) => {
    console.log(formData, "formData");

    try {
      const response = await apiClient.put("/user/auth/upload-file", formData, "multipart/form-data");
      return response; 
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const fetchWishlist = createAsyncThunk(
    "profile/fetchWishlist",
    async (_, { rejectWithValue }) => {
      try {
        const response = await client.get("/wishlist", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`,
          },
        });
        console.log(response, "Fetch Wishlist Response");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch wishlist");
      }
    }
  );

//   export const changePassword = createAsyncThunk(
//     "profile/changePassword",
//     async (formData, { rejectWithValue }) => {
//         console.log(formData, "formdata fropmm actions")
//         try {
//             const response = await client.put("/user/change-password", formData, {
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
//                 },
//             });
//             console.log(response, "change password response")
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Something went wrong");
//         }
//     }
// );