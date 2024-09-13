import React, { useEffect, useState } from "react";
import axios from "axios";
import del from "../assets/del.png";
import { Header } from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";

const View = ({ cart, setcart, userData }) => {
  const [cartItemsArray, setcartItemsArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartArray = Object.values(cart);
    setcartItemsArray(cartArray);

    const total = cartArray.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalPrice(total);
    setFinalPrice(total);
  }, [cart]);

  const incrementQuantity = (itemId) => {
    const newCart = { ...cart };
    const item = newCart[itemId];

    if (item) {
      item.quantity += 1;
      setcart(newCart);
    }
  };

  const decrementQuantity = (itemId) => {
    const newCart = { ...cart };
    const item = newCart[itemId];

    if (item && item.quantity > 1) {
      item.quantity -= 1;
      setcart(newCart);
    } else if (item && item.quantity === 1) {
      removeItem(itemId);
    }
  };

  const removeItem = (itemId) => {
    const del = confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (del) {
      const newCart = { ...cart };
      delete newCart[itemId];
      setcart(newCart);
    }
  };

  const checkDiscount = () => {
    if (discount === "SNAPDEAL") {
      const discountedPrice = (totalPrice * 0.8 + 30).toFixed(2);
      setFinalPrice(parseFloat(discountedPrice));
    } else {
      alert("Incorrect Coupon");
      setFinalPrice(totalPrice);
    }
  };

  const handleCheckout = async () => {
    try {
      // Prepare the data to send
      const orderData = {
        items: Object.entries(cart).map(([id, item]) => ({
          id,
          title: item.title,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice,
        discount,
        finalPrice,
      };

      console.log(orderData);
      // Make the POST request to the create order endpoint
      const response = await axios.post(
        "https://deliciousbites-app.onrender.com/api/v1/orders/create",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Handle successful order creation

      console.log(response.data);
      navigate(`/thankyou/${response.data.order._id}`);
      alert("Order placed successfully!");

      // Navigate to Thank You page with order data

      // Optionally clear the cart after placing the order
      setcart({});
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Header cart={cart} setcart={setcart} userData={userData} />
      <h1 className="text-center text-2xl font-bold mb-8">Cart Items</h1>
      <div className="mx-auto max-w-5xl px-4">
        <div className="md:flex md:space-x-6">
          {/* Cart Items Section */}
          <div className="md:w-2/3">
            {cartItemsArray.length === 0 ? (
              <div className="text-center py-12">No items in the cart</div>
            ) : (
              cartItemsArray.map((item, index) => {
                const itemId = Object.keys(cart)[index];
                return (
                  <div
                    key={itemId}
                    className="my-4 rounded-lg bg-white p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-xl md:flex md:justify-between"
                  >
                    <img
                      src={item.image}
                      alt={"productimage"}
                      className="w-full h-48 object-cover rounded-lg md:w-32 md:h-32"
                    />
                    <div className="mt-4 md:mt-0 md:ml-4 md:w-full">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-md text-gray-700">
                        {item.description}
                      </p>
                      <div className="flex items-center mt-4">
                        <button
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white"
                          onClick={() => decrementQuantity(itemId)}
                        >
                          -
                        </button>
                        <input
                          className="h-8 w-16 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white"
                          onClick={() => incrementQuantity(itemId)}
                        >
                          +
                        </button>
                        <button
                          className="ml-4"
                          onClick={() => removeItem(itemId)}
                        >
                          <img
                            className="w-8 h-8"
                            src={del}
                            alt="Delete item"
                          />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <p className="text-md font-semibold text-gray-900">
                          {item.price * item.quantity} ₹
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Summary Section */}
          <div className="mt-6 rounded-lg border bg-white p-6 shadow-lg md:w-1/3">
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

            <input
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              type="text"
              placeholder="Discount Code"
              className="w-full mb-4 p-2 border rounded text-gray-700"
              value={discount}
            />
            <button
              onClick={checkDiscount}
              className="w-full bg-green-500 rounded-full px-4 py-2 text-white hover:bg-green-600"
            >
              Apply Discount
            </button>

            <hr className="my-6 border-gray-300" />
            <div className="flex justify-between mb-4">
              <p className="text-xl font-bold">Total</p>
              <div>
                <p className="text-xl font-bold">
                  {(finalPrice * 1.18).toFixed(2)} ₹
                </p>
                <p className="text-sm text-gray-600">
                  Including GST & Discounts
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex justify-between">
                <p className="text-gray-700">Estimated Delivery Time</p>
                <p className="text-gray-900">45-60 mins</p>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping Method</p>
                <p className="text-gray-900">Standard (Free)</p>
              </div>
            </div>

            <button
              className="w-full py-3 text-white font-medium bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 transition-all"
              onClick={handleCheckout}
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
