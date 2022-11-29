import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import paymentSlice from "./paymentSlice";
import postSimSlice from "./postSimSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    payment: paymentSlice,
    postSim: postSimSlice,
  },
});
