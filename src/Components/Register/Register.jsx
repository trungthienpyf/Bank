import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiRequest";
import { useFormik } from "formik";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [identityNumber, setIdentity] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector(
    (state) => state.auth.register?.errorMessage
  );
  const isLoad = useSelector((state) => state.auth.register?.isFetching);

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     username: "",
  //     password: "",
  //     cc: "",
  //     phone: "",
  //   },
  // });

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      identityNumber: identityNumber,
      phone: phone,
      fullName: fullName,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <>
      {isLoad ? (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      ) : (
        <section className="register-container">
          <div className="register-title"> Đăng ký </div>
          <form onSubmit={handleRegister}>
            <label>Họ và tên</label>
            <input
              type="text"
              placeholder="Enter your họ và tên"
              onChange={(e) => setFullName(e.target.value)}
            />
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Enter your tài khoản"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Enter your mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Số căn cước</label>
            <input
              type="text"
              placeholder="Enter your số căn cước"
              onChange={(e) => setIdentity(e.target.value)}
            />
            <label>Số điện thoại</label>
            <input
              type="text"
              placeholder="Vui lòng nhập điện thoại"
              onChange={(e) => setPhone(e.target.value)}
            />
            <p>
              {" "}
              {Array.isArray(errorMessage)
                ? errorMessage?.fullName[0]
                : errorMessage}
            </p>
            <button type="submit"> Create account </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
