import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { moveMoney, sendMoney } from "../../redux/apiRequest";
import { authentication } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./moveMoney.css";
import "react-toastify/dist/ReactToastify.css";
import {
  moveMoneyRefresh,
  moveMoneyStart,
  sendMoneyStart,
} from "../../redux/authSlice";
import ReactSelect from "react-select";
import axios from "axios";

const MoveMoney = () => {
  //DUMMY DATA
  const user = useSelector((state) => state.auth.login?.currentUser);
  const errorMessage = useSelector(
    (state) => state.auth.moveMoney?.errorMessage
  );
  const isShowGetCode = useSelector(
    (state) => state.auth.moveMoney?.isFetching
  );
  console.log(isShowGetCode);
  const isShowCheck = useSelector((state) => state.auth.sendMoney?.isFetching);

  const errorMessageMoney = useSelector(
    (state) => state.auth.sendMoney?.errorMessage
  );

  const navigate = useNavigate();
  //const status = useSelector((state) => state.auth.MoveMoney?.success);
  const [status, setStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [flagStk, setFlagStk] = useState(false);
  const [flagMoney, setFlagMoney] = useState(false);
  const [stk, setStk] = useState("");
  const [token, setToken] = useState("");

  const [money, setMoney] = useState("");
  const [data, setData] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMoney, setErrorMoney] = useState("");
  const [errorStk, setErrorStk] = useState("");
  const [errorToken, setErrorToken] = useState("");

  const dispatch = useDispatch();
  var reg = /^\d+$/;
  const getAllUser = async () => {
    return await axios.get("https://mfw060.wcom.vn/api/getAllUser");
  };
  useEffect(() => {
    getAllUser().then((k) => {
      setData(k.data.filter((i) => i.id !== user.id));
    });
  }, []);

  const handleChangeMoney = (e) => {
    setErrorMoney("");
    if (user.money < e.target.value) {
      setFlagMoney(false);
      setErrorMoney("S??? ti???n kh??ng ?????");
    } else if (!reg.test(e.target.value)) {
      setFlagMoney(false);
      setErrorMoney("Kh??ng nh???p k?? t??? ch???");
    } else if (e.target.value.trim().length == 0) {
      setFlagMoney(false);
      setErrorMoney("Kh??ng ???????c ????? tr???ng");
    } else if (e.target.value.length < 5) {
      setFlagMoney(false);
      setErrorMoney("S??? ti???n ph???i l???n h??n 10.000VND");
    } else setFlagMoney(true);
    setMoney(e.target.value);
  };

  const handleChangeStk = (e) => {
    setErrorStk("");
    dispatch(moveMoneyRefresh());
    if (!reg.test(e.value)) {
      setFlagStk(false);
      setErrorStk("Kh??ng nh???p k?? t??? ch???");
    } else if (e.value.trim().length == 0) {
      setFlagStk(false);
      setErrorStk("Kh??ng ???????c ????? tr???ng");
    } else if (e.value == user.accountNumber) {
      setFlagStk(false);
      setErrorStk("Vui l??ng nh???p s??? t??i kho???n kh??c");
    } else setFlagStk(true);

    setStk(e.value);
    console.log(e.value);
  };

  const handleMoveMoney = (e) => {
    e.preventDefault();
    if (stk.length == 0) {
      setFlagStk(false);
      setErrorStk("Kh??ng ???????c ????? tr???ng");
    }
    if (money.length == 0) {
      setFlagMoney(false);
      setErrorMoney("Kh??ng ???????c ????? tr???ng");
    }

    if (flagStk && flagMoney) {
      if (!status) {
        dispatch(moveMoneyStart);
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
        const newUser = {
          id: user.id,
          toAc: stk,
        };
        moveMoney(newUser, dispatch, navigate).then((i) => {
          if (i == false) {
            setStatus(false);
          } else {
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(
              authentication,
              "+84" + user.phone.slice(1),

              appVerifier
            )
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setStatus(true);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } else {
        if (token.length == 6) {
          let confirmationResult = window.confirmationResult;
          confirmationResult
            .confirm(token)
            .then((result) => {
              // const user = result.user;
              // console.log(user);
              console.log("thanh cong");
              const newUser2 = {
                id: user.id,
                fromAc: user.accountNumber,
                token,
                amount: money,
                desc,
                toAc: stk,
              };
              sendMoney(newUser2, dispatch, navigate, user.money);
              setIsSuccess(true);
              toast.success("Giao d???ch th??nh c??ng");
            })
            .catch((error) => {
              setErrorToken("Nh???p m?? sai");
            });
        }
      }
    }
  };

  const renderText = () => {
    if (isShowGetCode) {
      return (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      );
    } else if (isShowCheck) {
      return (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      );
    }
    const renderReadonly = () => {
      if (status) return "readonly";
    };
    return (
      <div className="form-padding">
        <label className="f-left">
          {isSuccess ? "?????n s??? t??i kho???n" : "S??? t??i kho???n "}
        </label>

        <ReactSelect
          options={data}
          isSearchable={true}
          placeholder="Nh???p s??? t??i kho???n"
          onChange={(item) => handleChangeStk(item)}
          readOnly={status}
        />

        {errorStk && <small className="register-error">{errorStk}</small>}

        {Array.isArray(errorMessage?.toAc)
          ? errorMessage?.toAc[0]
          : errorMessage}
        <label className="f-left">
          {" "}
          {isSuccess ? "S??? ti???n g???i" : "S??? ti???n"}
        </label>
        <input
          className="full-width input-payment"
          placeholder="S??? ti???n (VND)"
          onChange={handleChangeMoney}
          readOnly={status}
          value={money}
        />

        {errorMoney && <small className="register-error">{errorMoney}</small>}
        <label className="f-left">M?? t???</label>
        <textarea
          className="full-width input-payment text-area-height"
          placeholder="M?? t???"
          onChange={(e) => setDesc(e.target.value)}
          readOnly={status}
          value={desc}
        ></textarea>
        {status ? (
          <div>
            {isSuccess ? (
              ""
            ) : (
              <>
                {" "}
                <label>
                  Ch??ng t??i ???? g???i m?? OTP ?????n s??? ??i???n tho???i {user.phone}
                </label>
                <input
                  className="full-width input-payment"
                  placeholder="Nh???p code ????? x??c minh"
                  id="otp"
                  onChange={(e) => setToken(e.target.value)}
                />
                {errorToken && (
                  <small className="register-error">{errorToken}</small>
                )}{" "}
              </>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="home-row around-between">
          {isSuccess ? (
            <button className="full-width m-1 " type="button">
              <Link to="/" className="reset-tag-a">
                Quay l???i
              </Link>
            </button>
          ) : (
            <>
              {status ? (
                <button
                  className="full-width m-1 "
                  type="button"
                  onClick={(e) => setStatus(false)}
                >
                  Quay l???i
                </button>
              ) : (
                <button className="full-width m-1 " type="button">
                  <Link to="/" className="reset-tag-a">
                    Quay l???i
                  </Link>
                </button>
              )}

              <button className="full-width m-1 " type="submit">
                {status ? "Chuy???n ti???n" : "Ti???p t???c"}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <ToastContainer />
      {user ? (
        <div className="home-top home-padding">{user.fullName} </div>
      ) : (
        ""
      )}

      <div className="home-page-main">
        <div className="home-page-width1 mt-2 ">
          <h3>{isSuccess ? "Giao d???ch th??nh c??ng" : "Chuy???n ti???n"} </h3>
          <form className="form-padding " onSubmit={handleMoveMoney}>
            {renderText()}
          </form>
        </div>
      </div>
      <div id="recapcha"></div>
    </>
  );
};

export default MoveMoney;
