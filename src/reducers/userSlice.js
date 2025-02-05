import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserAuth: false,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.isUserAuth = action.payload;
    },
  },
});
export const { userLoggedIn } = userSlice.actions;
export default userSlice.reducer;
