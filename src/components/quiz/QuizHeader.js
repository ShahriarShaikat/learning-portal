function QuizHeader({ video_title }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold">{`Quizzes for "${video_title}"`}</h1>
      <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
    </div>
  );
}
export default QuizHeader;
