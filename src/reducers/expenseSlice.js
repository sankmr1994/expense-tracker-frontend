import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenseDetailsResponse: { expenseList: [], totalAmount: 0 },
  },
  reducers: {
    addExpenseDetails: (state, action) => {
      state.expenseDetailsResponse = { ...action.payload };
    },
  },
});
export const { addExpenseDetails } = expenseSlice.actions;
export default expenseSlice.reducer;
