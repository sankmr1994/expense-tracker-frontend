import { createSlice } from "@reduxjs/toolkit";

const paymentTypeSlice = createSlice({
  name: "paymentType",
  initialState: {
    paymentTypeList: [],
    paymentTypeIdAndNameList: [],
  },
  reducers: {
    addListOfPaymentType: (state, action) => {
      state.paymentTypeList = [...action.payload];
    },
    addListOfPaymentTypeIdAndName: (state, action) => {
      state.paymentTypeIdAndNameList = [...action.payload];
    },
  },
});
export const { addListOfPaymentType, addListOfPaymentTypeIdAndName } =
  paymentTypeSlice.actions;
export default paymentTypeSlice.reducer;
