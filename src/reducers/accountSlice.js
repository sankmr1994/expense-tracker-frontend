import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountList: [],
    accountIdAndNameList: [],
  },
  reducers: {
    addListOfAccount: (state, action) => {
      state.accountList = [...action.payload];
    },
    addListOfAccountIdAndName: (state, action) => {
      state.accountIdAndNameList = [...action.payload];
    },
  },
});
export const { addListOfAccount, addListOfAccountIdAndName } =
  accountSlice.actions;
export default accountSlice.reducer;
