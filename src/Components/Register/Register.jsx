import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiRequest";
import { useFormik } from "formik";
import { authentication } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import * as Yup from "yup";
import axios from "axios";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector(
    (state) => state.auth.register?.errorMessage
  );
  const isLoad = useSelector((state) => state.auth.register?.isFetching);
  const [flag, setFlag] = useState(false);
  const [token, setToken] = useState("");
  const [errorToken, setErrorToken] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const checkPhone = async (phone) => {
    return await axios.post("http://127.0.0.1:8000/api/checkPhone", {
      phone: phone,
    });
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      password: "",
      identityNumber: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, "Tên không được ít hơn 5 kí tự")
        .required("Bạn phải điền tên")
        .matches(/^([^0-9]*)$/, "Tên không chứa số"),
      username: Yup.string()
        .required("Bạn phải điền tài khoản")
        .min(6, "Tài khoản không được ít hơn 5 kí tự"),
      password: Yup.string()
        .min(8, "Mật khẩu không được ít hơn 8 kí tự")
        .required("Bạn phải điền mật khẩu"),
      identityNumber: Yup.string()
        .min(8, "Số căn cước không được ít hơn 8 kí tự")
        .required("Bạn phải điền cccd")
        .matches(/^\d+$/, "Căn cước không chứa kí tự"),
      phone: Yup.string()
        .required("Bạn phải điền số điện thoại")
        .matches(
          /(09|01|03|07|08)[0-9]{8}$/,
          "Vui lòng nhập đúng số điện thoại"
        ),
    }),
    onSubmit: (values) => {
      setErrorPhone("");
      checkPhone(values.phone).then((k) => {
        if (k.data == "00") {
          setFlag(true);
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recapcha",
            {
              size: "invisible",
              callback: (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
              },
            },
            authentication
          );

          let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(
            authentication,
            "+84" + values.phone.slice(1),
            appVerifier
          )
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setErrorPhone("Số điện thoại đã tồn tại trong hệ thống");
        }
      });

      if (token.length == 6) {
        let confirmationResult = window.confirmationResult;
        confirmationResult
          .confirm(token)
          .then((result) => {
            console.log("thanh cong");

            registerUser(values, dispatch, navigate);
          })
          .catch((error) => {
            setErrorToken("Nhập sai mã OTP");
          });
      }
    },
  });

  return (
    <>
      <div id="recapcha"></div>
      {isLoad ? (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      ) : (
        <section className="register-container">
          <div className="login-title"> Đăng ký </div>
          <form onSubmit={formik.handleSubmit}>
            <label>Họ và tên</label>
            <input
              type="text"
              placeholder="Enter your họ và tên"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {formik.errors.fullName && formik.touched.fullName && (
              <small className="register-error">{formik.errors.fullName}</small>
            )}
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Enter your tài khoản"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username && (
              <small className="register-error">{formik.errors.username}</small>
            )}
            <small className="register-error">
              {" "}
              {Array.isArray(errorMessage?.username)
                ? errorMessage?.username[0]
                : errorMessage}
            </small>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your mật khẩu"
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <small className="register-error">{formik.errors.password}</small>
            )}
            <label>Số căn cước</label>
            <input
              type="text"
              name="identityNumber"
              placeholder="Enter your số căn cước"
              value={formik.values.identityNumber}
              onChange={formik.handleChange}
            />
            {formik.errors.identityNumber && formik.touched.identityNumber && (
              <small className="register-error">
                {formik.errors.identityNumber}
              </small>
            )}
            <label>Số điện thoại</label>
            <input
              type="text"
              placeholder="Vui lòng nhập điện thoại"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <small className="register-error">{formik.errors.phone}</small>
            )}
            <small className="register-error">
              {Array.isArray(errorMessage?.phone)
                ? errorMessage.phone[0]
                : errorMessage}
            </small>
            {errorPhone && (
              <small className="register-error">{errorPhone}</small>
            )}{" "}
            {!flag ? (
              ""
            ) : (
              <>
                {" "}
                <label>
                  Chúng tôi đã gửi mã OTP đến số điện thoại{" "}
                  {formik.values.phone}
                </label>
                <input
                  className="full-width input-payment p-1"
                  placeholder="Nhập code để xác minh"
                  id="otp"
                  onChange={(e) => setToken(e.target.value)}
                />
                {errorToken && (
                  <small className="register-error">{errorToken}</small>
                )}{" "}
              </>
            )}
            <button type="submit"> Đăng ký </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
