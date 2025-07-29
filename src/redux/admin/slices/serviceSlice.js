import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    serviceList: [],
    isAdding: false,
    totalPages: 0,
    service: {},
    totalCount: 0,
    diabled: false,
    childLoading: {},
    isStatusLoading: false,
    editPage: 1,
    activeCategories: [],
    activeSubCategories: [],
    activeSubCategoriesList: [],
    activeSelectedSubCategoriesList: [],
    getActiveBusinessEmailList: [],
    forms: [],
    delivrableVideoUrl: "",
    stepsVideoUrl: "",
    documentVideoUrl: "",
    uploadLoading: {
        deliverable: false,
        step: false,
        document: false,
    },
    buttonContent: "Upload Video",
    updateHeader: "",
    stepValue: 0,
    activeCategoryLoading: false,
    isStateWiseServiceLoading: false,
    stateWiseChargesList: [],
    stateWiseServiceChargesCount: null,
    singleServiceCharges: {},
    singleServiceLoading: false,
    editChargesPageNumber: 1,
    csvLoading: false,
    isServiceDetails: [],
    serviceFaqs: [],
    serviceDetails: {
        basicDetails: {},
        stepDetails: [],
        subscriptionDetails: [],
    }
};


const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState,
    reducers: {
        getServices: (state, action) => {
            state.serviceList = action.payload.serviceList;
            state.totalCount = action.payload.totalCount;
        },
        addSteps: (state, action) => {
            const newCategory = action.payload;
            console.log(newCategory, "newCatgory")
            console.log(newCategory)
        },
        getActiveCategoryList: (state, action) => {
            state.activeCategories = action.payload.activeCategories;
        },
        getActiveSubCategoryList: (state, action) => {
            state.activeSubCategories = action.payload.activeSubCategories;
        },
        getActiveSubCategoryListAll: (state, action) => {
            state.activeSubCategoriesList = action.payload.activeSubCategoriesList;
        },
        getActiveSelectedSubCategoryListAll: (state, action) => {
            state.activeSelectedSubCategoriesList = action.payload;
        },
        getActiveBusinessEmail1: (state, action) => {
            state.getActiveBusinessEmailList = action.payload.getActiveBusinessEmailList;
        },
        getForms: (state, action) => {
            state.forms = action.payload.forms;
        },
        updateVideoUrl: (state, action) => {
            console.log(action.payload, "service slice video url");
            if (action.payload.fieldName === "deliverable") {
                state.delivrableVideoUrl = action.payload.url;
                state.stepValue = 1
            } else if (action.payload.fieldName === "step") {
                state.stepsVideoUrl = action.payload.url;
                state.stepValue = 2
            } else if (action.payload.fieldName === "document") {
                state.documentVideoUrl = action.payload.url;
                state.stepValue = 2
            }

        },
        handleStepValue: (state, action) => {
            state.stepValue = action.payload || 0;
        },
        updateUploadLoading: (state, action) => {
            state.uploadVideoLoading = action.payload;
        },
        uploadCsvLoading: (state, action) => {
            state.csvLoading = action.payload;
        },
        updateHeader: (state, action) => {
            state.header = action.payload;
        },
        updateContent: (state, action) => {
            console.log(action.payload, "button contenttttt")
            state.buttonContent = action.payload;
        },
        deleteStepBId: (state, action) => {
            const categoryId = action.payload;
            console.log(categoryId, "cid")
            state.stepsList = state.stepsList.filter((category) => {
                return category._id !== categoryId
            })
        },
        getServiceById: (state, action) => {
            const newObject = action.payload;
            console.log(newObject, "new Object")
            state.service = newObject;
        },
        updateLoading: (state, action) => {
            state.isFetching = action.payload;
        },
        setCategoryLoading: (state, action) => {
            state.activeCategoryLoading = action.payload;
        },
        updateAdding: (state, action) => {
            state.isAdding = action.payload;
        },
        updateStatusLoading: (state, action) => {
            state.isStatusLoading = action.payload;
        },
        updateStatusState: (state, action) => {
            console.log(action.payload, "service payload update ")
            const { serviceId, active } = action.payload;


            state.serviceList = state.serviceList.map((service) => {
                if (service._id
                    === serviceId
                ) {
                    return { ...service, active };
                }
                return service;
            });
        },
        updateEditPage: (state, action) => {
            state.editPage = action.payload;
        },
        updateServiceEditPage: (state, action) => {
            console.log(action.payload, "from slice")
            state.editChargesPageNumber = action.editChargesPageNumber;
        },
        updateSatateWiseServiceLoading: (state, action) => {
            state.isStateWiseServiceLoading = action.payload;
        },
        getAllStateWiseCharges: (state, action) => {
            state.stateWiseChargesList = action.payload.stateWiseChargesList;
            state.stateWiseServiceChargesCount = action.payload.totalCount
        },
        upadteSingleServiceCharges: (state, action) => {
            console.log(action.payload, "single charge")
            state.singleServiceCharges = action.payload;
        },
        updateSingleServiceLoading: (state, action) => {
            state.singleServiceLoading = action.payload;
        },
        updateIsServiceDetails: (state, action) => {
            const newBasicDetails = action.payload;
            console.log(newBasicDetails, "ServiceDetail from slice  ")
            state.isServiceDetails = [...state.isServiceDetails, newBasicDetails];
        },
        getAllServiceFaqs: (state, action) => {
            console.log(action.payload, "faq service list fromn slice")
            state.serviceFaqs = action.payload.serviceFaqs;
        },
        getAllServiceFaqs: (state, action) => {
            console.log(action.payload, "faq service list fromn slice")
            state.serviceFaqs = action.payload.serviceFaqs;
        },
        updateServiceDetails: (state, action) => {
            if (action.payload) {
                const data = action.payload;
                // Create a new object for basicDetails
                state.serviceDetails = {
                    ...state.serviceDetails,
                    basicDetails: data
                };
            }
        },
        updateServiceDetailSteps: (state, action) => {
            const data = action.payload;
            console.log(data, "data from slice")
            if (action.payload) {
                // Make sure we are appending the new steps data to the existing stepDetails array
                // state.serviceDetails.stepDetails = [
                //     ...state.serviceDetails.stepDetails, 
                //     data
                // ];
            }
        }

    },
});
export const { getServices, getAllServiceFaqs, updateServiceDetails, updateServiceDetailSteps, updateUploadLoading, updateHeader, updateIsServiceDetails, uploadCsvLoading, updateServiceEditPage, updateSingleServiceLoading, upadteSingleServiceCharges, updateSatateWiseServiceLoading, getAllStateWiseCharges, handleStepValue, updateContent, getActiveCategoryList, updateVideoUrl, getForms, getActiveSubCategoryList, addSteps, updateEditPage, updateStatusLoading, updateLoading, updateStatusState, toggleSwitchSuccess, toggleSwitchFailure, deleteStepBId, updateAdding, getServiceById, getActiveSubCategoryListAll, getActiveBusinessEmail1, getActiveSelectedSubCategoryListAll, setCategoryLoading } = serviceSlice.actions;

export default serviceSlice.reducer;
