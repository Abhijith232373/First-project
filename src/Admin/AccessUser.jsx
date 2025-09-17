import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AccessUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
      await axios.patch(`http://localhost:5000/users/${id}`, {
        status: newStatus,
      });
      toast.success(`User ${newStatus}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteUser = async (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5000/users/${id}`);
              toast.success("User deleted");
              fetchUsers();
            } catch (error) {
              console.error("Error deleting user:", error);
              toast.error("Failed to delete user");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast("Cancelled"),
        },
      ],
    });
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          MANAGE USERS
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-sm">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={`text-sm ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } hover:bg-gray-300 transition`}
                    >
                      <td className="px-4 py-3">{user.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-700">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() =>
                            handleToggleStatus(user.id, user.status)
                          }
                          className={`px-4 py-1.5 rounded-md text-sm font-medium border transition ${
                            user.status === "Active"
                              ? "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                              : "border-green-400 bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                        >
                          {user.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-4 py-1.5 rounded-md text-sm font-medium border border-red-400 bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          Delete
                        </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AccessUser;
