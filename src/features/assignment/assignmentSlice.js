import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // userLoggedIn: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.user = action.payload.user;
    // }
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = assignmentSlice.actions;
export default assignmentSlice.reducer;
