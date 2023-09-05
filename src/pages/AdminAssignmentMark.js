import Navbar from "../components/nav/Navbar";
import AssignmentStatus from "../components/details/AssignmentStatus";
import AssignmentDetailsList from "../components/details/AssignmentDetailsList";
import { useGetAssignmentMarksQuery } from "../features/assignmentmark/assignmentmarkApi";
function AdminAssignmentMark() {
  const {
    data: assMarkDetails,
    isLoading,
    isError,
    error,
  } = useGetAssignmentMarksQuery();

  // decide what to render
  let content = null;

  if (isLoading)
    content = <div className="col-span-12 text-center">Loading...</div>;
  if (!isLoading && isError) {
    content = <div className="col-span-12 text-center">{error}</div>;
  }
  if (!isLoading && !isError && assMarkDetails?.length === 0) {
    content = (
      <>
        <AssignmentStatus total={0} pending={0} published={0} />
        <div className="col-span-12 text-center">
          No assignment mark details availabile!
        </div>
      </>
    );
  }
  if (!isLoading && !isError && assMarkDetails?.length > 0) {
    const pending = assMarkDetails.reduce(
      (r, s) => (s.status === "pending" ? r + 1 : r),
      0
    );
    const published = assMarkDetails.reduce(
      (r, s) => (s.status === "published" ? r + 1 : r),
      0
    );
    content = (
      <>
        <AssignmentStatus
          total={assMarkDetails?.length}
          pending={pending}
          published={published}
        />

        <AssignmentDetailsList assignments={assMarkDetails} />
      </>
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
export default AdminAssignmentMark;
