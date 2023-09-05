import { Navigate } from "react-router-dom";
import { useGetVideosQuery } from "../features/videos/videoApi";
import { useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";

export default function useVideos() {
  const [localeStorageId, setLocaleStorageId] = useState(undefined);
  const [isCheckLocal, setIsCheckLocal] = useState(false);

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
      <>
        <Navbar />
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
              <div className="col-span-12 text-center">No videos found!</div>
            </div>
          </div>
        </section>
      </>
    );
  }
  if (!isLoading && !isError && videos?.length > 0 && isCheckLocal) {
    const localid = localeStorageId;
    if (localid) {
      // eslint-disable-next-line eqeqeq
      const isExist = videos?.find((v) => v.id == Number(localid));
      if (isExist?.id) {
        content = <Navigate to={`/course/${isExist.id}`} />;
      } else {
        localStorage.setItem("videoref", videos[0].id);
        content = <Navigate to={`/course/${videos[0].id}`} />;
      }
    } else {
      localStorage.setItem("videoref", videos[0].id);
      content = <Navigate to={`/course/${videos[0].id}`} />;
    }
  }

  useEffect(() => {
    setLocaleStorageId(localStorage?.getItem("videoref"));
    setIsCheckLocal(true);
  }, []);

  return content;
}
