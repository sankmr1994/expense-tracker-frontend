import { logout } from "../services/auth/AuthService";
import { userLoggedIn } from "../reducers/userSlice";

const HandleLogout = (dispatch, navigator) => {
  logout();
  dispatch(userLoggedIn(false));
  navigator("/login");
};

export default HandleLogout;
