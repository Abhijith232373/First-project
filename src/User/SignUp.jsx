import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 bg-[url('src/assets/user/bg4.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      {/* Sign Up Card */}

      <div className="relative bg-gray-700/70 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm
                      bg-[url('src/assets/user/bg7.jpg')] bg-cover bg-center">

          {/* Top Image (logo / illustration) */}
          <div className="flex justify-center mb-4">
            <img
              src="src/assets/logo/Home4u-logo.png" // ⬅️ your logo
              alt="Login"
              className="w-16 h-16 object-contain rounded-4xl"/>
          </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-4">
          Sign Up
        </h2>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirm: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is required";
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = "Enter a valid email";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }
            if (!values.confirm) {
              errors.confirm = "Confirm your password";
            } else if (values.password !== values.confirm) {
              errors.confirm = "Passwords do not match";
            }
            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const { confirm, ...userData } = values;
              await axios.post("http://localhost:3000/users", userData);
              
              toast.success('Success !')
              resetForm();
              navigate("/user"); // redirect to login page
            } catch (error) {
              console.error("Signup failed", error);
              toast.error("This didn't work.")
            }
          }}
          >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                  />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                  />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                  />
              </div>

              <div>
                <Field
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                <ErrorMessage
                  name="confirm"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                  />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center mt-4 text-gray-900">
          Already have an account?{" "}
          <Link to="/user">
            <span className="text-gray-600 font-medium cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
          </div>
    </div>
  );
};

export default SignUp;
