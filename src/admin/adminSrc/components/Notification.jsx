import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { message: "You have 3 unread messages", time: "30 minutes ago" },
    { message: "New user signed up", time: "1 hour ago" },
    { message: "System update available", time: "2 hours ago" },
  ]);

  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        title="Notifications"
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:text-blue-600"
      >
        <FaBell className="w-6 h-6" />
      </button>

      {/* Floating panel */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl p-4 z-50 animate-slide-in">
          <h2 className="text-lg font-semibold mb-3">🔔 Notifications</h2>
          <ul className="space-y-2 text-gray-700 max-h-60 overflow-y-auto">
            {notifications.map((note, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
              >
                <div>
                  <span>{note.message}</span>
                  <div className="text-xs text-gray-400">{note.time}</div>
                </div>
                <button
                  onClick={() => removeNotification(index)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="p-2 text-gray-500 text-center">
                No notifications 🎉
              </li>
            )}
          </ul>
          <button
            onClick={() => setOpen(false)}
            className="mt-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
