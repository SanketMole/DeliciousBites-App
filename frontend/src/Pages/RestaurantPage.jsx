import React, { useEffect, useState } from "react";
import Restaurant from "../Components/Restaurant";
import axios from "axios";
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
    const filtrest = swiggydata.filter((data) => {
      return (
        data.city.toLowerCase().includes(place.toLowerCase()) ||
        data.restaurant_name.toLowerCase().includes(place.toLowerCase())
      );
    });

    setRestaurant(filtrest);

    if (filtrest.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [place, swiggydata]);

  return (
    <>
      <div className="flex justify-center mt-28 border-black ">
        <input
          onChange={(e) => {
            setPlace(e.target.value);
          }}
          type="text"
          placeholder="Search"
          className="w-64 h-8 rounded-md"
        />
      </div>

      {noResults && (
        <div className="text-center text-red-500 mt-2">No results found</div>
      )}

      <div className="flex flex-wrap  my-20 sm:my-10 md:my-10 sm:p-14 md:p-14 mx-6  ">
        {restaurant.map((data) => {
          return (
            <div className="w-42 sm:w-1/2 md:w-1/3 px-1 ">
              <Restaurant key={data.id} swiggydata={data} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantPage;
