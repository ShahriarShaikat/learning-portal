import Modal from "../modal/Modal";
import ModalHeader from "../modal/ModalHeader";
import { useEffect, useState } from "react";
import ModalButtons from "../modal/ModalButtons";
//import Error from "../ui/Error";
import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";
import useAuth from "../../hooks/useAuth";
import { useAddAssignmentMarkMutation } from "../../features/assignmentmark/assignmentmarkApi";

function StudentAssignmentForm({ videoid, setShowModal }) {
  const [addAssignmentMark, { isSuccess: isSuccessAssSubmit }] =
    useAddAssignmentMarkMutation();
  const [repolink, setRepolink] = useState("");
  const [assignment, setAssignment] = useState({});
  const { isLoggedIn, user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      addAssignmentMark({
        student_id: user.id,
        student_name: user.name,
        assignment_id: assignment.id,
        title: assignment.title,
        createdAt: new Date().toISOString(),
        totalMark: assignment.totalMark,
        mark: 0,
        repo_link: repolink,
        status: "pending",
      });
    }
  };

  const {
    data: assignments,
    isLoading: isLoadingA,
    isError: isErrorA,
  } = useGetAssignmentsQuery();

  // decide what to render
  let content = null;

  if (isLoadingA)
    content = <div className="col-span-12 text-center">Loading...</div>;
  if (!isLoadingA && isErrorA) {
    content = <div className="col-span-12 text-center">Something wrong</div>;
  }
  if (!isLoadingA && !isErrorA && assignments?.length === 0) {
    content = (
      <div className="col-span-12 text-center">No assignment found!</div>
    );
  }
  if (!isLoadingA && !isErrorA && assignments?.length > 0) {
    content = assignment?.id ? (
      <>
        <ModalHeader
          title={`${assignment.title} - [${assignment.totalMark}]`}
        />
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="relative p-6 flex-auto">
            <div className="w-full mb-5">
              <label
                htmlFor="repolink"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Repository Url
              </label>
              <input
                type="url"
                id="repolink"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="put your assignment repository link here..."
                required
                value={repolink}
                onChange={(e) => setRepolink(e.target.value)}
              />
            </div>
          </div>
          <ModalButtons setShowModal={setShowModal} submitBtnStatus={false} />
          {/* {error !== "" && <Error message={error} />} */}
        </form>
      </>
    ) : (
      <>
        <ModalHeader title="Assignment" />
        <div className="col-span-12 text-center text-gray-900 p-5">
          No assignment found!
        </div>
        <ModalButtons setShowModal={setShowModal} submitBtnStatus={true} />
      </>
    );
  }

  useEffect(() => {
    if (isSuccessAssSubmit) {
      setRepolink("");
      setAssignment({});
      setShowModal(false);
    }
    // if (isError) {
    //   setError(
    //     "Unable to add this assignment, please try again with valid data."
    //   );
    // }
    if (!isLoadingA && !isErrorA && assignments?.length > 0) {
      const isAssignment = assignments.find((a) => a.video_id == videoid);
      isAssignment?.id && setAssignment(isAssignment);
    }
  }, [
    isErrorA,
    videoid,
    assignments,
    isLoadingA,
    isSuccessAssSubmit,
    setShowModal,
  ]);

  return <Modal>{content}</Modal>;
}
export default StudentAssignmentForm;
