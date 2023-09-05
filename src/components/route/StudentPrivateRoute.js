import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function StudentPrivateRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  return isLoggedIn ? (
    user.role === "student" ? (
      children
    ) : (
      <Navigate to="/admin/dashboard" />
    )
  ) : (
    <Navigate to="/" />
  );
}
