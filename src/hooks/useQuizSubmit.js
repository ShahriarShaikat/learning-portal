import { useEffect, useState } from "react";
import { useGetAssignmentMarksQuery } from "../features/assignmentmark/assignmentmarkApi";
import useAuth from "./useAuth";
import { useGetAssignmentsQuery } from "../features/assignment/assignmentApi";
import { useGetQuizMarksQuery } from "../features/quizmark/quizmarkApi";

export default function useQuizSubmit(videoid) {
  const [QuizSubmitStatus, setQuizSubmitStatus] = useState({
    isSubmitted: true,
    mark: 0,
  });
  const { isLoggedIn, user } = useAuth();

  const { data: quizmarks, isLoading, isError } = useGetQuizMarksQuery();

  useEffect(() => {
    if (!isLoading && !isError && quizmarks?.length === 0) {
      setQuizSubmitStatus({ isSubmitted: false, mark: 0 });
    } else if (!isLoading && !isError && quizmarks?.length > 0 && isLoggedIn) {
      const isQuizMark = quizmarks.find(
        (qm) => qm.video_id == videoid && qm.student_id == user.id
      );
      if (isQuizMark?.id) {
        setQuizSubmitStatus({ isSubmitted: true, mark: isQuizMark.mark });
      } else {
        setQuizSubmitStatus({ isSubmitted: false, mark: 0 });
      }
    }
  }, [isError, isLoading, isLoggedIn, quizmarks, user.id, videoid]);

  return QuizSubmitStatus;
}
