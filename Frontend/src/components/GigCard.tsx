import { useSelector } from "react-redux";
import type { Gig } from "../redux/gigSlice";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

interface Props {
  gig: Gig;
}

function GigCard({ gig }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const isOwner = user?.id === gig.ownerId._id;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-5 flex flex-col justify-between">
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {gig.title}
          </h2>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              gig.status === "open"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {gig.status.toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {gig.description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="border-t pt-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Budget</p>
          <p className="text-lg font-bold text-gray-900">
            ₹{gig.budget.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Posted by {gig.ownerId.name}
          </p>
        </div>

        {/* ACTIONS */}
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Login to Bid
          </button>
        )}

        {user && !isOwner && (
          <button
            onClick={() => navigate(`/gigs/${gig._id}/place-bid`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Place Bid
          </button>
        )}

        {user && isOwner && (
          <button
            onClick={() => navigate(`/gigs/${gig._id}/bids`)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            View Bids
          </button>
        )}
      </div>
    </div>
  );
}

export default GigCard;
