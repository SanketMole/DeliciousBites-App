import React from "react";
import { Link } from "react-router-dom";

const Restaurant = ({ swiggydata }) => {
  return (
    <div className="my-4 mx-4 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden">
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
        <img
          className="h-56 w-full object-cover"
          src={swiggydata.image_url}
          alt={swiggydata.restaurant_name}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {swiggydata.restaurant_name}
          </div>
          <p className="text-gray-700 text-base">{swiggydata.city}</p>
          <div className="flex items-center mt-2">
            <svg
              className="w-5 h-5 text-yellow-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927C9.432 1.64 10.568 1.64 10.951 2.927l1.14 3.637a1 1 0 00.95.69h3.812c1.285 0 1.823 1.639.785 2.451l-3.072 2.296a1 1 0 00-.363 1.118l1.14 3.637c.383 1.287-.985 2.358-2.016 1.529L10 13.764l-3.027 2.22c-1.03.83-2.4-.242-2.016-1.529l1.14-3.637a1 1 0 00-.363-1.118l-3.072-2.296c-1.038-.812-.5-2.451.785-2.451h3.812a1 1 0 00.95-.69l1.14-3.637z" />
            </svg>
            <span className="text-gray-700 text-sm">{swiggydata.rating}</span>
          </div>
          <div className="mt-2 text-gray-700 text-sm">
            <p>Delivery Time: {swiggydata.delivery_time} mins</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-4 flex justify-between items-center">
          <div className="flex flex-wrap">
            {swiggydata.cuisines.map((cuisine, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {cuisine}
              </span>
            ))}
          </div>
          <Link to={`/more/${swiggydata.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
