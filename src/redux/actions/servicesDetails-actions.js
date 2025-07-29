import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { updateChildLoading } from "../slices/serviceDetailsSlice";
import toast from "react-hot-toast";

let transactionId = null;
export const getServiceDetails = createAsyncThunk("getServiceDetails", async ({ serviceId }, { rejectWithValue }) => {
    try {
        const response = await client.get(`/user/service-details?serviceId=${serviceId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });

        if (response?.data?.code == 200 || response?.data?.code == 201) {
            return response.data?.data[0];
        } else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const getStates = createAsyncThunk("getStates", async (_, { rejectWithValue }) => {
    try {
        const response = await client.get(`/admin/states`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });
        console.log(response, 'service-states..');
        if (response?.status == 200) {
            return response.data?.data;
        } else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const getStateWiseServiceCharge = createAsyncThunk("getStateWiseServiceCharge", async ({ serviceId, stateId }, { rejectWithValue }) => {
    try {
        const params = new URLSearchParams();
        if (serviceId) params.append("serviceId", serviceId);
        if (stateId) params.append("stateId", stateId);

        const response = await client.get(`admin/service-charges-statewise?${params.toString()}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });
        if (response?.status == 200) {
            return response.data?.data[0];
        } else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const verifyCoupon = createAsyncThunk(
    "settings/verifyCoupon",
    async ({ couponId, cost, title, discountType, usageType }, { rejectWithValue, dispatch }) => {

       dispatch( updateChildLoading({ couponId, loading: true }))
        try {
            const response = await client.put(`/application/is-valid-coupon`, { couponId }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                },
            });
            console.log(response?.data, "verifyCoupon data")
            if(response?.data.code === 200){
                dispatch( updateChildLoading({ couponId, loading: false }))
                return {
                    isCouponValid: response?.data?.data[0].isCouponValid,
                    cost: cost,
                    couponId: couponId,
                    title: title,
                    discountType: discountType,
                    usageType: usageType
                }               
            }else{
                return rejectWithValue(response?.data?.message || "Something went wrong.")
            }
 
        } catch (error) {
            dispatch( updateChildLoading({ couponId, loading: false }))
            if (error.code == 'ERR_NETWORK') {
                return rejectWithValue(error.message)
            } else {
                console.log(error, "netwroek error")
                return rejectWithValue(error.response?.data || "Something went wrong");
            }
        }
    }
);
export const verifyOffer = createAsyncThunk(
    "verifyOffer",
    async ({ offerId }, { rejectWithValue }) => {

        try {
            const response = await client.put(`/application/is-valid-coupon`, { offerId }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                },
            });
            console.log(response?.data.data[0], "verifyCoupon data")
            return {
                isCouponValid: response?.data?.data[0].isCouponValid,
            }
        } catch (error) {
            console.log(error, "netwroek error")
            if (error.code == 'ERR_NETWORK') {
                return rejectWithValue(error.message)
            } else {
                console.log(error, "netwroek error")
                return rejectWithValue(error.response?.data || "Something went wrong");
            }
        }
    }
);

export const talkToAdvisor = createAsyncThunk("talkToAdvisor", async (userData, { rejectWithValue }) => {
    console.log(userData, "user data ")
    try {
        const response = await client.post(`/admin/service-call-back`, userData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });
        console.log(response, 'service-states..');
        if (response?.status == 200) {
            return response.data;
        } else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {

        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const availService = createAsyncThunk("availService", async ({ userData, navigate }, { dispatch, rejectWithValue }) => {
    console.log("User Data",userData);
    try {
        const response = await client.post(`/application/avail-service`, userData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });

        
        console.log(response, 'service-states..');

        transactionId = response?.data?.data?.resultPayment?._id;

        if (response?.status == 200) {

            // let request = {
            //     "order_amount": response?.data?.data?.resultPayment?.amount,
            //     "order_currency": "INR",
            //     "order_id":response?.data?.data?.resultPayment?._id,
            //     "customer_details": {
            //     "customer_id": userData?._id,
            //     "customer_phone": userData?.phone.toString(),
            //     "customer_name": userData?.name,
            //     "customer_email": userData?.email
            //     },
            //   }

            // // dispatch(paymentStatus({  paymentStatus:"CAPTURED",transactionId : response?.data?.data._id}))

            // console.log("Request",request)
            // const paymentResponse = await dispatch(handlePayment(request));
            
            return response;
            
            // {
            //     transactionId: transactionId,
            //     paymentData: paymentResponse,
            // };
            
        } else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {

        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const paymentStatus = createAsyncThunk("paymentStatus", async ({ userData, navigate, navId, navigationId }, { rejectWithValue }) => {
    try {
        const response = await client.put(`/application/payment-status`, userData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });
        console.log(response, 'service-states..');
        if (response?.status == 200) {
            navigate(`/payment/create/${navId}/${navigationId}`)
            toast.success("Service availed successfully!Next, complete your business details. ")
            return response.data;
        } else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {

        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const getRatingDetails = createAsyncThunk("getRatingDetails", async ({ serviceId, page }, { rejectWithValue }) => {
    let params = new URLSearchParams();
    if (page) params.append('page', page);
    if (serviceId) params.append('serviceId', serviceId);
    try {
        const response = await client.get(`/user/rating-review?`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });

        if (response?.data?.code == 200 || response?.data?.code == 201) {
            return response.data?.data;
        } else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const ratingReview = createAsyncThunk(
    "ratingReview",
    async (ratingData, { rejectWithValue }) => {
        try {
            const response = await client.post(
                `user/rating-review`,
                ratingData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                    },
                }
            );

            if (response?.data?.code === 200 || response?.data?.code === 201) {
                return {
                    responseData: response.data,
                    ratingData: ratingData
                };
            } else {
                return rejectWithValue(response?.data?.message);
            }
        } catch (error) {
            console.log(error, "error manager");
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const handlePayment = createAsyncThunk("handlePayment", async (userData, { rejectWithValue }) => {
    console.log("Handle Payment",userData);
    try {
        const response = await client.post(`/application/payment`, userData, {
            headers: {
                Accept: "application/json", 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });
        console.log(response, 'service-states..');

        if(response?.status == 200) {
            return response.data
        }
        // if (response?.status == 200) {
        //     const userData = {
        //         paymentStatus: "CAPTURED", transactionId: response?.data?.data?.resultPayment?._id
        //     }

        //     dispatch(verifyPayment({ userData, navigate, navId: response?.data?.data?.resultApplication?._id }))
        //     return response.data;
         else if(response?.status == 900){
            return rejectWithValue("Temporary payment issue. Please retry shortly.");
        }else {
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {

        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});


export const verifyPayment = createAsyncThunk("verifyPayment", async ({ id, transactionId }, { rejectWithValue }) => {
    try {
        const res = await client.post(`/application/verify-cashfree-payment`, {orderId: id}, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });
        console.log(res, 'service-states..');

        if (res && res.data) {
            // Return only the necessary parts of the response (exclude headers)
            const { headers,config,request, ...responsePayload } = res; // Destructure to remove 'headers'
            return responsePayload;
        } else {
            return rejectWithValue(res?.data?.message);
        }
    } catch (error) {
        return rejectWithValue(error?.res?.data?.message || error?.message);
    }
});