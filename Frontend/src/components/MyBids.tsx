import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchMyBids } from "../redux/bidSlice";

function MyBids() {
  const dispatch = useDispatch<AppDispatch>();
  const bids = useSelector((state: RootState) => state.bids.bids || []);
  const loading = useSelector((state: RootState) => state.bids.loading);

  useEffect(() => {
    dispatch(fetchMyBids());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">📌 My Bids</h2>

      {loading && <p className="text-sm text-gray-500">Loading bids...</p>}

      {!loading && bids.length === 0 && (
        <p className="text-sm text-gray-500">
          You haven’t placed any bids yet.
        </p>
      )}

      {bids.map((bid) => (
        <div
          key={bid._id}
          className="border rounded-lg p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{bid.gigId.title}</p>
            <p className="text-sm text-gray-600">Bid Amount: ₹{bid.price}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              bid.status === "hired"
                ? "bg-green-100 text-green-700"
                : bid.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {bid.status.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MyBids;
