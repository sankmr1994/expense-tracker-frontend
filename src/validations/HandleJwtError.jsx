import { changeJwtSessionExpired } from "../reducers/jwtSlice";
import { userLoggedIn } from "../reducers/userSlice";
import { logout } from "../services/auth/AuthService";

const HandleJwtError = (errorCode, navigator, dispatch) => {
  switch (errorCode) {
    case 104: {
      logout();
      dispatch(userLoggedIn(false));
      dispatch(changeJwtSessionExpired(true));
      navigator("/login");
      break;
    }
  }
};

export default HandleJwtError;
