import { Link, useParams } from "react-router-dom";
import PlayerIcon from "../icon/PlayerIcon";

function VideoItem({ video }) {
  const { videoid } = useParams();
  const { id, title, views, duration } = video || {};
  return (
    <div
      className={`w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 ${
        // eslint-disable-next-line eqeqeq
        id == videoid && "active-video"
      }`}
    >
      <PlayerIcon />
      <div clas="flex flex-col w-full">
        <Link to={`/course/${id}`}>
          <p className="text-slate-50 text-sm font-medium">{title}</p>
        </Link>
        <div>
          <span className="text-gray-400 text-xs mt-1">{`${duration} Mins`}</span>
          <span className="text-gray-400 text-xs mt-1"> | </span>
          <span className="text-gray-400 text-xs mt-1">{`${views} views`}</span>
        </div>
      </div>
    </div>
  );
}
export default VideoItem;
