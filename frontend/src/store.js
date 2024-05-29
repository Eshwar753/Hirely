import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apislices";
import authSliceReducer from "./slices/authSlice";
// import jobSliceReducer from "./slices/jobSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    // postedJobs: jobSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
