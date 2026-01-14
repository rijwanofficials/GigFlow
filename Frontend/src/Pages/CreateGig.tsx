import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { createGig } from "../redux/gigSlice";
import { useNavigate } from "react-router-dom";
import { ShowErrorToast, ShowSuccessToast } from "../utils/toast";

function PostGig() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !budget) {
      ShowErrorToast("All fields are required");
      return;
    }

    setLoading(true);

    const resultAction = await dispatch(
      createGig({
        title,
        description,
        budget: Number(budget),
      })
    );

    setLoading(false);

    if (createGig.fulfilled.match(resultAction)) {
      ShowSuccessToast("Gig posted successfully");
      navigate("/"); // go back to Home
    } else {
      ShowErrorToast(resultAction.payload as string);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a New Gig</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Gig Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="Gig Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="number"
          placeholder="Budget (₹)"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Posting..." : "Post Gig"}
        </button>
      </form>
    </div>
  );
}

export default PostGig;
