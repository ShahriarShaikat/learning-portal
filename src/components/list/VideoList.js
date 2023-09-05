import { useGetVideosQuery } from "../../features/videos/videoApi";
import VideoItem from "./VideoItem";

function VideoList() {
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
    content = videos.map((video) => <VideoItem key={video.id} video={video} />);
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}
export default VideoList;
