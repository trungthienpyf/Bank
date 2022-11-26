import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      errorMessage: "",
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    moveMoney: {
      isFetching: false,
      error: false,
      success: false,
      errorMessage: "",
    },
    sendMoney: {
      isFetching: false,
      error: false,
      success: false,
      errorMessage: "",
    },
  },
  reducers: {
    sendMoneyStart: (state) => {
      state.sendMoney.isFetching = true;
    },
    sendMoneySuccess: (state, action) => {
      state.sendMoney.isFetching = false;
      state.sendMoney.success = true;
      state.login.currentUser.money = action.payload;
      state.sendMoney.error = false;
    },
    sendMoneyFailed: (state, action) => {
      state.sendMoney.error = true;
      state.sendMoney.isFetching = false;
      state.sendMoney.success = false;
      state.sendMoney.errorMessage = action.payload;
    },
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      state.login.errorMessage = "";
    },
    loginFailed: (state, action) => {
      state.login.error = true;
      state.login.isFetching = false;
      state.login.errorMessage = action.payload;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;

      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.error = true;
      state.register.isFetching = false;
      state.register.success = false;
    },
    moveMoneyStart: (state) => {
      state.moveMoney.isFetching = true;
    },
    moveMoneySuccess: (state) => {
      state.moveMoney.isFetching = false;
      state.moveMoney.success = true;

      state.moveMoney.error = false;
    },
    moveMoneyFailed: (state, action) => {
      state.moveMoney.error = true;
      state.moveMoney.isFetching = false;
      state.moveMoney.success = false;
      state.moveMoney.errorMessage = action.payload;
    },
  },
});
export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerFailed,
  registerSuccess,
  registerStart,
  moveMoneySuccess,
  moveMoneyFailed,
  moveMoneyStart,
  sendMoneySuccess,
  sendMoneyFailed,
  sendMoneyStart,
} = authSlice.actions;
export default authSlice.reducer;
