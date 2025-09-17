import React, { useState } from "react";
import { useAuth } from "../Context/LoginContext";
import axios from "axios";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, name, profilePic };

      if (oldPassword || newPassword || confirmPassword) {
        if (oldPassword !== user.password) {
          toast.error("Old password is incorrect!");
          return;
        }
        if (!newPassword) {
          toast.error("Enter a new password!");
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
        updatedUser.password = newPassword;
      }

      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);

      login(updatedUser);
      toast.success("updated !");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl border border-gray-200 p-5">

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="w-full text-gray-600 cursor-pointer"
          />
          {profilePic && (
            <div className="mt-4 flex items-center gap-4">
              <img
                src={profilePic}
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
              />
              <span className="text-sm text-gray-500">Preview</span>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Change Password
          </h3>

          <label className="block text-gray-600 font-medium mb-1">
            Old Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
          />

          <label className="block text-gray-600 font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />

          <label className="block text-gray-600 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200 shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
