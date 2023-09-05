import { useEffect, useState } from "react";
//import QuestionList from "../quiz/QuestionList";
import QuizHeader from "../quiz/QuizHeader";
import Question from "../quiz/Question";
import { useAddQuizMarkMutation } from "../../features/quizmark/quizmarkApi";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

function QuizForm({ quiz }) {
  const navigate = useNavigate();
  const { videoid } = useParams();
  const { isLoggedIn, user } = useAuth();
  const [addQuizMark, { isSuccess }] = useAddQuizMarkMutation();
  const [OpQuiz, setOpQuiz] = useState(quiz);

  const handleSubmit = (e) => {
    e.preventDefault();

    let totalQuiz = OpQuiz.length;
    let totalCorrect = 0;

    OpQuiz.forEach((element) => {
      let flag = true;

      element.options.forEach((option) => {
        if (option.isCorrect != option.userCorrect) {
          flag = false;
        }
      });
      if (flag) {
        totalCorrect++;
      }
    });
    if (isLoggedIn) {
      addQuizMark({
        student_id: user.id,
        student_name: user.name,
        video_id: videoid,
        video_title: OpQuiz[0].video_title,
        totalQuiz,
        totalCorrect,
        totalWrong: totalQuiz - totalCorrect,
        totalMark: totalQuiz * 5,
        mark: 5 * totalCorrect,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/course/${videoid}`);
    }
  }, [isSuccess, navigate, videoid]);

  return (
    <form onSubmit={handleSubmit}>
      <QuizHeader video_title={OpQuiz[0].video_title} />
      <div className="space-y-8 ">
        {OpQuiz.map((q) => (
          <Question
            key={q.id}
            quesDetails={q}
            setOpQuiz={setOpQuiz}
            questionid={q.id}
          />
        ))}
      </div>
      <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
        Submit
      </button>
    </form>
  );
}
export default QuizForm;
