import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Modal = ({ isShowing, hide, phone, user_id, idRoom }) => {
  const [OTP, setOTP] = useState(false);
  const [ErrorOTP, setErrorOTP] = useState("");
  const [flagOTP, setFlagOTP] = useState(false);
  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
    setErrorOTP("");
  };
  const navigate = useNavigate();
  const authCode = async (user) => {
    try {
      const re = await axios.post(
        "http://127.0.0.1:8000/api/authOTPRoom",
        user
      );
      if (re.data.errors) {
        console.log(re.data.errors);
        throw re.data.errors;
      }
      navigate(`/post-sim/${idRoom}`);
    } catch (error) {
      if (error.message) setErrorOTP(error.message);
      else setErrorOTP(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: user_id,
      code: OTP,
    };
    if (OTP.length == 5) {
      authCode(newUser);
    }
  };
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <div className="mt-2">
                  {" "}
                  Nhập mã OTP trước khi vào phòng #{idRoom}
                </div>
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="w-100">
                <label className="f-left">Nhập mã OTP từ số {phone}</label>
                <input
                  className="full-width input-payment"
                  type="text"
                  placeholder="Nhập OTP"
                  onChange={handleChangeOTP}
                />
                <small className="register-error">{ErrorOTP}</small>
                <div className="modal-header w-100">
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hide}
                  >
                    Close
                  </button>
                  <button type="submit" className="modal-close-button">
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
export default Modal;
