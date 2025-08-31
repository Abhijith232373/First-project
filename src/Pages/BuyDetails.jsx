import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const BuyDetails = () => {
  const initialValues = {
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    district: "",
    state: "",
    landmark: "",
    payment: "cod",
  };

  const handleSubmit = (values) => {
    alert(`✅ Order Placed!
    Name: ${values.name}
    Phone: ${values.phone}
    Address: ${values.address}, ${values.locality}, ${values.pincode}, ${values.district}, ${values.state}
    Landmark: ${values.landmark}
    Payment: ${values.payment}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🚚 Delivery Details
      </h2>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="space-y-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <Field
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <Field
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block font-medium mb-1">Pincode</label>
                <Field
                  name="pincode"
                  placeholder="Enter pincode"
                  className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Locality */}
              <div>
                <label className="block font-medium mb-1">Locality</label>
                <Field
                  name="locality"
                  placeholder="Enter your locality"
                  className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* District */}
              <div>
                <label className="block font-medium mb-1">District</label>
                <Field
                  name="district"
                  className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder='Enter district'
                />
                
              </div>

              {/* State */}
              <div>
                <label className="block font-medium mb-1">State</label>
                <Field
                  name="state"
                  className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder='Enter State'
                >
                
                 
                </Field>
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label className="block font-medium mb-1">Full Address</label>
              <Field
                as="textarea"
                name="address"
                placeholder="Enter your address"
                className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                rows="3"
                required
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block font-medium mb-1">Landmark</label>
              <Field
                name="landmark"
                placeholder="Nearby landmark"
                className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Payment Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">💳 Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    id: "cod",
                    label: "Cash on Delivery",
                    icon: "💵",
                  },
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
                    className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center shadow-md transition hover:shadow-lg ${
                      values.payment === method.id
                        ? "border-blue-500 ring-2 ring-blue-400 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <Field type="radio" name="payment" value={method.id} className="hidden" />
                    {method.icon ? (
                      <span className="text-3xl">{method.icon}</span>
                    ) : (
                      <img src={method.img} alt={method.label} className="w-10 h-10 mb-2" />
                    )}
                    <span className="text-sm font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
            >
              ✅ Confirm Order
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BuyDetails;
