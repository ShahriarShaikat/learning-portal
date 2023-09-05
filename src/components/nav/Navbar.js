import lPortalIMG from "../../assets/images/learningportal.svg";
import { Link } from "react-router-dom";
import ExitIcon from "../icon/ExitIcon";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useAuth();
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <img className="h-10" src={lPortalIMG} alt="learning-portal" />
        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <>
              {user.role === "student" ? (
                <>
                  <Link to="/course">Course</Link>
                  <Link to="/leaderboard">Leaderboard</Link>
                </>
              ) : (
                <Link to="/admin/dashboard">Dashboard</Link>
              )}
              <h2 className="font-bold">{user?.name}</h2>
              <button
                onClick={logout}
                className={`
                flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all ${
                  user.role === "student"
                    ? `hover:bg-cyan border border-cyan`
                    : `bg-red-600 hover:bg-red-700 font-medium`
                }`}
              >
                <ExitIcon />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
