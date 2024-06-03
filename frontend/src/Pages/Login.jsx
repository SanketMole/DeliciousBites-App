import React, { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Add registration logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 dark:bg-gray-900 p-2">
      {/* Container */}
      <div className="flex w-full max-w-xl lg:w-2/3 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        {/* Image Column */}
        <div
          className="hidden lg:block w-96 bg-cover rounded-l-lg"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/paneer-tikka-is-indian-dish-made-from-chunks-cottage-cheese-marinated-spices-grilled-tandoor_466689-76797.jpg?w=360')",
          }}
        />
        {/* Form Column */}
        <div className="w-3/4 p-6">
          <h3 className="py-2 text-xl text-center text-gray-800 dark:text-white">
            Create an Account!
          </h3>
          <form className="mt-4">
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                htmlFor="userName"
              >
                User Name
              </label>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="w-full px-2 py-1 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="User Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-2 py-1 text-sm text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
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
              <a
                className="inline-block text-sm text-blue-500 dark:text-blue-500"
                href="./index.html"
              >
                Already have an account? Login!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
