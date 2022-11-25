import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiRequest";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [identityNumber, setIdentity] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => state.auth.login.errorMessage);
  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      identityNumber: identityNumber,
      phone: phone,
      fullName: fullName,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <section className="register-container">
      <div className="register-title"> Đăng ký </div>
      <form onSubmit={handleRegister}>
        <label>Họ và tên</label>
        <input
          type="text"
          placeholder="Enter your họ và tên"
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Tài khoản</label>
        <input
          type="text"
          placeholder="Enter your tài khoản"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Enter your mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Số căn cước</label>
        <input
          type="text"
          placeholder="Enter your số căn cước"
          onChange={(e) => setIdentity(e.target.value)}
        />
        <label>Số điện thoại</label>
        <input
          type="text"
          placeholder="Vui lòng nhập điện thoại"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit"> Create account </button>
      </form>
    </section>
  );
};

export default Register;
