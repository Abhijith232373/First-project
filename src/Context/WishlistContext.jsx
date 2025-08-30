import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Pages/AuthContext"; // logged-in user context

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext); 
  const [wishlist, setWishlist] = useState([]);

  // load wishlist from db when user logs in
  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/users/${user.id}`)
        .then(res => setWishlist(res.data.wishlist || []))
        .catch(err => console.error("Error fetching wishlist", err));
    } else {
      setWishlist([]); 
    }
  }, [user]);

  // toggle add/remove
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

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });
    } catch (err) {
      console.error("Error updating wishlist", err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
