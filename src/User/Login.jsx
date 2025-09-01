import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext"; 
import toast from "react-hot-toast"; // ✅ import toast

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  return (
    <div className="absolute inset-0 bg-[url('src/assets/user/bg4.jpg')]  bg-cover bg-center flex items-center justify-center px-4">
      {/* Login Card with inner background */}
      <div className="relative bg-gray-700/70 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm
                      bg-[url('src/assets/user/bg3.jpg')] bg-cover bg-center">
        {/* Overlay for slight transparency */}
        <div className="absolute inset-0 bg-gray-400/20 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top Image (logo / illustration) */}
          <div className="flex justify-center mb-4">
            <img
              src="src/assets/logo/Home4u-logo.png" // ⬅️ your logo
              alt="Login"
              className="w-16 h-16 object-contain rounded-4xl"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-4">
            Login
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "Enter a valid email";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              return errors;
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await axios.get(
                  `http://localhost:3000/users?email=${values.email}&password=${values.password}`
                );

                if (res.data.length > 0) {
                  toast.success("Login Successful ✅"); // ✅ toast instead of alert

                  // Save user to localStorage
                  localStorage.setItem("user", JSON.stringify(res.data[0]));

                  // Update AuthContext
                  login(res.data[0]);

                  resetForm();
                  navigate("/"); 
                } else {
                  toast.error("Invalid email or password ❌"); // ✅ toast
                }
              } catch (error) {
                toast.error("Something went wrong, try again ❌");
              }
            }}
          >
            {() => (
              <Form className="space-y-4 relative z-10">
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

                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-center mt-4 text-white relative z-10">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-white font-medium cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
