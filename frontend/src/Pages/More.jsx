import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantList } from "../Components/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl mx-auto py-8 px-4 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="h-60 w-full object-cover rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{restaurant.name}</h1>
          <p className="text-md mt-2 text-gray-600">{restaurant.description}</p>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Menu</h2>
        <ul className="space-y-4">
          {restaurant.menu.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md mr-4"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {item.description}
                  </p>
                  <p className="text-md font-medium text-gray-800">
                    ₹{item.price}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => handleneg(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition duration-300"
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
                  className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition duration-300"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                {item.isBestseller && (
                  <span className="text-xs text-red-500 font-semibold">
                    Bestseller
                  </span>
                )}
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
