import * as Yup from "yup";

export const EXPENSE_PAGE_VALIDATION = Yup.object().shape({
  expenseYearMonth: Yup.date()
    .required("This field required")
    .typeError("Invalid date format"),
});
