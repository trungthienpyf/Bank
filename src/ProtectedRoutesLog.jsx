import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  return user;
};

const ProtectedRoutesLog = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoutesLog;
