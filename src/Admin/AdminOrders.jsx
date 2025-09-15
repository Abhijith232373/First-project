import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../Context/OrderContext";
import { AuthContext } from "../Context/LoginContext";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const { orders, setOrders } = useContext(OrderContext); // get all orders
  const { user: adminUser } = useContext(AuthContext);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    if (adminUser?.role !== "admin") return; // Only admins can see
    setAllOrders(orders);
  }, [orders, adminUser]);

  if (!adminUser || adminUser.role !== "admin") {
    return (
      <p className="text-center mt-12 text-red-500">
        You are not authorized to view this page.
      </p>
    );
  }

  if (!allOrders || allOrders.length === 0) {
    return <p className="text-center mt-12">No orders yet.</p>;
  }

  // ✅ Update order status
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = allOrders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );

    setAllOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  // ✅ Optional: Cancel individual items
  const handleCancelItem = (orderId, itemId) => {
    const updatedOrders = allOrders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            items: order.items.map((item) =>
              item.id === itemId ? { ...item, canceled: true } : item
            ),
          }
        : order
    );

    setAllOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.error(`Item canceled in order ${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Admin: All User Orders
      </h2>

      {allOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded-2xl shadow-2xl mb-6"
        >
          <h3 className="text-xl font-semibold mb-2">
            Order ID: {order.id} (User: {order.user.id})
          </h3>
          <p className="text-gray-600 mb-2">Placed on: {order.date}</p>
          <p className="text-gray-600 mb-2">Payment: {order.payment}</p>

          {/* Order Status */}
          <div className="mb-4">
            <label className="font-semibold mr-2">Status:</label>
            <select
              value={order.status || "Pending"}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Pending">Pending</option>
              <option value="Shipping">Shipping</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <h4 className="font-semibold mb-2">Items:</h4>
          {order.items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between mb-2 p-2 rounded border ${
                item.canceled ? "bg-gray-100 line-through opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{item.title}</span>
                <span className="text-gray-800 text-lg font-bold">
                  Rs:{item.price}
                </span>
              </div>

              <div className="flex gap-2">
                {!item.canceled && (
                  <button
                    onClick={() => handleCancelItem(order.id, item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                )}
                {item.canceled && (
                  <span className="text-red-500 font-semibold ml-2">
                    Canceled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
