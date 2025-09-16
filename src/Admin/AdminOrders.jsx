// AdminOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch users with orders
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);

        // Flatten all items for admin table
        const allItems = res.data.flatMap((user) =>
          (user.orders || []).flatMap((order) =>
            (order.items || []).map((item) => ({
              ...item,
              orderId: order.id,
              userId: user.id,
              userName: user.name,
              orderDate: order.date,
              deliveryStatus: item.deliveryStatus || "Pending",
            }))
          )
        );
        setOrders(allItems);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users/orders");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Update delivery status
  const handleStatusChange = async (itemId, orderId, userId, newStatus) => {
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");

      const updatedOrders = user.orders.map((order) => {
        if (order.id !== orderId) return order;
        const updatedItems = order.items.map((item) =>
          item.id === itemId ? { ...item, deliveryStatus: newStatus } : item
        );
        return { ...order, items: updatedItems };
      });

      const updatedUser = { ...user, orders: updatedOrders };

      await axios.put(`http://localhost:5000/users/${userId}`, updatedUser);

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? updatedUser : u))
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.id === itemId && o.userId === userId
            ? { ...o, deliveryStatus: newStatus }
            : o
        )
      );

      toast.success("Order status updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;

  // ✅ Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = orders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h2>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr className="text-gray-800">
              <th className="border px-4 py-3">Order ID</th>
              <th className="border px-4 py-3">User Name</th>
              <th className="border px-4 py-3">Product</th>
              <th className="border px-4 py-3">Quantity</th>
              <th className="border px-4 py-3">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr
                key={`${item.orderId}-${item.id}`}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border px-4 py-3 text-gray-700">{item.orderId}</td>
                <td className="border px-4 py-3 text-gray-700">{item.userName}</td>
                <td className="border px-4 py-3 flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-gray-700">{item.title}</span>
                </td>
                <td className="border px-4 py-3 text-gray-700">{item.quantity}</td>
                <td className="border px-4 py-3">
                  <select
                    value={item.deliveryStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        item.id,
                        item.orderId,
                        item.userId,
                        e.target.value
                      )
                    }
                    className="border rounded-lg p-1 text-gray-700 focus:ring-gray-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
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

export default AdminOrders;
