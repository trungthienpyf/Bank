import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  moveMoneyFailed,
  moveMoneyStart,
  moveMoneySuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  sendMoneyFailed,
  sendMoneyStart,
  sendMoneySuccess,
} from "./authSlice";
import {
  getPaymentFailed,
  getPaymentStart,
  getPaymentSuccess,
} from "./paymentSlice";
import {
  getAllPostFailed,
  getAllPostStart,
  getAllPostSuccess,
  storePostFailed,
  storePostStart,
  storePostSuccess,
} from "./postSimSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login", user);

    if (res.data.errors) {
      console.log(res.data.errors);
      throw res.data.errors;
    }
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    if (error.message) dispatch(loginFailed(error.message));
    else dispatch(loginFailed(error));
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const re = await axios.post("http://127.0.0.1:8000/api/register", user);
    if (re.data.errors) {
      console.log(re.data.errors);
      throw re.data.errors;
    }

    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    if (error.message) dispatch(registerFailed(error.message));
    else dispatch(registerFailed(error));
  }
};
export const moveMoney = async (user, dispatch, navigate) => {
  dispatch(moveMoneyStart());
  try {
    const re = await axios.post("http://127.0.0.1:8000/api/getCode", user);
    if (re.data.errors) {
      console.log(re.data.errors);
      throw re.data.errors;
    }

    dispatch(moveMoneySuccess());
    navigate("/move-money");
  } catch (error) {
    if (error.message) dispatch(moveMoneyFailed(error.message));
    else dispatch(moveMoneyFailed(error));
  }
};
export const sendMoney = async (user, dispatch, navigate, firstMoney) => {
  dispatch(sendMoneyStart());
  try {
    const re = await axios.post("http://127.0.0.1:8000/api/checkCode", user);

    if (re.data.errors) {
      console.log(re.data.errors);
      throw re.data.errors;
    }
    console.log(re.data);
    let sum = firstMoney - re.data;

    dispatch(sendMoneySuccess(sum));
    navigate("/move-money");
  } catch (error) {
    if (error.message) dispatch(sendMoneyFailed(error.message));
    else dispatch(sendMoneyFailed(error));
  }
};
export const getAllPayment = async (user, dispatch) => {
  dispatch(getPaymentStart());
  try {
    const re = await axios.post("http://127.0.0.1:8000/api/getHistory", user);

    if (re.data.errors) {
      console.log(re.data.errors);
      throw re.data.errors;
    }

    dispatch(getPaymentSuccess(re.data));
  } catch (error) {
    if (error.message) dispatch(getPaymentFailed(error.message));
    else dispatch(getPaymentFailed(error));
  }
};

export const storePost = async (user, dispatch, navigate) => {
  dispatch(storePostStart());
  try {
    const re = await axios.post("http://127.0.0.1:8000/api/storePost", user);

    if (re.data.errors) {
      console.log(re.data.errors);
      throw re.data.errors;
    }

    dispatch(storePostSuccess(re.data));
    navigate("/post-sim");
  } catch (error) {
    if (error.message) dispatch(storePostFailed(error.message));
    else dispatch(storePostFailed(error));
  }
};
export const getAllPost = async (dispatch) => {
  dispatch(getAllPostStart());
  try {
    const re = await axios.get("http://127.0.0.1:8000/api/getAllPost");

    if (re.data.errors) {
      console.log(re.data.errors);
      throw re.data.errors;
    }

    dispatch(getAllPostSuccess(re.data));
  } catch (error) {
    if (error.message) dispatch(getAllPostFailed(error.message));
    else dispatch(getAllPostFailed(error));
  }
};
