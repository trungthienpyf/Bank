import React from "react";
import { memo } from "react";
import ShowCounter from "./ShowCounter";
import { useCountdown } from "./useCountdown";

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  console.log(days);
  if (days + hours + minutes + seconds <= 0) {
    return <>Het thoi gian roi</>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default CountdownTimer;
