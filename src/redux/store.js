// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Import your slices
import userAuthSlice from "./slices/userAuth-slice";
import userUtilitySlice from "./slices/utillitySlice";
import appSlice from "./slices/appSlice";
import serviceListingSlice from "./slices/serviceListingSlice";
import businessSlice from './slices/businessSlice';
import { composeWithDevTools } from "redux-devtools-extension";
import profileReducer from "./slices/profileSlice"
import settingsReducer from "./slices/settingsSlice"
import wishListReducer from "./slices/wishlistSlice"
import serviceDetailsReducer from "./slices/serviceDetailsSlice"
import documentSlice from "./slices/documentSlice";
import paymentHistoryReducer from "./slices/paymentHistorySlice"
import dashboardReducer from "./slices/dashboardSlice"
import offerSlice from "./slices/offerSlice"
import businessPageSlice from "./slices/businessPageSlice";
import serviceReducer from "./admin/slices/serviceSlice"
import stepsReducer from "./admin/slices/stepsSlice"
import subscriptionsReducer from "./admin/slices/subscriptionSlice"
import insightsReducer from "./slices/insightSlice"
import fundraiseReducer from "./slices/fundraiseSlice"
import messageSlice from "./slices/messageSlice";
import logintokenSlice from "./slices/logintokenSlice";
import tourSlice from "./slices/appTourSlice"
import logoReducer from "./slices/logoSlice"
import notification from "./slices/notificationSlice";
import notificationSlice from "./slices/notificationSlice";
// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  blacklist :['service','serviceDetails','wishlist','document','profile','user', 'dashboard']
};

// Combine all slices into a single root reducer
const rootReducer = combineReducers({
  app: appSlice,
  auth: userAuthSlice,
  userUtility: userUtilitySlice,
  // user: userSlice,
  service:serviceListingSlice,
  business:businessSlice,
  profile: profileReducer,
  settings : settingsReducer,
  wishlist : wishListReducer,
  serviceDetails : serviceDetailsReducer,
  document : documentSlice,
  paymentHistory : paymentHistoryReducer,
  dashboard : dashboardReducer,
  offers: offerSlice,
  businessList : businessPageSlice, 
  adminService : serviceReducer,
  adminSteps : stepsReducer,
  adminSubscriptions : subscriptionsReducer,
  insights : insightsReducer,
  message : messageSlice,
  fundraise : fundraiseReducer,
  loginToken : logintokenSlice,
  tour : tourSlice,
  notification : notificationSlice,
  logo:logoReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore(
  {
    reducer: persistedReducer,
  },
  composeWithDevTools()
);

// Create a persistor
export const persistor = persistStore(store);
