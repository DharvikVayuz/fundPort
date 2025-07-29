import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";

export const getUser = createAsyncThunk("getUser", async (tokenFromUrl, { rejectWithValue }) => {
  try {
    const response = await client.get("/user/user-details", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokenFromUrl || JSON.parse(localStorage.getItem('userInfo'))?.token}`,
      },
    });
    console.log(response, "get response21");
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      //toast(response.data.message)
      return response.data?.data?.[0];
    } else {
      return rejectWithValue(response?.data?.message);
    }
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});
export const getUserBusiness = createAsyncThunk("getUserBusiness", async ({ page, sort_by = 'date_desc', query,tokenFromUrl }, { rejectWithValue }) => {
  try {
    let params = new URLSearchParams();
    if (page) params.append('page', page);
    if (sort_by) params.append('sort_by', sort_by);
    if (query) params.append('query', query);
    const response = await client.get(`/business/user-business-card${(params) && `?${params}`}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokenFromUrl||JSON.parse(localStorage.getItem('userInfo'))?.token}`,
      },
    });
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      return response.data;
    } else {
      return rejectWithValue(response?.data?.message);
    }
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});
export const getUserServices = createAsyncThunk("getUserServices", async ({ page, sort_by, query, categoryId, subCategoryId }, { rejectWithValue }) => {
  try {
    let params = new URLSearchParams();
    if (page) params.append('page', page);
    if (sort_by) params.append('sort_by', sort_by);
    if (query) params.append('query', query);
    if (categoryId) params.append('categoryId', categoryId);
    if (subCategoryId) params.append('subCategoryId', subCategoryId);
    const response = await client.get(`/user/service${(params) && `?${params}`}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
      },
    });
    console.log(response, 'services..');
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      return response.data;
    } else {
      return rejectWithValue(response?.data?.message);
    }
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

// export const requestChangeManager = createAsyncThunk("requestChangeManager", async (_, { rejectWithValue }) => {
//     try {

//         const response = await client.put(`/application/request-change-manager`,null,{
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
//             },
//           });
//         if(response?.data?.code==200||response?.data?.code==201){
//             return response.data;
//         }else{
//             return rejectWithValue(response?.data?.message);            
//         }
//     } catch (error) {
//         console.log(error, "error manager")
//         return rejectWithValue(error?.response?.data?.message);
//     }
// });

export const requestChangeManager = createAsyncThunk(
  "requestChangeManager",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.put(
        `/application/request-change-manager`,
        {}, // No body for the PUT request
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
        }
      );

      if (response?.data?.code === 200 || response?.data?.code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message);
      }
    } catch (error) {
      console.log(error, "error manager");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);




export const getRatingReviews = createAsyncThunk(
  "getRatingReviews",
  async (serviceId, { rejectWithValue }) => {
    try {
      console.log(serviceId, "service id from action")
      let params = new URLSearchParams();
      if (serviceId) params.append('serviceId', serviceId);
      params.append("page", 1)
      const response = await client.get(
        `user/rating-review?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
        }
      );

      if (response?.data?.code === 200 || response?.data?.code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message);
      }
    } catch (error) {
      console.log(error, "error manager");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);







export const updateServiveProgress = createAsyncThunk("updateServiveProgress", async ({ page ,businessId,status,tokenFromUrl}, { rejectWithValue }) => {
  try {
    let params = new URLSearchParams();
    if (page) params.append('page', page);
    if(businessId) params.append('businessId',businessId);
    if(status) params.append('status',status);
    // if(categoryId) params.append('categoryId',categoryId);
    // if(subCategoryId) params.append('subCategoryId',subCategoryId);
    const response = await client.get(`/user/service-progress-update${(params) && `?${params}`}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokenFromUrl || JSON.parse(localStorage.getItem('userInfo'))?.token}`,
      },
    });
    console.log(response, 'services..');
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      return {
        serviceProgressList : response.data, 
        status : status,
        total : response?.data?.total
      };
    } else {
      return rejectWithValue(response?.data?.message);
    }
  } catch (error) {
    console.log(error, "error")
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});



export const getMoreService = createAsyncThunk("getMoreService", async ({ page, sort_by = 'date_desc', query }, { rejectWithValue }) => {

  try {
    console.log("business-page action:getMoreBusiness , page", page);
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

    console.log("response.data", response.data);

    if (response?.data?.code == 200 || response?.data?.code == 201) {
      return response.data;
    } else {
      return rejectWithValue(response?.data?.message);
    }
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});


export const getMoreServiceUpdate = createAsyncThunk("getMoreServiceUpdate", async ({ page, sort_by = 'date_asc', status }, { rejectWithValue }) => {

  try {
      // console.log("business-page action:getMoreBusiness , page",page);
      console.log("page",page);
    let params = new URLSearchParams();
    if (page) params.append('page', page);
    if (status) params.append('status', status);
    // if (sort_by) params.append('sort_by', sort_by);
    // if (query) params.append('query', query);
    const response = await client.get(`/user/service-progress-update${(params) && `?${params}`}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
      },
    });

    // console.log("response.data",response.data);
    
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      return {
        serviceProgressList : response.data, 
        status : status,
        totalCount : response?.data?.total
      };
    } else {
      return rejectWithValue(response?.data?.message);
    }
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const requestCallBack = createAsyncThunk(
  "requestCallBack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.post(
        `/user/callback-request`,
        {}, // No body for the PUT request
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
        }
      );

      if (response?.data?.code === 200 || response?.data?.code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message);
      }
    } catch (error) {
      console.log(error, "error manager");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);



export const getbannerAdvertisement = createAsyncThunk("getbannerAdvertisement", async ({page,tokenFromUrl}, { rejectWithValue }) => {

  const params  = new URLSearchParams(); 

  if(page) params.append("page", page);
  try {
    const response = await client.get(`/user/seen-banner?${params && params.toString()}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokenFromUrl || JSON.parse(localStorage.getItem('userInfo'))?.token}`,
      },
    });
   console.log(response,"RESPONSE ADVER");
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      //toast(response.data.message)
      return response.data?.data;
    } else {
      return rejectWithValue(response?.data?.message);
    }
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});


export const updateBannerAdvertisement = createAsyncThunk(
  "updateBannerAdvertisement", 
  async (bannerId, { rejectWithValue }) => {
    try {
      const response = await client.put("/user/seen-banner",  { bannerId },{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
        },
      }
         
      )

      if (response?.data?.code === 200 || response?.data?.code === 201) {
        return response.data?.data;
      } else {
        return rejectWithValue(response?.data?.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);
