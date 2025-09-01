// src/Context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // currently logged-in user
  const userId = user ? user.id : null;

  const [cart, setCart] = useState([]);

  // 🔹 Load user-specific cart from DB whenever user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCart([]); // logout clears cart
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [user, userId]);

  // 🔹 Save cart to DB whenever it changes
  useEffect(() => {
    if (!user) return;

    const saveCart = async () => {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          cart,
        });
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    };

    saveCart();
  }, [cart, user, userId]);

  // 🔹 Add item to cart
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

    return true;
  };

  // 🔹 Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔹 Update quantity of a cart item
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

  // 🔹 Place Order (move cart → orders)
  const placeOrder = async (orderDetails) => {
    if (!user) {
      toast.error("Please login to place order");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      const existingOrders = res.data.orders || [];

      const newOrder = {
        ...orderDetails, // name, address, payment, etc.
        items: cart,
        date: new Date().toLocaleString(),
      };

      const updatedOrders = [...existingOrders, newOrder];

      // Save orders + clear cart
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        orders: updatedOrders,
        cart: [],
      });

      setCart([]); // clear local cart
      toast.success("Order placed successfully ✅");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order ❌");
    }
  };

  // 🔹 Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        placeOrder, // ✅ exposed for BuyDetails / Checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
