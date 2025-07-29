import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 isFetching : false, 
 stepsList : [], 
 isAdding : false,
 totalPages : 0,
 step : {}, 
 totalCount : 0, 
 diabled : false,
 childLoading : {},
 isStatusLoading : false,
 editPage : 1,
};



const stepsSlice = createSlice({
  name: 'stepsSlice',
  initialState,
  reducers: {
    getSteps: (state, action) => {
      state.stepsList = action.payload.stepsList;
      state.totalCount = action.payload.totalCount;
      state.totalPages = action.payload.totalPages;
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
    getStepById : (state, action)=>{
      const newObject = action.payload; 
      console.log(newObject, "new Object")
      state.step = newObject;
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
      console.log(action.payload)
      const { _id, active } = action.payload;
    
      state.stepsList = state.stepsList.map((step) => {
        if (step._id 
          === _id
        ) {
          return { ...step, active };
        }
        return step;
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
export const { getSteps,addSteps,updateEditPage, updateStatusLoading,updateLoading,updateStatusState,toggleSwitchSuccess,toggleSwitchFailure, deleteStepBId,updateAdding, getStepById} = stepsSlice.actions;

export default stepsSlice.reducer;
