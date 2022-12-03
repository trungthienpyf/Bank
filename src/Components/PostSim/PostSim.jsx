import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Echo from "laravel-echo";

import "./postSim.scss";
import { showEach } from "../../redux/apiRequest";
const PostSim = () => {
  window.io = require("socket.io-client");
  const user = useSelector((state) => state.auth.login?.currentUser);
  const list = useSelector((state) => state.postSim.getAllPost?.allPostSim);
  const params = useParams();
  const [listMsg, setListMsg] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [moneyCurrent, setMoneyCurrent] = useState(0);
  const [amount, setAmount] = useState(1);

  const DAY_EXPIRE = 3600 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + DAY_EXPIRE;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: user.id,
      post_id: params.id,
      amount: amount,
    };

    await axios.post("http://127.0.0.1:8000/api/sendAmount", data);
  };

  const findMoney = list.find((i) => i.id == params.id);
  // const convertTime = (CREATED_TIME, TIME_EXPIRE) => {
  //   const timeCreate = new Date(CREATED_TIME).getTime();

  //   const dateTime = timeCreate + Number(TIME_EXPIRE) * 1000;

  //   return dateTime;
  // };

  useEffect(async () => {
    const data = {
      post_id: params.id,
    };
    window.echo = new Echo({
      broadcaster: "socket.io",
      host: window.location.hostname + ":6001",
    });

    window.echo
      .channel(`post.${params.id}`)

      .listen("MessagePosted", (e) => {
        const data = {
          user_id: e.user,
          post_id: e.post_id,
          amount: e.message,
        };
        setListMsg((oldArray) => [data, ...oldArray]);
        console.log(e);
      });
    const check = await showEach(data);
    setMoneyCurrent(findMoney?.amountStart);
    await setListMsg(check);
    setIsLoad(false);
  }, []);
  console.log(1);

  var sum = findMoney?.amountStart;
  const renderMoney = () => {
    listMsg?.forEach((e) => {
      sum = parseInt(sum) + parseInt(e.amount);
    });
    return sum.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  var x = Number(findMoney?.amountStart).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
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
              <div>
                Giá khởi điểm:{x} - Giá: {renderMoney()} -{" "}
                {/* <UseCountdown
                  targetDate={convertTime(created_at, timeSession)}
                /> */}
              </div>
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
