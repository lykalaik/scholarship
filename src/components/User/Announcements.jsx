import React from "react";

const Announcements = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        <ul>
          {notifications.length === 0 ? (
            <li className="text-gray-500">No notifications</li>
          ) : (
            notifications.map((notification, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-200">
                {notification}
              </li>
            ))
          )}
        </ul>
        <button onClick={onClose} className="mt-4 btn btn-primary">
          Close
        </button>
      </div>
    </div>
  );
};

export default Announcements;
