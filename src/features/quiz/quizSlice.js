import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // userLoggedIn: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.user = action.payload.user;
    // }
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = quizSlice.actions;
export default quizSlice.reducer;
