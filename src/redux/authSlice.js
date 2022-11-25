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
  },
  reducers: {
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
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.success = true;

      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.error = true;
      state.register.isFetching = false;
      state.register.success = false;
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
} = authSlice.actions;
export default authSlice.reducer;
