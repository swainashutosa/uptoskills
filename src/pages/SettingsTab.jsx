import { useState, useRef, useEffect } from "react";
import ContentCard from "../components/ContentCard";
import InputField from "../components/InputField";
import { Settings, User, Mail, GraduationCap, Calendar, Phone, MapPin, Upload, Save } from "lucide-react";

const SettingsTab = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    college: user.college || "",
    year: user.year || "",
    gender: user.gender || "",
    phoneNumber: user.phoneNumber || "",
    location: user.location || "",
    course: user.course || ""
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "",
      college: user.college || "",
      year: user.year || "",
      gender: user.gender || "",
      phoneNumber: user.phoneNumber || "",
      location: user.location || "",
      course: user.course || ""
    });
    setAvatarPreview(user.avatar);
  }, [user]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      const updatedUser = { ...user, ...formData, avatar: avatarPreview };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setSaveMessage("Profile updated successfully!");

      setTimeout(() => {
        setSaveMessage("");
        onUpdate();
      }, 1200);
    } catch (error) {
      console.error(error);
      setSaveMessage("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ContentCard title="Profile Settings" icon={Settings}>
      <form className="space-y-6" onSubmit={handleSave}>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover border-4 border-gray-600" />
            <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
              <Upload size={16} className="text-white" />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
          </div>
          <p className="text-gray-400 text-sm">Upload a new avatar. <br />Recommended size: 200x200px.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField icon={User} label="Full Name" id="name" value={formData.name} onChange={handleChange} />
          <InputField icon={Mail} label="Email" id="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField icon={GraduationCap} label="College" id="college" value={formData.college} onChange={handleChange} />
          <InputField icon={Calendar} label="Graduation Year" id="year" type="number" value={formData.year} onChange={handleChange} />
          <InputField icon={User} label="Gender" id="gender" value={formData.gender} onChange={handleChange} />
          <InputField icon={Phone} label="Phone Number" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <InputField icon={MapPin} label="Location" id="location" value={formData.location} onChange={handleChange} />
          <InputField icon={GraduationCap} label="Course" id="course" value={formData.course} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">Your Bio</label>
          <textarea id="bio" rows="4" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" value={formData.bio} onChange={handleChange}></textarea>
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2">
            {isSaving ? "Saving..." : <><Save size={16} /> Save Changes</>}
          </button>
          {saveMessage && <span className="text-sm text-green-400">{saveMessage}</span>}
        </div>
      </form>
    </ContentCard>
  );
};

export default SettingsTab;