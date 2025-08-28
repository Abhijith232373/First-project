import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 mt-16">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    className="w-16 border rounded p-1 mt-2"
                  />
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold">
            Total: ₹{total.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
