import { useEffect, useState } from "react";
import { useGetAssignmentMarksQuery } from "../features/assignmentmark/assignmentmarkApi";
import useAuth from "./useAuth";
import { useGetAssignmentsQuery } from "../features/assignment/assignmentApi";

export default function useAssignmentSubmit(videoid) {
  const [assignmentSubmitStatus, setAssignmentSubmitStatus] = useState(true);
  const { isLoggedIn, user } = useAuth();

  const { data: assignments } = useGetAssignmentsQuery();
  const {
    data: assignmentmarks,
    isLoading,
    isError,
  } = useGetAssignmentMarksQuery();

  useEffect(() => {
    if (!isLoading && !isError && assignmentmarks?.length === 0) {
      setAssignmentSubmitStatus(false);
    } else if (
      !isLoading &&
      !isError &&
      assignmentmarks?.length > 0 &&
      isLoggedIn &&
      assignments?.length > 0
    ) {
      const assignment = assignments.find((a) => a.video_id == videoid);
      const isAssMark = assignmentmarks.find(
        (am) => am.assignment_id == assignment?.id && am.student_id == user.id
      );
      if (isAssMark?.id) {
        setAssignmentSubmitStatus(true);
      } else {
        setAssignmentSubmitStatus(false);
      }
    }
  }, [
    assignmentmarks,
    assignments,
    isError,
    isLoading,
    isLoggedIn,
    videoid,
    user.id,
  ]);

  return assignmentSubmitStatus;
}
