import QuizOption from "./QuizOption";

function Question({ quesDetails, setOpQuiz, questionid }) {
  //console.log(quesDetails);
  return (
    <div className="quiz">
      <h4 className="question">
        {`Quiz ${quesDetails.id} - ${quesDetails.question}`}
      </h4>
      <div className="quizOptions">
        {quesDetails.options.map((o) => (
          <QuizOption
            key={o.id}
            options={o}
            questionid={questionid}
            setOpQuiz={setOpQuiz}
          />
        ))}
      </div>
    </div>
  );
}
export default Question;
