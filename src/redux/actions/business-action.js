import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getBusiness = createAsyncThunk("getBusiness", async ({businessId}, { rejectWithValue }) => {
  // console.log("BUSINESS ID",businessId)
try {
        const response = await client.get(`/business/business-details?businessId=${businessId}`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        // console.log(response);
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data?.data?.[0];
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const getBusinessFromMCA = createAsyncThunk(
  "getBusinessFromMCA",
  async ({ cinNumber }, { rejectWithValue }) => {
    try {
      const response = await client.post(`/business/mca-business-registration-detail`,
        {
          cinNumber: cinNumber,
          fetchType:"company",
          callBackUrl:"https://preproduction.signzy.tech"
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
        }
      )
      // console.log(response);
      if (response && response?.data) {
        return response.data?.result?.companyData;
        
      } else {
        // console.log("error");
        
        // return rejectWithValue(response?.data?.message)
      }
    } catch (error) {
      // console.log(error?.response?.data?.error);
      
      return rejectWithValue(error?.response?.data?.error)
    }
  }
)


export const registrationDetails = createAsyncThunk("registrationDetails", async (data,{ rejectWithValue }) => {
    try {
        const response = await client.post(`/business/registration-details`,data, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        // console.log(response);
        if(response?.data?.code==200||response?.data?.code==201){
            return {
              businessId : response.data?.data?._id,
              data : data
            };
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const updateRegistrationDetails = createAsyncThunk("updateRegistrationDetails", async ( data ,{ rejectWithValue }) => {
  try {
      const response = await client.put(`/business/registration-details`,data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          }, 
        });
      // console.log("response",response);
      if(response?.data?.code==200||response?.data?.code==201){
          // return response.data?.data?.[0];
          return {data:data}
      }else{
          return rejectWithValue(response?.data?.message);            
      }
  } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});



// Update address details
export const updateAddressDetails = createAsyncThunk(
  "business/updateAddressDetails",
  async ( data , { rejectWithValue }) => {
    try {
      const response = await client.put(
        `/business/address-details`, 
        data, // Send `data` as the body of the PUT request
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
         // Optionally pass businessId as query params, or you can include it in the body
        }
      );
      // return response.data;
      return {data:data}
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to update address details.");
    }
  }
);


// Update financial details

export const updateFinancialDetails = createAsyncThunk(
  "business/updateFinancialDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.put(
        `/business/finance-details`, 
        data, // Send `data` as the body of the PUT request
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
   // Optionally pass businessId as query params
        }
      );
      // return response.data;
      return {data:data}
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to update financial details.");
    }
  }
);


// Update KYC details
export const updateKYCDetails = createAsyncThunk(
  "business/updateKYCDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.put(
        `/business/kyc-details`, 
        data, // Send `data` as the body of the PUT request
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
           // Optionally pass businessId as query params
        }
      );
      // return response.data;
      return {data:data}
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to update KYC details.");
    }
  }
);


// Update funding details
export const updateFundingDetails = createAsyncThunk(
  "business/updateFundingDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.put(
        `/business/funding-details`, 
        data, 
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
        }
      );
      // return response.data;
      return {data:data}
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to update funding details.");
    }
  }
);


// Get user business card
export const fetchUserBusinessCard = createAsyncThunk(
  "business/fetchUserBusinessCard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(`/business/user-business-card`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            }}); // GET API for user business card
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to fetch user business card.");
    }
  }
);



