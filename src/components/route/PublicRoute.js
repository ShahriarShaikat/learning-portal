import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  return !isLoggedIn ? (
    children
  ) : (
    <Navigate to={user?.role === "student" ? "/course" : "/admin/dashboard"} />
  );
}
