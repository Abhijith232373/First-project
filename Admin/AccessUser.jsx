import { useEffect, useState } from "react";

export default function AccessUser() {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle status
  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => fetchUsers());
  };

  // Delete user
  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    }).then(() => fetchUsers());
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Users</h1>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => toggleStatus(u.id, u.status)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    {u.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
