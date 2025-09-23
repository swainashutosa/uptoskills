import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorDisplay from "../components/ErrorDisplay"; // ErrorDisplay import kiya

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state add kiya
  const [error, setError] = useState(null); // Error state add kiya

  // ✅ Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch
      try {
        const storedData = JSON.parse(localStorage.getItem("currentUser"));
        console.log("Stored User in LS:", storedData);

        const storedUser = storedData?.message?.user || storedData?.user || storedData;

        if (storedUser && storedUser.username) {
          const res = await axios.get(
            `http://localhost:8000/api/v1/user/username/${storedUser.username}`,
            { withCredentials: true }
          );
          console.log("User fetched from API:", res.data);
          setUser(res.data?.message?.user || res.data?.user || null);
        } else {
          setError("User data not found in local storage.");
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
        setError(err.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updates
  const handleSave = async () => {
    setLoading(true); // Loading state for save
    setError(null); // Reset error on new save attempt
    try {
      const storedData = JSON.parse(localStorage.getItem("currentUser"));
      const storedUser = storedData?.message?.user || storedData?.user || storedData;

      const { name, username, gender, email, phoneNumber, college, year } = user;

      const updatedData = {
        name,
        username,
        gender,
        email,
        phoneNumber,
        college,
        year,
      };

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/users/${storedUser.username}`,
        updatedData,
        { withCredentials: true }
      );

      const updatedUser = res.data.message.user;
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading and Error state rendering
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
        <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
        <ErrorDisplay message="No user data available." onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-[#1c1c1c] p-10 rounded-2xl shadow-md border border-gray-700 space-y-10">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-cyan-500 shadow"
          />
          <h2 className="text-3xl font-bold text-cyan-400">User Dashboard</h2>
          <p className="text-sm text-gray-400">@{user.username}</p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-lg text-cyan-300 border-b border-cyan-700 pb-1">
              Personal Information
            </h3>
            <ProfileField
              label="Full Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              editing={editing}
              fullWidth
            />
            <div className="grid grid-cols-2 gap-6">
              <ProfileField
                label="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
                editing={editing}
              />
              <ProfileField
                label="Gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                editing={editing}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg text-cyan-300 border-b border-cyan-700 pb-1">
              Contact & Academic
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <ProfileField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                editing={editing}
              />
              <ProfileField
                label="Mobile"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                editing={editing}
              />
              <ProfileField
                label="College"
                name="college"
                value={user.college}
                onChange={handleChange}
                editing={editing}
              />
              <ProfileField
                label="Graduation Year"
                name="year"
                value={user.year}
                onChange={handleChange}
                editing={editing}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center pt-6">
          {editing ? (
            <button
              onClick={handleSave}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-2 rounded font-semibold transition-all"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-2 rounded font-semibold transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Profile field component
const ProfileField = ({
  label,
  name,
  value,
  onChange,
  editing,
  fullWidth = false,
}) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    {editing ? (
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full bg-transparent border border-gray-600 px-3 py-2 rounded text-white focus:outline-none focus:border-cyan-500"
      />
    ) : (
      <div className="bg-[#2a2a2a] px-3 py-2 rounded border border-gray-700 text-white">
        {value || "N/A"}
      </div>
    )}
  </div>
);

export default UserProfile;
