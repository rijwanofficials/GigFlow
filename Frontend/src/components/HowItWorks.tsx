import { FiSearch, FiEdit3, FiCheckCircle } from "react-icons/fi";

function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How GigFlow Works
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            A simple 3-step process to post jobs, bid, and get hired
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* STEP 1 */}
          <div
            className="
              bg-white rounded-2xl p-8 text-center
              border transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
            "
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <FiSearch size={26} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Browse or Post Gigs
            </h3>

            <p className="text-sm text-gray-500">
              Clients post real projects with budgets. Freelancers explore gigs
              that match their skills.
            </p>
          </div>

          {/* STEP 2 */}
          <div
            className="
              bg-white rounded-2xl p-8 text-center
              border transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
            "
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <FiEdit3 size={26} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Place Bids & Review
            </h3>

            <p className="text-sm text-gray-500">
              Freelancers submit bids with price and message. Clients review all
              proposals in one place.
            </p>
          </div>

          {/* STEP 3 */}
          <div
            className="
              bg-white rounded-2xl p-8 text-center
              border transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
            "
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <FiCheckCircle size={26} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hire & Get Notified
            </h3>

            <p className="text-sm text-gray-500">
              Hire the best freelancer and get instant real-time notifications
              when you’re selected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
