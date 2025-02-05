import * as Yup from "yup";

export const INCOME_PAGE_VALIDATION = Yup.object().shape({
  incomeYearMonth: Yup.date()
    .required("This field required")
    .typeError("Invalid date format"),
});
