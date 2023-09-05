import { useEffect, useState } from "react";
import { useEditVideoMutation } from "../../features/videos/videoApi";
import { useNavigate } from "react-router-dom";
import Error from "../ui/Error";

function AdminEditVideoForm({ video }) {
  const navigate = useNavigate();
  const {
    id,
    title: Ptitle,
    description: Pdescription,
    url: Purl,
    views: Pviews,
    duration: Pduration,
  } = video || {};
  const [editVideo, { isSuccess, isLoading, isError, error }] =
    useEditVideoMutation();
  const [title, setTitle] = useState(Ptitle);
  const [description, setDescription] = useState(Pdescription);
  const [url, setUrl] = useState(Purl);
  const [views, setViews] = useState(Pviews);
  const [duration, setDuration] = useState(Pduration);
  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id,
      data: {
        title,
        description,
        url,
        views,
        duration,
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/videos");
    }
  }, [isSuccess, navigate]);
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative p-6 flex-auto">
        <div className="w-full mb-5">
          <label
            htmlFor="videotitle"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-gray-300"
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
            className="block mb-2 text-sm font-medium text-white-900 dark:text-gray-300"
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
            className="block mb-2 text-sm font-medium text-white-900 dark:text-gray-300"
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
        <div className="grid grid-cols-2 gap-4 w-full mb-5">
          <div>
            <label
              htmlFor="views"
              className="block text-sm font-medium text-white-900"
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
              className="block text-sm font-medium text-white-900"
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
      {isError && <Error message={error} />}
    </form>
  );
}
export default AdminEditVideoForm;
