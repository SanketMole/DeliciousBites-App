import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantList } from "../Components/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../Components/Header";

const More = ({ cart, setcart, userData }) => {
  const { id } = useParams();
  const restaurant = RestaurantList.find((data) => data.id === parseInt(id));
  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const handleAdd = (id, title, price, description, image) => {
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

  const handleRemove = (id) => {
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-700">
          Restaurant not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-5 p-5 bg-white shadow-md">
      <Header cart={cart} setcart={setcart} userData={userData} />
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-xl font-bold">{restaurant.name}</h1>
        <span className="text-gray-600">40-45 mins</span>
      </div>
      <div className="relative mb-5">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg hover:opacity-75 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <span className="text-lg">{restaurant.description}</span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Recommended ({restaurant.menu.length})
        </h2>

        <div className="space-y-4">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="flex items-center border p-4 rounded">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow-md mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  ₹{item.price} &bull; 60% OFF USE STEALDEAL
                </p>
                <p className="text-sm text-green-600">
                  {item.rating} ({item.reviews})
                </p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={() =>
                    handleAdd(
                      item.id,
                      item.name,
                      item.price,
                      item.description,
                      item.image_url
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 p-4 bg-white shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{restaurant.name}</h1>
          <span className="text-gray-600">40-45 mins</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-green-600">
            4.0 (10K+ ratings) &bull; ₹350 for two
          </span>
          <span className="text-gray-600">
            Outlet: <b>{restaurant.city}</b>
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-600">
            3.0 kms | ₹40 Delivery fee will apply
          </span>
        </div>
        <div className="mt-4 flex space-x-4">
          <div className="p-2 border rounded text-center">
            <span className="text-orange-600 font-semibold">
              50% Off Upto ₹100
            </span>
            <br />
            <span className="text-gray-600 text-sm">USE SWIGGY50</span>
          </div>
          <div className="p-2 border rounded text-center">
            <span className="text-orange-600 font-semibold">
              60% Off Upto ₹120
            </span>
            <br />
            <span className="text-gray-600 text-sm">USE STEALDEAL</span>
          </div>
        </div>
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
