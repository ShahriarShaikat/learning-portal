import { apiSlice } from "../api/apiSlice";

export const quizmarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => "/quizMark",
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarks",
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
    editQuizMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizMark/${id}`,
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
                "getQuizMarks",
                undefined,
                (draft) => {
                  // eslint-disable-next-line eqeqeq
                  const quizzesMarkDraft = draft.find((qm) => qm.id == arg.id);
                  quizzesMarkDraft.video_title = result.data.video_title;
                }
              )
            );
          }
        } catch (err) {}
      },
    }),

    deleteQuizMark: builder.mutation({
      query: (id) => ({
        url: `/quizMark/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathResult = dispatch(
          apiSlice.util.updateQueryData("getQuizMarks", undefined, (draft) => {
            // eslint-disable-next-line eqeqeq
            return draft.filter((qm) => qm.id != arg);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          pathResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetQuizMarksQuery,
  useAddQuizMarkMutation,
  useEditQuizMarkMutation,
  useDeleteQuizMarkMutation,
} = quizmarkApi;
