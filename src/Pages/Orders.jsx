// src/Pages/Orders.jsx
import React, { useContext } from "react";
import { OrderContext } from "../Context/OrderContext";

const Orders = () => {
  const { orders, cancelProduct, removeProduct } = useContext(OrderContext);

  if (orders.length === 0) return <p className="text-center mt-12">No orders yet.</p>;

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">🛒 Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-2xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
          <p className="text-gray-600 mb-2">Placed on: {order.date}</p>
          <p className="text-gray-600 mb-4">Payment: {order.payment}</p>

          <h4 className="font-semibold mb-2">Items:</h4>
          {order.items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between mb-2 p-2 rounded ${
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
              </div>

              <div className="flex gap-2">
                {!item.canceled && (
                  <button
                    onClick={() => cancelProduct(order.id, item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                   Order Cancel
                  </button>
                )}

                <button
                  onClick={() => removeProduct(order.id, item.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Delete
                </button>

                {item.canceled && <span className="text-red-500 font-semibold ml-2">Canceled</span>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
