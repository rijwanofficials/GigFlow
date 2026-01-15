function HeroSection({
  search,
  setSearch,
  handleSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}) {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-28 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Hire Experts or Get Hired <br /> for Your Skills
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 max-w-2xl mx-auto mb-10">
          Connect with top freelancers worldwide or showcase your skills to land
          your dream projects. Join professionals building their careers on
          GigFlow.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center mb-6"
        >
          <div className="flex w-full max-w-2xl bg-gray-100 rounded-xl overflow-hidden border">
            <input
              type="text"
              placeholder="What service are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-4 bg-transparent outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-8 font-medium hover:bg-green-600 transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Popular */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="text-gray-400">Popular:</span>
          {["Logo Design", "WordPress", "React Development", "Content Writing"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 border rounded-full hover:bg-gray-100 cursor-pointer transition"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
