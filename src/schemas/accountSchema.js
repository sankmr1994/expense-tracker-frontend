import * as Yup from "yup";

export const ACCOUNT_VALIDATION = Yup.object().shape({
  accountName: Yup.string()
    .required("This field required")
    .test(
      "len",
      "Account name must be at least 3 characters",
      (val) => val.length >= 3
    ),
  description: Yup.string().required("This field required"),
  amount: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
});
