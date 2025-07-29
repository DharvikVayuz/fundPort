import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import { childLoading, setTransactionLoading } from "../slices/paymentHistorySlice";

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

export const downloadInvoice = createAsyncThunk("downloadInvoice", async ({ transactionId }, { rejectWithValue, dispatch }) => {
    try {
        dispatch(childLoading({ transactionId, loading: true }));
        const response = await client.get(`/application/download-invoice?transactionId=${transactionId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        });

        if (response?.data?.code == 200 || response?.data?.code == 201) {
            dispatch(childLoading({transactionId, loading : false}))
            return response.data?.data
        } else {
            dispatch(childLoading({transactionId, loading : false}))
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {
        dispatch(childLoading({transactionId, loading : false}))
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

