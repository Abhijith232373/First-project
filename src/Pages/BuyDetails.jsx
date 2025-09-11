import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import OrderSuccess from "../Animations/OrderSuccess"; // ✅ Import animation component

const BuyDetails = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ state

  const quickBuyProduct = location.state?.product;
  const checkoutItems = quickBuyProduct
    ? [{ ...quickBuyProduct, quantity: 1 }]
    : cart;

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

  const validate = (values) => {
    const errors = {};
    const checkSpace = (val, fieldName) => {
      if (!val.trim()) {
        return `${fieldName} is required`;
      }
      if (/^\s|\s$/.test(val)) {
        return `No spaces allowed at start or end`;
      }
      return null;
    };

    const requiredFields = ["name", "phone", "pincode", "district", "state", "address"];
    requiredFields.forEach((field) => {
      const error = checkSpace(values[field], field.charAt(0).toUpperCase() + field.slice(1));
      if (error) errors[field] = error;
    });

    return errors;
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (!checkoutItems || checkoutItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!user) {
      toast.error("Please login to place an order!");
      navigate("/user");
      return;
    }

    const orderData = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      payment: values.payment,
      details: {
        name: values.name.trim(),
        phone: values.phone.trim(),
        address: `${values.address.trim()}, ${values.locality.trim()}, ${values.district.trim()}, ${values.state.trim()}, ${values.pincode.trim()}, Landmark: ${values.landmark.trim()}`,
      },
      items: checkoutItems.map((item) => ({
        ...item,
        canceled: false,
      })),
    };

    try {
      const res = await axios.get(`http://localhost:5000/users/${user.id}`);
      const existingOrders = res.data.orders || [];

      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        orders: [...existingOrders, orderData],
      });

      if (!quickBuyProduct) clearCart();

      resetForm();

      // ✅ Show success animation
      setOrderPlaced(true);

      // ✅ Redirect home after 2s
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order");
    }
  };

  // ✅ If order is placed, show animation instead of form
  if (orderPlaced) {
    return <OrderSuccess />;
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-600 mb-10">
 
        Checkout
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white shadow-2xl rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
            {quickBuyProduct ? "Product Details" : "Items in Your Cart"}
          </h3>
          {checkoutItems && checkoutItems.length > 0 ? (
            <div className="space-y-4">
              {checkoutItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title || item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 ml-4">
                    <h4 className="font-medium text-gray-800">
                      {item.title || item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ₹{item.price * (item.quantity || 1)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items to checkout.</p>
          )}
        </div>

        <div className="flex-1 bg-white shadow-2xl rounded-2xl p-6">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="space-y-6">
                <h3 className="text-2xl font-semibold mb-2 border-b pb-2">
                  Delivery Details
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
                    <label className="block font-medium mb-1">Locality</label>
                    <Field
                      name="locality"
                      placeholder="Locality / Area"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Address</label>
                    <Field
                      as="textarea"
                      name="address"
                      placeholder="Full Address"
                      className="w-full p-2 border rounded-md"
                      rows="2"
                    />
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-red-500 text-sm"
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

                <h3 className="text-2xl font-semibold mb-2 border-b pb-2">
                  Payment Method
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
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:transition delay-150 duration-300 ease-in-out hover:scale-102 transition  active:cursor-progress text-white text-xl py-3 rounded-md font-semibold"
                >
                  Confirm Order
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
