import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://deliciousbites-app.onrender.com/api/v1/signin",
        {
          userName,
          password,
        }
      );
      const { UserId, token } = response.data;
      if (UserId && token) {
        localStorage.setItem("token", token);
        navigate(`/dashboard`);
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          "url('https://static2.bigstockphoto.com/7/9/2/large1500/297327124.jpg')", // Background image
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-lg md:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Welcome Back to DeliciousBites!
        </h2>
        <form>
          <div className="mb-5">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="userName"
            >
              User Name
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
              id="userName"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
            type="button"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-yellow-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="mt-2 text-center">
            <Link
              to="/register"
              className="text-sm text-yellow-500 hover:underline"
            >
              Don’t have an Account? Register!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
