import React, { useEffect, useState } from "react";

const View = ({ cart, setcart }) => {
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartArray = Object.values(cart); // Convert the cart object into an array
    setCartItemsArray(cartArray); // Update the state with the new array

    // Calculate total price
    const total = cartArray.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cart]); // Re-run effect when cart changes

  const incrementQuantity = (itemId) => {
    const newCart = { ...cart }; // Create a copy of the cart
    const item = newCart[itemId];
    // Reference the correct item

    if (item) {
      // Check if the item exists
      item.quantity += 1; // Increment the quantity
      setcart(newCart); // Update the cart state
    }
  };

  const decrementQuantity = (itemId) => {
    const newCart = { ...cart }; // Create a copy of the cart
    const item = newCart[itemId]; // Reference the correct item
    if (item && item.quantity > 1) {
      // Ensure quantity doesn't go below 1
      item.quantity -= 1; // Decrement the quantity
      setcart(newCart); // Update the cart state
    } else if (item && item.quantity === 1) {
      // Optional: remove item if quantity reaches 0
      removeItem(itemId);
    }
  };

  const removeItem = (itemId) => {
    const newCart = { ...cart }; // Create a copy of the cart
    delete newCart[itemId]; // Delete the item by ID
    setcart(newCart); // Update the cart state
  };

  return (
    <div className="container mx-auto py-8">
      {cartItemsArray.length === 0 ? (
        <div>No items in the cart</div>
      ) : (
        <>
          {cartItemsArray.map((item, index) => {
            // Get the correct key for this item
            const itemId = Object.keys(cart)[index];

            return (
              <div
                key={itemId}
                className="mb-4 p-4 border rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">Item {index + 1}</h2>
                <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
                <div className="flex justify-end">
                  <img
                    src={item.image}
                    alt={`Item ${index + 1}`}
                    className="h-44"
                  />
                </div>
                <p>Total Price: {item.price * item.quantity} Rupees</p>
                <p>{item.title}</p>
                <p>{item.description}</p>

                <button
                  className="border-2 border-black"
                  onClick={() => incrementQuantity(itemId)} // Increment
                >
                  +
                </button>

                <button
                  className="border-2 border-black"
                  onClick={() => decrementQuantity(itemId)} // Decrement
                >
                  -
                </button>

                <button
                  className="border-2 border-black"
                  onClick={() => removeItem(itemId)} // Remove
                >
                  Remove
                </button>
              </div>
            );
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
