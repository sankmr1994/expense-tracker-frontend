import * as Yup from "yup";
import { PASSWORD_RULE } from "../utils/constants";

export const USER_REGISTER_VALIDATION = Yup.object().shape({
  //Registraion schema
  name: Yup.string().required("This field required"),
  userName: Yup.string().required("This field required"),
  email: Yup.string()
    .email("please enter the valid email address")
    .required("This field required"),
  password: Yup.string()
    .matches(PASSWORD_RULE, { message: "Please create a stronger password" })
    .required("This field required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("This field required"),
  gender: Yup.string().required("This field required"),
  dob: Yup.date()
    .required("This field required")
    .typeError("Invalid date format"),
});
