import { Link } from "react-router-dom";
import { useDeleteAssignmentMutation } from "../../features/assignment/assignmentApi";
import DeleteIcon from "../icon/DeleteIcon";
import EditIcon from "../icon/EditIcon";

function AdminAssignment({ assignment }) {
  const [deleteAssignment, { isLoading }] = useDeleteAssignmentMutation();
  const { id, title, video_title, totalMark } = assignment || {};
  const handleDeleteAssignment = async () => {
    deleteAssignment(id);
  };
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{video_title}</td>
      <td className="table-td">{totalMark}</td>
      <td className="table-td flex gap-x-2 justify-center">
        <button onClick={handleDeleteAssignment} disabled={isLoading}>
          <DeleteIcon />
        </button>
        <Link to={`/admin/assignment/edit/${id}`}>
          <EditIcon />
        </Link>
      </td>
    </tr>
  );
}
export default AdminAssignment;
