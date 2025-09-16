// Orders.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/LoginContext";
import axios from "axios";

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
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-12 text-gray-600">
        Please log in to see your orders.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center mt-12 text-gray-600">Loading orders...</p>
    );
  }

  if (orders.length === 0) {
    return <p className="text-center mt-12 text-gray-500">No orders yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Your Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mb-8"
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-500">Placed on: {order.date}</p>
              <p className="text-sm text-gray-500">Payment: {order.payment}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  item.canceled
                    ? "bg-gray-100 line-through opacity-50"
                    : "bg-gray-50"
                }`}
              >
                {/* Left side - image + details */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Rs: <span className="font-semibold">{item.price}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} |{" "}
                      <span
                        className={`font-medium ${
                          item.deliveryStatus === "Delivered"
                            ? "text-green-600"
                            : item.deliveryStatus === "Shipped"
                            ? "text-blue-600"
                            : "text-orange-500"
                        }`}
                      >
                        {item.deliveryStatus || "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
