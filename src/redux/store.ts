import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/registration/productSlice";
import { api } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
// import userSlice from './features/user/userSlice';

const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
