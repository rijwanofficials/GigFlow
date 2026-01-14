import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchBidsForGig, hireBid } from "../redux/bidSlice";
import { ShowErrorToast, ShowSuccessToast } from "../utils/toast";


function ViewBids() {
  const { gigId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { bids, loading } = useSelector(
    (state: RootState) => state.bids
  );

  useEffect(() => {
    dispatch(fetchBidsForGig(gigId!));
  }, [dispatch, gigId]);

  const handleHire = async (bidId: string) => {
    const result = await dispatch(hireBid(bidId));

    if (hireBid.fulfilled.match(result)) {
      ShowSuccessToast("Freelancer hired successfully");
    } else {
      ShowErrorToast(result.payload as string);
    }
  };

  if (loading) return <p>Loading bids...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bids</h1>

      {bids.length === 0 && <p>No bids yet</p>}

      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {bid.freelancerId.name}
              </p>
              <p className="text-sm text-gray-600">
                {bid.message}
              </p>
              <p className="font-semibold mt-1">
                ₹{bid.price}
              </p>
              <p className="text-xs mt-1">
                Status: {bid.status}
              </p>
            </div>

            {bid.status === "pending" && (
              <button
                onClick={() => handleHire(bid._id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Hire
              </button>
            )}

            {bid.status === "hired" && (
              <span className="text-green-600 font-semibold">
                Hired
              </span>
            )}

            {bid.status === "rejected" && (
              <span className="text-red-500">
                Rejected
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBids;
