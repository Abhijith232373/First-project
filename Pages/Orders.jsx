import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/LoginContext";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.id}`)
        .then((res) => {
          setOrders(res.data.orders || []);
        })
        .catch((err) => console.error("Error fetching orders:", err));
    } else {
      setOrders([]);
    }
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-12"> Please log in to see your orders.</p>
    );
  }

  if (orders.length === 0) {
    return <p className="text-center mt-12">No orders yet.</p>;
  }

  const handleCancel = async (itemId, orderId) => {
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

    await axios.patch(`http://localhost:5000/users/${user.id}`, {
      orders: updatedOrders,
    });

    toast.error("Item canceled!");
  };



  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-6"> Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-2xl mb-6  ">
          <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
          <p className="text-gray-600 mb-2"> Placed on: {order.date}</p>
          <p className="text-gray-600 mb-4"> Payment: {order.payment}</p>

          <h4 className="font-semibold mb-2">Items:</h4>
          {order.items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between mb-2 p-2 rounded border ${item.canceled ? "bg-gray-100 line-through opacity-50" : ""
                }`}
            >
              <div className="flex items-center gap-3 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{item.title}</span>
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
