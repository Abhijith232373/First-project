import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // MUI icon for wishlist

const ItemsBanners = () => {
  const items = [
    { id: 1, img: "src/assets/ItemsBanners/coffee-tables.webp", title: "Coffee Tables" },
    { id: 2, img: "src/assets/ItemsBanners/sofas.webp", title: "Sofas" },
    { id: 3, img: "src/assets/ItemsBanners/dining-room.webp", title: "Dining Room" },
    { id: 4, img: "src/assets/ItemsBanners/Armchairs.webp", title: "Armchairs" },
    { id: 5, img: "src/assets/ItemsBanners/bedroom.webp", title: "Bedroom" },
    { id: 6, img: "src/assets/ItemsBanners/Home  Decor.webp", title: "Home Decor" },
  ];

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6 flex justify-center font-serif">
        Popular Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Link wrapping image + content */}
            <a href="#" className="block group">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="flex flex-col items-center justify-center bg-white py-4">
                <h2 className="text-lg font-serif font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <span className="text-red-600 font-medium group-hover:underline group-hover:text-red-700 transition">
                  Shop Now →
                </span>
              </div>
            </a>

            {/* Wishlist top-right */}
            <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-red-500 hover:text-white transition shadow">
              <FavoriteBorderIcon fontSize="small" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsBanners;
