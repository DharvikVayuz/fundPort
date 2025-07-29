import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";

export const getService = createAsyncThunk(
  "document/getService",
  async (_, { rejectWithValue }) => {

    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const response = await client.get("/application/services", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        
      });
      if (response.status === 200 && response.data.services) {
        return {
          caseId: response.data?.services,
          total: response?.data?.services?.length
      }
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Return a meaningful error message to the rejected action
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

export const getPaymentTransaction = createAsyncThunk("getPaymentTransaction", async ({ page, query }, { rejectWithValue }) => {
  try {
      const params = new URLSearchParams();
      if (page) params.append("page", page);
      if (query) params.append("query", query);
      const response = await client.get(`/application/transaction?${params.toString()}`, {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
          },
      });

      if (response?.data?.code == 200 || response?.data?.code == 201) {
          return {
              paymentHistory: response.data?.data,
              totalPayments: response.data?.total
          }
      } else {
          return rejectWithValue(response?.data?.message);
      }
  } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});
// export const getServiceData = createAsyncThunk(
//     "document/getServiceData",
//     async ({formId,serviceId}, { rejectWithValue }) => {
//       try {
//         const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

//         if (!token) {
//           return rejectWithValue("Authentication token not found");
//         }
  
//         const response = await client.post("/application/caseId",{formId,serviceId}, {
         
//               headers: {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                   'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
//               },
          
//         });
  
//         if (response.status === 200 ) {
//           return response.data.caseIds; // Return the services array
//         } else {
//           return rejectWithValue("Unexpected response structure from server");
//         }
//       } catch (error) {
//         console.log(error, "error fething")
//         // Return a meaningful error message to the rejected action
//         return rejectWithValue(
//           error.response?.data?.message || "Failed to fetch services"
//         );
//       }
//     }
//   );
export const getServiceData = createAsyncThunk(
  "document/getServiceData",
  async ({ formId, serviceId, businessId, search }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const params = new URLSearchParams()
      // Construct payload dynamically
      const payload = {};
      if (formId) payload.formId = formId;
      if (serviceId) payload.serviceId = serviceId;
      if (businessId) payload.businessId = businessId;
      if(search) params.append("query", search)
      const response = await client.post("/application/caseId", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params
      });

      if (response.status === 200) {
        return response.data.caseIds; // Return the filtered case IDs
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      console.log(error, "Error fetching service data");
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch service data"
      );
    }
  }
);

export const loadMoreServiceData = createAsyncThunk(
  "document/loadMoreServiceData",
  async ({ formId, serviceId, businessId, search, page }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) return rejectWithValue("Token missing");

      const payload = {};
      if (formId) payload.formId = formId;
      if (serviceId) payload.serviceId = serviceId;
      if (businessId) payload.businessId = businessId;

      const params = new URLSearchParams();
      if (search) params.append("query", search);
      params.append("page", page);
      params.append("limit", 10);

      const response = await client.post("/application/caseId", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      return {
        data: response.data.caseIds,
        total: response.data.totalCount,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Load more failed");
    }
  }
);


//   export const getUserServices = createAsyncThunk("getUserServices", async ({page,sort_by='date_desc',query,categoryId,subCategoryId}, { rejectWithValue }) => {
//     try {
//         let params=new URLSearchParams();
//         if(page) params.append('page',page);
//         if(sort_by) params.append('sort_by',sort_by);
//         if(query) params.append('query',query);
//         if(categoryId) params.append('categoryId',categoryId);
//         if(subCategoryId) params.append('subCategoryId',subCategoryId);
//         const response = await client.get(`/user/service${params&&`?${params}`}`,{
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
//             },
//           });
//         console.log(response,'services..');
//         if(response?.data?.code==200||response?.data?.code==201){
//             return response.data;
//         }else{
//             return rejectWithValue(response?.data?.message);            
//         }
//     } catch (error) {
//         return rejectWithValue(error?.response?.data?.message || error?.message);
//     }
// });
export const getfolderData = createAsyncThunk(
  "document/getfolderData",
  async ({ id, query }, { rejectWithValue }) => {
    console.log("app id", id);

    try {
      // Prepare the params to be sent
      let params = new URLSearchParams();
      if (query) params.append('query', query);

      // Get the token from localStorage
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      // Make the GET request with the query parameters
      const response = await client.get(`/application/documents?applicationId=${id}&${params.toString()}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Using token directly here
        },
      });

      if (response.status === 200) {
        return response.data.forms; // Return the forms data from the response
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Check for network or server errors
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

export const getUserFolders= createAsyncThunk(
  "document/getUserFolders",
  async ({search}, { rejectWithValue }) => {
    console.log("local storage",JSON.parse(localStorage.getItem('userInfo'))?.token);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      const params = new URLSearchParams(); 

      if(search) params.append("query", search);
      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const response = await client.get("/document/folder", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
            params
        
      });

      console.log(response, "user folders");
      if (response.status === 200 ) {
        return {
          userFolders : response?.data?.data,
          totalUserFolders : response?.data?.total
        } // Return the services array
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Return a meaningful error message to the rejected action
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);
export const addUserFolders= createAsyncThunk(
  "document/addUserFolders",
  async ({folderName}, { rejectWithValue }) => {
    console.log("local storage",JSON.parse(localStorage.getItem('userInfo'))?.token);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const response = await client.post("/document/folder",{folderName}, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        
      });

      console.log(response, "user folders");
      if (response.status === 200 ) {
        return {
          folderData : response?.data?.data,
        } // Return the services array
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Return a meaningful error message to the rejected action
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

export const getUserDocuments= createAsyncThunk(
  "document/getUserDocuments",
  async ({folderId, search}, { rejectWithValue }) => {
    console.log("local storage",JSON.parse(localStorage.getItem('userInfo'))?.token);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const params = new URLSearchParams(); 
      if(folderId) params.append("folderId", folderId);
      if(search) params.append("query", search)
      const response = await client.get("/document/uploaded-document", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
            params
        
      });

      console.log(response, "user folders");
      if (response.status === 200 ) {
        return {
          userDocuments : response?.data?.data,
          totalUserDocuments : response?.data?.total
        } // Return the services array
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Return a meaningful error message to the rejected action
      console.log(error, "fetch doc error")
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

export const uploadUserDocuments= createAsyncThunk(
  "document/uploadUserDocuments",
  async ({formData, file}, { rejectWithValue }) => {
    console.log("local storage",JSON.parse(localStorage.getItem('userInfo'))?.token);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const response = await client.put("/document/upload-document",formData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        
      });

      console.log(response, "user documents");
      if (response?.data?.code === 200 ) {
        console.log("inisde the stuoid doc block")
        toast.success(response?.data?.message || "Document Uploaded!")
        return {
          documentData : response?.data?.data,
        } // Return the services array
      }
    } catch (error) {
      // Return a meaningful error message to the rejected actionsole
      console.log(error, "error form the action")
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload document!"
      );
    }
  }
);