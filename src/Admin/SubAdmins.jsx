import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/LoginContext";
import { Navigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";

const SubAdmins = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

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

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userToUpdate = users.find((u) => u.id === userId);
      if (!userToUpdate) return;

      const updatedUser = { ...userToUpdate, role: newRole };

      await axios.patch(`http://localhost:5000/users/${userId}`, {
        role: newRole,
      });

      setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
      toast.success(`Role updated to ${newRole}`);
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("Failed to update role!");
    }
  };

  const confirmRoleChange = (userId, newRole) => {
    confirmAlert({
      title: "Confirm Role Change",
      message: `Are you sure you want to change this user’s role to ${newRole}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleRoleChange(userId, newRole),
        },
        {
          label: "No",
        },
      ],
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg">Loading users...</p>
      </div>
    );
  }

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto mt-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        SUB ADMIN MANAGEMENT
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr
                key={user.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-300 transition`}
              >
                <td className="py-3 px-4">{user.id}</td> 
                <td className="py-3 px-4 font-medium text-gray-700">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4 capitalize font-semibold">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-gray-200 text-gray-900 font-semibold"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "active"
                        ? "bg-green-300 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      confirmRoleChange(user.id, e.target.value)
                    }
                    className="border border-gray-300 bg-white rounded-md px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              currentPage === index + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubAdmins;
