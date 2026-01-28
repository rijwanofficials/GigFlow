import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function AppNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LEFT: Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* RIGHT: Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-lg">
            G
          </div>
          <span className="text-xl font-semibold text-gray-900">
            GigFlow
          </span>
        </div>

      </div>
    </nav>
  );
}

export default AppNavbar;
