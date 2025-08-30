import { useContext } from "react";
import { WishlistContext } from '../Context/WishlistContext'

const WishlistPage = () => {
  const { wishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return <h2 className="text-center mt-10 text-gray-500">Your wishlist is empty 💔</h2>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item.id} className="p-4 shadow rounded-lg bg-white">
          <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
