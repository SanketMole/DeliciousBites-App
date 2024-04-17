// More.jsx

import React from "react";
import { useParams } from "react-router-dom";
import { RestaurantList } from "../Components/Data";

const More = ({ cart, setcart }) => {
  const { id } = useParams(); // Get the id parameter from the URL
  const restaurant = RestaurantList.find((data) => data.id === parseInt(id)); // Find the restaurant data based on id

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{restaurant.restaurant_name}</h1>
      <p className="text-lg mb-4">{restaurant.description}</p>
      <h2 className="text-2xl font-bold mb-2">Menu:</h2>
      <ul>
        {restaurant.menu.map((item, index) => (
          <>
            <li key={index} className="text-lg mb-2">
              <button className="border-2 border-black w-20 mx-2">+</button>
              <span className="font-bold">{item.name}</span> - ${item.price}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default More;
