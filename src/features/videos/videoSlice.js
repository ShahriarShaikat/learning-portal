import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    // userLoggedIn: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.user = action.payload.user;
    // }
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;
export default authSlice.reducer;
