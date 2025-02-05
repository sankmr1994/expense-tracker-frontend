import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomeDetailsResponse: { incomeList: [], totalAmount: 0 },
  },
  reducers: {
    addIncomeDetails: (state, action) => {
      state.incomeDetailsResponse = { ...action.payload };
    },
  },
});
export const { addIncomeDetails } = incomeSlice.actions;
export default incomeSlice.reducer;
