import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import paymentSlice from "./paymentSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    payment: paymentSlice,
  },
});
