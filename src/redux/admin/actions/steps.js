import StepsAPIs from '../../../constants/APIList/StepsAPIs';
import axios from 'axios';
import { getSteps,updateLoading,updateStatusState,updateAdding, getStepById ,updateStatusLoading, deleteStepBId } from '../slices/stepsSlice';
import { toast } from 'react-toastify';
import { updateServiceDetailSteps } from '../slices/serviceSlice';
const authToken  = localStorage.getItem('authToken');

export const getAllSteps =( serviceId, id)=>{
  
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
            let api = `${StepsAPIs.getSteps}`
            if(id){
                api+= `?id=${id}`;
            }
            if(serviceId){
                api+= `?serviceId=${serviceId}`;
            }
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
           console.log(response, "checkl repsonse") 
            if(response.status == 200){
                if(id){
                    dispatch(getStepById(response.data.data[0]))
                }else{
                    dispatch(getSteps({
                        stepsList : response.data.data || [],
                    }))
                }
                dispatch(updateLoading(false))
                
            }else if(response.status = 400){
                dispatch(getSteps({
                    stepsList : [],
                }))
            }
        }catch(error){
            dispatch(updateLoading(false));
            console.log(error, "error yaha hai ")
            dispatch(getSteps({
                stepsList : [],
            }))
            // if(error.response.data.statusCode === 400){
            //     toast.warn(error.response.data.message)
            // }
        }
    }
}

// export const addSteps=(steps,serviceId, navigate)=>{
//     console.log(steps, "from add actions")
//     return async(dispatch)=>{
//         try{
//             dispatch(updateAdding(true))
//             const response = await axios.post(StepsAPIs.addSteps, steps, {
//                 headers : {
//                     Authorization : `Bearer ${authToken}`
//                 }
//             })
//             console.log(response, "add faq response")
//             if(response.status === 200){
//                 dispatch(updateAdding(false))
//                 toast.success(response.data.message);
//                 let existingServiceDetails = JSON.parse(localStorage.getItem("serviceDetails")) || [];
//                 const newEntry = { stepsDetails: response?.data?.data };

//                 // Append the new entry to the array
//                 existingServiceDetails.push(newEntry);

//                 // localStorage.setItem("serviceDetails", JSON.stringify(existingServiceDetails));
//                 // navigate(`/admin/steps/${serviceId}`)
//             }
//         }catch(error){
//             console.log(error, "add faq error");
//             dispatch(updateAdding(false))
//             toast.error(error.response.data.message)
//         }
//     }
// }

// export const addSteps = (steps, serviceId, navigate) => {
//     console.log(steps, "from add actions");
//     return async (dispatch) => {
//         try {
//             dispatch(updateAdding(true));
//             const response = await axios.post(StepsAPIs.addSteps, steps, {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`,
//                 },
//             });
//             console.log(response, "add steps response");
            
//             if (response.status === 200) {
//                 dispatch(updateAdding(false));
//                 toast.success(response.data.message);

//                 // Retrieve existing service details from localStorage
//                 let existingServiceDetails = JSON.parse(localStorage.getItem("serviceDetails")) || [];
               
//                 console.log(existingServiceDetails, "existingServiceDetails")
//                 // Find the relevant service by serviceId, or initialize a new service entry
                
//                 const newEntry = { stepsDetails: response?.data?.data };
               
//                 existingServiceDetails.push(newEntry);

//                 // Save updated service details back to localStorage
//                 localStorage.setItem("serviceDetails", JSON.stringify(existingServiceDetails));

//                 // Navigate to the steps page for the service
//                 // navigate(`/admin/steps/${serviceId}`);
//             }
//         } catch (error) {
//             console.log(error, "add steps error");
//             dispatch(updateAdding(false));
//             toast.error(error.response?.data?.message || "An error occurred while adding steps");
//         }
//     };
// };
export const addSteps = (steps, serviceId, navigate) => {
    console.log(steps, "from add actions");
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true));
            const response = await axios.post(StepsAPIs.addSteps, steps, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response, "add steps response");

            if (response.status === 200) {
                dispatch(updateAdding(false));
                toast.success(response.data.message);

                // Retrieve existing serviceSteps from localStorage, or initialize an empty array if not found
                let existingServiceSteps = JSON.parse(localStorage.getItem("serviceSteps")) || [];

                console.log(existingServiceSteps, "existingServiceSteps");

                // Add the new response data to the serviceSteps array
                existingServiceSteps.push(response?.data?.data);

                // Save updated serviceSteps back to localStorage
                localStorage.setItem("serviceSteps", JSON.stringify(existingServiceSteps));

                // Optionally, you can dispatch Redux action to update the store as well
                dispatch(updateServiceDetailSteps(response?.data?.data));

                // Navigate to the steps page for the service
                // navigate(`/admin/steps/${serviceId}`);
            }
        } catch (error) {
            console.log(error, "add steps error");
            dispatch(updateAdding(false));
            toast.error(error.response?.data?.message || "An error occurred while adding steps");
        }
    };
};

export const getSingleStep=(stepId)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateLoading(true));
        
            const response = await axios.get(`${StepsAPIs.getStepsById}/${stepId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response)
                
                dispatch(updateLoading(false))
            }
        }catch(error){
            console.log(error)
            dispatch(updateLoading(false))
            // toast.error(error.response.data.error)

        }
    }
}

// export const editStep=(stepId, step,serviceId, navigate)=>{
//     console.log(stepId, step, "edit step")
//     return async(dispatch)=>{
//         try{
//             dispatch(updateAdding(true))
//             const response = await axios.put(`${StepsAPIs.editSteps}/${stepId}`,step, {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`
//                 }
//             });
//             console.log(response, "edit response")
//             if(response.status == 200){
//                 const newServiceDetails = response?.data?.data;
//                 toast.success(response.data.message);
//                 // dispatch(getSingleCategoryById(response.data.data))
//                 // navigate(`/admin/steps/${serviceId}`)
//                 let existingServiceDetails = JSON.parse(localStorage.getItem("serviceDetails")) || [];
//                 let existingSrtepsDetails = JSON.parse(localStorage.getItem("serviceSteps")) || [];
//                 // Ensure `existingServiceDetails` is an array
//                 if (!Array.isArray(existingServiceDetails)) {
//                     existingServiceDetails = [];
//                 }
//                 console.log(stepsDetails, "stepsDetails")
//                 console.log(stepId, existingSrtepsDetails[0]._id, "ids")
//                 const existingIndex = existingServiceDetails.findIndex(
//                     (entry) => entry.stepsDetails?._id === stepId
//                 );
//                if(existingIndex !== -1){ 
//                 console.log(newServiceDetails, "newServiceDetails")   
//                 existingServiceDetails[existingIndex] = newServiceDetails
//                }
//                console.log(existingServiceDetails, "existingServiceDetails")
//                localStorage.setItem("serviceDetails", JSON.stringify(existingServiceDetails));
//                 console.log(existingIndex , "existing index")
//                 dispatch(updateAdding(false))
//             }
//         }catch(error){
//             dispatch(updateAdding(false))
//             console.log(error)  
//             toast.error(error.response.data.message)

//         }
//     }
// }
export const editStep = (stepId, step, serviceId, navigate) => {
    console.log(stepId, step, "edit step");
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true));
            const response = await axios.put(`${StepsAPIs.editSteps}/${stepId}`, {title : step.title,details: step.details, serviceId}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response, "edit response");

            if (response.status === 200) {
                const updatedStep = response?.data?.data; // Updated step data
                toast.success(response.data.message);

                // Retrieve existing steps from localStorage
                let existingSteps = JSON.parse(localStorage.getItem("serviceSteps")) || [];

                // Find the index of the step to update
                const stepIndex = existingSteps.findIndex((entry) => entry._id === stepId);

                if (stepIndex !== -1) {
                    console.log(" found id ")
                    // Update the step at the found index
                    existingSteps[stepIndex] = updatedStep;
                    console.log(existingSteps, "Updated serviceSteps");

                    // Save the updated steps array back to localStorage
                    localStorage.setItem("serviceSteps", JSON.stringify(existingSteps));
                } else {
                    console.warn(`Step with ID ${stepId} not found in localStorage.`);
                }

                dispatch(updateAdding(false));

                // Optional: Navigate to the steps page
                navigate(`/admin/steps/${serviceId}`);
            }
        } catch (error) {
            dispatch(updateAdding(false));
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while editing the step.");
        }
    };
};

export const updateStatus =(stepId, data, navigate)=>{
    return async(dispatch)=>{
        try{
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${StepsAPIs.editSteps}/${stepId}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                console.log(response.data, "single category")
                dispatch(updateStatusState(response.data.data))
                dispatch(updateStatusLoading(false))
            }
        }catch(error){
            console.log(error, "error")
            
            dispatch(updateStatusLoading(false))
           
        }
    }
}

export const deleteStep = (stepId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${StepsAPIs.deleteSteps}/${stepId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                dispatch(deleteStepBId(stepId));
                toast.success(response.data.message)
            }
            console.log(response, "delete response");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}