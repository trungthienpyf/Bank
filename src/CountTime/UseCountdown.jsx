import axios from "axios";
import { useEffect, useRef, useState } from "react";

const UseCountdown = (props) => {
  const countDownDate = new Date(props.targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (countDown <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime() + props.increaseTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return <> {countDown <= 0 ? "Đã kết thúc" : getReturnValues(countDown)}</>;
};

const getReturnValues = (countDown) => {
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default UseCountdown;
