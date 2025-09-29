
import React, { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@codingplatform.com",
    role: "Super Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", profile);
    alert("Profile updated!");
  };

  return (
    <section className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-0 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-0 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              readOnly
              className="w-full p-0 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

         

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
