// src/Context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); 
  const userId = user ? user.id : null;

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔹 Base API URL
  const API_URL = "http://localhost:5000";

  // 🔹 Load user cart + orders from db.json
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setCart([]);
        setOrders([]);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/users/${userId}`);
        setCart(res.data.cart || []);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userId, user]);

  // 🔹 Save cart automatically when updated
  useEffect(() => {
    if (!user) return;
    const saveCart = async () => {
      try {
        await axios.patch(`${API_URL}/users/${userId}`, {
          cart,
        });
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    };
    saveCart();
  }, [cart, userId, user]);

  // 🔹 Save orders automatically when updated
  useEffect(() => {
    if (!user) return;
    const saveOrders = async () => {
      try {
        await axios.patch(`${API_URL}/users/${userId}`, {
          orders,
        });
      } catch (err) {
        console.error("Error saving orders:", err);
      }
    };
    saveOrders();
  }, [orders, userId, user]);

  // 🔹 Add product to cart
  const addToCart = (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      window.location.href = "/user";
      return false;
    }

    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.name} added to cart 🛒`);
    return true;
  };

  // 🔹 Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart ❌");
  };

  // 🔹 Update quantity
  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  // 🔹 Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // 🔹 Place Order (✅ now it will NOT clear cart)
  const placeOrder = async (orderDetails) => {
    if (!user) {
      toast.error("Please login to place an order");
      return;
    }

    try {
      const newOrder = {
        id: Date.now(),
        ...orderDetails,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date().toLocaleString(),
      };

      const updatedOrders = [...orders, newOrder];

      // Save to DB (only orders, not clearing cart)
      await axios.patch(`${API_URL}/users/${userId}`, {
        orders: updatedOrders,
      });

      setOrders(updatedOrders);
      toast.success("✅ Order placed successfully");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("❌ Failed to place order");
    }
  };

  // 🔹 Cancel order
  const cancelOrder = async (id) => {
    try {
      const updatedOrders = orders.filter((o) => o.id !== id);

      await axios.patch(`${API_URL}/users/${userId}`, {
        orders: updatedOrders,
      });

      setOrders(updatedOrders);
      toast.success("Order cancelled ❌");
    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error("Failed to cancel order");
    }
  };

  // 🔹 Cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
