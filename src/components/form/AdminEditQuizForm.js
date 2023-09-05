import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../ui/Error";
import Option from "../ui/Option";
import { useGetVideosQuery } from "../../features/videos/videoApi";
import { useEditQuizMutation } from "../../features/quiz/quizApi";

function AdminEditQuizForm({ quiz }) {
  const navigate = useNavigate();
  const { id, question: pquestion, video_id, options } = quiz || {};

  const {
    data: videos,
    isLoading: isLoadingV,
    isError: isErrorV,
  } = useGetVideosQuery();
  const [editQuiz, { isSuccess, isLoading, isError }] = useEditQuizMutation();

  const [question, setQuestion] = useState(pquestion);
  // eslint-disable-next-line eqeqeq
  const [option1, setOption1] = useState(options.find((o) => o.id == 1));
  // eslint-disable-next-line eqeqeq
  const [option2, setOption2] = useState(options.find((o) => o.id == 2));
  // eslint-disable-next-line eqeqeq
  const [option3, setOption3] = useState(options.find((o) => o.id == 3));
  // eslint-disable-next-line eqeqeq
  const [option4, setOption4] = useState(options.find((o) => o.id == 4));
  const [videoID, setVideoID] = useState(video_id);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    editQuiz({
      id,
      data: {
        question,
        video_id: videoID,
        video_title: videos.reduce(
          // eslint-disable-next-line eqeqeq
          (r, v) => (v.id == videoID ? v.title : r),
          ""
        ),
        options: [
          { ...option1 },
          { ...option2 },
          { ...option3 },
          { ...option4 },
        ],
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/quizzes");
    }
    if (isError) {
      setError("Failed to edit quiz info, try again with valid data!");
    }
  }, [isSuccess, navigate, isError]);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative p-6 flex-auto">
        <div className="w-full mb-5">
          <label
            htmlFor="quiztitle"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-gray-300"
          >
            Quiz Title
          </label>
          <input
            type="text"
            id="quiztitle"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title..."
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
        <div className="grid grid-cols-2 mb-5 gap-4 w-full">
          <div>
            <label
              htmlFor="option1"
              className="block text-sm font-medium text-white-700 mb-5"
            >
              Option 1
            </label>
            <div className="flex flex-cols-2 gap-4 w-full">
              <input
                type="checkbox"
                checked={option1.isCorrect}
                onChange={(e) =>
                  setOption1({ ...option1, isCorrect: e.target.checked })
                }
              />
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type question for option 1...."
                required
                value={option1.option}
                onChange={(e) =>
                  setOption1({ ...option1, option: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="option2"
              className="block text-sm font-medium text-white-700 mb-5"
            >
              Option 2
            </label>
            <div className="flex flex-cols-2 gap-4 w-full">
              <input
                type="checkbox"
                checked={option2.isCorrect}
                onChange={(e) =>
                  setOption2({ ...option2, isCorrect: e.target.checked })
                }
              />
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type question for option 2..."
                required
                value={option2.option}
                onChange={(e) =>
                  setOption2({ ...option2, option: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="option3"
              className="block text-sm font-medium text-white-700 mb-5"
            >
              Option 3
            </label>
            <div className="flex flex-cols-2 gap-4 w-full">
              <input
                type="checkbox"
                checked={option3.isCorrect}
                onChange={(e) =>
                  setOption3({ ...option3, isCorrect: e.target.checked })
                }
              />
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type question for option 3...."
                required
                value={option3.option}
                onChange={(e) =>
                  setOption3({ ...option3, option: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="option4"
              className="block text-sm font-medium text-white-700 mb-5"
            >
              Option 4
            </label>
            <div className="flex flex-cols-2 gap-4 w-full">
              <input
                type="checkbox"
                checked={option4.isCorrect}
                onChange={(e) =>
                  setOption4({ ...option4, isCorrect: e.target.checked })
                }
              />
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type question for option 4..."
                required
                value={option4.option}
                onChange={(e) =>
                  setOption4({ ...option4, option: e.target.value })
                }
              />
            </div>
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
      {error !== "" && <Error message={error} />}
    </form>
  );
}
export default AdminEditQuizForm;
