import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty </h2>
      </div>
    );
  }

  return (
    <div className="p-6 pb-28">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4 shadow-2xl ">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:scale-102 transition ease-in-out"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />

            
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">₹{item.price}</p>
            </div>

<div className="flex items-center gap-2">
  <button
    onClick={() => item.quantity > 1 && decrementQuantity(item.id)}
    className={`px-2 py-1 rounded cursor-pointer ${
      item.quantity === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
    }`}
    disabled={item.quantity === 1}
  >
    -
  </button>

  <span className="px-3">{item.quantity}</span>

  <button
    onClick={() => item.quantity < 5 && incrementQuantity(item.id)}
    className={`px-2 py-1 rounded cursor-pointer ${
      item.quantity === 5 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
    }`}
    disabled={item.quantity === 5}
  >
    +
  </button>
</div>


            <p className="w-24 text-right font-semibold">
              ₹{item.price * item.quantity}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-gray-600 text-sm">
            Total ({totalItems} items):
          </p>
          <p className="text-xl font-bold text-gray-800">₹{total}</p>
        </div>
        <button
          onClick={() => navigate("/buydetails")}
          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:transition delay-150 duration-300 ease-in-out hover:scale-x-115 cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
