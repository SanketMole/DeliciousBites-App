// More.jsx

import React from "react";
import { useParams } from "react-router-dom";
import { RestaurantList } from "../Components/Data";

const More = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const restaurant = RestaurantList.find((data) => data.id === parseInt(id)); // Find the restaurant data based on id
  console.log(restaurant);

  return (
    <div>
      <h1>{restaurant.restaurant_name}</h1>
      <p>{restaurant.description}</p>
      <h2>Menu:</h2>
      <ul>
        {restaurant.menu.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default More;
