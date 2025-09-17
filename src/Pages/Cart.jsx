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
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="p-4 pb-32 md:p-6 md:pb-28">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg shadow-md hover:scale-[1.01] transition"
          >
            <button
              onClick={() => removeFromCart(item.id)}
              className="absolute top-2 right-2 text-red-500 font-bold text-lg hover:scale-110 transition"
            >
              ✕
            </button>

<div
  className="flex items-center gap-4 cursor-pointer mb-4 md:mb-0"
  onClick={() => navigate(`/product/${item.id}`, { state: { fromCart: true } })} 
>
  <img
    src={item.image}
    alt={item.name}
    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
  />
  <div>
    <h3 className="text-base md:text-lg font-semibold">{item.name}</h3>
    <p className="text-gray-500 text-sm md:text-base">₹{item.price}</p>
  </div>
</div>

            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => item.quantity > 1 && decrementQuantity(item.id)}
                  className={`px-3 py-1 rounded ${
                    item.quantity === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-200"
                  }`}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => item.quantity < 5 && incrementQuantity(item.id)}
                  className={`px-3 py-1 rounded ${
                    item.quantity === 5
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-200"
                  }`}
                  disabled={item.quantity === 5}
                >
                  +
                </button>
              </div>

              <p className="font-semibold text-gray-700 w-full text-left md:w-24 md:text-right">
                ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="text-center md:text-left">
          <p className="text-gray-600 text-sm md:text-base">
            Total ({totalItems} items):
          </p>
          <p className="text-lg md:text-xl font-bold text-gray-800">
            ₹{total}
          </p>
        </div>
        <button
          onClick={() => navigate("/buydetails")}
          className="w-full md:w-auto bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
