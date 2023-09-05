import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentAssignmentForm from "../form/StudentAssignmentForm";
import useAssignmentSubmit from "../../hooks/useAssignmentSubmit";
import useQuizSubmit from "../../hooks/useQuizSubmit";

function Player({ video }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { id, title, description, createdAt, url } = video || {};
  const { isSubmitted, mark } = useQuizSubmit(id);

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {showModal && (
        <StudentAssignmentForm videoid={id} setShowModal={setShowModal} />
      )}
      <iframe
        width="100%"
        className="aspect-video"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          {`Uploaded on ${new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
        </h2>

        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            disabled={useAssignmentSubmit(id)}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            এসাইনমেন্ট
          </button>

          <button
            onClick={() => navigate(`/quiz/${id}`)}
            disabled={isSubmitted}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            {isSubmitted
              ? `আপনি কুইজ থেকে ${mark} পেয়েছেন`
              : `কুইজে অংশগ্রহণ করুন`}
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
      </div>
    </div>
  );
}
export default Player;
