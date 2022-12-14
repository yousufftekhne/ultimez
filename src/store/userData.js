import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    userValue: [],
  },
  reducers: {
    addUserDetails(state, action) {
      state.userValue = action.payload;
    },
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
