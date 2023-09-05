function useCalculateAssignmentMark(id, assignmentmark) {
  const totalMark = assignmentmark.reduce((r, qm) => {
    return qm.student_id == id ? r + qm.mark : r;
  }, 0);
  return totalMark;
}
export default useCalculateAssignmentMark;
