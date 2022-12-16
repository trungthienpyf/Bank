import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Echo from "laravel-echo";

import "./postSim.scss";
import { showEach } from "../../redux/apiRequest";
import UseCountdown from "../../CountTime/UseCountdown";
import UseButtonRise from "../../CountTime/UseButtonRise";
import { toast, ToastContainer } from "react-toastify";
const PostSim = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state?.isAccess) {
    navigate("/post-sim");
  }

  window.io = require("socket.io-client");
  const user = useSelector((state) => state.auth.login?.currentUser);
  const list = useSelector((state) => state.postSim.getAllPost?.allPostSim);
  const params = useParams();
  const [listMsg, setListMsg] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [moneyCurrent, setMoneyCurrent] = useState(0);
  const [amount, setAmount] = useState(0);

  const [timeClick, setTimeClick] = useState(false);
  const [flagAmount, setFlagAmount] = useState(false);
  const [increaseTime, setIncreaseTime] = useState(0);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
    setFlagAmount(true);
    if (e.target.value > user.money) {
      setFlagAmount(false);
      toast.error("Tài khoản không đủ....");
    }
  };

  const handleSubmit = async (e, created_at, timeSession) => {
    e.preventDefault();
    if (amount == 0) {
      setFlagAmount(false);
      toast.error("Vui lòng chọn giá");
    }
    if (flagAmount) {
      setTimeClick(true);
      setTimeout(() => {
        setTimeClick(false);
      }, 5000);
      const data = {
        user_id: user.id,
        post_id: params.id,
        amount: amount,
      };
      if (
        convertTime(created_at, timeSession) - new Date().getTime() <=
        60 * 1000
      ) {
        setIncreaseTime((item) => item + 60 * 5 * 1000);
      }

      await axios.post("https://mfw060.wcom.vn/api/sendAmount", data);
    }
  };

  const findMoney = list.find((i) => i.id == params.id);

  const convertTime = (CREATED_TIME, TIME_EXPIRE) => {
    const timeCreate = new Date(CREATED_TIME).getTime();

    const dateTime = timeCreate + Number(TIME_EXPIRE) * 1000;

    return dateTime;
  };

  useEffect(async () => {
    const data = {
      post_id: params.id,
    };
    window.echo = new Echo({
      broadcaster: "socket.io",
      host: "https://mfw060.wcom.vn/" + ":6001",
    });

    window.echo
      .channel(`post.${params.id}`)

      .listen("MessagePosted", (e) => {
        const data = {
          user_id: e.user,
          post_id: e.post_id,
          amount: e.message,
          created_at: e.time,
        };
        setListMsg((oldArray) => [data, ...oldArray]);
        console.log(e);
      });
    const check = await showEach(data);
    setMoneyCurrent(findMoney?.amountStart);
    await setListMsg(check);
    setIsLoad(false);
  }, []);

  var sum = findMoney?.amountStart;
  const renderMoney = () => {
    listMsg?.forEach((e) => {
      sum = parseInt(sum) + parseInt(e.amount);
    });
    return Number(sum).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  const convertMoney = (money) => {
    return Number(money).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  const converDateTime = (time) => {
    const dt = new Date(time);
    return dt.toLocaleString();
  };
  var x = Number(findMoney?.amountStart).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <ToastContainer />
      {isLoad ? (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      ) : (
        <div className="home-page-main">
          <div className="app">
            <div className="messages">
              <div>
                <div>sim: {state?.sim}</div>
                Giá khởi điểm:{x} - Giá đã lên: {renderMoney()} -
                <UseCountdown
                  targetDate={convertTime(
                    findMoney.created_at,
                    findMoney.timeSession
                  )}
                  increaseTime={increaseTime}
                />
              </div>
              <div className="messages-history">
                {listMsg?.map((item) => {
                  return (
                    <div
                      className={
                        "message " + (item.user_id == user.id ? "me" : "")
                      }
                    >
                      <div class="message-body">
                        <div> + {convertMoney(item.amount)}</div>{" "}
                        <small>{converDateTime(item.created_at)}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
              {user.id == state?.userID ? (
                <>Là chủ vật phẩm không thể đấu giá - chỉ xem</>
              ) : (
                <form
                  className="messages-inputs"
                  onSubmit={(e) =>
                    handleSubmit(e, findMoney.created_at, findMoney.timeSession)
                  }
                >
                  <div class="selector">
                    <span class="selecotr-item">
                      <input
                        type="radio"
                        id="radio1"
                        class="selector-item_radio"
                        name="group1"
                        value="100000"
                        onChange={handleChangeAmount}
                      />
                      <label for="radio1" class="selector-item_label">
                        100.000
                      </label>
                    </span>
                    <span class="selecotr-item">
                      <input
                        type="radio"
                        id="radio2"
                        name="group1"
                        class="selector-item_radio"
                        value="200000"
                        onChange={handleChangeAmount}
                      />
                      <label for="radio2" class="selector-item_label">
                        200.000
                      </label>
                    </span>
                    <span class="selecotr-item">
                      <input
                        type="radio"
                        id="radio3"
                        name="group1"
                        class="selector-item_radio"
                        value="500000"
                        onChange={handleChangeAmount}
                      />
                      <label for="radio3" class="selector-item_label">
                        500.000
                      </label>
                    </span>
                  </div>
                  <UseButtonRise
                    targetDate={convertTime(
                      findMoney.created_at,
                      findMoney.timeSession
                    )}
                    increaseTime={increaseTime}
                    timeClick={timeClick}
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Link to="/post-sim">
        {" "}
        <button>Trở về trang trước</button>
      </Link>
    </>
  );
};

export default PostSim;
