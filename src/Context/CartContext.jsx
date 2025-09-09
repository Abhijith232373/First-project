// src/Context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // for logged-in user
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // get current logged-in user
  const [cart, setCart] = useState([]);

  // ✅ Load cart from DB when user logs in
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5000/users/${user.id}`)
        .then((res) => {
          setCart(res.data.cart || []);
        })
        .catch((err) => console.error("❌ Error fetching cart:", err));
    } else {
      setCart([]); // clear cart if no user
    }
  }, [user]);

  // ✅ Update cart in DB
  const updateCartInDB = async (updatedCart) => {
    if (!user?.id) return;
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.error("❌ Error updating cart:", err);
    }
  };

  // ✅ Add item to cart
  const addToCart = (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    let updatedCart;
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      // increase quantity if already in cart
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      toast("Increased quantity 🛒");
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success("Added to cart 🛒");
    }

    setCart(updatedCart);
    updateCartInDB(updatedCart);
  };

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    updateCartInDB(updatedCart);
    toast("Removed from cart ❌");
  };

  // ✅ Decrease quantity (or remove if quantity = 1)
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    updateCartInDB(updatedCart);
    toast("Updated cart 🛒");
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCart([]);
    updateCartInDB([]);
    toast("Cart cleared 🧹");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
