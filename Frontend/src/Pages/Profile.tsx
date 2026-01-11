import ProfileCard from "../components/ProfileCard";
import ProfileDetails from "../components/EditableProfileDetails";


function Profile() {
  return (
    <div className="min-h-[80vh] bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Left */}
        <ProfileCard />

        {/* Right */}
        <div className="md:col-span-2">
          <ProfileDetails />
        </div>
      </div>
    </div>
  );
}

export default Profile;
