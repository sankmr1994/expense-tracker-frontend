import { createSlice } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
  name: "jwt",
  initialState: { jwtSessionExpiredError: false },
  reducers: {
    changeJwtSessionExpired: (state, action) => {
      state.jwtSessionExpiredError = action.payload;
    },
  },
});
export const { changeJwtSessionExpired } = jwtSlice.actions;
export default jwtSlice.reducer;
