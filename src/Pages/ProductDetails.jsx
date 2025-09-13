import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromCart = location.state?.fromCart || false; // Check if opened from cart

  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/furniture/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center p-10">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center p-10 text-red-500">Product not found!</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    navigate("/buydetails", { state: { product } });
  };

  // Calculate discount
  const mrp = product.price + 5000;
  const discount = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start bg-white shadow-lg rounded-xl p-6 sm:p-8">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <p className="text-2xl sm:text-3xl font-bold text-gray-600">
              ₹{product.price}
            </p>
            <span className="text-gray-500 line-through text-sm sm:text-base">
              ₹{mrp}
            </span>
            <span className="text-gray-600 font-semibold text-sm sm:text-base">
              {discount}% off
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Show Add to Cart only if not from Cart */}
            {!fromCart && (
              <button
                onClick={handleAddToCart}
                className="text-white bg-gradient-to-r from-gray-400 to-gray-500 text-lg sm:text-xl font-bold px-6 py-3 rounded-lg shadow cursor-pointer transition ease-in-out hover:scale-105 w-full sm:w-1/2"
              >
                Add to Cart
              </button>
            )}

            <button
              onClick={handleBuyNow}
              className="text-white bg-gradient-to-r from-green-400 to-green-500 text-lg sm:text-xl font-bold px-6 py-3 rounded-lg shadow cursor-pointer ease-in-out hover:scale-105 transition w-full sm:w-1/2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
