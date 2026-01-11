import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/authSlice";
import { ShowSuccessToast, ShowErrorToast } from "../utils/toast";

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      ShowSuccessToast("Logged out successfully");
      navigate("/");
    }

    if (logoutUser.rejected.match(result)) {
      ShowErrorToast("Logout failed. Try again.");
    }
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline font-medium" : "hover:underline";

  return (
    <nav className="w-full bg-blue-900 text-white px-6 py-3 flex justify-between items-center">
      <NavLink to="/" className="font-bold text-lg">
        AI Docs
      </NavLink>

      <div className="flex items-center gap-4 text-sm">
        {!isAuthenticated && (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={linkClass}>
              Signup
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <NavLink to="/profile" className={linkClass}>
              {user?.name || "Profile"}
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-white text-blue-900 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
