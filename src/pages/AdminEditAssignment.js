import { useParams } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { useGetAssignmentsQuery } from "../features/assignment/assignmentApi";
import AdminEditAssignmentForm from "../components/form/AdminEditAssignmentForm";

function AdminEditAssignment() {
  const { assignmentid } = useParams();
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();

  // decide what to render
  let content = null;

  if (isLoading)
    content = <div className="col-span-12 text-center">Loading...</div>;
  if (!isLoading && isError) {
    content = <div className="col-span-12 text-center">{error}</div>;
  }
  if (!isLoading && !isError && assignments?.length === 0) {
    content = (
      <div className="col-span-12 text-center">
        No related assignment found!
      </div>
    );
  }
  if (!isLoading && !isError && assignments?.length > 0) {
    // eslint-disable-next-line eqeqeq
    const assignment = assignments.find((a) => a.id == assignmentid);

    content = assignment?.id ? (
      <AdminEditAssignmentForm assignment={assignment} />
    ) : (
      <div className="col-span-12 text-center">
        No related assignment found!
      </div>
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
export default AdminEditAssignment;
