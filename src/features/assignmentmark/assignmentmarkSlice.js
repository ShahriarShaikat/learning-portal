import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const assignmentmarkSlice = createSlice({
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
export const {} = assignmentmarkSlice.actions;
export default assignmentmarkSlice.reducer;
