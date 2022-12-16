import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutStart, logoutSuccess } from "../../redux/authSlice";
import "./navbar.css";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logoutSuccess());
    navigate("/login");
  };
  return (
    <nav className="navbar-container">
      <div className="font-big">BankBank</div>{" "}
      {user ? (
        <>
          <div>
            <Link to="/" className="navbar-home">
              {" "}
              Trang chủ{" "}
            </Link>
            <p className="navbar-user">
              Xin chào, <span> {user.fullName} </span>{" "}
            </p>
            <Link to="/logout" className="navbar-logout" onClick={handleLogout}>
              {" "}
              Đăng xuất
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/login" className="navbar-login">
              {" "}
              Đăng nhập{" "}
            </Link>
            <Link to="/register" className="navbar-register">
              {" "}
              Đăng ký
            </Link>
          </div>
        </>
      )}{" "}
    </nav>
  );
};

export default NavBar;
