import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminPrivateRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  return isLoggedIn ? (
    user.role === "admin" ? (
      children
    ) : (
      <Navigate to="/course" />
    )
  ) : (
    <Navigate to="/admin" />
  );
}
