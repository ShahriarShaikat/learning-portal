import useAuth from "../../hooks/useAuth";

function StudentRankInfo({ studentinfo }) {
  const { isLoggedIn, user } = useAuth();
  const { id, name, position, quizmark, assignmentmark, totalmark } =
    studentinfo || {};
  return (
    <tr
      className={
        isLoggedIn && user.id == id
          ? `border-2 border-cyan dark:border-sky-500 font-bold`
          : `border-b border-slate-600/50`
      }
    >
      <td className="table-td text-center">{position}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{quizmark}</td>
      <td className="table-td text-center">{assignmentmark}</td>
      <td className="table-td text-center">{totalmark}</td>
    </tr>
  );
}
export default StudentRankInfo;
