import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 isFetching : false, 
 subscriptionList : [], 
 isAdding : false,
 totalPages : 0,
 subscription : {}, 
 totalCount : 0, 
 diabled : false,
 childLoading : {},
 isStatusLoading : false,
 editPage : 1,
};



const subscriptionsSlice = createSlice({
  name: 'subscriptionsSlice',
  initialState,
  reducers: {
    getSubscriptions: (state, action) => {
      state.subscriptionList = action.payload.subscriptionList;
      state.totalCount = action.payload.totalCount;
    },
    addSteps : (state, action)=>{
      const newCategory = action.payload; 
      console.log(newCategory, "newCatgory")
      console.log(newCategory)
    }, 
    deleteStepBId :(state, action)=>{
      const categoryId = action.payload; 
      console.log(categoryId, "cid")
      state.stepsList = state.stepsList.filter((category)=>{
        return category._id !== categoryId
      })
    }, 
    getSUbscriptionsById : (state, action)=>{
      const newObject = action.payload; 
      console.log(newObject, "new Object")
      state.subscription = newObject;
    }, 
    updateLoading : (state, action)=>{
      state.isFetching = action.payload;
    }, 
    updateAdding : (state, action)=> {
      state.isAdding = action.payload;
    },
    updateStatusLoading : (state, action)=> {
      state.isStatusLoading = action.payload;
    },
    updateStatusState: (state, action) => {
      const { _id, active } = action.payload;
      
    
      state.subscriptionList = state.subscriptionList.map((category) => {
        if (category._id 
          === _id
        ) {
          return { ...category, active };
        }
        return category;
      });
    },
    toggleSwitchSuccess: (state, action) => {
      const newUser = action.payload;
      console.log(newUser, "new user ")
      const userIndex = state.stepsList.findIndex(user => user._id === newUser._id);
      if (userIndex !== -1) {
        state.stepsList[userIndex] = newUser;
      }
      state.childLoading[newUser._id] = false;
    },
    toggleSwitchFailure: (state, action) => {
      const userId = action.payload; 
      console.log(userId);
      state.childLoading[userId] = false; 
  }, 
  updateEditPage : (state, action)=>{
    state.editPage = action.payload;
  }
  },
});
export const { getSubscriptions,addSteps,updateEditPage, updateStatusLoading,updateLoading,updateStatusState,toggleSwitchSuccess,toggleSwitchFailure, deleteStepBId,updateAdding, getSUbscriptionsById} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
