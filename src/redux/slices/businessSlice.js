import { createSlice } from "@reduxjs/toolkit";
import { updateKYCDetails, updateFundingDetails, fetchUserBusinessCard, getBusiness, registrationDetails, updateRegistrationDetails, updateAddressDetails, updateFinancialDetails, getBusinessFromMCA } from "../actions/business-action";
import toast from "react-hot-toast";
import { s } from "framer-motion/client";
import { formatDate } from "../../utils";

// Define initial state with a structure similar to the API data you want
const initialState = {
  business: {
    registration: {
      typeOfBusiness: "",
      businessName: "",
      businessNumber:"",
      cinNumber: "",
      roleOfCompany: "",
      yearOfStablish: "",
      headQuarterLocation: "",
      industryId: "",
      subIndustryId: "",
      sizeOfCompany: "",
      funded: "",
      about:"",

      industries:[],
      subindustries:[]
    },
    address: {
        businessAddressL1: "",
        businessAddressL2: "",
        businessAddressPin: "",
        businessAddressState: "",
        businessAddressCity: "",
        communicationAddressL1: "",
        communicationAddressL2: "",
        communicationAddressPin: "",
        communicationAddressCity: "",
        communicationAddressState: ""
    },
    financial: {
      financialDetails: {
        // capital: "",
        authorizedCapital:"",
        paidCapital:"",
        revenue: "",
        profit: "",
        pat: "",
        grossMargin: "",
        loans: "",
      }
    },
    kyc: {
      kycDetails: {
        // kycUser: "",
        id: "",
        addressProof: ""
      }
    },
    funding: {
      fundingRequirement: {
        lookingForFunding: "",
        existingBusinessName: ""
      }
    },
    formStep: 1
  },
  businessByMCA:null,
  businessId: null,  
  owner_data: null,
  active:null,
  loading: false,
  loadingMCA:false,
  error: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessId(state, action) {
      state.businessId = action.payload;
    },
    createBusiness(state, action) {
      const { section, data } = action.payload;
      state.business[section] = { ...state.business[section], ...data };
    },
    resetBusiness(state) {
      localStorage.setItem("hideOverflow", "true");
      document.body.style.overflow = "hidden";
      return initialState;
    },
    setLoaderOff(state){
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.loading = false;

        const { payload } = action;

        // Map the API response data into the initialState structure
        state.business = {
          registration: {
            typeOfBusiness: payload.typeOfBusiness || "",
            businessName: payload.businessName || "",
            businessNumber: payload.businessNumber||"",
            active :payload.active||"",
            cinNumber: payload.cinNumber || "",
            roleOfCompany: payload.roleOfCompany||"",  
            yearOfStablish: payload.yearOfStablish || "",
            headQuarterLocation: payload.headQuarterLocation || "",
            industryId: payload?.industries[0]?._id || "",
            subIndustryId: payload?.subindustries[0]?._id || "",
            sizeOfCompany: payload.sizeOfCompany || "",
            funded: payload.funded || "",
            about:payload.about || "",
            industries: payload?.industries || [],
            subindustries: payload?.subindustries || []
          },
          address: {
            
              businessAddressL1: payload.businessAddressL1 || "",
              businessAddressL2: payload.businessAddressL2 || "", // If provided
              businessAddressPin: payload.businessAddressPin || "",
              businessAddressState: payload.businessAddressState || "", // If provided
              businessAddressCity: payload.businessAddressCity || "",
           
            
              communicationAddressL1: payload.communicationAddressL1 || "", // If provided
              communicationAddressL2: payload.communicationAddressL2 || "", // If provided
              communicationAddressPin: payload.communicationAddressPin || "",
              communicationAddressCity: payload.communicationAddressCity || "",
              communicationAddressState: payload.communicationAddressState || "" // If provided
         
          },
          financial: {
              // capital: payload.capital || "", 
              authorizedCapital:payload.authorizedCapital || "",
              paidCapital:payload.paidCapital || "", 
              revenue: payload.revenue || "", 
              profit: payload.profit || ""   , 
              pat: payload.pat || ""   , 
              grossMargin: payload.grossMargin || ""   , 
              loans: payload.loans || ""   , 
          },
          kyc: {
              // kycUser: payload.kycUser || "", 
              id: payload.id || "",  
              addressProof: payload.addressProof || ""
          },
          funding: {
              lookingForFunding: payload.lookingForFunding, 
              existingBusinessName: payload.existingBusinessName || "" ,
              stageOfBusiness: payload.stageOfBusiness || "",
          },
          formStep: payload.formStep || 1
        };
        
        state.businessId = payload?._id || "",
        state.owner_data = payload?.owner_data[0] || "",
        state.active = payload?.active || ""
      })
      .addCase(getBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(getBusinessFromMCA.pending, (state) => {
        state.loadingMCA = true
        state.businessByMCA =null;
      })
      .addCase(getBusinessFromMCA.fulfilled, (state, action) => {
        state.loadingMCA = false
        const payload = action?.payload;
        // console.log("getBusinessFromMCA.fulfilled",payload);

        state.businessByMCA = {
          registration : {
            businessName: payload?.companyName||"",
            typeOfBusiness:payload?.classification||"",
            about: payload?.companyDescription||"",
            cinNumber : payload?.cin||"",
            yearOfStablish: payload?.dateOfIncorporation && formatDate(payload?.dateOfIncorporation) || "",
            roleOfCompany: "",
            industry:  "",
            subIndustry:  "",
            headQuarterLocation: payload?.businessAddress?.state||"",
            sizeOfCompany:"",
            funded:"",

          },
          address: {
            
              businessAddressL1: payload?.businessAddress?.addressLine1 || "",
              businessAddressL2: payload?.businessAddress?.addressLine2 || "", // If provided
              businessAddressPin: payload?.businessAddress?.pincode || "",
              businessAddressState: payload?.businessAddress?.state || "", // If provided
              businessAddressCity: payload?.businessAddress?.city || "",
           
            
              communicationAddressL1: payload?.registeredAddress?.addressLine1 || "", // If provided
              communicationAddressL2: payload?.registeredAddress?.addressLine2 || "", // If provided
              communicationAddressPin: payload?.registeredAddress?.pincode || "",
              communicationAddressCity: payload?.registeredAddress?.city || "",
              communicationAddressState: payload?.registeredAddress?.state || "" // If provided
         
          },
          financial: {
                  // capital: "",  
                  authorizedCapital:"",
                  paidCapital:"",
                  revenue:"", 
                  profit:""    
              },
          kyc: {
              // kycUser: "", 
              id:  payload?.pan||"",  
              addressProof: ""
          },
          funding: {
                  lookingForFunding:"", 
                  existingBusinessName: "" ,
                  stageOfBusiness:""
              }
        }


      })
      .addCase(getBusinessFromMCA.rejected, (state, action) => {

        state.loadingMCA = false
        // state.error = action.payload
        // console.log("getBusinessFromMCA.rejected",action.payload);
        state.businessByMCA = null
        // state.business = null
        toast.error(action?.payload?.message || "Unable to get business, please try again later");
      })


      builder.addCase(registrationDetails.pending, (state,action)=>{
          // console.log("registrationDetails.pending",action.payload);
          state.loading = true;
          
      }).addCase( registrationDetails.rejected, (state,action)=>{
        // console.log("registrationDetails.rejected",action.payload);
        state.loading = false;
        toast.error("Registration details not saved")
        

      }).addCase( registrationDetails.fulfilled, (state,action)=>{
        // console.log("registrationDetails.fulfilled",action.payload);
        state.businessId = action.payload?.businessId;
        state.business.registration = action.payload?.data;
        state.loading = false;
        toast.success("Registration details saved")
      })



      builder.addCase(updateRegistrationDetails.pending, (state,action)=>{
          // console.log("updateRegistrationDetails.pending",action.payload);
          state.loading = true;
          
      }).addCase( updateRegistrationDetails.rejected, (state,action)=>{
        // console.log("updateRegistrationDetails.rejected",action.payload);
        toast.error("Registration details not saved")
        state.loading = false;
        

      }).addCase( updateRegistrationDetails.fulfilled, (state,action)=>{
        // console.log("updateRegistrationDetails.fulfilled",action.payload?.data);
        toast.success("Registration details saved")
        state.loading = false;
        state.business.registration = action.payload?.data;
      })


      builder.addCase(updateAddressDetails.pending, (state,action)=>{
          // console.log("updateAddressDetails.pending",action.payload);
          state.loading = true;
          
      }).addCase( updateAddressDetails.rejected, (state,action)=>{
        // console.log("updateAddressDetails.rejected",action.payload);
        toast.error("Address details not saved")
        state.loading = false;

      }).addCase( updateAddressDetails.fulfilled, (state,action)=>{
        // console.log("updateAddressDetails.fulfilled",action.payload?.data);
        state.business.address = action.payload?.data;
        state.loading = false;
        toast.success("Address details saved")
      })


      builder.addCase(updateFinancialDetails.pending, (state,action)=>{
          // console.log("updateFinancialDetails.pending",action.payload);
          state.loading = true;
          
      }).addCase( updateFinancialDetails.rejected, (state,action)=>{
        // console.log("updateFinancialDetails.rejected",action.payload);
        toast.error("Financial details not saved")
        state.loading = false;

      }).addCase( updateFinancialDetails.fulfilled, (state,action)=>{
        // console.log("updateFinancialDetails.fulfilled",action.payload?.data);
        state.business.financial = action.payload?.data;
        state.loading = false;
        toast.success("Financial details saved")
      })


      builder.addCase(updateKYCDetails.pending, (state,action)=>{
          // console.log("updateKYCDetails.pending",action.payload);
          state.loading = true;
          
      }).addCase( updateKYCDetails.rejected, (state,action)=>{
        // console.log("updateKYCDetails.rejected",action.payload);
        toast.error("KYC details not saved")
        state.loading = false;

      }).addCase( updateKYCDetails.fulfilled, (state,action)=>{
        // console.log("updateKYCDetails.fulfilled",action.payload?.data);
        state.business.kyc = action.payload?.data;
        state.loading = false;
        toast.success("KYC details saved")
      })


      builder.addCase(updateFundingDetails.pending, (state,action)=>{
          // console.log("updateKupdateFundingDetailsYCDetails.pending",action.payload);
          state.loading = true;
          
      }).addCase( updateFundingDetails.rejected, (state,action)=>{
        // console.log("updateFundingDetails.rejected",action.payload);
        toast.error("Funding details not saved")
        state.loading = false;

      }).addCase( updateFundingDetails.fulfilled, (state,action)=>{
        // console.log("updateFundingDetails.fulfilled",action.payload?.data);

        state.business.funding = action.payload?.data;
        state.loading = false;
        toast.success("Funding details saved")
      })
  }
});

export const { setBusinessId, createBusiness, resetBusiness,setLoaderOff } = businessSlice.actions;

export default businessSlice.reducer;
