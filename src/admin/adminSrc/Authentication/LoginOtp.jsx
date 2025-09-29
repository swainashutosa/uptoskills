import React from "react";
import { useNavigate } from "react-router-dom";
import bgImageOtpPage from "../adminImages/authentication.jpg";

const LoginOtp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // If OTP is filled, form will pass validation
    console.log("OTP Submitted ✅");
    navigate("/admin/dashboard");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImageOtpPage})` }}
    >
      <div className="bg-white w-[500px] p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Authentication</h2>

        <h2 className="mb-6 text-[12px] font-semibold text-green-800">
          Enter Otp Sent to Your Email
        </h2>

        {/* Use onSubmit, not button onClick */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block mb-2 font-medium text-gray-700">OTP</label>
            <input
              type="text"
              placeholder="Enter Otp Here"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginOtp;
