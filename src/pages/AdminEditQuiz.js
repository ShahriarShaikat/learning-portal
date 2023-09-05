import { useParams } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { useGetQuizzesQuery } from "../features/quiz/quizApi";
import AdminEditQuizForm from "../components/form/AdminEditQuizForm";

function AdminEditQuiz() {
  const { quizid } = useParams();
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

  // decide what to render
  let content = null;

  if (isLoading)
    content = <div className="col-span-12 text-center">Loading...</div>;
  if (!isLoading && isError) {
    content = <div className="col-span-12 text-center">{error}</div>;
  }
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = (
      <div className="col-span-12 text-center">No related quiz found!</div>
    );
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    // eslint-disable-next-line eqeqeq
    const quiz = quizzes.find((q) => q.id == quizid);

    content = quiz?.id ? (
      <AdminEditQuizForm quiz={quiz} />
    ) : (
      <div className="col-span-12 text-center">No related quiz found!</div>
    );
  }
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">{content}</div>
        </div>
      </section>
    </>
  );
}
export default AdminEditQuiz;
