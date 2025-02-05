import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    categoryIdAndNameList: [],
  },
  reducers: {
    addListOfCategory: (state, action) => {
      state.categoryList = [...action.payload];
    },
    addListOfCategoryIdAndName: (state, action) => {
      state.categoryIdAndNameList = [...action.payload];
    },
  },
});
export const { addListOfCategory, addListOfCategoryIdAndName } =
  categorySlice.actions;
export default categorySlice.reducer;
