import { useState } from "react";
import TikIcon from "../icon/TikIcon";
import { useSubmitAssignmentMarkMutation } from "../../features/assignmentmark/assignmentmarkApi";

function SingleAssignmentDetails({ assignment }) {
  const [submitAssignmentMark, { isLoading }] =
    useSubmitAssignmentMarkMutation();
  const {
    id,
    title,
    student_name,
    createdAt,
    repo_link,
    status,
    totalMark,
    mark,
  } = assignment || {};
  const [inputMark, setInputMark] = useState(totalMark);

  const handleChange = (e) => {
    const changeMark = Number(e.target.value);
    if (changeMark > -1 && changeMark <= totalMark) {
      setInputMark(changeMark);
    }
  };
  const handleSubmit = (e) => {
    submitAssignmentMark({ id, mark: inputMark });
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{new Date(createdAt).getDate()}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>

      {status === "pending" ? (
        <td className="table-td input-mark">
          <input value={inputMark} onChange={handleChange} />
          <button onClick={handleSubmit} disabled={isLoading}>
            <TikIcon />
          </button>
        </td>
      ) : (
        <td className="table-td">{mark}</td>
      )}
    </tr>
  );
}
export default SingleAssignmentDetails;

// eslint-disable-next-line no-lone-blocks
{
  /* <tr>
            <td className="table-td">Assignment 2 - Implement Best Practices</td>
            <td className="table-td">10 Mar 2023 10:58:13 PM</td>
            <td className="table-td">Akash Ahmed</td>
            <td className="table-td">
              https://github.com/Learn-with-Sumit/assignment-1
            </td>
            <td className="table-td">50</td>
          </tr> */
}
