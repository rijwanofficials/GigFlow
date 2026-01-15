import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/authSlice";
import { User } from "lucide-react";
import { ShowSuccessToast } from "../utils/toast";

function LandingNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const linkClass =
    "text-gray-600 hover:text-black transition text-sm font-medium";

  const scrollToSection = (id: string) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    ShowSuccessToast("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-semibold text-lg">GigFlow</span>
        </div>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("featured-gigs")}
            className={linkClass}
               hover:text-green-600
            text-sm
            font-medium
            hover:cursor-pointer
          >
           
            Find Work
          </button>

          <button
            onClick={() => scrollToSection("featured-freelancers")}
            className={linkClass}
            hover:text-green-600
            text-sm
            font-medium
            hover:cursor-pointer
          >
            Find Freelancers
          </button>

          <button
            onClick={() => scrollToSection("how-it-works")}
            className={linkClass}
            hover:text-green-600
            text-sm
            font-medium
            hover:cursor-pointer
          >
            How It Works
          </button>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="border px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Sign Up
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink
                to="/profile"
                className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition text-sm"
              >
                <User className="w-5 h-5" />
                <span>{user?.name || "Profile"}</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

          <button
            onClick={() => navigate("/post-gig")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
          >
            Post a Job
          </button>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
