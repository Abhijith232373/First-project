import React from "react";
import { Link } from "react-router-dom";

const ItemsBanners = () => {
  const items = [
    { id: 1, img: "src/assets/ItemsBanners/storage.jpg", title: "Storage", path: "/storage" },
    { id: 2, img: "src/assets/ItemsBanners/sofas.webp", title: "Living", path: "/Living" },
    { id: 3, img: "src/assets/ItemsBanners/dining-room.webp", title: "Dining Room", path: "/dining" },
    { id: 4, img: "src/assets/ItemsBanners/ki.jpg", title: "Kitchen", path: "/kitchen" },
    { id: 5, img: "src/assets/ItemsBanners/bedroom.webp", title: "Bedroom", path: "/bedroom" },
    { id: 6, img: "src/assets/ItemsBanners/homedecor.jpg", title: "Home Decor", path: "/homedecor" },
  ];

  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center font-serif text-gray-800">
        POPULAR CATEGORIES
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link key={item.id} to={item.path}>
            <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 cursor-pointer">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />

              <div
                className="
                  absolute inset-0 
                  bg-black/40 
                  flex flex-col items-center justify-center text-center text-white
                  opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                  transition duration-500
                "
              >
                <h2 className="text-2xl font-semibold mb-2 drop-shadow-lg">
                  {item.title}
                </h2>
                <span className="text-sm uppercase tracking-wide font-medium border-b border-white/70 pb-1">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default ItemsBanners;
