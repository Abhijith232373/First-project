import React from "react";

const OrderSuccess = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50 p-4 sm:p-6">
      {/* Success Icon */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
        <span className="text-white text-4xl sm:text-5xl font-bold">✔</span>
      </div>

      <p className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-green-600 text-center animate-fadeIn">
        Order Placed Successfully!
      </p>
    </div>
  );
};

export default OrderSuccess;
