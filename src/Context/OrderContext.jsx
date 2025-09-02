// src/Context/OrderContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Load orders from localStorage or start with empty array
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Add a new order
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  // Cancel a product in an order (strike-through)
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

  // Remove a product from an order
  // If order becomes empty, remove the order completely
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
        // Remove orders with no items left
        .filter((order) => order.items.length > 0)
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, cancelProduct, removeProduct }}
    >
      {children}
    </OrderContext.Provider>
  );
};
