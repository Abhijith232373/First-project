// src/Pages/Login.jsx
import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext"; 
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  return (
    <div className="absolute inset-0 bg-[url('src/assets/user/bg4.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      {/* Login Card with inner background */}
      <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm
                     bg-cover bg-center">
        {/* Overlay for slight transparency */}
        <div className="absolute inset-0 bg-gray-400/20 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top Image (logo / illustration) */}
          <div className="flex justify-center mb-4">
            <img
              src="src/assets/logo/Home4u-logo.png"
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
                // 1️⃣ Check admin login
                const adminRes = await axios.get(
                  `http://localhost:5000/admins?email=${values.email}&password=${values.password}`
                );

                if (adminRes.data.length > 0) {
                  toast.success("Welcome Admin 🚀");
                  localStorage.setItem("user", JSON.stringify({ ...adminRes.data[0], role: "admin" }));
                  login({ ...adminRes.data[0], role: "admin" });
                  resetForm();
                  return navigate("/admin"); // redirect admin
                }

                // 2️⃣ Check normal users
                const res = await axios.get(
                  `http://localhost:5000/users?email=${values.email}&password=${values.password}`
                );

                if (res.data.length > 0) {
                  toast.success("Login Successful ✅");
                  localStorage.setItem("user", JSON.stringify({ ...res.data[0], role: "user" }));
                  login({ ...res.data[0], role: "user" });
                  resetForm();
                  return navigate("/"); 
                }

                // 3️⃣ Not found → ask signup
                toast.error("No account found ❌ Please signup first!");

              } catch (error) {
                toast.error("Something went wrong, try again ❌");
              }
            }}
          >
            {() => (
              <Form className="space-y-4 relative z-10">
                <div>
                  <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
    <EmailIcon  className="text-gray-400 mr-2 scale-80" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
className="w-full py-2 outline-none"/>
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                                   <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
    <LockIcon  className="text-gray-400 mr-2 scale-80" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full py-2 outline-none"
                  />
                  </div>
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

          <p className="text-sm text-center mt-4 text-gary-600 relative z-10">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-gary-700 font-medium cursor-pointer hover:underline">
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
