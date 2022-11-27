import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAllPayment, moveMoney, sendMoney } from "../../redux/apiRequest";
import "./historyPayment.css";

const HistoryPayment = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();
  const listPayment = useSelector(
    (state) => state.payment.getPayments?.allPayment
  );
  useEffect(() => {
    if (user?.accountNumber) {
      const data = {
        accountNumber: user?.accountNumber,
      };
      getAllPayment(data, dispatch);
    }
  }, []);

  console.log(listPayment);
  return (
    <>
      {user ? (
        <div className="home-top home-padding">{user.fullName} </div>
      ) : (
        ""
      )}

      <div className="home-page-main">
        <div className="home-page-width">
          {listPayment &&
            Object.keys(listPayment)?.map((item) => {
              return (
                <>
                  <div className="home-row-2 pl-2 bg-date  f-left ">{item}</div>
                  <>
                    {listPayment[item].map((content) => {
                      return (
                        <button className="button-page-home color-btn-history history-content">
                          <div className="home-row-2">
                            <div className="">
                              <div className="text-start">{content.id}</div>
                              <div className="text-start">
                                <span>số tài khoản: {user?.accountNumber}</span>
                              </div>
                            </div>
                            <div className="home-col-d-column"></div>
                          </div>
                        </button>
                      );
                    })}
                  </>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HistoryPayment;
