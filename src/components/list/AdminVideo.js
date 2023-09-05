import { useDeleteVideoMutation } from "../../features/videos/videoApi";
import DeleteIcon from "../icon/DeleteIcon";
import EditIcon from "../icon/EditIcon";
import { Link } from "react-router-dom";
function AdminVideo({ video }) {
  const [deleteVideo, { isLoading }] = useDeleteVideoMutation();
  const { id, title, description } = video || {};
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{`${description.substring(0, 50)}...`}</td>
      <td className="table-td flex gap-x-2 justify-center">
        <button onClick={() => deleteVideo(id)} disabled={isLoading}>
          <DeleteIcon />
        </button>
        <Link to={`/admin/videos/edit/${id}`}>
          <EditIcon />
        </Link>
      </td>
    </tr>
  );
}
export default AdminVideo;
