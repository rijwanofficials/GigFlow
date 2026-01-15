import { Star, Clock, MapPin } from "lucide-react";

/**
 * ⚠️ DEMO DATA
 * This will be replaced by:
 * GET /api/v1/freelancers/featured
 */
const Freelancers = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Full-Stack Developer",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    skills: ["React", "Node.js", "Python"],
    description:
      "Experienced developer with 6+ years building scalable web applications.",
    completedJobs: 89,
    responseTime: "1 hour",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "UI/UX Designer",
    location: "New York, NY",
    rating: 4.8,
    reviews: 203,
    hourlyRate: 75,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    description:
      "Creative designer specializing in user-centered design and brand identity.",
    completedJobs: 156,
    responseTime: "2 hours",
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "Content Writer",
    location: "London, UK",
    rating: 5.0,
    reviews: 94,
    hourlyRate: 45,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    skills: ["SEO Writing", "Copywriting", "Research"],
    description:
      "Professional writer creating engaging content that drives results.",
    completedJobs: 78,
    responseTime: "30 min",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Digital Marketer",
    location: "Toronto, CA",
    rating: 4.7,
    reviews: 156,
    hourlyRate: 65,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skills: ["Google Ads", "Facebook Ads", "Analytics"],
    description:
      "Growth-focused marketer with proven track record of increasing ROI.",
    completedJobs: 112,
    responseTime: "1 hour",
  },
];

export function FeaturedFreelancers() {
  return (
    <section className="py-20 bg-gray-50">
      {/* CENTERED CONTAINER */}
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured Freelancers
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Work with top-rated professionals from around the world
          </p>

          {/* Dummy label */}
          <p className="mt-2 text-sm text-red-500">
            * Demo data — UI only (backend integration coming soon)
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Freelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="group rounded-xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Avatar */}
              <div className="text-center">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="mx-auto h-16 w-16 rounded-full object-cover"
                />

                <h3 className="mt-4 font-semibold text-gray-900">
                  {freelancer.name}
                </h3>

                <p className="text-sm text-gray-500">{freelancer.title}</p>

                {/* Location */}
                <div className="mt-2 flex justify-center items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {freelancer.location}
                </div>

                {/* Rating */}
                <div className="mt-2 flex justify-center items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">
                    {freelancer.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({freelancer.reviews})
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4 flex flex-wrap gap-1">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-gray-500 line-clamp-2">
                {freelancer.description}
              </p>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 text-center text-xs">
                <div>
                  <p className="font-medium text-gray-900">
                    {freelancer.completedJobs}
                  </p>
                  <p className="text-gray-500">Projects</p>
                </div>

                <div className="flex justify-center items-center gap-1 text-gray-500">
                  <Clock className="h-3 w-3" />
                  {freelancer.responseTime}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 text-center">
                <p className="text-lg font-bold text-green-600">
                  ${freelancer.hourlyRate}
                  <span className="text-sm text-gray-500"> /hour</span>
                </p>

                <button
                  disabled
                  className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium opacity-80 cursor-not-allowed"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="mt-10 flex justify-center">
          <button className="px-6 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
            View All Freelancers
          </button>
        </div>
      </div>
    </section>
  );
}
