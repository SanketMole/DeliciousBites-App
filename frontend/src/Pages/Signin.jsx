import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  async function handleRegister() {
    console.log(firstName);
    const response = await axios.post(
      "https://deliciousbites-app.onrender.com/api/v1/signup",
      {
        firstName,
        lastName,
        password,
        userName,
      }
    );

    console.log(response.data.token);
    localStorage.setItem("token", response.data.token);

    alert(response.data.msg);
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 dark:bg-gray-900 p-2">
      {/* Container */}
      <div className="flex w-full max-w-xl lg:w-2/3 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        {/* Image Column */}
        <div
          className="hidden lg:block  w-96  bg-cover rounded-l-lg"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/paneer-tikka-is-indian-dish-made-from-chunks-cottage-cheese-marinated-spices-grilled-tandoor_466689-76797.jpg?w=360')",
          }}
        />
        {/* Form Column */}
        <div className="w-3/4 p-6 ">
          <h3 className="py-2 text-xl text-centerc text-gray-800 dark:text-white">
            Create an Account!
          </h3>
          <form className="mt-4 ">
            <div className="mb-4 md:flex md:justify-between">
              <div className="md:w-1/2 md:mr-2">
                <label
                  className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => {
                    setfirstName(e.target.value);
                  }}
                  className="  w-full px-2 py-1 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="md:w-1/2 md:ml-2">
                <label
                  className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                  className="w-full px-2 py-1 text-sm text-gray-700 font-bold border rounded focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                className="w-full px-2 py-1 text-sm text-gray-700  border rounded focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 md:flex md:justify-between">
              <div className="md:w-1/2 md:mr-2">
                <label
                  className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className="w-full px-2 py-1 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleRegister}
                className="w-full px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900"
                type="button"
              >
                Register Account
              </button>
            </div>
            <hr className="my-4 border-t" />
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 dark:text-blue-500"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <Link
                to="/login"
                className="inline-block text-sm text-blue-500 dark:text-blue-500"
              >
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
