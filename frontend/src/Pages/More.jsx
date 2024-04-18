// More.jsx

import React from "react";
import { useParams } from "react-router-dom";
import { RestaurantList } from "../Components/Data";

const More = ({ cart, setcart }) => {
  const { id } = useParams();
  const restaurant = RestaurantList.find((data) => data.id === parseInt(id));

  const handlepos = (id, title, price, description) => {
    const existingItem = cart[id];

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + 1;
      setcart({
        ...cart,
        [id]: {
          ...existingItem,

          description,
          quantity: updatedQuantity,
          title,
          price,
        },
      });
    } else {
      setcart({
        ...cart,
        [id]: {
          quantity: 1,
          description,
          title,
          price,
        },
      });
    }
  };

  function handleneg(id) {
    const existingItem = cart[id];

    if (existingItem) {
      const updatedQuantity = existingItem.quantity - 1;
      if (updatedQuantity > 0) {
        setcart({
          ...cart,
          [id]: {
            ...existingItem,
            quantity: updatedQuantity,
          },
        });
      } else {
        const { [id]: _, ...updatedCart } = cart;
        setcart(updatedCart);
      }
    } else {
      return;
    }
  }

  console.log("fhsbfsnf");
  console.log(cart);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{}</h1>
      <p className="text-lg mb-4">{restaurant.description}</p>
      <h2 className="text-2xl font-bold mb-2">Menu:</h2>
      <ul>
        {restaurant.menu.map((item, index) => (
          <>
            <li key={index} className="text-lg mb-2">
              <button
                onClick={() =>
                  handleneg(item.id, item.name, item.price, item.description)
                }
                className="border-2 border-black w-20 mx-2"
              >
                -
              </button>
              <span className="font-bold">{item.name}</span> - ${item.price}
              <button
                onClick={() =>
                  handlepos(item.id, item.name, item.price, item.description)
                }
                className="border-2 border-black w-20 mx-2"
              >
                +
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default More;
