function QuizOption({ options, questionid, setOpQuiz }) {
  const { id, option, isCorrect, userCorrect } = options || {};

  //console.log(`QID: ${questionid} - OpID: ${id}`);
  const handleChange = (e) => {
    setOpQuiz((prev) =>
      prev.map((qs) =>
        qs.id == questionid
          ? {
              ...qs,
              options: qs.options.map((optn) =>
                optn.id == id
                  ? { ...optn, userCorrect: e.target.checked }
                  : optn
              ),
            }
          : qs
      )
    );
  };
  return (
    <label>
      <input type="checkbox" checked={userCorrect} onChange={handleChange} />
      {option}
    </label>
  );
}
export default QuizOption;

// return prev.map((qs)=>{
//     if(qs.id==questionid){
//         return ({...qs,options:qs.map(o)=>{
//             if(o.id==id) {return ({...o,userCorrect:e.target.checked})}
//         }});
//     }else{
//         return qs;
//     }
//   });
