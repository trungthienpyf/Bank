import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moveMoney } from "../redux/apiRequest";
import { authentication } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const changeData = async (
    ids,
    setID,
    setNameSim,
    sim,
    user_id,
    setUserId
  ) => {
    toggle();

    setID(ids);
    setNameSim(sim);

    setUserId(user_id);

    setIsShowing(!isShowing);
    const newUser = {
      id: user.id,
      toAc: "045704070000307",
    };

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );

    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(
      authentication,
      "+84" + user.phone.slice(1),

      appVerifier
    )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return {
    isShowing,
    toggle,
    changeData,
  };
};

export default useModal;
