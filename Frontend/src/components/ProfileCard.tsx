import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ShowSuccessToast } from "../utils/toast";

function ProfileCard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  console.log("User on profile card", user);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    ShowSuccessToast("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-4">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div>
          <h3 className="font-semibold text-lg">{user?.name || "User"}</h3>
          <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
        </div>
      </div>

      <hr className="my-5" />

      <div className="space-y-2 text-sm">
        <ProfileMenu label="My Profile" />
        <ProfileMenu label="Settings" />
        <ProfileMenu label="Notifications" right="Allow" />
        <ProfileMenu label="Log Out" danger onClick={handleLogout} />
      </div>
    </div>
  );
}

function ProfileMenu({
  label,
  right,
  danger,
  onClick,
}: {
  label: string;
  right?: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between p-3 rounded-lg cursor-pointer
      ${danger ? "text-red-600 hover:bg-red-50" : "hover:bg-gray-100"}`}
    >
      <span>{label}</span>
      {right && <span className="text-gray-500">{right}</span>}
    </div>
  );
}

export default ProfileCard;
