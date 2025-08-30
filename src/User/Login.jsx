import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Pages/AuthContext";  // ⬅ import context







const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ⬅ get login function

  return (
    <div className="absolute inset-0 bg-[url('src/assets/img1.jpg')] bg-cover bg-center ">
      <div className="absolute ml-[500px] mt-42 bg-gray-200 opacity-90 p-6 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
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
                alert("Login Successful ✅");

                // Save user to localStorage
                localStorage.setItem("user", JSON.stringify(res.data[0]));

                // 🔥 Immediately update AuthContext state
                login(res.data[0]);

                resetForm();
                navigate("/"); // redirect to homepage
              } else {
                alert("Invalid email or password ❌");
              }
            } catch (error) {
              console.error("Login failed", error);
              alert("Something went wrong");
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
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

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
