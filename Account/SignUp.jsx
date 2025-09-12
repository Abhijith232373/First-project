import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from "../Context/LoginContext";

const SignUp = () => {
  const navigate = useNavigate();
  const {login}=useContext(AuthContext)

  return (
    <div className="absolute inset-0 bg-[url('src/assets/user/bg4.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img
            src="src/assets/logo/logo.png"
            alt="Login"
            className="w-16 h-16 object-contain rounded-xl"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-600 mb-4">
          Create Account
        </h2>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirm: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.name.trim()) {
              errors.name = "Name is required";
            } else if (/^\s|\s$/.test(values.name)) {
              errors.name = "Enter corrct name";
            }

            if (!values.email.trim()) {
              errors.email = "Email is required";
            } else if (/^\s|\s$/.test(values.email)) {
              errors.email = "No spaces allowed at start or end";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = "Enter a valid email";
            }

            if (!values.password.trim()) {
              errors.password = "Password is required";
            } else if (/^\s|\s$/.test(values.password)) {
              errors.password = "No spaces allowed at start or end";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }

            if (!values.confirm.trim()) {
              errors.confirm = "Confirm your password";
            } else if (values.password !== values.confirm) {
              errors.confirm = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const { confirm, ...userData } = values;
              const cleanedUser = {
                name: userData.name.trim(),
                email: userData.email.trim(),
                password: userData.password.trim(),
              };

              await axios.post("http://localhost:5000/users", cleanedUser);

              toast.success("Success!");
              login()
              resetForm();
              navigate("/");
            } catch (error) {
              console.error("Signup failed", error);
              toast.error("This didn't work.");
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
                <AccountCircleIcon className="text-gray-400 mr-2 scale-80" />
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full py-2 outline-none"
                />
              </div>
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />

              <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
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

              {/* Confirm Password */}
              <div>
                <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
                  <LockIcon className="text-gray-400 mr-2 scale-80" />
                  <Field
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    className="w-full py-2 outline-none"
                  />
                </div>
                <ErrorMessage
                  name="confirm"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all"
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
