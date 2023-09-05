import Modal from "../modal/Modal";
import ModalHeader from "../modal/ModalHeader";
import { useEffect, useState } from "react";
import ModalButtons from "../modal/ModalButtons";
import { useGetVideosQuery } from "../../features/videos/videoApi";
import Error from "../ui/Error";
import Option from "../ui/Option";
import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../features/assignment/assignmentApi";

function AdminAddAssignmentForm({ setShowModal }) {
  const {
    data: videos,
    isLoading: isLoadingV,
    isError: isErrorV,
  } = useGetVideosQuery();
  const [addAssignment, { isSuccess, isLoading, isError }] =
    useAddAssignmentMutation();

  const { data: assignments } = useGetAssignmentsQuery();

  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [videoID, setVideoID] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // eslint-disable-next-line eqeqeq
    const result = assignments?.filter((a) => a.video_id == videoID);
    if (result?.length < 1) {
      addAssignment({
        title: `Assignment ${videoID} - ${title}`,
        video_id: videoID,
        video_title: videos.reduce(
          (r, v) => (v.id === videoID ? v.title : r),
          ""
        ),
        totalMark,
      });
    } else {
      setError("An assignment already assigned to this video...!");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setTotalMark("");
      setVideoID("");
      setShowModal(false);
    }
    if (isError) {
      setError(
        "Unable to add this assignment, please try again with valid data."
      );
    }
  }, [isSuccess, setShowModal, isError]);

  return (
    <Modal>
      <ModalHeader title="Add Assignment" />
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative p-6 flex-auto">
          <div className="w-full mb-5">
            <label
              htmlFor="assignmenttitle"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
        </div>
        <ModalButtons setShowModal={setShowModal} submitBtnStatus={isLoading} />
        {error !== "" && <Error message={error} />}
      </form>
    </Modal>
  );
}
export default AdminAddAssignmentForm;
