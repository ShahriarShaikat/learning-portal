import { useParams } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
// import QuestionList from "../components/quiz/QuestionList";
// import QuizHeader from "../components/quiz/QuizHeader";
import { useGetQuizzesQuery } from "../features/quiz/quizApi";
import QuizForm from "../components/form/QuizForm";

function Quiz() {
  const { videoid } = useParams();
  const { data: quezzes, isLoading, isError, error } = useGetQuizzesQuery();

  // decide what to render
  let content = null;

  if (isLoading)
    content = <div className="col-span-12 text-center">Loading...</div>;
  if (!isLoading && isError) {
    content = <div className="col-span-12 text-center">{error}</div>;
  }
  if (!isLoading && !isError && quezzes?.length === 0) {
    content = (
      <div className="col-span-12 text-center">
        No quiz found for this video!
      </div>
    );
  }
  if (!isLoading && !isError && quezzes?.length > 0) {
    let quiz = quezzes?.filter((q) => q.video_id == videoid);
    //quiz = quiz;
    content =
      quiz?.length > 0 ? (
        <QuizForm
          quiz={quiz.map((q) => ({
            ...q,
            options: q.options.map((o) => ({ ...o, userCorrect: false })),
          }))}
        />
      ) : (
        <div className="col-span-12 text-center">
          No quiz found for this video!
        </div>
      );
  }

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
      </section>
    </>
  );
}
export default Quiz;
