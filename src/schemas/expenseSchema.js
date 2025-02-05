import * as Yup from "yup";

export const EXPENSE_VALIDATION = Yup.object().shape({
  expenseName: Yup.string().required("This field required"),
  expenseDate: Yup.date()
    .required("This field required")
    .typeError("Invalid date format"),
  amount: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required("This field required"),
  description: Yup.string().required("This field required"),
  expenseAccountType: Yup.string().required("This field required"),
  expenseCategoryType: Yup.string().required("This field required"),
  expensePaymentType: Yup.string().required("This field required"),
});
