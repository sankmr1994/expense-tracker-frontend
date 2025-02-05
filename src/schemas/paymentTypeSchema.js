import * as Yup from "yup";

export const PAYMENT_TYPE_VALIDATION = Yup.object().shape({
  paymentTypeName: Yup.string()
    .required("This field required")
    .test(
      "len",
      "Account name must be at least 3 characters",
      (val) => val.length >= 3
    ),
  description: Yup.string().required("This field required"),
});
