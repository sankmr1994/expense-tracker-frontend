import { createSlice } from "@reduxjs/toolkit";

const pieChartSlice = createSlice({
  name: "account",
  initialState: {
    pieChartDetailsResponse: { pieChartDetailsList: [], totalAmount: 0 },
  },
  reducers: {
    addListOfExpenseByCategory: (state, action) => {
      state.pieChartDetailsResponse = { ...action.payload };
    },
  },
});
export const { addListOfExpenseByCategory } = pieChartSlice.actions;
export default pieChartSlice.reducer;
