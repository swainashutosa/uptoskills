import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContest } from "../ContestContext";

const CreateContestStep1 = () => {
  const navigate = useNavigate();
  const { contestData, updateContestData } = useContest();
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (contestData.image) {
      setPreviewImage(URL.createObjectURL(contestData.image));
    }
  }, [contestData.image]);

  const handleNext = () => {
    navigate("/admin/rules-rewards");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateContestData({ [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      updateContestData({ image: file });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col xl:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-blue-800 text-white p-6 shadow-md">
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-4 sm:p-6 m-3 sm:m-6 w-full">
        {/* Form */}
        <div className="pr-6 border-r">
          <h1 className="text-2xl font-bold mb-6">Step 1: Contest Details</h1>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Contest Title</label>
              <input
                type="text"
                name="title"
                value={contestData.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={contestData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={contestData.startTime}
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
                  value={contestData.endTime}
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

            <div className="flex justify-end md:justify-end mt-6">
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
        <div className="mt-8 md:mt-0 text-center md:text-left">
          <h2 className="text-xl font-bold mb-4 text-center md:text-left">Live Preview</h2>
          <div className="border rounded-lg p-4 bg-gray-50">
            {previewImage && (
              <img
                src={previewImage}
                alt="Contest Banner"
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-semibold">
              {contestData.title || "Contest Title Preview"}
            </h3>
            <p className="text-gray-600 mt-2">
              {contestData.description || "Contest description will appear here."}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {contestData.startTime && `Starts: ${contestData.startTime}`}{" "}
              {contestData.endTime && `→ Ends: ${contestData.endTime}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContestStep1;
