import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-blue-900">404</h1>

      <p className="mt-4 text-xl text-gray-700">Page not found</p>

      <p className="mt-2 text-sm text-gray-500 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <NavLink
        to="/"
        className="mt-6 inline-block bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
      >
        Go back to Home
      </NavLink>
    </div>
  );
}

export default PageNotFound;
