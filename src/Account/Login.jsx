import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/LoginContext";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (userData) => {
    login(userData);

   // after successful login
if (userData.role === "admin") {
  navigate("/admin/dashboard", { replace: true }); // ⬅ important
} else {
  navigate("/", { replace: true }); // ⬅ important
}

  };


  return (
    <div className="absolute inset-0 bg-[url('src/assets/user/bg4.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="absolute inset-0 bg-gray-400/20 rounded-2xl"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <img
              src="src/assets/logo/logo.png"
              alt="Login"
              className="w-16 h-16 object-contain rounded-xl"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-600 mb-4">
            Login
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) errors.email = "Email is required";
              else if (!/\S+@\S+\.\S+/.test(values.email))
                errors.email = "Enter a valid email";
              if (!values.password) errors.password = "Password is required";
              return errors;
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                // Fetch user from db.json
                const response = await axios.get(
                  `http://localhost:5000/users?email=${values.email}&password=${values.password}`
                );

                if (response.data.length === 0) {
                  toast.error("Invalid email or password!");
                  return;
                }

                const user = response.data[0];

                if (user.status !== "Active") {
                  toast.error("Your account is suspended!");
                  return;
                }

                // Save user in context and localStorage
                login(user);
                toast.success("Login Successful!");
                resetForm();

                // Redirect based on role
                if (user.role === "admin") {
                  navigate("/admin"); // Admin page
                } else {
                  navigate("/"); // Normal user home
                }
              } catch (err) {
                console.error(err);
                toast.error("Something went wrong!");
              }
            }}
          >
            {() => (
              <Form className="space-y-4 relative z-10">
                <div>
                  <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-gray-400">
                    <EmailIcon className="text-gray-400 mr-2 scale-80" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full py-2 outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
                    <LockIcon className="text-gray-400 mr-2 scale-80" />
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
                  className="w-full py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-center mt-4 text-gray-600 relative z-10">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-gray-700 font-medium cursor-pointer hover:underline">
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
