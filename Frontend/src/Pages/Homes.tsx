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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Gigs</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button className="bg-black text-white px-4 rounded">Search</button>
      </form>

      {/* Loading */}
      {loading && <p>Loading gigs...</p>}

      {/* Gig List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>

      {!loading && gigs.length === 0 && <p>No gigs found</p>}
    </div>
  );
}

export default Home;
