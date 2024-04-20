import React, { useEffect, useState } from "react";

const View = ({ cart }) => {
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartArray = Object.values(cart);
    setCartItemsArray(cartArray);

    // Calculate total price
    const total = cartArray.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <div className="container mx-auto py-8">
      {cartItemsArray.length === 0 ? (
        <div>No items added to cart</div>
      ) : (
        <>
          {cartItemsArray.map((item, index) => {
            if (item.quantity !== 0) {
              return (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Item {index + 1}
                  </h2>

                  <p className="text-gray-700 mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex justify-end">
                    <img
                      src={item.image}
                      alt={`Item ${index + 1}`}
                      className="h-44"
                    />
                  </div>
                  <p>Total Price: {item.price * item.quantity} Rupees</p>

                  <p>{item.price} Rupees</p>
                  <p>{item.title}</p>

                  <p className="text-gray-700">
                    Description: {item.description}
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
          <div className="text-xl font-semibold mb-4">
            Total Cart Price: {totalPrice} Rupees
          </div>
        </>
      )}
    </div>
  );
};

export default View;
