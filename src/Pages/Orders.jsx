import React, { useContext } from "react";
import { AuthContext } from "../Context/LoginContext";
import { OrderContext } from "../Context/OrderContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const { orders, cancelProduct } = useContext(OrderContext);

  if (!user) {
    return (
      <p className="text-center mt-12">Please log in to see your orders.</p>
    );
  }

  // Filter only orders for this user
  const userOrders = orders.filter((order) => order.userId === user.id);

  if (userOrders.length === 0) {
    return <p className="text-center mt-12">No orders yet.</p>;
  }

  const handleCancel = (orderId, itemId) => {
    cancelProduct(orderId, itemId);
    toast.error("Item canceled!");
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">Your Orders</h2>

      {userOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded-2xl shadow-2xl mb-6"
        >
          <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
          <p className="text-gray-600 mb-2">Placed on: {order.date}</p>
          <p className="text-gray-600 mb-2">Payment: {order.payment}</p>
          <p className="text-gray-600 mb-4">
            Status:{" "}
            <span className="font-semibold text-blue-600">{order.status}</span>
          </p>

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
                    onClick={() => handleCancel(order.id, item.id)}
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
