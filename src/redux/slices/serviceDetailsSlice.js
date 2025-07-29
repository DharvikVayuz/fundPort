import { createSlice, current } from "@reduxjs/toolkit";
import { getServiceDetails, getStates, ratingReview, getStateWiseServiceCharge, talkToAdvisor, verifyCoupon, paymentStatus, availService, verifyOffer, handlePayment, verifyPayment } from "../actions/servicesDetails-actions";
import { getRatingReviews } from "../actions/dashboard-action";
import toast from "react-hot-toast";
import { act } from "react";
import { FaLaptopHouse } from "react-icons/fa";
// Slice
const serviceDetailSlice = createSlice({
  name: "serviceDetails",
  initialState: {
    serviceDetailLoading: false,
    isStateLoading: false,
    error: null,
    success: {},
    subscription: [],
    cost: 0,
    statesList: [],
    stateWiseServiceCharge: {},
    isCouponVerifiedLoading: {},
    appliedCoupons: [],
    originalPrice: null,
    coupons: [],
    serviceCharge: 0,
    serviceTestimonials: [],
    isTalkToAdvisorLoading: false,
    averageRating: null,
    quotationDetails: [],
    isQuotationAvailable: false,
    serviceCost: 0,
    availServiceData: {},
    isServiceAvailing: false,
    isPaymentLoading: false,
    isPaymentSuccessful: false,
    totalSavings: 0,
    isQuotationAvailable: false,
    subscriptionId: "",
    isRatingReviewLoading: false,
    isRatingAdding: false,
    ratingReviewList: [],
    offerDetails: {},
    totalCouponDiscount: 0,
    finalPrice: 0,
    appliedOfferArray: [],
    appliedOffer: 0,
    priceBeforeCoupanAplled: 0,
    isOfferRemoved: false,
    callBackMessage : "",
    callBackHeading : "",
    isOfferVerifying : false,
    applyOffer : false,
  },
  reducers: {
    clearState: (state) => {
      state.serviceDetailLoading = false;
      state.error = null;
      state.success = null;
    },
    stePaymentDetails: (state, action) => {
      const { subscriptionCost, stateWiseServiceCharge, totalCost } = action.payload;
      console.log(action.payload)
      state.cost = totalCost;
      state.serviceCost = subscriptionCost
      state.serviceCharge = stateWiseServiceCharge

    },
    setAppliedOffer: (state, action) => {
      state.finalPrice = action.payload.finalPrice;
      state.offerPrice = action.payload.offerPrice;
      console.log(action.payload, "offer detail")
      if (action.payload.offerPrice) {
        state.totalCouponDiscount += Number(action.payload.offerPrice)
        state.availServiceData = {
          ...state.availServiceData,
          totalCouponDiscount: Number(action.payload.offerPrice)
        }
      } else {
        state.availServiceData = {
          ...state.availServiceData,
          totalCouponDiscount: 0
        }
      }
    },
    updateOfferDetails: (state, action) => {
      state.offerDetails = action.payload;

      console.log(action.payload, "data for offer")
      console.log(JSON.parse(JSON.stringify(state.appliedOfferArray, "data for offer")))
      console.log(current(state.appliedOfferArray), "data for offer")
      const existingOfferIndex = state.appliedOfferArray.findIndex(
        (coupon) => coupon.offerId === action.payload.offerId // Assuming each offer has a unique `id`
      );
      console.log(existingOfferIndex, "existingOfferIndex")
      if (existingOfferIndex !== -1) {
        // Update the existing offer
        state.appliedOfferArray[existingOfferIndex] = {
          ...state.appliedOfferArray[existingOfferIndex],
          ...action.payload,
        };
      } else {
        // Add the new offer
        state.appliedOfferArray.push(action.payload);
        console.log(current(state.appliedOfferArray), "data for offer")
      }
      state.availServiceData = {
        ...state.availServiceData,
        appliedCoupan : state.appliedOfferArray
      }
    },
    updateOriginalPrice : (state, action)=>{
      
      if(action.payload === "quotation"){
        state.originalPrice = state.originalPrice = state.success?.quotations[0]?.amount;
      }else if(action.payload === "subscription"){
        state.originalPrice = state.originalPrice = state.success?.subscription[0]?.amount;
      }else if(action.payload === "regular"){
        state.originalPrice = state.success?.cost;
      }
    },
    addCoupons: (state, action) => {
      const couponData = action.payload;
      console.log(couponData, "couponData");

      // Ensure payload is valid
      if (!couponData) {
        console.error("Invalid coupon data:", couponData);
        return;
      }

      // Ensure state.appliedCoupons is an array
      if (!Array.isArray(state.appliedCoupons)) {
        console.error("appliedCoupons is not an array:", state.appliedCoupons);
        state.appliedCoupons = [];
      }

      const isAlreadyAdded = state.appliedCoupons.some(coupon => coupon.id === couponData.id);
      if (isAlreadyAdded) {
        console.warn(`Coupon with id ${couponData.id} is already applied.`);
        return;
      }

      // Add the coupon at the start of the array
      state.appliedCoupons.unshift(couponData);
    },

    removeCoupon: (state, action) => {
      const { id } = action.payload;
      console.log(current(state.appliedCoupons), id);

      // Find the coupon that needs to be removed
      const couponToRemove = state.appliedCoupons.find((coupon) => coupon.couponId === id);
      console.log(JSON.parse(JSON.stringify(couponToRemove)), "coupon to remove")
      // If coupon is not found, just return
      if (!couponToRemove) {
        console.warn("Coupon not found for removal.");
        return;
      }

      // Remove the coupon from appliedCoupons
      state.appliedCoupons = state.appliedCoupons.filter((coupon) => coupon.couponId !== id);

      // Calculate the coupon discount
      let couponDiscount = 0;
      if (couponToRemove && couponToRemove.cost && state.priceBeforeCoupanAplled) {
        if(couponToRemove.discountType && (couponToRemove.discountType === "fixed" || couponToRemove.discountType === "amount")){
          couponDiscount = couponToRemove.cost
        }else{
          couponDiscount = (state.priceBeforeCoupanAplled * couponToRemove.cost) / 100;
        }
      }

      console.log(couponDiscount, "couponDiscount")
      // Get the price after the offer was applied using the calculateFinalPrice function

      // Check if the final price after offer is valid
      let newFinalPrice = state.finalPrice + couponDiscount;  // Reverting the effect of the coupon

      // Update the state with the new final price after removing the coupon
      state.finalPrice = newFinalPrice;

      // Update total savings after removing the coupon
      state.totalSavings -= couponDiscount;
      // Subtract the coupon discount
      let newcoupanDiscount = Number(state.totalCouponDiscount) - Number(couponDiscount)
      console.log(newcoupanDiscount, "newcoupanDiscount")
      state.totalCouponDiscount = Number(state.offerPrice?.toFixed(2))
      console.log(`Removed coupon with id ${id}. Discount of ${couponDiscount} removed. New cost: ${state.cost}`);
      const foundCoupon = state?.appliedOfferArray?.find(
        (coupon) => coupon.couponId === id
      );

      console.log(current(state.appliedOfferArray), "before removal appliedOfferArray");
      let arrayToManipulate = []
      if (foundCoupon) {
        state.isOfferRemoved = true
        console.log("Coupon found. Removing coupon and keeping the offer.");
        // Remove the coupon from the array
        arrayToManipulate = state.appliedOfferArray;
        arrayToManipulate = state.appliedOfferArray.filter(
          (coupon) => coupon.couponId !== id
        );
        state.appliedOfferArray = arrayToManipulate;
        // console.log(JSON.parse(JSON.stringify(arrayToManipulate)), "before inside appliedOfferArray");
      } else {
        console.log("Coupon not found. Returning without changes.");
        return;
      }
      let newPricetosend = state.offerPrice
      console.log(newPricetosend, "new price to send")
      state.availServiceData = {
        ...state.availServiceData,
        appliedCoupan: JSON.parse(JSON.stringify(arrayToManipulate)),
        totalCouponDiscount: Number(newPricetosend?.toFixed(2))
      };

      state.availServiceData = {
        ...state.availServiceData, 
        totalCouponDiscount : Number(newPricetosend?.toFixed(2))
      }

      console.log(JSON.parse(JSON.stringify(state.availServiceData)), "removed")

      // Reset coupon discount  // Clear applied coupon data
    },
    updateChildLoading : (state, action)=>{
      console.log("called")
      const { couponId, loading } = action.payload;
      console.log(couponId, loading, "froom")
      state.isCouponVerifiedLoading = {
        ...state.isCouponVerifiedLoading,
        [couponId]: loading
      };
    console.log(JSON.parse(JSON.stringify(state.isCouponVerifiedLoading)), "froom state")
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceDetails.pending, (state) => {
        state.serviceDetailLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getServiceDetails.fulfilled, (state, action) => {
        console.log(action.payload, 'service details');
        state.serviceDetailLoading = false;
        state.success = action.payload;
        state.subscription = action?.payload?.subscription;
        state.coupons = action.payload?.coupons;
        state.error = null;
        const selectedSubscription = action?.payload?.subscription?.find(
          (sub) => sub._id === localStorage.getItem("subscriptionId")
        );

        console.log(selectedSubscription, "selectedSubscription")
        // Set the original amount if a subscription is found, else use the amount in the object
        // const initialAmount = selectedSubscription ? selectedSubscription.amount : action.payload.cost;

        // state.originalPrice = initialAmount;
        if (!state.cost && action.payload?.cost) {
          state.cost = action.payload?.cost;
        }

        // if (state.serviceCharge) {
        //   state.cost = state.serviceCharge + state.subscription[0].amount;
        // }

        console.log(state.serviceCharge, "totalCost");
        state.averageRating = action.payload?.averageRating;
        state.quotationDetails = action.payload?.quotations;

        if (action.payload?.quotations?.length > 0) {
          state.isQuotationAvailable = true;
        } else {
          state.isQuotationAvailable = false;
        }


        // Check if a quotation is available and set cost
        // if (action.payload.quotations && action.payload.quotations.length > 0) {
        //   state.isQuotationAvailable = true;
        //   state.cost = action.payload.quotations[0].amount;
        //   state.originalPrice = action.payload.quotations[0].amount;
        // }

        console.log(action.payload, "acion pa")

        console.log("finalDaaa", JSON.parse(JSON.stringify(state.appliedOfferArray)))

        state.availServiceData = {
          serviceId: action.payload?._id,
          formId: action.payload?.formId,
          ...(action.payload?.quotations[0]?._id && { quotationId: action.payload.quotations[0]?._id }), // Conditionally add quotationId
          ...(selectedSubscription && { subscriptionId: selectedSubscription._id }),
          serviceDetails: {
            name: action.payload?.name,
            cost: selectedSubscription ? selectedSubscription.amount : action.payload?.cost,
            duration: selectedSubscription ? selectedSubscription.duration : action.payload?.duration,
          },
          // totalCouponDiscount: state.totalCouponDiscount,
          duration: selectedSubscription ? selectedSubscription.duration : action.payload?.duration,
          amount: state.cost,
          // appliedCoupan: state.appliedOfferArray,
          paymentMode: "Net Banking",
          paymentStatus: "PENDING",
          paymentDate: Date.now(),
        };
        console.log('Offer Discount Percent:', state.offerDetails?.discountPercent);
        console.log('Coupon Discount Percent:', state.availServiceData?.couponDiscountPercent);

        state.quotationId = action.payload?.quotationId;
        state.formId = action.payload?.formId;

        state.quotationId = action.payload?.quotationId;
        state.formId = action.payload?.formId;
      })

      .addCase(getServiceDetails.rejected, (state, action) => {
        state.serviceDetailLoading = false;
        state.error = action.payload;
        state.success = null;
        toast.error(action.payload)
        console.log(action.payload, "rejected")
      })
      .addCase(getStates.pending, (state) => {
        state.isStateLoading = true;
        state.error = null;
        state.statesList = null;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.isStateLoading = false;
        console.log(action.payload, "statesList")
        state.statesList = action.payload;
        console.log(action.payload, "slce")
        state.error = null;
        state.cost = action.payload.cost
      })
      .addCase(getStates.rejected, (state, action) => {
        state.isStateLoading = false;
        state.error = action.payload;
        state.statesList = null;
      })
      .addCase(getStateWiseServiceCharge.pending, (state) => {
        state.isStateLoading = true;
        state.error = null;
        state.stateWiseServiceCharge = null;
      })
      .addCase(getStateWiseServiceCharge.fulfilled, (state, action) => {
        state.isStateLoading = false;

        console.log(action.payload, "action state wise")
        const estimatedTotal  = action.payload;


        state.subscription = state.subscription?.map((subscription) => ({
          ...subscription,
          stateWiseServiceCharge: estimatedTotal,
        }));

        state.quotationDetails = state.quotationDetails?.map((quotation) => ({
          ...quotation,
          stateWiseServiceCharge: estimatedTotal
        }))
        state.stateWiseServiceCharge = action.payload;
        state.error = null;
        state.cost = action.payload?.cost;

        console.log(state.quotationDetails, "Updated subscription with service charge");
      })

      .addCase(getStateWiseServiceCharge.rejected, (state, action) => {
        state.isStateLoading = false;
        state.error = action.payload;
        state.stateWiseServiceCharge = null;
      })
      .addCase(verifyCoupon.pending, (state) => {
        state.isCouponVerifiedLoading = true;
      })
      .addCase(verifyCoupon.fulfilled, (state, action) => {
        state.isCouponVerifiedLoading = false;
        console.log(action.payload, "successful addition");
        const couponData = action.payload;
        console.log(couponData, "couponData");




        if(!action.payload.isCouponValid){
          toast.error("This coupon is not applicable to the selected service.")
          return;
        }else{
          if (!couponData) {
            console.error("Invalid coupon data:", couponData);
            return;
          }
  
          if (!Array.isArray(state.appliedCoupons)) {
            console.error("appliedCoupons is not an array:", state.appliedCoupons);
            state.appliedCoupons = [];
          }
  
          const isAlreadyAdded = state.appliedCoupons.some(coupon => coupon.couponId === couponData.couponId);
          if (isAlreadyAdded) {
            console.warn(`Coupon with id ${couponData.couponId} is already applied.`);
            toast.error("Coupon already applied!");
            return;
          }
          state.isOfferRemoved = false
          state.appliedCoupons.unshift(couponData);
  
          // Track the original price for reference
          if (!state.originalPrice) {
            state.originalPrice = state.finalPrice;
          }
  
          state.priceBeforeCoupanAplled = state.finalPrice;
  
          // Calculate the discount after considering any existing offers
          state.tempCost = state.finalPrice; // This already includes the offer's discount
          let discount = 0;
          let costToSend = 0
          if(action.payload.discountType === "amount" || action.payload.discountType === "fixed"){
            console.log("inside hehe ",state.finalPrice, couponData.cost)
            discount = couponData.cost;
            state.finalPrice = state.tempCost- discount;
            state.couponDiscount = discount;
            console.log(`Discount mila of ${discount} applied. New cost: ${state.cost}`);
          }else if (couponData.cost && state.tempCost) {
            discount = (state.tempCost * couponData.cost) / 100;
            state.finalPrice = state.tempCost - discount;
            costToSend = state.tempCost - discount
            state.couponDiscount = discount;
            console.log(`Discount of ${discount} applied. New cost: ${state.cost}`);
          }
  
          state.totalSavings = (state.totalSavings || 0) + discount;
          state.coupons = state.coupons.filter(coupon => coupon._id !== couponData.couponId);
          console.log(state.coupons, "applied coupon");
          const coupanDetails = {
            couponId: couponData.couponId,
            amount: discount,
            discountType: couponData.discountType,
            usage: couponData?.usageType,
            couponDiscount: couponData.cost,
          }
  
  
          // if id dont push 
          const foundCoupon = state?.appliedOfferArray?.find(
            (coupon) => coupon.couponId === coupanDetails.couponId
          );
  
          console.log(foundCoupon, "foundCoupon");
  
          if (foundCoupon) {
            console.log("Offer already exists. Do not add.");
            return;
          } else {
            console.log("Offer not found. Adding new offer.");
            // Add logic to add the offer here
            state.appliedOfferArray.push(coupanDetails); // Example logic
          }
          console.log("finalDaa2", JSON.parse(JSON.stringify(state.appliedOfferArray)));
          const newTotalCouponDiscount = Number(discount) +  Number(state.totalCouponDiscount) || 0; // Subtract old discount if any
          // state.totalCouponDiscount = newTotalCouponDiscount;
          console.log(newTotalCouponDiscount, "appliedOfferArray")
          state.availServiceData = {
            ...state.availServiceData,
            appliedCoupan: JSON.parse(JSON.stringify(state.appliedOfferArray)),
          };
          state.availServiceData = {
            ...state.availServiceData,
            amount: state.cost,
            totalCouponDiscount: Number(newTotalCouponDiscount || 0).toFixed(2),
          };
  
          // state.totalCouponDiscount += discount
          console.log(
            "Updated availServiceData with coupon ID and cost:",
            state.availServiceData
          );
        }
       
      })

      .addCase(verifyCoupon.rejected, (state, action) => {
        state.isCouponVerifiedLoading = false;
        state.error = action.payload;

      })
      .addCase(talkToAdvisor.pending, (state) => {
        state.isTalkToAdvisorLoading = true;
      })
      .addCase(talkToAdvisor.fulfilled, (state, action) => {
        state.isTalkToAdvisorLoading = false;
        console.log(action.payload, "talk to")
        console.log(action.payload.data, "response test")
        // toast.success(action.payload.message)
        if(action.payload?.data?.length === 0 ){
          state.callBackHeading = "You have already requested a call back!"
          state.callBackMessage = "You have already requested, our team will contact you shortly"
        }else{
          state.callBackHeading = "Call back requested."
          state.callBackMessage = "Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon."
        }

      })
      .addCase(talkToAdvisor.rejected, (state, action) => {
        state.isTalkToAdvisorLoading = false;
        toast.error(action.payload)
        console.log(action.payload, "rejected")
      })
      .addCase(availService.pending, (state) => {
        state.isServiceAvailing = true;
      })
      .addCase(availService.fulfilled, (state, action) => {
        state.isServiceAvailing = false;
        console.log(action.payload, "talk to")
        // toast.success(action.payload.message)
        state.appliedOfferArray = []

      })
      .addCase(availService.rejected, (state, action) => {
        state.isServiceAvailing = false;
        toast.error(action.payload)
        console.log(action.payload, "rejected")
      })
      .addCase(handlePayment.pending, (state) => {
        state.isServiceAvailing = true;
      })
      .addCase(handlePayment.fulfilled, (state, action) => {
        state.isServiceAvailing = false;
        console.log(action.payload, "talk to")
        // toast.success(action.payload.message)
        state.appliedOfferArray = []

      })
      .addCase(handlePayment.rejected, (state, action) => {
        state.isServiceAvailing = false;
        toast.error(action.payload)
        console.log(action.payload, "rejected")
      })
      .addCase(verifyPayment.pending, (state) => {
        state.isServiceAvailing = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isServiceAvailing = false;
        console.log(action.payload, "talk to")
        // toast.success(action.payload.message)
        state.appliedOfferArray = []

      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isServiceAvailing = false;
        toast.error(action.payload)
        console.log(action.payload, "rejected")
      })
      .addCase(paymentStatus.pending, (state) => {
        state.isServiceAvailing = true;
      })
      .addCase(paymentStatus.fulfilled, (state, action) => {
        state.isServiceAvailing = false;
        state.serviceDetails = {}
        state.appliedCoupons = []
        const originalCost = state.originalPrice
        state.cost = originalCost
        console.log(action.payload, "talk to")
        state.isPaymentSuccessful = true
        state.appliedOfferArray = []
        state.totalCouponDiscount = 0

      })
      .addCase(paymentStatus.rejected, (state, action) => {
        state.isServiceAvailing = false;
        toast.error(action.payload)
        state.isPaymentSuccessful = false
        console.log(action.payload, "rejected")
      })
      .addCase(getRatingReviews.pending, (state) => {
        state.isRatingReviewLoading = true;
      })
      .addCase(getRatingReviews.fulfilled, (state, action) => {
        state.isRatingReviewLoading = false;
        state.ratingReviewList = action.payload;
      })
      .addCase(getRatingReviews.rejected, (state) => {
        state.isRatingReviewLoading = false;
      })
      .addCase(ratingReview.pending, (state) => {
        state.isRatingAdding = true;
      })
      .addCase(ratingReview.fulfilled, (state, action) => {
        state.isRatingAdding = false;
      })
      .addCase(ratingReview.rejected, (state, action) => {
        state.isRatingAdding = false;
        toast.error(action.payload)
      })
      .addCase(verifyOffer.pending, (state)=>{
        state.isOfferVerifying = true
      })
      .addCase(verifyOffer.fulfilled, (state)=>{
        state.isOfferVerifying = false
      })
      .addCase(verifyOffer.rejected, (state)=>{
        state.isOfferVerifying = false
      })
  },
});

export const { clearState, updateChildLoading,  addCoupons,updateOriginalPrice, updateOfferDetails, removeCoupon, setAppliedOffer, stePaymentDetails } = serviceDetailSlice.actions;
export default serviceDetailSlice.reducer;