import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const UseButtonCountdown = ({ targetDate, id }) => {
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
    <> {countDown <= 0 ? "Người thắng" : getReturnValues(countDown, id)}</>
  );
};

const getReturnValues = (countDown, id) => {
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return (
    <Link to={`/post-sim/${id}`}>
      <button>Tham gia đấu giá</button>
    </Link>
  );
};

export default UseButtonCountdown;
