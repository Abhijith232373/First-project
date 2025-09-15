import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ Add new order with default status "Shipping"
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      status: "Shipping", // default status
      items: order.items.map((item) => ({ ...item, canceled: false })),
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  // ✅ Cancel a product in an order
  const cancelProduct = (orderId, productId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === productId ? { ...item, canceled: true } : item
              ),
            }
          : order
      )
    );
  };

  // ✅ Remove a product entirely
  const removeProduct = (orderId, productId) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((order) =>
          order.id === orderId
            ? {
                ...order,
                items: order.items.filter((item) => item.id !== productId),
              }
            : order
        )
        .filter((order) => order.items.length > 0)
    );
  };

  // ✅ Admin: Update order status globally
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        cancelProduct,
        removeProduct,
        updateOrderStatus, // admin can call this
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
