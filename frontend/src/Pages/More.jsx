import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantList } from "../Components/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const More = ({ cart, setcart }) => {
  const { id } = useParams();
  const restaurant = RestaurantList.find((data) => data.id === parseInt(id));
  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const handlepos = (id, title, price, description, image) => {
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
          image,
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
          image,
        },
      });
    }
    setShowPopup(true);
    setAddedItem({ id, title });
  };

  const handleneg = (id) => {
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
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Restaurant not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl mx-auto py-8 px-4 bg-white shadow-lg rounded-lg sm:my-24">
        <div className="text-center mb-8">
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="h-60 w-full object-cover rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          />
          <h1 className="text-4xl font-bold mt-4">{restaurant.name}</h1>
          <p className="text-lg mt-2 text-gray-600">{restaurant.description}</p>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Menu</h2>
        <ul className="space-y-6">
          {restaurant.menu.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-lg bg-white transition-transform duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-md mr-4"
                />
                <div className="flex flex-col">
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.description}
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    ${item.price}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleneg(item.id)}
                      className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <button
                      onClick={() =>
                        handlepos(
                          item.id,
                          item.name,
                          item.price,
                          item.description,
                          item.image_url
                        )
                      }
                      className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-500 mr-1"
                  />
                  <span className="text-gray-700 text-sm font-semibold">
                    {restaurant.rating}
                  </span>
                </div>
                <p className="text-gray-700 text-sm font-semibold">
                  Delivery Time: {restaurant.delivery_time} mins
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showPopup && (
        <div className="fixed bottom-10 right-10 bg-white p-4 rounded-lg shadow-md z-10 transition-transform duration-500 transform-gpu animate-bounce">
          <p className="text-green-500 font-bold">
            {addedItem.title} added to cart
          </p>
        </div>
      )}
    </div>
  );
};

export default More;
