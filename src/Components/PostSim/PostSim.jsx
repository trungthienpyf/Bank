import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Echo from "laravel-echo";

import CountdownTimer from "../../CountTime/CountdownTimer";
import "./postSim.scss";
import { showEach } from "../../redux/apiRequest";
const PostSim = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const params = useParams();
  const [listMsg, setListMsg] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const DAY_EXPIRE = 3600 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + DAY_EXPIRE;

  const [amount, setAmount] = useState(1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(amount);
    const data = {
      user_id: user.id,
      post_id: 1,
      amount: amount,
    };

    setListMsg((oldArray) => [data, ...oldArray]);
    await axios.post("http://127.0.0.1:8000/api/sendAmount", data);
  };
  console.log(user.id);
  useEffect(async () => {
    const data = {
      post_id: params.id,
    };

    const check = await showEach(data);

    await setListMsg(check);
    setIsLoad(false);
  }, []);
  console.log(listMsg);
  useEffect(() => {
    const echo = new Echo({
      broadcaster: "socket.io",
    });
    // 4
    echo.join(`room.1`).listen(".message.new", (e) => {
      // 6

      console.log(e);
    });
  }, []);

  return (
    <>
      {isLoad ? (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      ) : (
        <div className="home-page-main">
          <div className="app">
            <div className="messages">
              <div className="messages-history">
                {listMsg?.map((item) => {
                  return (
                    <div
                      className={
                        "message " + (item.user_id == user.id ? "me" : "")
                      }
                    >
                      <div class="message-body">+ {item.amount}</div>
                    </div>
                  );
                })}
              </div>
              <form className="messages-inputs" onSubmit={handleSubmit}>
                <select onChange={(e) => setAmount(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button>
                  <i className="material-icons">Đấu giá</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* <h1>hehe: {JSON.stringify(params)} </h1>
      <div>
        <h1>Countdown Timer</h1>
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      </div> */}
    </>
  );
};

export default PostSim;
