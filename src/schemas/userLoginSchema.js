import * as Yup from "yup";

export const USER_LOGIN_VALIDATION = Yup.object().shape({
  //Login schema
  userNameOrEmail: Yup.string().required("This field required"),
  password: Yup.string().required("This field required"),
});
