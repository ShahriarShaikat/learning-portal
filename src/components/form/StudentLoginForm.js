import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { useEffect, useState } from "react";
import Error from "../ui/Error";

function StudentLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { data, isLoading, isError, isSuccess, error: responseError }] =
    useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data && isError) {
      setError(responseError.data);
    }
    if (
      data?.accessToken &&
      data?.user &&
      data?.user?.role !== "admin" &&
      isSuccess
    ) {
      navigate("/course");
    }
    if (data?.accessToken && data?.user && data?.user?.role === "admin") {
      setError("Cannot find user");
    }
  }, [data, responseError, navigate, isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      type: "student",
      data: { email, password },
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="login-input rounded-t-md"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="login-input rounded-b-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="/student-registration"
            className="font-medium text-violet-600 hover:text-violet-500"
          >
            Create New Account
          </Link>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Sign in
        </button>
      </div>
      {error !== "" && <Error message={error} />}
    </form>
  );
}
export default StudentLoginForm;
