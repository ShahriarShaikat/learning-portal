import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes",
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  draft.push(result.data);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //console.log(result);
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  // eslint-disable-next-line eqeqeq
                  const quizzesDraft = draft.find((q) => q.id == arg.id);
                  quizzesDraft.question = result.data.question;
                  quizzesDraft.video_id = result.data.video_id;
                  quizzesDraft.video_title = result.data.video_title;
                  quizzesDraft.options = result.data.options;
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathresult = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            // eslint-disable-next-line eqeqeq
            return draft.filter((q) => q.id != arg);
          })
        );
        try {
          await queryFulfilled;
          //
        } catch (err) {
          pathresult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
