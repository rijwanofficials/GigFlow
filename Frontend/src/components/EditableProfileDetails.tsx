import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../redux/store";

function EditableProfileDetails() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  // Local editable state (NO BACKEND)
  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("India");

  const handleSave = () => {
    // 🔥 Backend will come here later
    console.log("SAVE PROFILE (future API)", {
      name,
      mobile,
      location,
    });

    setIsEditing(false);
  };

  // const handleCancel = () => {
  //   setName(user?.name || "");
  //   setMobile("");
  //   setLocation("India");
  //   setIsEditing(false);
  // };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile</h2>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 text-sm"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <ProfileField
        label="Name"
        value={name}
        isEditing={isEditing}
        onChange={setName}
      />

      <ProfileField
        label="Email account"
        value={user?.email || ""}
        disabled
      />

      <ProfileField
        label="Mobile number"
        value={mobile}
        isEditing={isEditing}
        onChange={setMobile}
        placeholder="Add number"
      />

      <ProfileField
        label="Location"
        value={location}
        isEditing={isEditing}
        onChange={setLocation}
      />

      {isEditing && (
        <button
          onClick={handleSave}
          className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Change
        </button>
      )}
    </div>
  );
}

function ProfileField({
  label,
  value,
  isEditing,
  onChange,
  disabled,
  placeholder,
}: {
  label: string;
  value: string;
  isEditing?: boolean;
  onChange?: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <span className="text-gray-600">{label}</span>

      {isEditing && !disabled ? (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
      ) : (
        <span className="font-medium text-gray-800">
          {value || placeholder}
        </span>
      )}
    </div>
  );
}

export default EditableProfileDetails;
