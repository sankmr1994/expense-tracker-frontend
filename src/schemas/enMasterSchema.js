import * as Yup from "yup";

export const EB_BUILDING_FORM_VALIDATION = Yup.object().shape({
  downHomeBill: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHomeBill: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  downHomeTotalUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHomeTotalUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHome2PreviousUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),

  motorPreviousUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHome2CurrentUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  motorCurrentUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),

  shopBill: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  shopTotalUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  shop3PreviousUnit: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  // shop3CurrentUnit: Yup.number()
  //   .integer()
  //   .typeError("Please enter valid amount.")
  //   .required(),

  downHomeTotalNoPeople: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHome1TotalNoPeople: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHome2TotalNoPeople: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  topRoomTotalNoPeople: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
});
