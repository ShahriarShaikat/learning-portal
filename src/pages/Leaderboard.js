import MyPosition from "../components/leaderboard/MyPosition";
import StudentRank from "../components/leaderboard/StudentRank";
import Navbar from "../components/nav/Navbar";
import { useGetAssignmentMarksQuery } from "../features/assignmentmark/assignmentmarkApi";
import { useGetUsersQuery } from "../features/auth/authApi";
import { useGetQuizMarksQuery } from "../features/quizmark/quizmarkApi";
import useAuth from "../hooks/useAuth";
import useCalculateAssignmentMark from "../hooks/useCalculateAssignmentMark";
import useCalculateQuizMark from "../hooks/useCalculateQuizMark";

function Leaderboard() {
  let userinfo = [];
  const { isLoggedIn, user } = useAuth();
  const { data: users, isLoading: isLoadingU } = useGetUsersQuery();
  const { data: quizmarks, isLoading: isLoadingQM } = useGetQuizMarksQuery();
  const { data: assignmentmarks, isLoading: isLoadingAM } =
    useGetAssignmentMarksQuery();

  if (!isLoadingU && !isLoadingAM && !isLoadingQM) {
    let position = 1;
    userinfo = users
      ?.map((user) => {
        if (user.role == "student") {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          let quizmark = useCalculateQuizMark(user.id, quizmarks);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          let assignmentmark = useCalculateAssignmentMark(
            user.id,
            assignmentmarks
          );
          return {
            id: user.id,
            name: user.name,
            quizmark,
            assignmentmark,
            totalmark: quizmark + assignmentmark,
          };
        }
      })
      .filter((o) => o)
      .sort((a, b) => b.totalmark - a.totalmark)
      .map((u, index, infoArr) => {
        if (u.totalmark == infoArr[index - 1]?.totalmark || index == 0) {
          return { ...u, position: position };
        } else {
          return { ...u, position: ++position };
        }
      });
  }
  let content = null;
  if (userinfo.length == 0) {
    content = <div className="text-canter">Checking...</div>;
  }
  if (userinfo.length > 0 && isLoggedIn) {
    const myPosInfo = userinfo.find((u) => u.id == user.id);
    const studentPosInfos = userinfo.filter((u) => u.position <= 20);

    content = (
      <>
        <MyPosition myPosInfo={myPosInfo} />
        <StudentRank studentPosInfos={studentPosInfos} />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
      </section>
    </>
  );
}
export default Leaderboard;
