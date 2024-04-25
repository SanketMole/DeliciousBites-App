import React from "react";
import { Link } from "react-router-dom";

const Restaurant = ({ swiggydata }) => {
  return (
    <div className="my-2 mx-2 shadow-md hover:shadow-xl ">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="h-56 w-96"
          src={swiggydata.image_url}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4 ">
          <div className="font-bold text-md ">{swiggydata.restaurant_name}</div>

          <p className="text-gray-700 text-base">{swiggydata.city}</p>
        </div>
        <Link to={`/more/${swiggydata.id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mx-4">
            Explore More
          </button>
        </Link>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {swiggydata.cuisines[0]}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {swiggydata.cuisines[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
