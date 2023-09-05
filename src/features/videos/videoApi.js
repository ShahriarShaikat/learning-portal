import { apiSlice } from "../api/apiSlice";
import { assignmentApi } from "../assignment/assignmentApi";
import { quizApi } from "../quiz/quizApi";
import { quizmarkApi } from "../quizmark/quizmarkApi";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(result.data);
              })
            );
          }
        } catch (err) {}
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //console.log(result);
          if (result?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                // eslint-disable-next-line eqeqeq
                const videosDraft = draft.find((v) => v.id == arg.id);
                videosDraft.title = result.data.title;
                videosDraft.description = result.data.description;
                videosDraft.url = result.data.url;
                videosDraft.views = result.data.views;
                videosDraft.duration = result.data.duration;
              })
            );

            const assignments = await dispatch(
              assignmentApi.endpoints.getAssignments.initiate()
            ).unwrap();
            const filteredAssignment = assignments.filter(
              (a) => a.video_id == arg.id
            );
            filteredAssignment.forEach(async (a) => {
              await dispatch(
                assignmentApi.endpoints.editAssignment.initiate({
                  id: a.id,
                  data: { video_title: result.data.title },
                })
              );
            });

            const quizzes = await dispatch(
              quizApi.endpoints.getQuizzes.initiate()
            ).unwrap();
            const filteredQuiz = quizzes.filter((q) => q.video_id == arg.id);
            filteredQuiz.forEach(async (q) => {
              await dispatch(
                quizApi.endpoints.editQuiz.initiate({
                  id: q.id,
                  data: { video_title: result.data.title },
                })
              );
            });

            const quizMark = await dispatch(
              quizmarkApi.endpoints.getQuizMarks.initiate()
            ).unwrap();
            const filteredQuizMark = quizMark.filter(
              (qm) => qm.video_id == arg.id
            );
            filteredQuizMark.forEach(async (qm) => {
              await dispatch(
                quizmarkApi.endpoints.editQuizMark.initiate({
                  id: qm.id,
                  data: { video_title: result.data.title },
                })
              );
            });
          }
        } catch (err) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathresult = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            // eslint-disable-next-line eqeqeq
            return draft.filter((v) => v.id != arg);
          })
        );
        try {
          const result = await queryFulfilled;
          if (result?.meta?.response?.status === 200) {
            //assignment
            const resassignment = await dispatch(
              assignmentApi.endpoints.getAssignments.initiate()
            ).unwrap();
            const relatedAssignment = resassignment.filter(
              (am) => am.video_id == arg
            );
            relatedAssignment.forEach(async (item) => {
              await dispatch(
                assignmentApi.endpoints.deleteAssignment.initiate(item.id)
              ).unwrap();
            });

            //quiz
            const resquiz = await dispatch(
              quizApi.endpoints.getQuizzes.initiate()
            ).unwrap();
            const relatedquiz = resquiz.filter((q) => q.video_id == arg);
            relatedquiz.forEach(async (item) => {
              await dispatch(
                quizApi.endpoints.deleteQuiz.initiate(item.id)
              ).unwrap();
            });

            //Quiz Mark
            const resquizmark = await dispatch(
              quizmarkApi.endpoints.getQuizMarks.initiate()
            ).unwrap();
            const relatedquizmark = resquizmark.filter(
              (q) => q.video_id == arg
            );
            relatedquizmark.forEach(async (item) => {
              await dispatch(
                quizmarkApi.endpoints.deleteQuizMark.initiate(item.id)
              ).unwrap();
            });
          }
        } catch (err) {
          pathresult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
