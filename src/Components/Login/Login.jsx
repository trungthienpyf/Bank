import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => state.auth.login.errorMessage);
  const isLoad = useSelector((state) => state.auth.login.isFetching);
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <>
      {isLoad ? (
        <div className="heigh-main">
          <div class="loader ">Loading... </div>
        </div>
      ) : (
        <section className="login-container">
          <div className="login-title"> Đăng nhập</div>
          <form onSubmit={handleLogin}>
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <small class="register-error">{errorMessage}</small>
            <button type="submit"> Đăng nhập </button>
          </form>
          <div className="login-register"> Bạn đã có tài khoản chưa? </div>
          <Link className="login-register-link" to="/register">
            Đăng ký ngay
          </Link>
        </section>
      )}
    </>
  );
};

export default Login;
