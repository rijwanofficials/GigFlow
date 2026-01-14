import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchGigs } from "../redux/gigSlice";
import GigCard from "../components/GigCard";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { gigs, loading } = useSelector((state: RootState) => state.gig);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchGigs(undefined));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchGigs(search));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* HERO */}
      <div className="bg-white border rounded-2xl p-10 mb-16 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          GigFlow – A Simple Freelance Marketplace
        </h1>

        <p className="text-gray-600 mb-6 max-w-2xl">
          GigFlow helps clients and freelancers connect easily. Post gigs, place
          bids, and hire with real-time updates — all in one place.
        </p>

        <ul className="text-gray-700 mb-8 space-y-2">
          <li>• Post gigs or explore real projects</li>
          <li>• Bid with your price and proposal</li>
          <li>• Get hired with instant notifications</li>
        </ul>

        {/* SEARCH */}
        <form onSubmit={handleSearch} className="flex justify-center">
          <div className="flex w-full max-w-2xl border rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Search gigs by title (React, MERN, UI Design...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-4 text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 font-medium hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* HOW IT WORKS */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          How GigFlow Works
        </h2>
        <p className="text-center text-gray-500 mb-10">
          A simple 3-step process
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="font-semibold text-lg mb-2">
              Post or Browse Gigs
            </h3>
            <p className="text-sm text-gray-600">
              Clients post gigs with budgets. Freelancers browse projects that
              match their skills.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="font-semibold text-lg mb-2">Bid & Review</h3>
            <p className="text-sm text-gray-600">
              Freelancers submit bids with price and message. Clients review bids
              easily.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="font-semibold text-lg mb-2">
              Hire & Get Notified
            </h3>
            <p className="text-sm text-gray-600">
              Hire the best freelancer and get instant real-time notifications.
            </p>
          </div>
        </div>
      </div>

      {/* GIG LIST */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Available Gigs
      </h2>

      {loading && <p className="text-gray-500">Loading gigs...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>

      {!loading && gigs.length === 0 && (
        <p className="text-gray-500 mt-6">No gigs found</p>
      )}
    </div>
  );
}

export default Home;
