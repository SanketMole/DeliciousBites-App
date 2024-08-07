// Restaurant.js
import React from "react";
import { Link } from "react-router-dom";

const Restaurant = ({ swiggydata, cart, setcart }) => {
  return (
    <div className="my-8 mx-4 duration-300 ease-in-out rounded-2xl overflow-hidden bg-white w-full">
      <div className="relative max-w-sm  rounded-2xl overflow-hidden shadow-xl">
        <img
          className="h-60 w-full object-cover"
          src={swiggydata.image_url}
          alt={swiggydata.restaurant_name}
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {swiggydata.offer ? `${swiggydata.offer}% OFF` : "No Offer"}
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out">
            <svg
              className="w-6 h-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.828a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-2xl mb-2 text-blue-900">
                {swiggydata.restaurant_name}
              </div>
              <p className="text-gray-700 text-base">{swiggydata.city}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927C9.432 1.64 10.568 1.64 10.951 2.927l1.14 3.637a1 1 0 00.95.69h3.812c1.285 0 1.823 1.639.785 2.451l-3.072 2.296a1 1 0 00-.363 1.118l1.14 3.637c.383 1.287-.985 2.358-2.016 1.529L10 13.764l-3.027 2.22c-1.03.83-2.4-.242-2.016-1.529l1.14-3.637a1 1 0 00-.363-1.118l-3.072-2.296c-1.038-.812-.5-2.451.785-2.451h3.812a1 1 0 00.95-.69l1.14-3.637z" />
                </svg>
                <span className="text-gray-700 text-sm font-semibold">
                  {swiggydata.rating}
                </span>
              </div>
              <div className="text-gray-700 text-sm font-semibold">
                Delivery Time: {swiggydata.delivery_time} mins
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap">
              {swiggydata.cuisines.map((cuisine, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <Link to={`/more/${swiggydata.id}`}>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
