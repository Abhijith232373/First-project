// AdminOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
              deliveryStatus: item.deliveryStatus || "Pending", // default Pending
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

  const handleStatusChange = async (itemId, orderId, userId, newStatus) => {
    try {
      // Find the user
      const user = users.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");

      // Update the correct item in the correct order
      const updatedOrders = user.orders.map((order) => {
        if (order.id !== orderId) return order;
        const updatedItems = order.items.map((item) =>
          item.id === itemId ? { ...item, deliveryStatus: newStatus } : item
        );
        return { ...order, items: updatedItems };
      });

      const updatedUser = { ...user, orders: updatedOrders };

      // Update db.json
      await axios.put(`http://localhost:5000/users/${userId}`, updatedUser);

      // Update local state
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr
              key={`${item.orderId}-${item.id}`}
              className="hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer"
            >
              <td className="border px-4 py-2">{item.orderId}</td>
              <td className="border px-4 py-2">{item.userName}</td>
              <td className="border px-4 py-2 flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{item.title}</span>
              </td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">
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
                  className="border rounded-lg p-1"
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
  );
};

export default AdminOrders;
