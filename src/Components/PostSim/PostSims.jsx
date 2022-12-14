import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UseButtonCountdown from "../../CountTime/UseButtonCountdown";

import UseCountdown from "../../CountTime/UseCountdown";
import Modal from "../../Modal/Modal";
import useModal from "../../Modal/useModal";
import { getAllPost } from "../../redux/apiRequest";

import "./postSims.css";

const PostSims = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (state?.showToast) {
      toast.success("Tạo đấu giá thành công");
    }
  }, [state]);

  const { isShowing, toggle, changeData } = useModal();
  const user = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [idRoom, setIdRoom] = useState("");
  useEffect(() => {
    getAllPost(dispatch).then((k) => {
      setData(k);
    });
  }, []);

  const convertTime = (CREATED_TIME, TIME_EXPIRE) => {
    const timeCreate = new Date(CREATED_TIME).getTime();

    const dateTime = timeCreate + Number(TIME_EXPIRE) * 1000;

    return dateTime;
  };

  return (
    <>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        phone={user?.phone}
        user_id={user.id}
        idRoom={idRoom}
      />
      <ToastContainer />
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

          {data?.map((item) => {
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
                          increaseTime={0}
                        />
                      </div>
                    </div>
                    <div className="home-col-d-column">Mốc tiền hiện tại:</div>
                  </div>
                  {user.money < 1000000 ? (
                    <>Bạn không đủ để tham gia đấu giá chơi</>
                  ) : (
                    <UseButtonCountdown
                      targetDate={convertTime(
                        item.created_at,
                        item.timeSession
                      )}
                      id={item.id}
                      CREATED_TIME={item.created_at}
                      TIME_EXPIRE={item.timeSession}
                      setIdRoom={setIdRoom}
                      changeData={changeData}
                    />
                  )}
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
