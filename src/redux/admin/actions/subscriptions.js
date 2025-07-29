import SubscriptionsApis from '../../../constants/APIList/suscriptions';
import axios from 'axios';
import { getSubscriptions, updateAdding, updateLoading, updateStatusState, updateStatusLoading, getSUbscriptionsById } from '../../admin/slices/subscriptionSlice';
import { toast } from 'react-toastify';
const authToken = localStorage.getItem('authToken');

export const getAllSubscriptions = (limit = 10, page = 1, search = "", id) => {

    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));
            let api = `${SubscriptionsApis.getSubscriptions}?page=${page}&limit=${limit}&serviceId=${id}`
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "get subscriptions")
            if (response.status == 200) {
                dispatch(getSubscriptions({
                    subscriptionList: response.data.data || [],
                    totalCount: response.data.totalCount || 0,
                }))
                dispatch(updateLoading(false))

            }
        } catch (error) {
            dispatch(updateLoading(false));
            console.log(error)

        }
    }
}
export const getSingleSubscription = (subscriptionId) => {

    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));

          const  api = `${SubscriptionsApis.getSubscriptions}?subscriptionId=${subscriptionId}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            
            if (response.status == 200) {
                dispatch(getSUbscriptionsById(response.data.data[0]))
                dispatch(updateLoading(false))

            }
        } catch (error) {
            dispatch(updateLoading(false));
            console.log(error)

        }
    }
}

export const addSubscriptions = (subscriptions, navigate) => {

    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.post(SubscriptionsApis.addSubscriptions, subscriptions, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response, "add sunscription")
            if (response.data.code === 404) {
                toast.warn(response.data.message)
                dispatch(updateAdding(false))
                navigate(`/admin/subscriptions/${subscriptions.serviceId}`)
                return
            }
            else if (response.status === 200) {
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                let existingServiceSubscriptions = JSON.parse(localStorage.getItem("ServiceSubscriptions")) || [];

                console.log(existingServiceSubscriptions, "existingServiceSubscriptions");

                // Add the new response data to the ServiceSubscriptions array
                existingServiceSubscriptions.push(response?.data?.data);

                // Save updated ServiceSubscriptions back to localStorage
                localStorage.setItem("ServiceSubscriptions", JSON.stringify(existingServiceSubscriptions));
                navigate(`/admin/subscriptions/${subscriptions.serviceId}`)
            }
        } catch (error) {
            console.log(error, "add subscription error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
        }
    }
}

export const editSubscriptions = (stepId, subscriptions, navigate, serviceId) => {
    console.log(serviceId, "serviceId")
    const { title, description, amount, type, duration } = subscriptions;

    // Create the data object to send in the request
    const data = { title, description, amount, type, duration };
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.put(`${SubscriptionsApis.editSubscriptions}/${stepId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit response")
            if (response.status == 200) {
                const updatedStep = response?.data?.data;
                toast.success(response.data.message);
                // dispatch(getSingleCategoryById(response.data.data))
                let existingSteps = JSON.parse(localStorage.getItem("ServiceSubscriptions")) || [];

                // Find the index of the step to update
                const subscriptionIndex = existingSteps.findIndex((entry) => entry._id === stepId);

                if (subscriptionIndex !== -1) {
                    console.log(" found id ")
                    // Update the step at the found index
                    existingSteps[subscriptionIndex] = updatedStep;
                    console.log(existingSteps, "Updated serviceSteps");

                    // Save the updated steps array back to localStorage
                    localStorage.setItem("ServiceSubscriptions", JSON.stringify(existingSteps));
                } else {
                    console.warn(`Step with ID ${stepId} not found in localStorage.`);
                }

                navigate(`/admin/subscriptions/${serviceId}`)
                dispatch(updateAdding(false))
            }
        } catch (error) {
            dispatch(updateAdding(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}

export const updateStatus = (subCategoryId, data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${SubscriptionsApis.editSubscriptions}/${subCategoryId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                console.log(response.data, "single category")
                dispatch(updateStatusState(response.data.data))
                // toast.success(response.data.message)
                dispatch(updateStatusLoading(false))
            }
        } catch (error) {
            console.log(error, "error updating status")
            toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))

        }
    }
}