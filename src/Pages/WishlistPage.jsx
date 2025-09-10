import { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <h2 className="text-center mt-10 text-gray-500 text-xl">
        Your wishlist is empty 
      </h2>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="p-4 shadow-md rounded-xl bg-white flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />

            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 mb-3">₹{item.price}</p>

            <div className="mt-auto flex gap-3">
              <button
                onClick={() => {
                  navigate("/buydetails", { state: { product: item } });
                }}
                className="flex-1 px-2 py-1 text-green-400 font-serif font-extrabold rounded-lg hover:text-green-600 hover:cursor-pointer transition"
              >
                 Buy Now
              </button>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="flex-1 px-2 py-1 text-red-500  font-serif font-extrabold rounded-lg hover:cursor-pointer hover:text-red-600 transition"
              >
                 Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
