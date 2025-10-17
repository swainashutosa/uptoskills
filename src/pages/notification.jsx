import React, { useState } from "react";
import { Bell } from "lucide-react"; // nice lightweight bell icon
import { motion, AnimatePresence } from "framer-motion";

function Topbar({ onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);

  // dummy notifications (replace with API later)
  const notifications = [
    { id: 1, message: "New contest announced!" },
    { id: 2, message: "Your submission was accepted 🎉" },
    { id: 3, message: "Profile updated successfully." },
  ];

  return (
    <div className="flex items-center justify-between bg-white shadow px-4 py-3">
      {/* Left: menu button */}
      <button
        onClick={onMenuClick}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        ☰
      </button>

      {/* Right: notifications */}
      <div className="relative">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-6 w-6 text-gray-700" />
          {/* Badge */}
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border border-gray-200 z-50"
            >
              <div className="p-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No new notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      {n.message}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Topbar;
