import * as Yup from "yup";

export const EB_UNIT_FORM_VALIDATION = Yup.object().shape({
  downHomeCurrentTotalUnits: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHomeCurrentTotalUnits: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  shopCurrentTotalUnits: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHome2PreviousSubMtrReading: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHome2CurrentSubMtrReading: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),

  motorPreviousSubMtrReading: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  motorCurrentSubMtrReading: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  // shop3PreviousSubMtrReading: Yup.number()
  //   .integer()
  //   .typeError("Please enter valid amount.")
  //   .required(),
  // shop3CurrentSubMtrReading: Yup.number()
  //   .integer()
  //   .typeError("Please enter valid amount.")
  //   .required(),
});

export const EB_BILL_FORM_VALIDATION = Yup.object().shape({
  downHomeBill: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
  upHomeBill: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),

  shopBill: Yup.number()
    .integer()
    .typeError("Please enter valid amount.")
    .required(),
});
