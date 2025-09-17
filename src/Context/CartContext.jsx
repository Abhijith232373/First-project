import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./LoginContext"; 
import toast from "react-hot-toast";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  
  const { user } = useContext(AuthContext); 
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5000/users/${user.id}`)
        .then((res) => {
          setCart(res.data.cart || []);
        })
        .catch((err) => console.error(" Error fetching cart:", err));
    } else {
      setCart([]);
    }
  }, [user]);

  const updateCartInDB = async (updatedCart) => {
    if (!user?.id) return;
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.error(" Error updating cart:", err);
    }
  };

 
  const addToCart = (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    let updatedCart;
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success("Added to cart ");
    }

    setCart(updatedCart);
    updateCartInDB(updatedCart);
  };

  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
    updateCartInDB(updatedCart);
    
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
      .filter((item) => item.quantity > 0); 

    setCart(updatedCart);
    updateCartInDB(updatedCart);
   
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    updateCartInDB(updatedCart);
    toast("Removed from cart ");
  };

 
  const clearCart = () => {
    setCart([]);
    updateCartInDB([]);
    
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
