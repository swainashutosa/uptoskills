import { useState } from "react";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaDownload,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const initialAnnouncements = [
  {
    id: 1,
    title: "🚀 New Contest Series Launched!",
    description:
      "A brand-new Biweekly Contest series is here! Compete with coders worldwide and showcase your problem-solving skills. Don’t miss it!",
    date: "2025-09-14T10:00",
    category: "Contest Update",
    pdf: "/announcements/contest-series.pdf",
  },
  {
    id: 2,
    title: "📢 Scheduled Platform Maintenance",
    description:
      "Our servers will undergo maintenance on Sep 20, 2025 from 1:00 AM - 3:00 AM IST. Expect brief downtime during this window.",
    date: "2025-09-20T01:00",
    category: "System Notice",
    pdf: "/announcements/maintenance.pdf",
  },
  {
    id: 3,
    title: "🎉 Celebrating Top Performers!",
    description:
      "Huge shoutout to the winners of Weekly Contest 460! 🏆 Keep grinding and you could be next on the leaderboard spotlight.",
    date: "2025-09-10T18:30",
    category: "Community",
    pdf: "/announcements/top-performers.pdf",
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
  });

  // ➕ Add / Edit handler
  const handleSave = () => {
    if (editing) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editing.id ? { ...a, ...newAnnouncement } : a
        )
      );
    } else {
      setAnnouncements([
        ...announcements,
        {
          id: Date.now(),
          title: newAnnouncement.title,
          description: newAnnouncement.description,
          date: newAnnouncement.date,
          category: "General",
        },
      ]);
    }
    setNewAnnouncement({ title: "", description: "", date: "" });
    setEditing(null);
    setIsModalOpen(false);
  };

  // ❌ Delete handler
  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  // ✏️ Edit handler
  const handleEdit = (announcement) => {
    setEditing(announcement);
    setNewAnnouncement({
      title: announcement.title,
      description: announcement.description,
      date: announcement.date,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaBullhorn className="text-4xl" /> Announcements
          </h1>
          <p className="mt-2 text-blue-100">
            Stay connected with the latest updates, contest alerts, and
            community highlights.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 flex items-center gap-2"
        >
          <FaPlus /> Add Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >
            {/* Category + Date */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                {a.category}
              </span>
              <span className="flex items-center gap-2 text-gray-500 text-sm">
                <FaCalendarAlt /> {new Date(a.date).toLocaleString()}
              </span>
            </div>

            {/* Title + Description */}
            <h2 className="text-lg font-bold text-gray-800">{a.title}</h2>
            <p className="text-gray-600 mt-2">{a.description}</p>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-5 text-sm">
              <button
                onClick={() => handleEdit(a)}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
              {a.pdf && (
                <a
                  href={a.pdf}
                  download
                  className="flex items-center gap-2 text-green-600 hover:underline"
                >
                  <FaDownload /> PDF
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              {editing ? "Edit Announcement" : "Add Announcement"}
            </h2>

            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  title: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            {/* Description */}
            <textarea
              placeholder="Description"
              rows={4}
              value={newAnnouncement.description}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            {/* Date + Time */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📅 Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={newAnnouncement.date}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  date: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditing(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
