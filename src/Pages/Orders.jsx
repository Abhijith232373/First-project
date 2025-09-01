// src/Pages/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders from DB
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/users/${user.id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to fetch orders ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Cancel order
  const cancelOrder = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const res = await axios.get(`http://localhost:3000/users/${user.id}`);
      const updatedOrders = (res.data.orders || []).filter((o) => o.id !== id);

      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        orders: updatedOrders,
      });

      setOrders(updatedOrders);
      toast.success("Order cancelled ✅");
    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error("Failed to cancel order ❌");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-2xl font-semibold">Please login to view orders</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <h2 className="text-xl">Loading your orders...</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-2xl font-semibold">No Orders Yet</h2>
        <p>Once you place an order, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 My Orders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
              <p><b>Name:</b> {order.name}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}, {order.locality}, {order.pincode}, {order.district}, {order.state}</p>
              <p><b>Payment:</b> {order.payment}</p>
              <p><b>Date:</b> {order.date}</p>

              {order.items && order.items.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-semibold">Products:</h4>
                  <ul className="list-disc ml-5">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.title} × {item.quantity} = ₹{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-2 font-bold">Total: ₹{order.total}</p>
            </div>

            <button
              onClick={() => cancelOrder(order.id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl shadow-md transition"
            >
              ❌ Cancel Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
