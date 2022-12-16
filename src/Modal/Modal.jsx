import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Modal = ({
  isShowing,
  hide,
  phone,
  user_id,
  idRoom,
  nameSim,
  userID,
}) => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const [OTP, setOTP] = useState(false);
  const [ErrorOTP, setErrorOTP] = useState("");
  const [flagOTP, setFlagOTP] = useState(false);
  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
    setErrorOTP("");
  };
  const navigate = useNavigate();
  const authCode = (OTP) => {
    if (OTP.length == 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(OTP)
        .then((result) => {
          // const user = result.user;
          // console.log(user);
          console.log("thanh cong");

          navigate(`/post-sim/${idRoom}`, {
            state: { sim: nameSim, userID: userID, isAccess: true },
          });
        })
        .catch((error) => {
          console.log(error);
          setErrorOTP("Mã OTP không đúng");
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    authCode(OTP);
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
