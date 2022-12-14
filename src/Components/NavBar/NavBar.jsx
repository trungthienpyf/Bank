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
      {user ? (
        <>
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
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            {" "}
            Đăng nhập{" "}
          </Link>
          <Link to="/register" className="navbar-register">
            {" "}
            Đăng ký
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
