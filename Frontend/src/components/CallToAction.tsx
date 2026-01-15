import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-3xl px-8 py-16 text-center text-white">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Freelancing Journey?
        </h2>

        <p className="text-green-100 max-w-2xl mx-auto mb-8 text-sm md:text-base">
          Join professionals who trust GigFlow to find quality projects,
          collaborate with clients, and grow their careers.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-green-600 font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Sign Up as Freelancer
          </button>

          <button
            onClick={() => navigate("/post-gig")}
            className="border border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition"
          >
            Post a Gig
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold">2M+</p>
            <p className="text-green-100 text-sm">Active Freelancers</p>
          </div>

          <div>
            <p className="text-3xl font-bold">500K+</p>
            <p className="text-green-100 text-sm">Projects Completed</p>
          </div>

          <div>
            <p className="text-3xl font-bold">$100M+</p>
            <p className="text-green-100 text-sm">Paid to Freelancers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
