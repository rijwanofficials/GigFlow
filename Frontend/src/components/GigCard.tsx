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
    <div className="border rounded p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{gig.title}</h2>
      <p className="text-sm text-gray-600">{gig.description}</p>

      <p className="mt-2 font-medium">Budget: ₹{gig.budget}</p>

      <p className="text-xs text-gray-500">Posted by: {gig.ownerId.name}</p>

      <div className="mt-4">
        {!user && (
          <button className="text-sm text-blue-600"
          onClick={() => navigate("/login")}
          >Login to Bid</button>
        )}

        {user && !isOwner && (
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Place Bid
          </button>
        )}

        {user && isOwner && (
          <button
            className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800 hover:cursor-pointer"
            onClick={() => navigate(`/gigs/${gig._id}/bids`)}
          >
            View Bids
          </button>
        )}
      </div>
    </div>
  );
}

export default GigCard;
