import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CountdownTimer from "../../CountTime/CountdownTimer";
import { getAllPost } from "../../redux/apiRequest";
import "./postSims.css";

const PostSims = () => {
  //DUMMY DATA
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
    console.log(TIME_EXPIRE);
    return dateTime;
  }, []);

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
                      <div className="text-start">
                        <span>
                          Thời gian còn:
                          <CountdownTimer
                            targetDate={convertTime(
                              item.created_at,
                              item.timeSession
                            )}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="home-col-d-column">Mốc tiền hiện tại:</div>
                  </div>
                  <Link to={`/post-sim/${item.id}`}>
                    <button>Đấu giá ngay</button>
                  </Link>
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
