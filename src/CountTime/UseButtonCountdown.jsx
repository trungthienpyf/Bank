import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const UseButtonCountdown = ({ targetDate, id, setIdRoom, changeData }) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (countDown <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return (
    <>
      {" "}
      {countDown <= 0
        ? "Người thắng"
        : getReturnValues(countDown, id, setIdRoom, changeData)}
    </>
  );
};

const getReturnValues = (countDown, id, setIdRoom, changeData) => {
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return <button onClick={(e) => changeData(id, setIdRoom)}> Đấu giá</button>;
};

export default UseButtonCountdown;
