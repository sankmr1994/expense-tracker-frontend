import * as Yup from "yup";

export const CATEGORY_VALIDATION = Yup.object().shape({
  categoryName: Yup.string()
    .required("This field required")
    .test(
      "len",
      "Category name must be at least 3 characters",
      (val) => val.length >= 3
    ),
  // categoryType: Yup.string().required("This field required"),
  description: Yup.string().required("This field required"),
  icon: Yup.string().required("This field required"),
});
