import React from "react";

const OrderSuccess = () => {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
        <span className="text-white text-5xl">✔</span>
      </div>
      <p className="mt-6 text-3xl font-bold text-green-600 animate-fadeIn">
        Order Placed Successfully!
      </p>
    </div>
  );
};

export default OrderSuccess;
