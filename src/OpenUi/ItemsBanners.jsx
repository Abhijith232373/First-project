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
            <h1 className="text-2xl font-semibold mb-6">Popular Categories</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative group rounded-b-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Image */}
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">

                            {/* Wishlist top-right */}
                            <button className="ml-auto bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition">
                                <FavoriteBorderIcon fontSize="small" />
                            </button>

                            {/* Bottom Text & Shop Now */}
                            <div className="text-center">
                                <h2 className="text-lg font-semibold text-white mb-2">{item.title}</h2>
                                <a
                                    href="#"
                                    className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                                >
                                    Shop Now
                                </a>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsBanners;
