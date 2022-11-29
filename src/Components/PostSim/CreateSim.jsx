import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { storePost } from "../../redux/apiRequest";

import "./createSim.css";

const CreateSim = () => {
  //DUMMY DATA
  const user = useSelector((state) => state.auth.login?.currentUser);
  const load = useSelector((state) => state.postSim.storePost?.isFetching);

  const navigate = useNavigate();
  //const status = useSelector((state) => state.auth.MoveMoney?.success);
  const [nameSim, setNameSim] = useState("");
  const [amountStart, setAmountStart] = useState("");

  const [timeSession, setTimeSession] = useState("3600");

  const dispatch = useDispatch();
  const handleStorePost = (e) => {
    e.preventDefault();

    const newUser2 = {
      nameSim: nameSim,
      amountStart: amountStart,
      timeSession: timeSession,
      user_id: user.id,
    };
    storePost(newUser2, dispatch, navigate);
  };

  const renderText = () => {
    if (load) {
      return (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      );
    }

    return (
      <>
        <div className="form-padding">
          <label className="f-left">Số sim đấu giá</label>
          <input
            className="full-width input-payment"
            placeholder="Nhập số sim đấu giá"
            onChange={(e) => setNameSim(e.target.value)}
            value={nameSim}
          />
          <label className="f-left">Số tiền khởi đầu</label>
          <input
            className="full-width input-payment"
            placeholder="Số tiền (VND)"
            onChange={(e) => setAmountStart(e.target.value)}
            value={amountStart}
          />
          <label className="f-left">Thời gian đấu giá</label>
          <select
            className="full-width input-payment"
            onChange={(e) => setTimeSession(e.target.value)}
            value={timeSession}
          >
            <option value="3600">1 giờ</option>
            <option value="10800">3 giờ</option>
            <option value="21600">6 giờ</option>
            <option value="43200">12 giờ</option>
            <option value="86400">1 ngày</option>
          </select>

          <div className="home-row around-between">
            <Link to="/post-sim" className="full-width m-1 ">
              <button className="full-width m-1 ">Quay lại</button>
            </Link>
            <button className="full-width m-1 ">Tạo đấu giá</button>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {user ? (
        <div className="home-top home-padding">{user.fullName} </div>
      ) : (
        ""
      )}

      <div className="home-page-main">
        <div className="home-page-width1 mt-2 ">
          <h3> Đấu giá</h3>
          <form className="form-padding " onSubmit={handleStorePost}>
            {renderText()}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateSim;