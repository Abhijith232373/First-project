import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 bg-[url('src/assets/user/bg4.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      {/* Sign Up Card */}

      <div className="relative bg-white   p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm ">

          {/* Top Image (logo / illustration) */}
          <div className="flex justify-center mb-4">
            <img
              src="src/assets/logo/Home4u-logo.png" // ⬅️ your logo
              alt="Login"
              className="w-16 h-16 object-contain rounded-4xl"/>
          </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-4">
          Create Account
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
              await axios.post("http://localhost:5000/users", userData);
              
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
             
                         <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
    <AccountCircleIcon  className="text-gray-400 mr-2 scale-80" />
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
      className="w-full py-2 outline-none"
                  />
                  
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                  />
              </div>

      
  <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
    <EmailIcon  className="text-gray-400 mr-2 scale-80" />
    <Field
      type="email"
      name="email"
      placeholder="Email"
      className="w-full py-2 outline-none"
    />
  
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

<div>
             <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-400">
    <LockIcon  className="text-gray-400 mr-2 scale-80" />
                <Field
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
className="w-full py-2 outline-none" />
</div>
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
