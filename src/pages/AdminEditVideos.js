import { useParams } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import AdminEditVideoForm from "../components/form/AdminEditVideoForm";
import { useGetVideosQuery } from "../features/videos/videoApi";

function AdminEditVideos() {
  const { videoid } = useParams();
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  // decide what to render
  let content = null;

  if (isLoading)
    content = <div className="col-span-12 text-center">Loading...</div>;
  if (!isLoading && isError) {
    content = <div className="col-span-12 text-center">{error}</div>;
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = (
      <div className="col-span-12 text-center">No related video found!</div>
    );
  }
  if (!isLoading && !isError && videos?.length > 0) {
    // eslint-disable-next-line eqeqeq
    const video = videos.find((v) => v.id == videoid);

    content = video?.id ? (
      <AdminEditVideoForm video={video} />
    ) : (
      <div className="col-span-12 text-center">No related video found!</div>
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
export default AdminEditVideos;
