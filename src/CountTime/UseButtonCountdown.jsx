import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const UseButtonCountdown = ({
  targetDate,
  id,
  setIdRoom,
  changeData,
  fullName,
  winner,
  setNameSim,
  sim,
  user_id,
  setUserID,
}) => {
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
      {countDown <= 0 ? (
        <>
          {winner == null || fullName == undefined ? (
            <>Không có người tham gia</>
          ) : (
            <> Người thắng {fullName}</>
          )}
        </>
      ) : (
        getReturnValues(
          countDown,
          id,
          setIdRoom,
          changeData,
          setNameSim,
          sim,
          user_id,
          setUserID
        )
      )}
    </>
  );
};

const getReturnValues = (
  countDown,
  id,
  setIdRoom,
  changeData,
  setNameSim,
  sim,
  user_id,
  setUserID
) => {
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return (
    <button
      onClick={(e) =>
        changeData(id, setIdRoom, setNameSim, sim, user_id, setUserID)
      }
    >
      Tham gia đấu giá
    </button>
  );
};

export default UseButtonCountdown;
