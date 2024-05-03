import React, { useEffect, useState } from "react";
import del from "../assets/del.png";

const View = ({ cart, setcart }) => {
  const [cartItemsArray, setcartItemsArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Convert cart object to array and calculate the total price
    const cartArray = Object.values(cart);
    setcartItemsArray(cartArray);

    const total = cartArray.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalPrice(total);
  }, [cart]);

  const incrementQuantity = (itemId) => {
    const newCart = { ...cart };
    const item = newCart[itemId];

    if (item) {
      item.quantity += 1; // Increment quantity
      setcart(newCart);
    }
  };

  const decrementQuantity = (itemId) => {
    const newCart = { ...cart };
    const item = newCart[itemId];

    if (item && item.quantity > 1) {
      item.quantity -= 1; // Decrement quantity
      setcart(newCart);
    } else if (item && item.quantity === 1) {
      removeItem(itemId); // Remove item if quantity is 1
    }
  };

  const removeItem = (itemId) => {
    const newCart = { ...cart };
    delete newCart[itemId]; // Delete item
    setcart(newCart);
  };

  return (
    <div className="min-h-screen   bg-gray-100 pt-20 ">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="md:w-2/3 ">
          {cartItemsArray.length === 0 ? (
            <div className="text-center">No items in the cart</div>
          ) : (
            cartItemsArray.map((item, index) => {
              const itemId = Object.keys(cart)[index];

              return (
                <div
                  key={itemId}
                  className="justify-between my-4 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start transition-transform transform hover:scale-105 hover:shadow-"
                >
                  <img
                    src={item.image}
                    alt={`product-image`}
                    className=" rounded-lg sm:w-44 h-32  "
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between ">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-between sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100 ">
                        <button
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-white"
                          onClick={() => decrementQuantity(itemId)}
                        >
                          -
                        </button>
                        <input
                          className="h-8 w-8 border   bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white "
                          onClick={() => incrementQuantity(itemId)}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">{item.price * item.quantity}</p>
                      </div>
                    </div>
                    <button
                      className="mb-16 -mt-2 transition-transform transform hover:scale-110 duration-200 ease-in-out"
                      onClick={() => removeItem(itemId)}
                    >
                      <img className="w-24 -my-8" src={del} alt="Delete item" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-8 shadow-lg md:w-1/3">
          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold text-gray-700">Subtotal</p>
            <p className="text-lg font-semibold text-gray-700">
              {totalPrice} ₹
            </p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold text-gray-700">GST (18%)</p>
            <p className="text-lg font-semibold text-gray-700">
              {(totalPrice * 0.18).toFixed(2)} ₹
            </p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold text-gray-700">Shipping</p>
            <p className="text-lg font-semibold text-gray-700">Free</p>
          </div>

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between mb-4">
            <p className="text-xl font-bold">Total</p>
            <div>
              <p className="text-xl font-bold">
                {(totalPrice - totalPrice * 0.1 + totalPrice * 0.18).toFixed(2)}{" "}
                ₹
              </p>
              <p className="text-sm text-gray-600">Including GST & Discounts</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-gray-700">Estimated Delivery Time</p>
            <p className="text-gray-900">45-60 mins</p>
          </div>

          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-gray-700">Shipping Method</p>
            <p className="text-gray-900">Standard (Free)</p>
          </div>

          <button
            className="w-full py-3 text-white font-medium bg-blue-600 rounded-md shadow-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            onClick={() => alert("Proceeding to checkout...")}
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
