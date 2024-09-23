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
    const response = await axios.post(
      "https://deliciousbites-app.onrender.com/api/v1/signup",
      {
        firstName,
        lastName,
        password,
        userName,
      }
    );

    localStorage.setItem("token", response.data.token);
    alert(response.data.msg);
    navigate("/dashboard");
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          "url('https://static2.bigstockphoto.com/7/9/2/large1500/297327124.jpg')",
      }}
    >
      {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md p-4 bg-white rounded-lg shadow-lg lg:max-w-lg lg:flex lg:w-2/3 lg:h-3/5">
        {/* Image Column (Hidden on Small Screens) */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/036/499/568/non_2x/snack-mini-pizza-with-sausages-tomato-and-cheese-on-a-wooden-board-top-and-vertical-view-photo.jpg')",
            // Adjust the image to fit the container height
          }}
        ></div>

        {/* Form Column */}
        <div className="w-full lg:w-1/2 p-4">
          <h3 className="text-lg font-semibold text-center text-gray-800">
            Create an Account!
          </h3>
          <form className="mt-4 space-y-3">
            {/* First Name and Last Name */}
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
              <div className="md:w-1/2">
                <label
                  className="block text-sm font-bold text-gray-700"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => setfirstName(e.target.value)}
                  className="w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="md:w-1/2">
                <label
                  className="block text-sm font-bold text-gray-700"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => setlastName(e.target.value)}
                  className="w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setuserName(e.target.value)}
                className="w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                className="w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            {/* Register Button */}
            <div className="text-center">
              <button
                onClick={handleRegister}
                className="w-full px-2 py-1 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                type="button"
              >
                Register Account
              </button>
            </div>

            <hr className="my-4" />

            {/* Forgot Password and Login Links */}
            <div className="text-center">
              <a className="text-sm text-yellow-500" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <Link to="/login" className="text-sm text-yellow-500">
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
