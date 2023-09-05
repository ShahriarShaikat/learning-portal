import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";
import AdminAssignment from "./AdminAssignment";

function AdminAssignmentList() {
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();

  // decide what to render
  let content = null;

  if (isLoading)
    content = (
      <tr className="col-span-12 text-center">
        <td colSpan="4">Loading...</td>
      </tr>
    );
  if (!isLoading && isError) {
    content = (
      <tr className="col-span-12 text-center">
        <td colSpan="4">{error}</td>
      </tr>
    );
  }
  if (!isLoading && !isError && assignments?.length === 0) {
    content = (
      <tr className="col-span-12 text-center">
        <td colSpan="4">No assignments found!</td>
      </tr>
    );
  }
  if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments.map((assignment) => (
      <AdminAssignment key={assignment.id} assignment={assignment} />
    ));
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
export default AdminAssignmentList;
