// Orders.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/LoginContext";
import axios from "axios";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders and poll every 3 seconds
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        setOrders(res.data.orders || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // Poll every 3 sec
    return () => clearInterval(interval);
  }, [user]);

  if (!user) {
    return <p className="text-center mt-12">Please log in to see your orders.</p>;
  }

  if (loading) return <p className="text-center mt-12">Loading orders...</p>;

  if (orders.length === 0) {
    return <p className="text-center mt-12">No orders yet.</p>;
  }

  // Cancel item with confirmation
  const handleCancel = (itemId, orderId) => {
    confirmAlert({
      title: "Confirm Cancellation",
      message: "Are you sure you want to cancel this item?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const updatedOrders = orders.map((o) =>
                o.id === orderId
                  ? {
                      ...o,
                      items: o.items.map((item) =>
                        item.id === itemId ? { ...item, canceled: true } : item
                      ),
                    }
                  : o
              );

              setOrders(updatedOrders);

              // Update user orders in db.json
              await axios.patch(`http://localhost:5000/users/${user.id}`, {
                orders: updatedOrders,
              });

              toast.success("Item canceled!");
            } catch (err) {
              console.error(err);
              toast.error("Failed to cancel item!");
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-2xl mb-6">
          <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
          <p className="text-gray-600 mb-2">Placed on: {order.date}</p>
          <p className="text-gray-600 mb-4">Payment: {order.payment}</p>

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
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-800 font-bold">Rs: {item.price}</p>
                  <p className="text-sm">
                    Quantity: {item.quantity} | Status:{" "}
                    <span
                      className={`font-semibold ${
                        item.deliveryStatus === "Delivered"
                          ? "text-green-600"
                          : item.deliveryStatus === "Shipped"
                          ? "text-blue-600"
                          : "text-orange-600"
                      }`}
                    >
                      {item.deliveryStatus || "Pending"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {!item.canceled && (
                  <button
                    onClick={() => handleCancel(item.id, order.id)}
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

export default Orders;
