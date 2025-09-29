import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateContestStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleNext = () => {
    navigate("/admin/rules-rewards");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">Contest Setup</h2>
        <ul className="space-y-6 text-lg">
          <li onClick={() => navigate("/admin/create-contest")}
          className="font-semibold text-orange-400"
          >
            ➤ Step 1: Contest Details</li>
          <li>
            <button
              onClick={() => navigate("/admin/rules-rewards")}
              className="text-gray-300 hover:text-gray-100"
            >
              Step 2: Rules & Rewards
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/admin/add-questions")}
              className="text-gray-300 hover:text-gray-100"
            >
              Step 3: Add Questions
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-6 m-6">
        {/* Form */}
        <div className="pr-6 border-r">
          <h1 className="text-2xl font-bold mb-6">Step 1: Contest Details</h1>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Contest Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Contest Banner</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Next →
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="pl-6">
          <h2 className="text-xl font-bold mb-6">Live Preview</h2>
          <div className="border rounded-lg p-4 bg-gray-50">
            {previewImage && (
              <img
                src={previewImage}
                alt="Contest Banner"
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-semibold">
              {formData.title || "Contest Title Preview"}
            </h3>
            <p className="text-gray-600 mt-2">
              {formData.description || "Contest description will appear here."}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {formData.startTime && `Starts: ${formData.startTime}`}{" "}
              {formData.endTime && `→ Ends: ${formData.endTime}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContestStep1;
