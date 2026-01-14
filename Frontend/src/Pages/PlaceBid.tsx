import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { createBid } from "../redux/bidSlice";
import { ShowErrorToast, ShowSuccessToast } from "../utils/toast";

function PlaceBid() {
  const { gigId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message || !price) {
      ShowErrorToast("All fields are required");
      return;
    }

    setLoading(true);

    const resultAction = await dispatch(
      createBid({
        gigId: gigId!,
        message,
        price: Number(price),
      })
    );

    setLoading(false);

    if (createBid.fulfilled.match(resultAction)) {
      ShowSuccessToast("Bid submitted successfully");
      navigate("/");
    } else {
      ShowErrorToast(resultAction.payload as string);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Place a Bid</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Why should you be hired?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="number"
          placeholder="Your price (₹)"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Submit Bid"}
        </button>
      </form>
    </div>
  );
}

export default PlaceBid;
