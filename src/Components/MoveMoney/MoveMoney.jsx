import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { moveMoney, sendMoney } from "../../redux/apiRequest";
import "./moveMoney.css";

const MoveMoney = () => {
  //DUMMY DATA
  const user = useSelector((state) => state.auth.login?.currentUser);
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

  return (
    <>
      {user ? (
        <div className="home-top home-padding">{user.fullName} </div>
      ) : (
        ""
      )}

      <div className="home-page-main">
        <div className="home-page-width1">
          <form className="form-padding" onSubmit={handleMoveMoney}>
            <div className="form-padding">
              <h3>Chuyển tiền</h3>
              <input
                className="full-width input-payment"
                placeholder="Nhập số tài khoản"
                onChange={(e) => setStk(e.target.value)}
              />

              <input
                className="full-width input-payment"
                placeholder="Số tiền (VND)"
                onChange={(e) => setMoney(e.target.value)}
              />
              <textarea
                className="full-width input-payment text-area-height"
                placeholder="Mô tả"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              {status ? (
                <input
                  className="full-width input-payment"
                  placeholder="Nhập code để xác minh"
                  onChange={(e) => setToken(e.target.value)}
                />
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
          </form>
        </div>
      </div>
    </>
  );
};

export default MoveMoney;
