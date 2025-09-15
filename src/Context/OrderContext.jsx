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

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

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

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, cancelProduct, removeProduct }}
    >
      {children}
    </OrderContext.Provider>
  );
};
