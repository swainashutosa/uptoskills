import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  AtSign,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  VenetianMask,
  School,
  Calendar,
} from "lucide-react";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    college: "",
    year: "",
    mobile: "",
    avatar:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
  });

  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    color: "gray",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const checkPasswordStrength = (pwd) => {
    let score = 0;
    let feedback = "";
    let color = "gray";

    if (pwd.length < 8) {
      feedback = "Too short (min 8 characters)";
    } else {
      score++;
      if (/[a-z]/.test(pwd)) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/\d/.test(pwd)) score++;
      if (/[!@#$%^&*()_+]/.test(pwd)) score++;

      if (score <= 2) {
        feedback = "Weak";
        color = "red";
      } else if (score === 3) {
        feedback = "Fair";
        color = "orange";
      } else if (score === 4) {
        feedback = "Good";
        color = "yellowgreen";
      } else {
        feedback = "Strong";
        color = "green";
      }
    }

    setPasswordStrength({ score, feedback, color });
    return score;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      validateEmail(value);
    }

    if (name === "name") {
      const base = value.toLowerCase().replace(/\s+/g, "");
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setForm((prev) => ({
        ...prev,
        username: base.slice(0, 12) + randomNum,
      }));
    }

    if (name === "password") {
      checkPasswordStrength(value);
      if (form.confirmPassword && value !== form.confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      if (form.password !== value) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (name === "gender") {
      const uname = form.username || "user123";
      let avatarUrl =
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";

      if (value === "Female") {
        avatarUrl = `https://avatar.iran.liara.run/public/girl?username=${uname}`;
      } else if (value === "Male") {
        avatarUrl = `https://avatar.iran.liara.run/public/boy?username=${uname}`;
      }

      setForm((prev) => ({ ...prev, avatar: avatarUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) return;
    if (form.password !== form.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    try {
      const { confirmPassword, ...formDataToSend } = form;
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formDataToSend
      );

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(res.data.message.user));

      navigate("/");
    } catch (err) {
      alert("Registration failed.");
      console.error(err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get("login");
    const userData = urlParams.get("user");

    if (loginSuccess === "success" && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/Oauth/google";
  };

  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/Oauth/github";
  };

  const inputClass =
    "w-full bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none";
  const wrapperClass =
    "flex items-center gap-3 px-4 py-2 border border-gray-400 dark:border-gray-700 rounded bg-gray-100 dark:bg-[#1a1a1a] focus-within:border-cyan-500 dark:focus-within:border-yellow-400 transition";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-yellow-400 text-center">
            Create Your UptoSkills Profile
          </h2>
          <img
            src={form.avatar}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full border-2 border-cyan-500 dark:border-yellow-400 shadow-md"
          />
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {[
            { label: "Full Name", name: "name", icon: <User size={18} />, placeholder: "John Doe" },
            { label: "Username", name: "username", icon: <AtSign size={18} />, placeholder: "john123" },
            { label: "Email", name: "email", icon: <Mail size={18} />, placeholder: "john@example.com" },
            { label: "Mobile", name: "mobile", icon: <Phone size={18} />, placeholder: "9876543210" },
            { label: "College", name: "college", icon: <School size={18} />, placeholder: "XYZ Institute" },
            { label: "Graduation Year", name: "year", icon: <Calendar size={18} />, placeholder: "2026" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="text-sm mb-1 block">{field.label}</label>
              <div className={wrapperClass}>
                {React.cloneElement(field.icon, {
                  className: "text-cyan-500 dark:text-yellow-400",
                })}
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              {field.name === "email" && emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
          ))}

          <div>
            <label className="text-sm mb-1 block">Gender</label>
            <div className={wrapperClass}>
              <VenetianMask
                size={18}
                className="text-cyan-500 dark:text-yellow-400"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full bg-transparent text-black dark:text-white outline-none"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option className="text-black" value="Male">
                  Male
                </option>
                <option className="text-black" value="Female">
                  Female
                </option>
                <option className="text-black" value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>

          {[
            { label: "Password", name: "password", icon: <Lock size={18} />, placeholder: "••••••••", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", icon: <ShieldCheck size={18} />, placeholder: "••••••••", type: "password" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="text-sm mb-1 block">{field.label}</label>
              <div className={wrapperClass}>
                {React.cloneElement(field.icon, {
                  className: "text-cyan-500 dark:text-yellow-400",
                })}
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              {field.name === "confirmPassword" && confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <div
              className="text-sm mb-2"
              style={{ color: passwordStrength.color }}
            >
              Password Strength: {passwordStrength.feedback}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-white font-semibold rounded 
                         hover:bg-cyan-600 transition-transform shadow
                         dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
            >
              Sign Up
            </button>

            <div className="pt-2 w-full">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 
                           bg-white text-black font-semibold rounded 
                           hover:bg-cyan-100 transition-transform shadow"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 "
                />
                Sign in with Google
              </button>
            </div>

            <div className="pt-2 w-full">
              <button
                type="button"
                onClick={handleGitHubLogin}
                className="w-full flex items-center justify-center gap-3 py-3 
                           bg-gray-900 text-white font-semibold rounded 
                           hover:bg-cyan-600 dark:hover:bg-yellow-500 transition-transform shadow"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with GitHub
              </button>
            </div>
          </div>

          <div className="md:col-span-2 text-center mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-cyan-600 dark:text-yellow-300 hover:text-cyan-700 dark:hover:text-yellow-500 font-medium transition"
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
