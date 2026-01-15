import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBriefcase } from "react-icons/fi";

import type { RootState, AppDispatch } from "../redux/store";
import { fetchGigs } from "../redux/gigSlice";

function GigsSection() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { gigs, loading } = useSelector((state: RootState) => state.gig);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchGigs(undefined));
  }, [dispatch]);

  return (
    <section id="available-gigs" className="max-w-6xl mx-auto px-6 pb-24">
      {/* SECTION HEADER */}
      <div className="mb-10 text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Available Gigs
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Discover real projects posted by clients and start bidding today
        </p>
      </div>

      {loading && (
        <p className="text-gray-500 text-sm text-center">Loading gigs...</p>
      )}

      {/* GIG LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gigs.map((gig) => {
          const isOwner = user?.id === gig.ownerId._id;

          return (
            <div
              key={gig._id}
              className="
                bg-white border rounded-2xl p-5
                flex gap-4 items-start
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1 hover:border-green-500
              "
            >
              {/* ICON */}
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <FiBriefcase size={22} />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{gig.title}</h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {gig.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-gray-600">
                      Budget:{" "}
                      <span className="font-medium">₹{gig.budget}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Posted by {gig.ownerId.name}
                    </p>
                  </div>

                  {/* ACTION */}
                  {!user && (
                    <button
                      onClick={() => navigate("/login")}
                      className="text-sm text-green-600 font-medium hover:underline"
                    >
                      Login to bid
                    </button>
                  )}

                  {user && !isOwner && (
                    <button
                      onClick={() =>
                        navigate(`/gigs/${gig._id}/place-bid`)
                      }
                      className="
                        bg-green-500 hover:bg-green-600
                        text-white text-sm px-4 py-2
                        rounded-lg font-medium transition
                      "
                    >
                      Place Bid
                    </button>
                  )}

                  {user && isOwner && (
                    <button
                      onClick={() => navigate(`/gigs/${gig._id}/bids`)}
                      className="
                        bg-gray-900 hover:bg-black
                        text-white text-sm px-4 py-2
                        rounded-lg font-medium transition
                      "
                    >
                      View Bids
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && gigs.length === 0 && (
        <p className="text-gray-500 mt-10 text-sm text-center">
          No gigs found matching your search.
        </p>
      )}
    </section>
  );
}

export default GigsSection;
