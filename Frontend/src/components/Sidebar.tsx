import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-900"
              : "block p-2 rounded hover:bg-gray-100"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-900"
              : "block p-2 rounded hover:bg-gray-100"
          }
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
