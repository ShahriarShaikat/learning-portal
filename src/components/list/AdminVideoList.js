import { useGetVideosQuery } from "../../features/videos/videoApi";
import AdminVideo from "./AdminVideo";

function AdminVideoList() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

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
  if (!isLoading && !isError && videos?.length === 0) {
    content = (
      <tr className="col-span-12 text-center">
        <td colSpan="3">No videos found!</td>
      </tr>
    );
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <AdminVideo key={video.id} video={video} />
    ));
  }

  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
export default AdminVideoList;
