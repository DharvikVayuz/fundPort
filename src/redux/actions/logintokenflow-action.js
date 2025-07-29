import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";


export const loginTokenFlow = createAsyncThunk("loginTokenFlow", async (token, { rejectWithValue }) => {
    try {
        console.log('token......',token);
        const response = await client.put("/user/auth/login-token", token, {
            withCredentials: true
        });
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});