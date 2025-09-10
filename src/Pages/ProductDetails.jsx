import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/CartContext";

const ProductDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
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
        console.error(" Error fetching product:", err);
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-600">₹{product.price}</p>
            <span className="text-gray-500 line-through">
              ₹{product.price + 5000}
            </span>
            <span className="text-gray-600 font-semibold">
              {Math.round(((product.price + 5000 - product.price) / (product.price + 5000)) * 100)}% off
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="text-gray-500  text-xl font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition w-1/2"
            >
               Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="text-green-600  text-xl font-bold px-6 py-3 rounded-lg shadow cursor-pointer hover:bg-green-100 transition w-1/2"
            >
             Buy Now
            </button>
          </div>

          <p className="text-sm text-gray-500">
            <strong>Category:</strong> {product.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
