import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

const BuyDetails = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    name: user?.name || "",
    phone: user?.phone || "",
    pincode: "",
    locality: "",
    address: "",
    district: "",
    state: "",
    landmark: "",
    payment: "cod",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty ❌");
      return;
    }

    if (!user) {
      toast.error("Please login to place an order!");
      navigate("/user");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userId: user.id,
      details: values,
      items: cart,
      date: new Date().toLocaleString(),
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    clearCart();
    toast.success("✅ Order Placed Successfully!");
    resetForm();
    setTimeout(() => navigate("/orders"), 1000); // redirect to Orders page
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🚚 Checkout
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE - Cart Items */}
        <div className="flex-1 bg-white shadow-2xl rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
            🛒 Items in Your Cart
          </h3>
          {cart && cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* RIGHT SIDE - Delivery + Payment */}
        <div className="flex-1 bg-white shadow-2xl rounded-2xl p-6">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form className="space-y-6">
                {/* Delivery Fields */}
                <h3 className="text-2xl font-semibold mb-2 border-b pb-2">
                  📝 Delivery Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["name", "phone", "pincode", "district", "state"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block font-medium mb-1">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <Field
                          name={field}
                          placeholder={field}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                        <ErrorMessage
                          name={field}
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )
                  )}
                  <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Address</label>
                    <Field
                      as="textarea"
                      name="address"
                      placeholder="Full Address"
                      className="w-full p-2 border rounded-md"
                      rows="2"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Landmark</label>
                    <Field
                      name="landmark"
                      placeholder="Landmark"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                {/* Payment */}
                <h3 className="text-2xl font-semibold mb-2 border-b pb-2">
                  💳 Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { id: "cod", label: "Cash on Delivery", icon: "💵" },
                    {
                      id: "gpay",
                      label: "Google Pay",
                      img: "https://i.gadgets360cdn.com/large/google_pay_icon_twitter_isumantadas_small_1604911130430.jpg",
                    },
                    {
                      id: "phonepe",
                      label: "PhonePe",
                      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7C7cl9ufztQRxoH-y_biXvwoAf5bynbtnA&s",
                    },
                    {
                      id: "supermoney",
                      label: "SuperMoney",
                      img: "https://shorturl.at/4dSsx",
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`cursor-pointer border rounded-md p-2 flex items-center gap-2 ${
                        values.payment === method.id
                          ? "border-blue-500 ring-1 ring-blue-400 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <Field
                        type="radio"
                        name="payment"
                        value={method.id}
                        className="hidden"
                      />
                      {method.icon ? (
                        <span>{method.icon}</span>
                      ) : (
                        <img
                          src={method.img}
                          alt={method.label}
                          className="w-6 h-6"
                        />
                      )}
                      <span className="text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
                >
                  ✅ Confirm Order
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BuyDetails;
