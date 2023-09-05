import { Link } from "react-router-dom";
import { useDeleteQuizMutation } from "../../features/quiz/quizApi";
import DeleteIcon from "../icon/DeleteIcon";
import EditIcon from "../icon/EditIcon";

function AdminQuiz({ quiz, index }) {
  const [deleteQuiz, { isLoading }] = useDeleteQuizMutation();
  const { id, question, video_title } = quiz || {};
  return (
    <tr>
      <td className="table-td">{`Quiz ${index} - ${question}`}</td>
      <td className="table-td">{`${video_title.substring(0, 50)}...`}</td>
      <td className="table-td flex gap-x-2 justify-center">
        <button onClick={() => deleteQuiz(id)} disabled={isLoading}>
          <DeleteIcon />
        </button>
        <Link to={`/admin/quiz/edit/${id}`}>
          <EditIcon />
        </Link>
      </td>
    </tr>
  );
}
export default AdminQuiz;
