function useCalculateQuizMark(id, quizmark) {
  const totalMark = quizmark.reduce((r, qm) => {
    return qm.student_id == id ? r + qm.mark : r;
  }, 0);
  return totalMark;
}
export default useCalculateQuizMark;
