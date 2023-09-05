import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import Error from "../ui/Error";

function StudentRegForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [error, setError] = useState("");
  const [
    register,
    { data, isLoading, isError, isSuccess, error: responseError },
  ] = useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data && isError) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user && isSuccess) {
      navigate("/course");
    }
  }, [data, responseError, navigate, isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (confirmpass !== password) {
      setError("Passwords do not match");
    } else {
      register({
        email,
        password,
        role: "student",
        name,
      });
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="login-input rounded-t-md"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            className="login-input "
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
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="confirm-password"
            required
            className="login-input rounded-b-md"
            placeholder="Confirm Password"
            value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create Account
        </button>
      </div>
      {error !== "" && <Error message={error} />}
    </form>
  );
}
export default StudentRegForm;
