import * as Yup from "yup";

export const INCOME_VALIDATION = Yup.object().shape({
  incomeName: Yup.string().required("This field required"),
  incomeDate: Yup.date()
    .required("This field required")
    .typeError("Invalid date format"),
  amount: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required("This field required"),
  description: Yup.string().required("This field required"),
  incomeAccountType: Yup.string().required("This field required"),
  incomeCategoryType: Yup.string().required("This field required"),
  incomePaymentType: Yup.string().required("This field required"),
});
