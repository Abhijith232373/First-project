import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; 
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext); 
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);

  
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5000/users/${user.id}`)
        .then((res) => {
          setWishlist(res.data.wishlist || []);
        })
        .catch((err) => console.error(" Error fetching wishlist:", err));
    } else {
      setWishlist([]); 
    }
  }, [user]);

  const updateWishlistInDB = async (updatedWishlist) => {
    if (!user?.id) return;
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });
    } catch (err) {
      console.error(" Error updating wishlist:", err);
    }
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    let updatedWishlist;
    if (wishlist.find((item) => item.id === product.id)) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      toast("Removed from wishlist", { icon: "❌" });
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success("Added to wishlist ");
    }

    setWishlist(updatedWishlist);
    updateWishlistInDB(updatedWishlist);
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    updateWishlistInDB(updatedWishlist);
    toast("Removed from wishlist", { icon: "❌" });
  };

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    toast.success("Moved to cart");
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
