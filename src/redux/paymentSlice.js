import { createSlice } from "@reduxjs/toolkit";
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    getPayments: {
      allPayment: null,
      isFetching: false,
      error: false,
      message: "",
    },
  },
  reducers: {
    getPaymentStart: (state) => {
      state.getPayments.isFetching = true;
    },
    getPaymentSuccess: (state, action) => {
      state.getPayments.isFetching = false;
      state.getPayments.allPayment = action.payload;
      state.getPayments.error = "";
    },
    getPaymentFailed: (state, account) => {
      state.getPayments.isFetching = false;
      state.getPayments.error = true;
      state.getPayments.message = account.payload;
    },
  },
});
export const { getPaymentStart, getPaymentSuccess, getPaymentFailed } =
  paymentSlice.actions;
export default paymentSlice.reducer;
