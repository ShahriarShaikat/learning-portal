import Modal from "../modal/Modal";
import ModalHeader from "../modal/ModalHeader";
import { useEffect, useState } from "react";
import ModalButtons from "../modal/ModalButtons";
import { useGetVideosQuery } from "../../features/videos/videoApi";
import Error from "../ui/Error";
import Option from "../ui/Option";
import { useAddQuizMutation } from "../../features/quiz/quizApi";

function AdminAddQuizForm({ setShowModal }) {
  const {
    data: videos,
    isLoading: isLoadingV,
    isError: isErrorV,
  } = useGetVideosQuery();
  const [addQuiz, { isSuccess, isLoading, isError }] = useAddQuizMutation();
  const [title, setTitle] = useState("");
  const [option1, setOption1] = useState({
    id: 1,
    option: "",
    isCorrect: false,
  });
  const [option2, setOption2] = useState({
    id: 2,
    option: "",
    isCorrect: false,
  });
  const [option3, setOption3] = useState({
    id: 3,
    option: "",
    isCorrect: false,
  });
  const [option4, setOption4] = useState({
    id: 4,
    option: "",
    isCorrect: false,
  });
  const [videoID, setVideoID] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    addQuiz({
      question: title,
      video_id: videoID,
      video_title: videos.reduce(
        (r, v) => (v.id === videoID ? v.title : r),
        ""
      ),
      options: [{ ...option1 }, { ...option2 }, { ...option3 }, { ...option4 }],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setVideoID("");
      setOption1({ id: 1, option: "", isCorrect: false });
      setOption2({ id: 2, option: "", isCorrect: false });
      setOption3({ id: 3, option: "", isCorrect: false });
      setOption4({ id: 4, option: "", isCorrect: false });
      setShowModal(false);
    }
    if (isError) {
      setError("Unable to add the quiz , please try with valid data!");
    }
  }, [isSuccess, setShowModal, isError]);

  return (
    <Modal>
      <ModalHeader title="Add Quiz" />
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative p-6 flex-auto">
          <div className="w-full mb-5">
            <label
              htmlFor="quiztitle"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Quiz Title
            </label>
            <input
              type="text"
              id="quiztitle"
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
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label
                htmlFor="option1"
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
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
        </div>
        <ModalButtons setShowModal={setShowModal} submitBtnStatus={isLoading} />
        {error !== "" && <Error message={error} />}
      </form>
    </Modal>
  );
}
export default AdminAddQuizForm;
