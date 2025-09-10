import React from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const QuickViewModal = ({ product, onClose, addToCart }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const getDiscountInfo = (price) => {
    const mrp = price + 5000;
    const discount = Math.round(((mrp - price) / mrp) * 100);
    return { mrp, discount };
  };

  const { mrp, discount } = getDiscountInfo(product.price);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[100%] md:w-[100%] lg:w-[100%] lg:h-[100%] rounded-2xl shadow-xl p-10 pt-32 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-90 object-cover rounded-xl"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-4">{product.title}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-gray-400 line-through">₹{mrp}</span>
              <span className="text-2xl font-bold text-gray-600">
                Rs. {product.price}
              </span>
              <span className="text-green-400 font-semibold">{discount}% OFF</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-1 text-gray-600 font-serif font-bold text-xl cursor-pointer hover:bg-gray-200  py-3 px-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <ShoppingCartIcon fontSize="small" />
                Add to Cart
              </button>

              <button
                onClick={() => {
                  navigate("/buydetails", { state: { product } });
                  onClose();
                }}
                className="flex-1 text-green-400 hover:bg-green-200 font-bold text-xl cursor-pointer   py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <LocalMallIcon fontSize="small" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
