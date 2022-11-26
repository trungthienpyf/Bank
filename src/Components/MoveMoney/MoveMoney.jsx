import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { moveMoney, sendMoney } from "../../redux/apiRequest";
import "./moveMoney.css";

const MoveMoney = () => {
  //DUMMY DATA
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isShowGetCode = useSelector(
    (state) => state.auth.moveMoney?.isFetching
  );
  const isShowCheck = useSelector((state) => state.auth.sendMoney?.isFetching);
  const navigate = useNavigate();
  //const status = useSelector((state) => state.auth.MoveMoney?.success);
  const [status, setStatus] = useState(false);
  const [stk, setStk] = useState("");
  const [token, setToken] = useState("");

  const [money, setMoney] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const handleMoveMoney = (e) => {
    e.preventDefault();

    if (!status) {
      const newUser = {
        id: user.id,
      };
      moveMoney(newUser, dispatch, navigate);
      setStatus(true);
    } else {
      const newUser2 = {
        id: user.id,
        fromAc: stk,
        token,
        amount: money,
        desc,
        toAc: user.accountNumber,
      };
      sendMoney(newUser2, dispatch, navigate, user.money);
    }
  };
  //   useEffect(() => {
  //     if (!user) {
  //       navigate("/login");
  //     }
  //   }, []);
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
        <label className="f-left">Số tài khoản</label>
        <input
          className="full-width input-payment"
          placeholder="Nhập số tài khoản"
          onChange={(e) => setStk(e.target.value)}
          readOnly={status}
          value={stk}
        />
        <label className="f-left">Số tiền</label>
        <input
          className="full-width input-payment"
          placeholder="Số tiền (VND)"
          onChange={(e) => setMoney(e.target.value)}
          readOnly={status}
          value={money}
        />
        <label className="f-left">Mô tả</label>
        <textarea
          className="full-width input-payment text-area-height"
          placeholder="Mô tả"
          onChange={(e) => setDesc(e.target.value)}
          readOnly={status}
          value={desc}
        ></textarea>
        {status ? (
          <div>
            {" "}
            <label>
              Chúng tôi đã gửi mã OTP đến số điện thoại {user.phone}
            </label>
            <input
              className="full-width input-payment"
              placeholder="Nhập code để xác minh"
              id="otp"
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="home-row around-between">
          <button className="full-width m-1 ">Quay lại</button>
          <button className="full-width m-1 ">
            {status ? "Chuyển tiền" : "Tiếp tục"}
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      {user ? (
        <div className="home-top home-padding">{user.fullName} </div>
      ) : (
        ""
      )}

      <div className="home-page-main">
        <div className="home-page-width1 mt-2 ">
          <form className="form-padding " onSubmit={handleMoveMoney}>
            {renderText()}
          </form>
        </div>
      </div>
    </>
  );
};

export default MoveMoney;
