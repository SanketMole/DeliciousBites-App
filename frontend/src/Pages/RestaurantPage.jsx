import React, { useEffect, useState } from "react";
import Restaurant from "../Components/Restaurant";
import { RestaurantList } from "../Components/Data";

const RestaurantPage = () => {
  const [swiggydata, setSwiggyData] = useState([]);
  const [place, setPlace] = useState("");
  const [restaurant, setRestaurant] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setSwiggyData(RestaurantList);
  }

  useEffect(() => {
    const filtered = swiggydata.filter((data) => {
      return (
        data.city.toLowerCase().includes(place.toLowerCase()) ||
        data.restaurant_name.toLowerCase().includes(place.toLowerCase())
      );
    });

    setRestaurant(filtered);
    setNoResults(filtered.length === 0);
  }, [place, swiggydata]);

  return (
    <div className="container mx-auto px-4">
      {/* Search Bar with Clear Button and Search Icon */}
      <div className="relative flex justify-center mt-16 mb-8">
        <input
          onChange={(e) => setPlace(e.target.value)}
          type="text"
          placeholder="Search Restaurants"
          className="bg-gray-100 rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
        />
        <button
          onClick={() => setPlace("")}
          className="absolute right-2 top-2 text-gray-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <svg
          className="absolute left-3 top-2 w-6 h-6 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 4a7 7 0 100 14 7 7 0 000-14zM4.22 4.22a9 9 0 0112.56 0m-1.27 12.44a9 9 0 01-12.56 0"
          />
        </svg>
      </div>

      {/* Popular Cities Section */}

      {/* No Results Message */}
      {noResults && (
        <div className="text-center text-red-500 mt-4 text-lg font-semibold">
          No results found
        </div>
      )}

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 p-3 mt-12">
        {restaurant.map((data) => (
          <Restaurant key={data.id} swiggydata={data} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
