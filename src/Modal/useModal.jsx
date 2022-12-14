import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moveMoney } from "../redux/apiRequest";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const changeData = async (ids, set) => {
    toggle();
    console.log(ids);
    set(ids);
    setIsShowing(!isShowing);
    const newUser = {
      id: user.id,
      toAc: "045704070000307",
    };
    moveMoney(newUser, dispatch);

    // navigate(`/post-sim/${id}`);
  };
  return {
    isShowing,
    toggle,
    changeData,
  };
};

export default useModal;
