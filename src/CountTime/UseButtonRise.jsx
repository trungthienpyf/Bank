import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const UseButtonRise = ({ targetDate, timeClick, increaseTime }) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (countDown <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime() + increaseTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return (
    <>
      {" "}
      {countDown <= 0 ? (
        <div style={{ margin: "auto" }}>Đã hết thời gian</div>
      ) : (
        getReturnValues(countDown, timeClick)
      )}
    </>
  );
};

const getReturnValues = (countDown, timeClick) => {
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return (
    <button disabled={timeClick}>
      <i className="material-icons">
        {" "}
        {timeClick ? "Vui lòng đợi 5s " : "Đấu giá"}
      </i>
    </button>
  );
};

export default UseButtonRise;
