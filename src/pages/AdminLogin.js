import lpIMG from "../assets/images/learningportal.svg";
import AdminLoginForm from "../components/form/AdminLoginForm";

function AdminLogin() {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={lpIMG} alt="learningportal" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Admin Account
          </h2>
        </div>
        <AdminLoginForm />
      </div>
    </section>
  );
}
export default AdminLogin;
