import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const auth = {
            accessToken: result.data.accessToken,
            user: result.data.user,
          };
          localStorage.setItem("auth", JSON.stringify(auth));
          dispatch(userLoggedIn(auth));
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (params) => ({
        url: "/login",
        method: "POST",
        body: params.data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.user?.role === arg.type) {
            const auth = {
              accessToken: result.data.accessToken,
              user: result.data.user,
            };
            localStorage.setItem("auth", JSON.stringify(auth));
            dispatch(userLoggedIn(auth));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useLoginMutation, useRegisterMutation } =
  authApi;
