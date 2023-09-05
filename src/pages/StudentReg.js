import learningportalIMG from "../assets/images/learningportal.svg";
import StudentRegForm from "../components/form/StudentRegForm";

function StudentReg() {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src={learningportalIMG}
            alt="learningportal"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <StudentRegForm />
      </div>
    </section>
  );
}
export default StudentReg;
