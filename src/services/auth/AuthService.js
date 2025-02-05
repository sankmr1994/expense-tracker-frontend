import axios from "axios";

axios.interceptors.request.use(
  (request) => {
    // Edit request config
    let token = getToken();
    request.headers["Authorization"] = token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AUTH_REST_API_BASE_URL = "http://localhost:8014/api/v1/auth";

export const userRegisterAPI = (registerObj) =>
  axios.post(AUTH_REST_API_BASE_URL + "/register", registerObj);

export const userLoginAPI = (loginObj) =>
  axios.post(AUTH_REST_API_BASE_URL + "/login", loginObj);

export const storeToken = (token) => localStorage.setItem("token", token);

const getToken = () => {
  return localStorage.getItem("token");
};

export const saveLoggedInUser = (userName, userRole) => {
  sessionStorage.setItem("authUser", userName);
  sessionStorage.setItem("role", userRole);
};

export const getLoggedInUser = () => {
  return sessionStorage.getItem("authUser");
};

export const isUserLoggedIn = () => {
  const userName = getLoggedInUser();
  if (userName) {
    return true;
  }
  return false;
};

export const isAdminUser = () => {
  const role = sessionStorage.getItem("role");
  if (role && role === "ROLE_ADMIN") {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};
