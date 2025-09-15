// SubAdmins.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/LoginContext";
import { Navigate } from "react-router-dom";

const SubAdmins = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Only admin can access
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Error fetching users!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const userToUpdate = users.find((u) => u.id === userId);
      if (!userToUpdate) return;

      const updatedUser = { ...userToUpdate, role: newRole };

      // Update in db.json via PATCH
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        role: newRole,
      });

      // Update local state
      setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
      toast.success(`Role updated to ${newRole}`);
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("Failed to update role!");
    }
  };

  if (loading) {
    return <p className="text-center mt-12">Loading users...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4 border">{user.id}</td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border capitalize">{user.role}</td>
                <td className="py-2 px-4 border">{user.status}</td>
                <td className="py-2 px-4 border">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRoleChange(user.id, "user")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Make User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user.id, "admin")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubAdmins;
