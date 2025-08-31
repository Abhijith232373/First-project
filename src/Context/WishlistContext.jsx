import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Pages/AuthContext"; // logged-in user context
import { CartContext } from "./CartContext"; // for addToCart

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from DB when user logs in
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/${user.id}`)
        .then((res) => setWishlist(res.data.wishlist || []))
        .catch((err) => console.error("Error fetching wishlist", err));
    } else {
      setWishlist([]);
    }
  }, [user]);

  // Save wishlist to DB
  const updateWishlistInDB = async (updatedWishlist) => {
    if (!user) return;
    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });
    } catch (err) {
      console.error("Error updating wishlist", err);
    }
  };

  // ✅ Toggle (add/remove)
  const toggleWishlist = async (product) => {
    if (!user) {
      alert("Please login to add items to wishlist");
      return;
    }

    let updatedWishlist;
    if (wishlist.find((item) => item.id === product.id)) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    updateWishlistInDB(updatedWishlist);
  };

  // ✅ Explicit remove
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    updateWishlistInDB(updatedWishlist);
  };

  // ✅ Move item to cart (and remove from wishlist)
  const moveToCart = (item) => {
    addToCart(item); // add in cart
    removeFromWishlist(item.id); // remove from wishlist
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
