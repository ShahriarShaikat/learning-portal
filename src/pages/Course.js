import { useParams } from "react-router-dom";
import Player from "../components/courseplayer/Player";
import VideoList from "../components/list/VideoList";
import Navbar from "../components/nav/Navbar";
import { useEffect } from "react";
import { useGetVideosQuery } from "../features/videos/videoApi";

function Course() {
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
    content = <div className="col-span-12 text-center">No videos found!</div>;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    const video = videos.find((video) => video.id == videoid);

    content = video?.id ? (
      <Player video={video} />
    ) : (
      <div className="col-span-12 text-center">No related video found!</div>
    );
  }

  useEffect(() => {
    localStorage.setItem("videoref", videoid);
  }, [videoid]);

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {content}
            <VideoList />
          </div>
        </div>
      </section>
    </>
  );
}
export default Course;
