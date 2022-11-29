import { createSlice } from "@reduxjs/toolkit";
const postSimSlice = createSlice({
  name: "postSim",
  initialState: {
    storePost: {
      isFetching: false,
      error: false,
      message: "",
    },
    getAllPost: {
      allPostSim: null,
      isFetching: false,
      error: false,
      message: "",
    },
  },
  reducers: {
    getAllPostStart: (state) => {
      state.getAllPost.isFetching = true;
    },
    getAllPostSuccess: (state, action) => {
      state.getAllPost.isFetching = false;
      state.getAllPost.allPostSim = action.payload;
      state.getAllPost.error = "";
    },
    getAllPostFailed: (state, account) => {
      state.getAllPost.isFetching = false;
      state.getAllPost.error = true;
      state.getAllPost.message = account.payload;
    },
    storePostStart: (state) => {
      state.storePost.isFetching = true;
    },
    storePostSuccess: (state, action) => {
      state.storePost.isFetching = false;
      state.storePost.allPayment = action.payload;
      state.storePost.error = "";
    },
    storePostFailed: (state, account) => {
      state.storePost.isFetching = false;
      state.storePost.error = true;
      state.storePost.message = account.payload;
    },
  },
});
export const {
  storePostStart,
  storePostSuccess,
  storePostFailed,
  getAllPostStart,
  getAllPostSuccess,
  getAllPostFailed,
} = postSimSlice.actions;
export default postSimSlice.reducer;
