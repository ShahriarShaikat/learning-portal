import AdminQuiz from "./AdminQuiz";
import { useGetQuizzesQuery } from "../../features/quiz/quizApi";

function AdminQuizList() {
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

  // decide what to render
  let content = null;

  if (isLoading)
    content = (
      <tr className="col-span-12 text-center">
        <td colSpan="3">Loading...</td>
      </tr>
    );
  if (!isLoading && isError) {
    content = (
      <tr className="col-span-12 text-center">
        <td colSpan="3">{error}</td>
      </tr>
    );
  }
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = (
      <tr className="col-span-12 text-center">
        <td colSpan="3">No quizzes found!</td>
      </tr>
    );
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes.map((quiz, index) => (
      <AdminQuiz key={quiz.id} quiz={quiz} index={index + 1} />
    ));
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
export default AdminQuizList;
