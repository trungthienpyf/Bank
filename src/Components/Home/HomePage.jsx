import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const HomePage = () => {
  //DUMMY DATA
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  var x = Number(user?.money).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
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
            <div className="home-col ">
              <Link to="/move-money">
                <button className="home-btn">Chuyển tiền</button>
              </Link>
            </div>
            <div className="home-col">
              <button className="home-btn">Nhắc nợ</button>
            </div>
          </div>
          <div className="home-row">
            <div className="home-col">
              <button className="home-btn">Top Up</button>
            </div>
            <div className="home-col">
              <button className="home-btn"> Thanh toán hóa đơn</button>
            </div>
          </div>
          <button className="button-page-home">
            <div className="home-row-2">
              <div className="">
                <div className="text-start">Taì khoản chính</div>
                <div className="text-start">
                  số tài khoản:{user?.accountNumber}
                </div>
              </div>
              <div className="home-col-d-column">{x}</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
