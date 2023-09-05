import { useEffect, useState } from "react";
import { useGetVideosQuery } from "../../features/videos/videoApi";
import { useNavigate } from "react-router-dom";
import Error from "../ui/Error";
import Option from "../ui/Option";
import {
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../features/assignment/assignmentApi";

function AdminEditAssignmentForm({ assignment }) {
  const navigate = useNavigate();
  const {
    data: videos,
    isLoading: isLoadingV,
    isError: isErrorV,
  } = useGetVideosQuery();
  const { data: assignments } = useGetAssignmentsQuery();
  const {
    id,
    title: Ptitle,
    video_id: pvideo_id,
    totalMark: ptotalMark,
  } = assignment || {};
  const [editAssignment, { isSuccess, isLoading, isError }] =
    useEditAssignmentMutation();

  const [title, setTitle] = useState(Ptitle.slice(15));
  const [totalMark, setTotalMark] = useState(ptotalMark);
  const [videoID, setVideoID] = useState(pvideo_id);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // eslint-disable-next-line eqeqeq
    const result = assignments?.filter((a) => a.video_id == videoID);
    // eslint-disable-next-line eqeqeq
    if (result?.length < 1 || videoID == pvideo_id) {
      editAssignment({
        id,
        data: {
          title: `Assignment ${videoID} - ${title}`,
          video_id: videoID,
          video_title: videos.reduce(
            (r, v) => (v.id === videoID ? v.title : r),
            ""
          ),
          totalMark,
        },
      });
    } else {
      setError("An assignment already assigned to this video...!");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignment");
    }
    if (isError) {
      setError("Failed to modify assignment details, please try again!");
    }
  }, [isSuccess, navigate, isError]);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative p-6 flex-auto">
        <div className="w-full mb-5">
          <label
            htmlFor="assignmenttitle"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-gray-300"
          >
            Assignment Title
          </label>
          <input
            type="text"
            id="assignmenttitle"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full mb-5">
          <label
            htmlFor="selectvideo"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-gray-300"
          >
            Select Video
          </label>
          {!isLoadingV && !isErrorV && videos?.length > 0 && (
            <select
              name="selectvideo"
              id="selectvideo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={videoID}
              onChange={(e) => setVideoID(Number(e.target.value))}
            >
              <option value="" hidden>
                Select Video
              </option>
              {videos.map((v) => (
                <Option key={v.id} id={v.id}>
                  {v.title}
                </Option>
              ))}
            </select>
          )}
        </div>
        <div className="w-full mb-5">
          <label
            htmlFor="totalmark"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-gray-300"
          >
            Total Mark
          </label>
          <input
            type="number"
            id="totalmark"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="total mark..."
            required
            value={totalMark}
            onChange={(e) => setTotalMark(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center justify-end w-full">
          <button
            disabled={isLoading}
            className="bg-sky-700 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </div>

      {error !== "" && <Error message={error} />}
    </form>
  );
}
export default AdminEditAssignmentForm;
