import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UseButtonCountdown from "../../CountTime/UseButtonCountdown";

import UseCountdown from "../../CountTime/UseCountdown";
import { getAllPost } from "../../redux/apiRequest";
import "./postSims.css";

const now = new Date().getTime();

const PostSims = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const listPost = useSelector((state) => state.postSim.getAllPost?.allPostSim);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPost(dispatch);
  }, []);

  const convertTime = useCallback((CREATED_TIME, TIME_EXPIRE) => {
    const timeCreate = new Date(CREATED_TIME).getTime();

    const dateTime = timeCreate + Number(TIME_EXPIRE) * 1000;

    return dateTime;
  }, []);

  // const checkTime = (CREATED_TIME, TIME_EXPIRE, id) => {
  //   const timeCreate = new Date(CREATED_TIME).getTime();

  //   const dateTime = timeCreate + Number(TIME_EXPIRE) * 1000;
  // };

  return (
    <>
      {user ? (
        <div className="home-top home-padding">{user.fullName} </div>
      ) : (
        ""
      )}

      <div className="home-page-main">
        <div className="home-page-width">
          <div className="home-row">
            <div className="center-post-sim">
              <Link to="/create-post-sim">
                <button className="btn-create-post"> Tạo đấu giá</button>{" "}
              </Link>
            </div>
          </div>
          <div className="home-row-2">
            <div className="">
              <h3>Danh sách đấu giá đang diễn ra</h3>
            </div>
          </div>
          {listPost?.map((item) => {
            return (
              <>
                <button className="button-page-home cursor-disable">
                  <div className="home-row-2">
                    <div className="">
                      <div className="text-start">Sim: {item.nameSim}</div>

                      <div className="text-start d-flex">
                        <span>Thời gian còn:</span>
                        <UseCountdown
                          targetDate={convertTime(
                            item.created_at,
                            item.timeSession
                          )}
                        />
                      </div>
                    </div>
                    <div className="home-col-d-column">Mốc tiền hiện tại:</div>
                  </div>
                  <UseButtonCountdown
                    targetDate={convertTime(item.created_at, item.timeSession)}
                    id={item.id}
                    CREATED_TIME={item.created_at}
                    TIME_EXPIRE={item.timeSession}
                  />
                </button>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostSims;
