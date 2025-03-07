import { useState } from "react";
import supabase from "../supabaseClient";

const ChangePassword = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  const email = sessionStorage.getItem("email");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .select("password")
        .eq("email", email)
        .single();
      if (error) throw error;

      if (data.password !== currentPassword) {
        alert("Current password is incorrect!");
        return;
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({ password: newPassword })
        .eq("email", email);
      if (updateError) throw updateError;

      alert("Password updated successfully!");
      onClose(); // Close modal after success
    } catch (err) {
      console.error("Error updating password:", err.message);
      alert("Failed to update password.");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mt-4 relative">
            <label className="block font-semibold">Current Password</label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="input input-bordered w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <div className="mt-4 relative">
            <label className="block font-semibold">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              className="input input-bordered w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <div className="mt-4 relative">
            <label className="block font-semibold">Confirm New Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="input input-bordered w-full"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-neutral">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
