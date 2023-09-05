import { apiSlice } from "../api/apiSlice";

export const assignmentmarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => `/assignmentMark`,
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarks",
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
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathresult = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentMarks",
            undefined,
            (draft) => {
              // eslint-disable-next-line eqeqeq
              return draft.filter((am) => am.id != arg);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          pathresult.undo();
        }
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarks",
                undefined,
                (draft) => {
                  const draftAssMrkDetails = draft.find(
                    // eslint-disable-next-line eqeqeq
                    (a) => a.id == arg.id
                  );
                  draftAssMrkDetails.title = result.data.title;
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    submitAssignmentMark: builder.mutation({
      query: ({ id, mark }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: { mark, status: "published" },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                const draftAssMrkDetails = draft.find(
                  // eslint-disable-next-line eqeqeq
                  (a) => a.id == arg.id
                );
                draftAssMrkDetails.mark = arg.mark;
                draftAssMrkDetails.status = "published";
              }
            )
          );
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetAssignmentMarksQuery,
  useAddAssignmentMarkMutation,
  useSubmitAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
  useDeleteAssignmentMarkMutation,
} = assignmentmarkApi;
