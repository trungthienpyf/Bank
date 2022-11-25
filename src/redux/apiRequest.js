import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login", user);

    if (res.data.errors) {
      console.log(res.data.errors);
      throw res.data.errors;
    } else dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    if (error) dispatch(loginFailed(error));
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
    dispatch(registerFailed());
  }
};
