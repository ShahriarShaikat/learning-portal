import { assignmentmarkApi } from "../assignmentmark/assignmentmarkApi";
import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
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

    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
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
                "getAssignments",
                undefined,
                (draft) => {
                  // eslint-disable-next-line eqeqeq
                  const assignmentDraft = draft.find((a) => a.id == arg.id);
                  assignmentDraft.title = result.data.title;
                  assignmentDraft.video_id = result.data.video_id;
                  assignmentDraft.video_title = result.data.video_title;
                  assignmentDraft.totalMark = result.data.totalMark;
                }
              )
            );

            const assignmentmarks = await dispatch(
              assignmentmarkApi.endpoints.getAssignmentMarks.initiate()
            ).unwrap();
            const filteredAssMark = assignmentmarks.filter(
              (am) => am.assignment_id == arg.id
            );
            filteredAssMark.forEach(async (am) => {
              await dispatch(
                assignmentmarkApi.endpoints.editAssignmentMark.initiate({
                  id: am.id,
                  data: { title: result.data.title },
                })
              );
            });
          }
        } catch (err) {}
      },
    }),

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathresult = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              // eslint-disable-next-line eqeqeq
              return draft.filter((a) => a.id != arg);
            }
          )
        );
        try {
          await queryFulfilled;
          const assignmentmarks = await dispatch(
            assignmentmarkApi.endpoints.getAssignmentMarks.initiate()
          ).unwrap();
          const relatedAssMarks = assignmentmarks.filter(
            (am) => am.assignment_id == arg
          );
          relatedAssMarks.forEach(async (item) => {
            await dispatch(
              assignmentmarkApi.endpoints.deleteAssignmentMark.initiate(item.id)
            ).unwrap();
          });
        } catch (err) {
          pathresult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
