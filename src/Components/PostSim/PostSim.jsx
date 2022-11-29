import { useParams } from "react-router-dom";
import CountdownTimer from "../../CountTime/CountdownTimer";
const PostSim = () => {
  const params = useParams();
  console.log(params);
  const DAY_EXPIRE = 3600 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + DAY_EXPIRE;
  console.log(dateTimeAfterThreeDays);
  return (
    <>
      {" "}
      <h1>hehe: {JSON.stringify(params)} </h1>
      <div>
        <h1>Countdown Timer</h1>
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div>
    </>
  );
};

export default PostSim;
