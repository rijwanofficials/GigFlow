import ProfileCard from "../components/ProfileCard";
import ProfileDetails from "../components/EditableProfileDetails";
import MyBids from "../components/MyBids";
import NotificationsPanel from "../components/NotificationsPanel";

function Profile() {
  return (
    <div className="min-h-[80vh] bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* LEFT */}
        <ProfileCard />
        {/* RIGHT */}
        <div className="md:col-span-2 space-y-8">
          <ProfileDetails />
          <MyBids />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
}

export default Profile;
