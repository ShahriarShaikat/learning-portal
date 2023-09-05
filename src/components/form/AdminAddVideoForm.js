import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import ModalButtons from "../modal/ModalButtons";
import ModalHeader from "../modal/ModalHeader";
import { useAddVideoMutation } from "../../features/videos/videoApi";
import Error from "../ui/Error";

function AdminAddVideoForm({ setShowModal }) {
  const [addVideo, { isSuccess, isLoading, isError }] = useAddVideoMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({
      title,
      description,
      url,
      views,
      duration,
      createdAt: new Date().toISOString(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setUrl("");
      setViews("");
      setDuration("");
      setShowModal(false);
    }
  }, [isSuccess, setShowModal]);

  return (
    <Modal>
      <ModalHeader title="Add Video" />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative p-6 flex-auto">
          <div className="w-full mb-5">
            <label
              htmlFor="videotitle"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Video Title
            </label>
            <input
              type="text"
              id="videotitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="videodescription"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Video Description
            </label>
            <textarea
              type="text"
              id="videodescription"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="description..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="videourl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Video Url
            </label>
            <input
              type="url"
              id="videourl"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="video url..."
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label
                htmlFor="views"
                className="block text-sm font-medium text-gray-700"
              >
                Views
              </label>
              <input
                type="text"
                name="views"
                id="views"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="views..."
                required
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="videoduration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                type="text"
                name="videoduration"
                id="videoduration"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="duration..."
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ModalButtons setShowModal={setShowModal} submitBtnStatus={isLoading} />
      </form>
      {isError && (
        <Error message="Something error occure, try again with valid data" />
      )}
    </Modal>
  );
}
export default AdminAddVideoForm;
